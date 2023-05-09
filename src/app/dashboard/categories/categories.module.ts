import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatCardModule } from '@angular/material/card';
import { NgxsModule } from '@ngxs/store';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Categores } from './store/state/categores.state';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/shared/shared.module';
import { EllipsisPipe } from './components/categories/pipes/ellipsis.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CategoriesComponent,
    EllipsisPipe
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    MatCardModule,
    NgxsModule.forFeature([Categores]),
    MatButtonModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatSelectModule,
    MatTooltipModule
  ]
})
export class CategoriesModule { }
