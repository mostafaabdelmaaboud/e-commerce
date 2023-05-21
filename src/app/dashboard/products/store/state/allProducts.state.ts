import { catchError, throwError } from 'rxjs';
import { tap } from 'rxjs';
import { Injectable, inject } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct, DeleteProduct, GetAllProducts, UpdateProduct } from "../actions/allProducts.actions";
import { AddProductModel, Filteration, ProductsModel } from '../../context/DTOs';
import { ProductsService } from '../../services/products.service';

export interface AllProductsModel {
  products: ProductsModel[],
  productsLoaded: boolean,
  totalItems: number
}
export interface CreateProductModel {
  addProduct: {
    id: number | null,
    title: string,
    price: string,
    category: string,
    description: string,
    image: string,
    createProductIsLoaded: boolean
  }
}
export interface DeleteProductModel {
  deleteProduct: {
    massage: string | null,
    DeleteProductIsLoaded: boolean,
    isError: string | null
  }

}
@State<AllProductsModel>({
  name: 'Products',
  defaults: {
    products: [],
    productsLoaded: false,
    totalItems: 0
  }
})

@Injectable()
export class AllProductsState {
  productsData: Filteration | null = null;
  @Selector()
  static allProducts(state: AllProductsModel) {
    return state.products;
  }
  @Selector()
  static totalItems(state: AllProductsModel) {
    return state.totalItems;
  }
  @Selector()
  static productsLoaded(state: AllProductsModel) {
    return state.productsLoaded;
  }

  @Selector()
  static addProductIsLoaded(state: CreateProductModel) {
    return state.addProduct.createProductIsLoaded;
  }

  @Selector()
  static massageDeleteTaks(state: DeleteProductModel) {
    return state.deleteProduct.massage;
  }
  private productsService = inject(ProductsService);
  constructor() { }
  @Action(GetAllProducts)
  getAllProducts({ patchState }: StateContext<AllProductsModel>, { payload }: GetAllProducts) {

    // this.ProductsData = payload;
    if (payload) {
      this.productsData = payload;
    } else if (this.productsData != null) {
      this.productsData = this.productsData
    } else {
      this.productsData = null
    }
    return this.productsService.getProducts(this.productsData).pipe(
      tap((res: any) => {
        patchState({
          products: res,
          productsLoaded: true,
          totalItems: res.length
        })
      }),
      catchError(err => {
        patchState({
          products: [],
          productsLoaded: false,
          totalItems: 0
        });
        return throwError(() => err);
      })
    )
  }
  @Action(AddProduct)
  addProduct({ patchState, dispatch, getState }: StateContext<AllProductsModel>, { payload }: AddProduct) {
    debugger;
    return this.productsService.addProduct(payload).pipe(
      tap((res: any) => {
        debugger;
        patchState({
          products: [
            res,
            ...getState().products

          ]
        });
      }),
      catchError(err => {
        patchState({

        });
        return throwError(() => err);
      })
    )
  }
  @Action(UpdateProduct)
  updateProduct({ patchState, dispatch, getState }: StateContext<AllProductsModel>, { payload, id }: UpdateProduct) {
    return this.productsService.updateProduct(payload, id).pipe(
      tap((res: any) => {
        let indexItem = getState().products.findIndex((item: any) => {
          return item.id === res.id
        });
        let state = getState();
        let ojectOfIndex: any = state.products[indexItem];
        Object.entries(res).forEach(([key, value]: string | any) => {
          ojectOfIndex[key] = value;
        })
        state.products[indexItem] = ojectOfIndex;
        patchState({
          products: [...state.products]
        });
      }),
      catchError(err => {
        patchState({
          products: []
        });
        return throwError(() => err);
      })
    )
  }
  @Action(DeleteProduct)
  deleteProduct({ patchState, dispatch, getState }: StateContext<AllProductsModel>, { id }: DeleteProduct) {
    return this.productsService.deleteProduct(id).pipe(
      tap((res: any) => {
        let indexItem = getState().products.findIndex((item: any) => {
          return item.id === res.id
        });
        let state = getState();
        state.products.splice(indexItem, 1);
        patchState({
          products: [...state.products]
        });
      }),
      catchError(err => {
        patchState({
          products: []
        })
        return throwError(() => err)
      })

    )
  }

}
