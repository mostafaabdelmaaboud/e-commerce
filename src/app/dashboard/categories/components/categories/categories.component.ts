import { ProductsModel } from './../../../products/context/DTOs';
import { Component, OnInit, inject } from '@angular/core';
import { GetAllProducts, GetCategorieUser, GetProductsByCategory } from '../../store/actions/categores.actions';
import { Categores } from '../../store/state/categores.state';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CategoriesModel, FilterCategoriesModel, UserData } from '../../context/DTOs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

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
  selectedCategory: string = "all";
  public translate = inject(TranslateService);
  cartProducts: { item: ProductsModel, quantity: number }[] = [];
  baseApi = environment.baseApi;
  private store = inject(Store);
  isLoading = true;
  totalItems: number = 0;
  filteration: FilterCategoriesModel = {
    page: 1,
  };
  constructor() { }
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
    if ("cart" in localStorage) {
      debugger;
      this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
      let existIndex = this.cartProducts.findIndex(list => list.item.id === item.item.id);
      debugger;
      if (existIndex >= 0) {
        debugger;
        if (this.cartProducts[existIndex].quantity != item.quantity) {
          debugger;
          this.cartProducts[existIndex].quantity = item.quantity;
        }
        debugger;
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      } else {
        debugger;
        this.cartProducts.push(item);
        debugger;
        localStorage.setItem("cart", JSON.stringify(this.cartProducts));
      }
    } else {
      debugger;
      this.cartProducts.push(item);
      localStorage.setItem("cart", JSON.stringify(this.cartProducts));
    }
  }
}
