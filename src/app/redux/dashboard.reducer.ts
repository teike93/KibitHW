import {Action, createReducer, on} from '@ngrx/store';
import * as DashBoardActions from './dashboard.actions';
import {ChartModel, createDateFilter, DateFilter} from './dashboard.models';

export interface State {
  charts: Array<ChartModel>;
  dateFilter: DateFilter;
}

export const initialState: State = {
  charts: [],
  dateFilter: createDateFilter(new Date('1800-01-01'), new Date('2100-01-01'))
};

const scoreboardReducer = createReducer(
  initialState,
  on(DashBoardActions.addChartData, state => ({...state})),
  on(DashBoardActions.addChartDataSuccess, state => ({...state})),
  on(DashBoardActions.modifyFilterDate, (state, {from, to}) => ({...state, dateFilter: createDateFilter(from, to)})),
  on(DashBoardActions.removeChartData, state => ({...state}))
);

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action);
}
