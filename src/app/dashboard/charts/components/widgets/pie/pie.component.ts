import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-widgets-pie',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};
  isHighcharts = typeof Highcharts === 'object';

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'pie',
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: [25, 0, 0, 0]
      },
      exporting: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      title: {
        text: 'Mobile vendor market share, 2023'
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      series: [{
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
          ['Samsung', 27.79, true, true],
          ['Apple', 27.34, false],
          ['Xiaomi', 10.87, false],
          ['Huawei', 8.48, false],
          ['Oppo', 5.38, false],
          ['Vivo', 4.17, false],
          ['Realme', 2.57, false],
          ['Unknown', 2.45, false],
          ['Motorola', 2.22, false],
          ['LG', 1.53, false],
          ['Other', 7.2, false]
        ],
        showInLegend: true
      }]
    }
  }
}
