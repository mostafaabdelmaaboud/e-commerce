import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AllProductsModel, DeleteProductModel } from '../store/state/allProducts.state';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddProductModel, ProductsModel } from '../context/DTOs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }
  getProducts(filter: any): Observable<ProductsModel[]> {
    let queryParams = new HttpParams();
    if (filter) {
      Object.entries(filter).forEach(([key, value]: any) => {
        queryParams = queryParams.set(key, value);
      })
    }
    return this.http.get<ProductsModel[]>(`${environment.baseApi}/products`, { params: queryParams });
  }
  addProduct(mode: AddProductModel): Observable<ProductsModel> {
    return this.http.post<ProductsModel>(`${environment.baseApi}/products`, mode);
  }
  deleteProduct(id: string): Observable<ProductsModel> {
    return this.http.delete<ProductsModel>(`${environment.baseApi}/products/${id}`);
  }
  updateProduct(mode: AddProductModel, id: number): Observable<ProductsModel> {
    return this.http.put<ProductsModel>(`${environment.baseApi}/products/${id}`, mode);
  }
}
