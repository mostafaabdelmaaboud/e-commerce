import { NgxsModule } from '@ngxs/store';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AllProductsComponent } from './all-products.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AllProductsComponent', () => {
  let component: AllProductsComponent;
  let fixture: ComponentFixture<AllProductsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule.withRoutes([]),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
            deps: [HttpClient]
          }
        }),
        HttpClientModule
      ],
      declarations: [
        AllProductsComponent
      ],
      providers: [NgxsModule.forRoot([])]
    })
      .compileComponents();
  }));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllProductsComponent],
      imports: [],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { invoice: { providers: [] } },
        },

        {
          provide: FormBuilder,
        },
        {
          provide: HttpClient,
        },
        {
          provide: HttpHandler,
        },

      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(AllProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
