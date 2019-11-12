import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartModel, createDateFilter} from '../redux/dashboard.models';
import {Chart} from 'angular-highcharts';
import {ChartGeneratorService} from '../services/chart-generator.service';

export interface SeriesObject {
  name: string;
  type: string;
  data: Array<{ y: number, name: string }>;
}

export interface HcOptions {
  chart: { type: string };
  title: { text: string };
  series: Array<SeriesObject>;
}

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  private chartObject;
  private _chartData: ChartModel;

  get chartData(): ChartModel {
    return this._chartData;
  }

  @Input('chart')
  set chartData(value: ChartModel) {
    this.chartObject = this.chartGen.refreshChart(value, createDateFilter(new Date('1999-01-01'), new Date('2020-01-01')));
    this._chartData = value;
  }

  constructor(private chartGen: ChartGeneratorService) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes on chart: ');
    console.log(changes);
  }
}
