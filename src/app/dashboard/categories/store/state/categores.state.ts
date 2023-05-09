import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { CategoriesModel } from "../../context/DTOs";
import { CategorieUserService } from '../../services/categores.service';
import { GetAllProducts, GetCategorieUser, GetProductsByCategory } from "../actions/categores.actions";
import { catchError, tap, throwError } from 'rxjs';
import { ProductsModel } from 'src/app/dashboard/products/context/DTOs';
export interface AllProductsModel {
  products: ProductsModel[],
  productsLoaded: boolean,
  selectedProduct: string;
  totalItems: number
}
export interface AllCategoriesModel {
  categories: string[],
  categoriesLoaded: boolean
}
@State<AllCategoriesModel>({
  name: "UserCategories",
  defaults: {
    categories: [],
    categoriesLoaded: false
  }
})
@State<AllProductsModel>({
  name: 'Products',
  defaults: {
    products: [],
    selectedProduct: "all",
    productsLoaded: false,
    totalItems: 0
  }
})
@Injectable()

export class Categores {
  private categorieUserService = inject(CategorieUserService);
  @Selector()
  static allProducts(state: AllProductsModel) {
    return state.products;
  }
  @Selector()
  static categoriesLoaded(state: AllCategoriesModel) {
    return state.categoriesLoaded;
  }
  @Selector()
  static selectedProduct(state: AllProductsModel) {
    return state.selectedProduct;
  }

  @Selector()
  static categories(state: AllCategoriesModel) {
    return state.categories;
  }
  @Selector()
  static productsLoaded(state: AllProductsModel) {
    return state.productsLoaded;
  }
  constructor() { }
  @Action(GetAllProducts)
  getAllProducts({ patchState }: StateContext<AllProductsModel>) {
    return this.categorieUserService.getProducts().pipe(
      tap(res => {
        patchState({
          products: res,
          productsLoaded: true,
          selectedProduct: "all",

          totalItems: res.length
        })
      }),
      catchError(err => {
        patchState({
          products: [],
          productsLoaded: false,
          selectedProduct: "all",
          totalItems: 0
        });
        return throwError(() => err);
      })
    )
  }
  @Action(GetCategorieUser)
  getCategoriesUser({ patchState }: StateContext<AllCategoriesModel>) {
    return this.categorieUserService.getCategorieUser().pipe(
      tap(res => {
        patchState({
          categories: res,
          categoriesLoaded: true
        })
      }),
      catchError(err => {
        patchState({
          categories: [],
          categoriesLoaded: false
        })
        return throwError(() => err)
      })
    )
  }
  @Action(GetProductsByCategory)
  getProductsByCategory({ patchState }: StateContext<AllProductsModel>, { nameCategory }: GetProductsByCategory) {
    return this.categorieUserService.getProductsByCategory(nameCategory).pipe(
      tap(res => {
        patchState({
          products: res,
          productsLoaded: true,
          selectedProduct: nameCategory
        })
      }),
      catchError(err => {
        patchState({
          products: [],
          productsLoaded: false,
        })
        return throwError(() => err)
      })
    )
  }

}
