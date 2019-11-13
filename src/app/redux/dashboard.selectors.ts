import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DashboardState} from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>('dashboard');

export const selectDashboardCharts = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.charts
);
