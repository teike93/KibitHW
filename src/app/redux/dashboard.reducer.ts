import {Action, ActionReducerMap, createReducer, createSelector, on} from '@ngrx/store';
import * as DashBoardActions from './dashboard.actions';
import {ChartModel, createDateFilter, DateFilter} from './dashboard.models';

export interface AppState {
  dashboard: DashboardState;
}

export interface DashboardState {
  charts: Array<ChartModel>;
  dateFilter: DateFilter;
}

export const initialState: DashboardState = {
  charts: new Array<ChartModel>(),
  dateFilter: createDateFilter(new Date('1800-01-01'), new Date('2100-01-01'))
};
export const dashboardFeatureKey = 'dashboard';

const dashboardReducer = createReducer(
  initialState,
  on(DashBoardActions.addChartData, (state) => ({...state})),
  on(DashBoardActions.addChartDataSuccess, (state, {chart}) => {
    console.log('SUCCESS DATA');
    console.log(state);
    console.log({...state, charts: [...state.charts, chart]});
    console.log('..............');
    return {...state, charts: [...state.charts, chart]};
  }),
  on(DashBoardActions.modifyFilterDate, (state, {from, to}) => {
    console.log('MODIFY HAPPENED');
    console.log(from);
    console.log(to);
    console.log('...............');
    return ({...state, dateFilter: createDateFilter(from, to)});
  }),
  on(DashBoardActions.removeChartData, state => {
    console.log('REMOVE HAPPENED');
    console.log([...state.charts]);
    console.log(state.charts.slice(1));
    console.log('..............');
    return ({...state, charts: state.charts.slice(1)});
  }),
  on(DashBoardActions.changeChartColor, (state, {id, color}) => {
    const workState = {...state};
    console.log('Change color happened');
    workState.charts.map((c) => {
      if (c.id === id) {
        c.color = color;
        c.changes = new Date();
      }
      return {...c};
    });
    console.log(workState);
    console.log('.....................');
    return {...workState, charts: [...workState.charts]};
  }),
  on(DashBoardActions.changeChartType, (state, {id, chartType}) => {
    const workState = {...state};
    console.log('Change type happened');
    workState.charts.map((c) => {
      if (c.id === id) {
        c.type = chartType;
        c.changes = new Date();
      }
      return {...c};
    });
    console.log(workState);
    console.log('.....................');
    return {...workState, charts: [...workState.charts]};
  })
);

export const selectDashboard = (state: AppState) => state.dashboard;

export function reducer(state: DashboardState | undefined, action: Action) {
  return dashboardReducer(state, action);
}

export const reducers: ActionReducerMap<AppState> = {
  dashboard: reducer
};
