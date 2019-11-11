import {createAction, props} from '@ngrx/store';

export enum dashBoardActions {
  addChart = '[Dashboard] add chart data',
  addChartSuccess = '[Dashboard] add chart data success',
  removeChart = '[Dashboard] remove chart data',
  modifyFilterDate = '[Dashboard] modify date filter'
}
export const addChartData = createAction(
  dashBoardActions.addChart
);

export const addChartDataSuccess = createAction(
  dashBoardActions.addChartSuccess
);

export const removeChartData = createAction(
  dashBoardActions.removeChart
);

export const modifyFilterDate = createAction(
  dashBoardActions.modifyFilterDate,
  props<{ from: Date; to: Date }>()
);

