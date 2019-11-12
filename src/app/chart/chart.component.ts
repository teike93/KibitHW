import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartModel, createDateFilter, DateFilter} from '../redux/dashboard.models';
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
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ChartComponent implements OnInit, OnChanges {

  private chartObject;
  private _chartData: ChartModel;
  private _dateFilter: DateFilter;

  get chartData(): ChartModel {
    return this._chartData;
  }
  @Input('chart')
  set chartData(value: ChartModel) {
    this.chartObject = this.chartGen.refreshChart(value, null);
    this._chartData = value;
  }

  get dateFilter(): DateFilter {
    return this._dateFilter;
  }

  @Input('dateFilter')
  set dateFilter(value: DateFilter) {
    console.log('dateFilter changed in chart :')
    console.log(value)
    this.chartObject = this.chartGen.refreshChart(this._chartData, createDateFilter(value.from, value.to));
    this._dateFilter = value;
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
