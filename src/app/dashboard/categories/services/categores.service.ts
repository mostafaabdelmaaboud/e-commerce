import { Inject, Injectable, PLATFORM_ID, inject } from '@angular/core';
import { FilterCategoriesModel } from '../context/DTOs';
import { Observable } from 'rxjs';
import { AllCategoriesModel } from '../store/state/categores.state';
import { environment } from 'src/environments/environment';
import { ProductsModel } from '../../products/context/DTOs';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CategorieUserService {
  private http = inject(HttpClient);
  public testBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.testBrowser = isPlatformBrowser(platformId);
  }

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
