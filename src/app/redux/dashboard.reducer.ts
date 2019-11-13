import {Action, ActionReducerMap, createReducer, on} from '@ngrx/store';
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

const dashboardReducer = createReducer(
  initialState,
  on(DashBoardActions.addChartData, (state) => ({...state})),
  on(DashBoardActions.addChartDataSuccess, (state, {chart}) => {
    return {...state, charts: [...state.charts, chart]};
  }),
  on(DashBoardActions.modifyFilterDate, (state, {from, to}) => {

    return ({...state, dateFilter: createDateFilter(from, to)});
  }),
  on(DashBoardActions.removeChartData, state => {
    return ({...state, charts: state.charts.slice(1)});
  }),
  on(DashBoardActions.changeChartColor, (state, {id, color}) => {
    const workState = {...state};
    workState.charts.map((c) => {
      if (c.id === id) {
        c.color = color;
        c.changes = new Date();
      }
      return {...c};
    });
    return {...workState, charts: [...workState.charts]};
  }),
  on(DashBoardActions.changeChartType, (state, {id, chartType}) => {
    const workState = {...state};
    workState.charts.map((c) => {
      if (c.id === id) {
        c.type = chartType;
        c.changes = new Date();
      }
      return {...c};
    });
    return {...workState, charts: [...workState.charts]};
  }),
  on(DashBoardActions.addSelectedCharts, (state, {id, selectedCharts}) => {
    const workState = {...state};
    workState.charts.map((c) => {
      if (c.id === id) {
        c.selectedCharts = selectedCharts;
        c.changes = new Date();
      }
      return {...c};
    });
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
