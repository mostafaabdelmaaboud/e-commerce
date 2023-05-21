import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule, TransferState } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { translateBrowserLoaderFactory } from './loaders/translate-browser.loader';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: translateBrowserLoaderFactory,
        deps: [HttpClient, TransferState]
      }
    })

  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TranslateModule,
    MatButtonModule

  ]
})
export class SharedModule { }
