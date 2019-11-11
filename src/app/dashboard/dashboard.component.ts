import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import {ChartModel} from '../redux/dashboard.models';
import {Observable} from 'rxjs';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  // @ts-ignore
  charts$: Observable = this.store.select(state => state.charts);

  constructor(private store: Store<{ charts: ChartModel[] }>) {
  }

  ngOnInit() {
    this.store.dispatch({ type: DashBoardActionsEnum.addChartData, name: 'lol' });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
