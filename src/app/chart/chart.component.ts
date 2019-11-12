import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartModel, createDateFilter, DateFilter} from '../redux/dashboard.models';
import {ChartGeneratorService} from '../services/chart-generator.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../redux/dashboard.reducer';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';

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

export enum colors {
  red = 'red',
  green = 'green',
  blue = 'blue',
  yellow = 'yellow',
  black = 'black'
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
  private color: string;

  get chartData(): ChartModel {
    return this._chartData;
  }

  @Input()
  set chartData(value: ChartModel) {
    console.log('new chartData');
    this.chartObject = this.chartGen.refreshChart(value, this._dateFilter);
    this._chartData = value;
  }

  get dateFilter(): DateFilter {
    return this._dateFilter;
  }

  @Input()
  set dateFilter(value: DateFilter) {
    console.log('dateFilter changed in chart :');
    console.log(value);
    this.chartObject = this.chartGen.refreshChart(this._chartData, createDateFilter(value.from, value.to));
    this._dateFilter = value;
  }

  constructor(private chartGen: ChartGeneratorService, private store: Store<fromStore.AppState>) {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes on chart: ');
    console.log(this._chartData);
    this.chartObject = this.chartGen.refreshChart(this._chartData, this._dateFilter);
  }

  changeColor() {
    const rand = Math.floor(Math.random() * Object.keys(colors).length);
    let newColor = colors[Object.keys(colors)[rand]];
    if (this._chartData.color === newColor) {
      newColor = 'purple';
    }
    this.store.dispatch({
      type: DashBoardActionsEnum.changeChartColor,
      id: this._chartData.id,
      color: newColor
    });
  }

  changeType() {
    this.store.dispatch({
      type: DashBoardActionsEnum.changeChartType,
      id: this._chartData.id,
      chartType: this._chartData.type === 'line' ? 'bar' : 'line'
    });
  }
}
