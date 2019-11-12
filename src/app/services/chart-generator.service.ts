import {Injectable} from '@angular/core';
import {ChartModel, createChartModel, createSensorData, SensorData} from '../redux/dashboard.models';
import {SeriesObject} from '../chart/chart.component';
import {Chart} from 'angular-highcharts';
import * as Highcharts from 'highcharts';
import {Options, Point} from 'highcharts';
import {DataOptions} from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  lastId = 0;

  constructor() {
  }

  // getSeries(name: string, type: string, sensorData: Array<DataOptions>): ChartSerie  {
  //   const seriesArray = [];
  //   return {
  //     name, type, data: sensorData.map(value => {
  //       return {y: value.y, name: value.date.toDateString()};
  //     })
  //   };

  // }

  generateChartData(x: number, from: Date, to: Date, name: string, type: string, color: string): ChartModel {
    const sensorDataArray = [];
    for (let i = 0; i < x; i++) {
      const randomNumber = Math.floor(Math.random() * 6);
      const randomDate = new Date(+from + Math.random() * (+to - +from));
      sensorDataArray.push({x: randomDate, y: randomNumber});
    }
    // const formattedChart = new Chart({
    //   chart: {type: 'line'},
    //   title: {text: 'Chart ' + name},
    //   // series: {name: name, type: 'line', data: sensorDataArray}
    // });
    // formattedChart.addPoint(sensorDataArray[0].x, sensorDataArray[0].y);
    return createChartModel(sensorDataArray, name, this.lastId++, type, color);
  }

  createChart(chartModel: ChartModel) {
    const newChart = new Chart({
      chart: {type: chartModel.type},
      title: {text: 'Chart ' + chartModel.name},
      // tooltip: {
      //   formatter() {
      //     return 'x: ' + Highcharts.dateFormat('%e %b %y %H:%M:%S', this.x) +
      //       'y: ' + this.y.toFixed(2);
      //   }
      // },
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%Y', this.value);
          }
        }
      },
      series: [{
        name: chartModel.name,
        type: chartModel.type === 'bar' ? 'bar' : 'line',
        data: [[0, 0]],
        color: chartModel.color
      }]
    });

    chartModel.sensorData.map(value => {
      newChart.addPoint([value.x.getTime(), value.y]);
      return value;
    });

    return newChart;
  }
}
