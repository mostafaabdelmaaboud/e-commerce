import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-area',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  constructor() {

  }
  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: 'transparent'

      },
      title: {
        text: 'US e-Commerce Penetration',
        align: 'center'
      },
      yAxis: {
        title: {
          useHTML: false,
          text: ''
        }
      },
      tooltip: {
        shared: true,
        headerFormat: 'millions'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        series: {
          pointStart: 2015
        },
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [{
        name: 'T-shirts',
        data: [13234, 12729, 11533, 17798, 10398, 12811, 15483, 16196, 16214]
      }, {
        name: 'Dresses',
        data: [6685, 6535, 6389, 4925, 6251, 5725, 15483, 16196, 16214]

      }, {
        name: 'Jeans',
        data: [4752, 4820, 4877, 4925, 5006, 4976, 4946, 4911, 4913]
      }, {
        name: 'Sweaters',
        data: [3164, 3541, 3898, 4115, 3388, 3569, 3887, 4593, 1550]

      }, {
        name: 'Jackets',
        data: [2019, 2189, 2150, 2217, 2175, 2257, 2344, 2176, 2186]
      }]
    }
    HC_exporting(Highcharts);

  }
}
