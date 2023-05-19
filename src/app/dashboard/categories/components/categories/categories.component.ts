import { ProductsModel } from './../../../products/context/DTOs';
import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { GetAllProducts, GetCategorieUser, GetProductsByCategory } from '../../store/actions/categores.actions';
import { Categores } from '../../store/state/categores.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoriesModel, FilterCategoriesModel, UserData } from '../../context/DTOs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../services/cart.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Select(Categores.categoriesLoaded) categoriesLoaded$!: Observable<boolean>
  @Select(Categores.categories) categorie$!: Observable<string[]>
  @Select(Categores.allProducts) allProducts$!: Observable<ProductsModel[]>
  @Select(Categores.productsLoaded) productsLoaded$!: Observable<boolean>
  @Select(Categores.selectedProduct) selectedProduct$!: Observable<string>
  public translate = inject(TranslateService);
  private store = inject(Store);
  private cartService = inject(CartService);
  selectedCategory: string = "all";

  baseApi = environment.baseApi;
  isLoading = true;
  totalItems: number = 0;
  filteration: FilterCategoriesModel = {
    page: 1,
  };
  plateformId: object;

  constructor(@Inject(PLATFORM_ID) plateformId: object) {
    this.plateformId = plateformId;

  }
  ngOnInit(): void {

    this.selectedProduct$.subscribe((selectedProduct: any) => {
      this.selectedCategory = selectedProduct;
    })
    this.categoriesLoaded$.subscribe((categoriesLoaded: any) => {
      if (!categoriesLoaded) {
        this.isLoading = true;
        this.store.dispatch(new GetCategorieUser()).subscribe((res: any) => {
          this.isLoading = false;
        });
      }
    })
    this.productsLoaded$.subscribe((productsLoaded: any) => {
      debugger;
      if (!productsLoaded) {
        this.store.dispatch(new GetAllProducts()).subscribe({
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

  identify(index: any, item: any) {
    return item._id;
  }
  changePage(even: any) {

    if (even.value === "all") {

      this.store.dispatch(new GetAllProducts())
    } else {
      this.store.dispatch(new GetProductsByCategory(even.value)).subscribe({
        next: (res: any) => {
          this.isLoading = false;
        },
        error: (err: any) => {
          this.isLoading = false;
        }
      });
    }
  }
  addToCart(item: { item: ProductsModel, quantity: number }) {
    debugger;
    let checkSession: boolean;
    if (isPlatformBrowser(this.plateformId)) {
      checkSession = "cart" in sessionStorage
    } else {
      checkSession = "cart" in sessionStorage

    }
    if (checkSession) {
      debugger;
      debugger;
      let existIndex = this.cartService.cartItems().findIndex(list => list.item.id === item.item.id)
      if (existIndex >= 0) {
        debugger;
        this.cartService.updateProductSignal(item);
      } else {
        this.cartService.addProductSignal(item);
      }
    } else {
      debugger;
      this.cartService.addProductSignal(item);
    }
  }
}
