export interface DateFilter {
  from: Date;
  to: Date;
}

export function createDateFilter(from: Date, to: Date): DateFilter {
  return {from, to};
}

export interface SensorData {
  y: number;
  date: Date;
}

export function createSensorData(y, date): SensorData {
  return {y, date};
}

export interface ChartModel {
  sensorData: Array<SensorData>;
  name: string;
  id: number;
}

export function createChartModel(sensorData, name, id): ChartModel {
  return {sensorData, name, id};
}
