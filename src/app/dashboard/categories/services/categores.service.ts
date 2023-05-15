import { Injectable, inject } from '@angular/core';
import { FilterCategoriesModel } from '../context/DTOs';
import { Observable } from 'rxjs';
import { AllCategoriesModel } from '../store/state/categores.state';
import { environment } from 'src/environments/environment';
import { ProductsModel } from '../../products/context/DTOs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategorieUserService {
  private http = inject(HttpClient);
  constructor() { }
  getCategorieUser(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseApi}/products/categories`);
  }
  getProducts(): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>(`${environment.baseApi}/products`);
  }
  getProductsByCategory(name: string): Observable<ProductsModel[]> {
    return this.http.get<ProductsModel[]>(`${environment.baseApi}/products/category/${name}`);
  }
}
