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
@State<CreateProductModel>({
  name: 'AddProduct',
  defaults: {
    addProduct: {
      id: null,
      title: "",
      price: "",
      category: "",
      description: "",
      image: "",
      createProductIsLoaded: false
    }
  }
})
@State<DeleteProductModel>({
  name: 'DeleteProduct',
  defaults: {
    deleteProduct: {
      massage: null,
      DeleteProductIsLoaded: false,
      isError: null
    }
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
      tap(res => {
        debugger;
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
    console.log("payload", payload);

    return this.productsService.addProduct(payload).pipe(
      tap(res => {
        debugger;
        patchState({
          products: [
            ...getState().products,
            res
          ]
        });
        // dispatch(new GetAllProducts(this.productsData));
      }),
      catchError(err => {
        patchState({

        });
        return throwError(() => err);
      })
    )
  }
  @Action(UpdateProduct)
  updateProduct({ patchState, dispatch, getState }: StateContext<CreateProductModel>, { payload, id }: UpdateProduct) {
    patchState({
      addProduct: {
        ...getState().addProduct,
        createProductIsLoaded: true
      }
    });
    debugger;
    return this.productsService.updateProduct(payload, id).pipe(
      tap(res => {
        debugger;
        patchState({
          addProduct: {
            ...res,
            createProductIsLoaded: false
          }

        });
        dispatch(new GetAllProducts(this.productsData));
      }),
      catchError(err => {
        patchState({
          addProduct: {
            id: null,
            title: "",
            price: "",
            category: "",
            description: "",
            image: "",
            createProductIsLoaded: false
          }
        });
        return throwError(() => err);
      })
    )
  }
  @Action(DeleteProduct)
  deleteProduct({ patchState, dispatch, getState }: StateContext<DeleteProductModel>, { id }: DeleteProduct) {
    debugger;
    patchState({
      deleteProduct: {
        ...getState().deleteProduct,

        DeleteProductIsLoaded: true

      }
    })
    return this.productsService.deleteProduct(id).pipe(
      tap(res => {
        debugger;

        patchState({
          deleteProduct: {
            massage: res.massage,
            DeleteProductIsLoaded: false,
            isError: null
          }

        });
        debugger;
        dispatch(new GetAllProducts(this.productsData));

      }),
      catchError(err => {

        patchState({
          deleteProduct: {
            massage: null,
            DeleteProductIsLoaded: false,
            isError: err
          }

        })
        return throwError(() => err)
      })

    )
  }

}
