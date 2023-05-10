import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { catchError, throwError } from 'rxjs';
import { HandleErrorService } from 'src/app/services/handle-error.service';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';

describe('ProductsService', () => {
  let service: ProductsService;
  let handleError: HandleErrorService
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler, HandleErrorService],
      imports: [HttpClientTestingModule, NgxsModule.forRoot(), ToastrModule.forRoot()]
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    handleError = TestBed.inject(HandleErrorService);
  });

  it('#getProducts() get All Products', () => {
    handleError = TestBed.inject(HandleErrorService);

    let resProducts = {
      category: "men's clothing",
      description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      id: 1,
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      price: 109.95,
      rating: { rate: 3.9, count: 120 },
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    }
    const url = 'https://fakestoreapi.com/products';
    // const req = httpMock.expectOne(url);
    // req.flush('Get');
    // httpMock.verify()
    // service.getProducts({}).subscribe(res => {
    //   // expect(Object.keys(res[0])).toContain("id");
    //   // expect(Object.keys(res[0])).toContain("title");
    //   // expect(Object.keys(res[0])).toContain("price");
    //   // expect(Object.keys(res[0])).toContain("category");
    //   // expect(Object.keys(res[0])).toContain("description");
    //   // expect(Object.keys(res[0])).toContain("image");
    //   expect(res[0] as any).toEqual(resProducts)
    // });
    // expect(service).toBeTruthy();
  });
});
