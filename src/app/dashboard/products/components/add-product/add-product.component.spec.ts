import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { AddProductComponent } from './add-product.component';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TextFieldModule } from '@angular/cdk/text-field';

describe('AddProductComponent', () => {
  let component: AddProductComponent;
  let fixture: ComponentFixture<AddProductComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
            deps: [HttpClient]
          }
        }),
        NgxsModule.forRoot(),
        ToastrModule.forRoot(),
        HttpClientModule
      ],
      declarations: [
        AddProductComponent
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [
        RouterTestingModule, MatDialogModule, NgxsModule.forRoot(),
        ToastrModule.forRoot(),
        TextFieldModule
      ],
      providers: [MatDialog, FormBuilder, { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
    });

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
