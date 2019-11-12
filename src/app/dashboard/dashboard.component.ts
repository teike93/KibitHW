import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import {ChartModel, DateFilter} from '../redux/dashboard.models';
import {Subject} from 'rxjs';
import {DashBoardActionsEnum} from '../redux/dashboard.actions';
import {takeUntil} from 'rxjs/operators';
import * as fromStore from '../redux/dashboard.reducer';
import {selectDashboardCharts} from '../redux/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
  charts: Array<ChartModel>;
  dateFilter: DateFilter;
  chartName: string;
  private destroy$ = new Subject();

  constructor(private store: Store<fromStore.AppState>, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.store.select(selectDashboardCharts).pipe(takeUntil(this.destroy$)).subscribe(value => {
      this.charts = value; this.changeDetector.detectChanges();
    });
    this.store.select(state => state.dashboard.dateFilter).pipe(takeUntil(this.destroy$)).subscribe(value => this.dateFilter = value);
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  addChart(): void {
    this.store.dispatch({type: DashBoardActionsEnum.addChartData, name: this.chartName ? this.chartName : 'Unnamed'});
  }

  removeChart(): void {
    this.store.dispatch({type: DashBoardActionsEnum.removeChart});
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  trackByChanges(index, chart) {
    return chart.changes;
  }
}
