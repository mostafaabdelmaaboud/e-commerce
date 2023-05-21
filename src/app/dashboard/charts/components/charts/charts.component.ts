import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, ReplaySubject, Subscription, takeUntil } from 'rxjs';
import { Filteration, ProductsModel } from 'src/app/dashboard/products/context/DTOs';
import { GetAllProducts } from 'src/app/dashboard/products/store/actions/allProducts.actions';
import { AllProductsState } from 'src/app/dashboard/products/store/state/allProducts.state';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public translate = inject(TranslateService);
  displayedColumns: string[] = ['title', 'price', 'category', 'rating'];
  dataSource!: MatTableDataSource<any>;
  @Select(AllProductsState.allProducts) allProducts$!: Observable<any[]>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  tableData: ProductsModel[] = [];
  @Select(AllProductsState.productsLoaded) productsLoaded$!: Observable<boolean>;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(0);
  @Select(AllProductsState.totalItems) totalItems$!: Observable<number>;

  isLoading = false;
  private store = inject(Store);
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  filteration: Filteration = {
    page: 1
  };
  subscription!: Subscription;

  cardsChart = [
    {
      label: "New Users",
      total: "12k",
      precentage: "50"
    },
    {
      label: "Users retention",
      total: "10k",
      precentage: "40"
    },
    {
      label: "Users engagement",
      total: "8k",
      precentage: "30"
    },
    {
      label: "Referral",
      total: "6k",
      precentage: "20"
    },
  ]
  constructor(
    public _MatPaginatorIntl: MatPaginatorIntl

  ) {

  }
  ngOnInit(): void {
    this.paginationTranslate();
    this.translate.onLangChange.subscribe((lang: any) => {
      this.paginationTranslate();
    });
    this.subscription = this.allProducts$.subscribe((res: ProductsModel[]) => {
      this.tableData = this.mappingProducts(res);
      if (res.length) {
        this.setPagination(this.tableData);

      }
    });
    this.totalItems$.subscribe((totalItems: any) => {
      this.length = totalItems;
    })
    this.productsLoaded$.pipe(takeUntil(this.destroyed$)).subscribe((productsLoaded: any) => {
      debugger;
      if (!productsLoaded) {
        this.isLoading = true;
        this.store.dispatch(new GetAllProducts(this.filteration)).subscribe({
          next: (res: any) => {
            this.isLoading = false;
          },
          error: (err: any) => {
            this.isLoading = false;
          }
        });
      } else {
        this.isLoading = false;
      }
    })
  }
  setPagination(tableData: ProductsModel[]) {
    this.dataSource = new MatTableDataSource<ProductsModel>(tableData);
    this.dataSource.paginator = this.paginator;
  }
  mappingProducts(data: ProductsModel[]): ProductsModel[] {
    let newTasks: ProductsModel[] | any = data.map((item) => {
      return {
        ...item,
        loading: false
      }
    });
    return newTasks;
  }
  paginationTranslate() {
    this._MatPaginatorIntl.itemsPerPageLabel = this.translate.instant("MAT_PAGINATOR.ITEMS_PER_PAGE");
    this._MatPaginatorIntl.nextPageLabel = this.translate.instant("MAT_PAGINATOR.NEXT_PAGE");
    this._MatPaginatorIntl.lastPageLabel = this.translate.instant("MAT_PAGINATOR.LAST_PAGE");
    this._MatPaginatorIntl.firstPageLabel = this.translate.instant("MAT_PAGINATOR.FIRST_PAGE");
    this._MatPaginatorIntl.previousPageLabel = this.translate.instant("MAT_PAGINATOR.PREVIOUS_PAGE");
    this._MatPaginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number): string => {
      const of = this.translate ? this.translate.instant("MAT_PAGINATOR.OF") : "of";
      if (length === 0 || pageSize === 0) {
        return "0 " + of + " " + length;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize > length ? (Math.ceil(length / pageSize) - 1) * pageSize : page * pageSize;

      const endIndex = Math.min(startIndex + pageSize, length);
      return startIndex + 1 + " - " + endIndex + " " + of + " " + length;
    };
    this._MatPaginatorIntl.changes.next();
  }
  ngOnDestroy() {
    this.filteration = {};
    this.subscription.unsubscribe();
    this.destroyed$.next(true);
    this.destroyed$.complete();
    // this.store.reset({});
  }
}
