import {createAction, props} from '@ngrx/store';
import {ChartModel} from './dashboard.models';

export enum DashBoardActionsEnum {
  addChartData = '[Dashboard] add chart data',
  addChartDataSuccess = '[Dashboard] add chart data success',
  removeChart = '[Dashboard] remove chart data',
  modifyFilterDate = '[Dashboard] modify date filter'
}
export const addChartData = createAction(
  DashBoardActionsEnum.addChartData,
  props<{ name }>()
);

export const addChartDataSuccess = createAction(
  DashBoardActionsEnum.addChartDataSuccess,
  props<{ chart: ChartModel }>()
);

export const removeChartData = createAction(
  DashBoardActionsEnum.removeChart
);

export const modifyFilterDate = createAction(
  DashBoardActionsEnum.modifyFilterDate,
  props<{ from: Date; to: Date }>()
);

