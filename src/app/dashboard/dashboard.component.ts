import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ChartModel} from '../redux/dashboard.models';
import {Observable} from 'rxjs';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';
import {tap} from 'rxjs/operators';
import {selectDashboard, State} from '../redux/dashboard.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  charts: Observable<State>;
  constructor(private store: Store<{ dashBoard: State }>) {
    console.log(store);
    this.charts = store.pipe(select(state => state.dashBoard));
  }

  ngOnInit() {
    this.store.dispatch({type: DashBoardActionsEnum.addChartData, name: 'lol'});
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes on component: dashb ');
    console.log(changes);
  }

}
