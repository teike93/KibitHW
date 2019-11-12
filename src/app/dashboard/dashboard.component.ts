import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ChartModel, DateFilter} from '../redux/dashboard.models';
import {Observable} from 'rxjs';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';
import {map, mergeMap, tap} from 'rxjs/operators';
import {AppState, selectDashboard} from '../redux/dashboard.reducer';
import * as fromStore from '../redux/dashboard.reducer';
import {selectDashboardCharts} from '../redux/dashboard.selectors';
import {HcOptions} from '../chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  charts: Observable<Array<ChartModel>>;
  dateFilter: Observable<DateFilter>;

  constructor(private store: Store<fromStore.AppState>) {
    console.log(store);
    this.charts = store.select(selectDashboardCharts).pipe(map(value => {
      console.log(value);
      return value;
    }));
    this.dateFilter = store.select(state => state.dashboard.dateFilter);
  }

  ngOnInit() {
    this.store.dispatch({type: DashBoardActionsEnum.addChartData, name: 'lol'});
    this.store.dispatch({type: DashBoardActionsEnum.addChartData, name: 'lol2'});
    this.store.dispatch({type: DashBoardActionsEnum.modifyFilterDate, from: new Date(), to: new Date()});
    // this.store.dispatch({type: DashBoardActionsEnum.removeChart});
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes on component: dashb ');
    console.log(changes);
  }

}
