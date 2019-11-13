import {HcOptions} from '../chart/chart.component';
import {Chart} from 'highcharts';

export interface DateFilter {
  from: Date;
  to: Date;
}

export function createDateFilter(from: Date, to: Date): DateFilter {
  return {from, to};
}

export interface SensorData {
  y: number;
  x: Date;
}

export function createSensorData(y, x): SensorData {
  return {y, x};
}

export interface ChartModel {
  sensorData: Array<SensorData>;
  name: string;
  id: number;
  type: 'line' | 'bar';
  color: string;
  changes: Date;
  selectedCharts: Array<ChartModel>;
}

export function createChartModel(sensorData, name, id, type, color): ChartModel {
  return {sensorData, name, id, type, color, changes: new Date(), selectedCharts: new Array<ChartModel>()};
}
