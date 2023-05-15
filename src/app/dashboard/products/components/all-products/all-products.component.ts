import { ChangeDetectorRef, Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatLegacyPaginator as MatPaginator, MatLegacyPaginatorIntl as MatPaginatorIntl, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { Filteration, ProductsModel } from '../../context/DTOs';
import { TranslateService } from '@ngx-translate/core';
import { AllProductsState } from '../../store/state/allProducts.state';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, debounceTime } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DeleteProduct, GetAllProducts } from '../../store/actions/allProducts.actions';
import { AddProductComponent } from '../add-product/add-product.component';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss'],
  providers: [
    MatPaginatorIntl
  ]
})
export class AllProductsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['image', 'title', 'price', 'category', 'rating', 'actions'];
  tableData: ProductsModel[] = [];
  dataSource!: MatTableDataSource<any>;
  isLoading = false;
  loading: any = {};
  public translate = inject(TranslateService);
  @Select(AllProductsState.allProducts) allProducts$!: Observable<any[]>;
  @Select(AllProductsState.massageDeleteTaks) massageDeleteTaks$!: Observable<string | null>;
  @Select(AllProductsState.productsLoaded) productsLoaded$!: Observable<boolean>;
  @Select(AllProductsState.totalItems) totalItems$!: Observable<number>;
  private store = inject(Store);
  public dialog = inject(MatDialog);
  private error = inject(HandleErrorService);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private _changeDetectorRef = inject(ChangeDetectorRef);
  dataObs$!: Observable<any>;
  subscription!: Subscription;
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent!: PageEvent;
  formFilteration!: FormGroup;
  filteration: Filteration = {
    page: 1
  };
  users: any[] = [
    { name: "Mohamed", id: "6452a0749bdca9984acf10f8" },
    { name: "Ahmed", id: "6452a0e79bdca9984acf10fe" },
    { name: "Mostafa", id: "6452a1049bdca9984acf1101" },
    { name: "shosho", id: "6452b8d3bd7e7eb41913875f" }
  ]
  status: any[] = [
    { name: "Complete", id: 1 },
    { name: "In-Prossing", id: 2 },
  ]
  constructor(
    public _MatPaginatorIntl: MatPaginatorIntl
  ) { }
  ngOnInit(): void {
    this.paginationTranslate();
    this.translate.onLangChange.subscribe((lang) => {
      this.paginationTranslate();
    });
    this.createForm();
    this.subscription = this.allProducts$.subscribe((res: ProductsModel[]) => {
      this.tableData = this.mappingProducts(res);
      if (res.length) {
        this.setPagination(this.tableData);

      }
    });
    this.totalItems$.subscribe(totalItems => {
      this.length = totalItems;
    })
    this.productsLoaded$.subscribe(productsLoaded => {
      if (!productsLoaded) {
        this.isLoading = true;
        this.store.dispatch(new GetAllProducts(this.filteration)).subscribe({
          next: res => {
            this.isLoading = false;
          },
          error: err => {
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
  createForm() {
    this.formFilteration = this.fb.group({
      keyword: [""],
      userId: [""],
      status: [""],
      range: this.fb.group({
        fromDate: [null],
        toDate: [null]
      })
    })
  }
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.filteration.page = this.pageIndex + 1;
  }

  deleteRow(id: string) {
    let objIndex = this.tableData.findIndex((obj: any) => obj.id === id);
    let conf = confirm("Want to delete?");
    if (conf) {
      this.tableData[objIndex].loading = true;
      this.setPagination(this.tableData);
      this.store.dispatch(new DeleteProduct(id)).subscribe({
        next: data => {
          this.tableData[objIndex].loading = false;
          this.toastr.success("Product Is Deleted", 'Success', {
            timeOut: 2000
          });
        },
        error: err => {
          this.tableData[objIndex].loading = false;
        },
      })
    }
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
  openDialog(): void {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: "40vw",
      data: null
    });
  }
  updateRow(element: ProductsModel) {
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: "40vw",
      data: element
    });
  }
  ngOnDestroy() {
    this.filteration = {};
    this.subscription.unsubscribe();
    // this.store.reset({});
  }

}
