import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AllProductsModel, DeleteProductModel } from '../store/state/allProducts.state';
import { Observable } from 'rxjs';
import { AddProductModel, ProductsModel } from '../context/DTOs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public testBrowser: boolean;

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: string) {
    this.testBrowser = isPlatformBrowser(platformId);
  }
  getProducts(filter: any): Observable<ProductsModel[]> {
    let queryParams = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        queryParams = queryParams.set(key, value);
      })
    }
    if (this.testBrowser) {
      return this.http.get<ProductsModel[]>(`${environment.baseApi}/products`, { params: queryParams });

    } else {
      return this.http.get<ProductsModel[]>(`${environment.baseApi}/products`, { params: queryParams });

    }
  }
  addProduct(mode: AddProductModel): Observable<ProductsModel> {
    if (this.testBrowser) {
      return this.http.post<ProductsModel>(`${environment.baseApi}/products`, mode);

    } else {
      return this.http.post<ProductsModel>(`${environment.baseApi}/products`, mode);

    }
  }
  deleteProduct(id: string): Observable<ProductsModel> {
    if (this.testBrowser) {
      return this.http.delete<ProductsModel>(`${environment.baseApi}/products/${id}`);

    } else {
      return this.http.delete<ProductsModel>(`${environment.baseApi}/products/${id}`);

    }
  }
  updateProduct(mode: AddProductModel, id: number): Observable<ProductsModel> {
    if (this.testBrowser) {
      return this.http.put<ProductsModel>(`${environment.baseApi}/products/${id}`, mode);

    } else {
      return this.http.put<ProductsModel>(`${environment.baseApi}/products/${id}`, mode);

    }
  }
}
