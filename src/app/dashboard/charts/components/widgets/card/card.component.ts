import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [CommonModule, HighchartsChartModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() label!: string;
  @Input() total!: string;
  @Input() precentage!: string;

  highcharts: typeof Highcharts = Highcharts;
  chartOptions: any = {};

  constructor() {

  }
  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60

      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      tooltip: {
        split: true,
        outside: true
      },
      legend: {
        enabled: false

      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      xAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      yAxis: {
        labels: {
          enabled: false
        },
        title: {
          text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      series: [{
        data: [71, 78, 39, 66, 69, 80, 95]
      }]
    }
    HC_exporting(this.highcharts);
  }
}
