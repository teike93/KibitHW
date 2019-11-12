import {Component, Input, OnInit} from '@angular/core';
import {ChartModel} from '../redux/dashboard.models';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  @Input() chart: ChartModel;
  constructor() { }

  ngOnInit() {
  }

}
