import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { NgxsModule } from '@ngxs/store';
import { NgxPaginationModule } from 'ngx-pagination';
import { Categores } from './store/state/categores.state';
import { SharedModule } from 'src/app/shared/shared.module';
import { EllipsisPipe } from './components/categories/pipes/ellipsis.pipe';
import { CategoryComponent } from './components/category/category.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CategoriesComponent,
    EllipsisPipe,
    CategoryComponent
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
