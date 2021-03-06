import {Injectable} from '@angular/core';
import {ChartModel, createChartModel, DateFilter} from '../redux/dashboard.models';
import {Chart} from 'angular-highcharts';
import * as Highcharts from 'highcharts';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  lastId = 0;

  constructor() {
  }

  generateChartData(x: number, from: Date, to: Date, name: string, type: string, color: string): ChartModel {
    const sensorDataArray: Array<{ x: Date, y: number }> = [];
    for (let i = 0; i < x; i++) {
      const randomNumber = Math.floor(Math.random() * 6);
      const randomDate = new Date(+from + Math.random() * (+to - +from));
      sensorDataArray.push({x: randomDate, y: randomNumber});
    }
    sensorDataArray.sort((a, b) => {
      return a.x.getTime() - b.x.getTime();
    });
    return createChartModel(sensorDataArray, name, this.lastId++, type, color);
  }

  refreshChart(chartModel: ChartModel, dateFilter: DateFilter, addedCharts: Array<ChartModel>) {
    const newChart = new Chart({
      chart: {type: chartModel.type},
      title: {text: 'Chart ' + chartModel.name},
      xAxis: {
        type: 'datetime',
        labels: {
          formatter() {
            return Highcharts.dateFormat('%Y %b %e.', this.value);
          }
        }
      },
    });
    /**
     * Refresh series on this one
     */
    const series = this.createSeries(chartModel.name, chartModel.type, chartModel.color, chartModel.sensorData, dateFilter);
    newChart.addSeries(series, true, true);
    /**
     * Add series if we need more
     */
    if (addedCharts) {
      addedCharts.map((c) => {
        newChart.addSeries(this.createSeries(c.name, c.type, c.color, c.sensorData, dateFilter), true, true);
      });
    }
    return newChart;
  }

  private createSeries(name, type, color, sensorData, dateFilter) {
    const series = [];
    sensorData.map((s) => {
      if (dateFilter) {
        if (dateFilter.from < s.x && dateFilter.to > s.x) {
          series.push([s.x.getTime(), s.y]);
        }
      } else {
        series.push([s.x.getTime(), s.y]);
      }
    });
    return {name, type, color, data: series};
  }
}
