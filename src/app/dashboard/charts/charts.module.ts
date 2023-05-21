import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './components/charts/charts.component';
import { AreaComponent } from './components/widgets/area/area.component';
import { MatCardModule } from '@angular/material/card';
import { CardComponent } from './components/widgets/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { NgxsModule } from '@ngxs/store';
import { AllProductsState } from '../products/store/state/allProducts.state';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PieComponent } from './components/widgets/pie/pie.component';


@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    AreaComponent,
    MatCardModule,
    CardComponent,
    SharedModule,
    MatTableModule,
    NgxsModule.forFeature([AllProductsState]),
    MatProgressSpinnerModule,
    MatPaginatorModule,
    PieComponent
  ]
})
export class ChartsModule { }
