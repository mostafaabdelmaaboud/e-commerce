import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { NgxsModule } from '@ngxs/store';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { Categores } from './store/state/categores.state';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { SharedModule } from 'src/app/shared/shared.module';
import { EllipsisPipe } from './components/categories/pipes/ellipsis.pipe';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { CategoryComponent } from './components/category/category.component';


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
