import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AllProductsModel, CreateProductModel, DeleteProductModel } from '../store/state/allProducts.state';
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
    debugger;
    return this.http.post<ProductsModel>(`${environment.baseApi}/products`, mode);
  }
  deleteProduct(id: string): Observable<DeleteProductModel["deleteProduct"]> {
    return this.http.delete<DeleteProductModel["deleteProduct"]>(`${environment.baseApi}/tasks/delete-task/${id}`);
  }
  updateProduct(mode: AddProductModel, id: number): Observable<CreateProductModel["addProduct"]> {
    debugger;
    return this.http.put<CreateProductModel["addProduct"]>(`${environment.baseApi}/products/${id}`, mode);
  }
}
