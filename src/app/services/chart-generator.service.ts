import {Injectable} from '@angular/core';
import {ChartModel, createChartModel, createSensorData} from '../redux/dashboard.models';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  lastId = 0;

  constructor() {
  }


  generateChart(x: number, from: Date, to: Date, name: string): ChartModel {
    const sensorDataArray = [];
    for (let i = 0; i < x; i++) {
      const randomNumber = Math.floor(Math.random() * 6);
      const randomDate = new Date(+from + Math.random() * (+to - +from));
      sensorDataArray.push({date: randomDate, y: randomNumber});
    }
    return createChartModel(sensorDataArray, name, this.lastId++);
  }
}
