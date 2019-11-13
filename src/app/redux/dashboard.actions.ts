import {createAction, props} from '@ngrx/store';
import {ChartModel} from './dashboard.models';

export enum DashBoardActionsEnum {
  addChartData = '[Dashboard] add chart data',
  addChartDataSuccess = '[Dashboard] add chart data success',
  removeChart = '[Dashboard] remove chart data',
  modifyFilterDate = '[Dashboard] modify date filter',
  changeChartColor = '[Dashboard] change chart color',
  changeChartType = '[Dashboard] change chart type',
  addChartSelected = '[Dashboard] add selected charts',
  dashBoardError = '[Dashboard] - Error'
}

export const addChartData = createAction(
  DashBoardActionsEnum.addChartData,
  props<{ name }>()
);

export const addChartDataSuccess = createAction(
  DashBoardActionsEnum.addChartDataSuccess,
  props<{ chart: ChartModel }>()
);

export const changeChartColor = createAction(
  DashBoardActionsEnum.changeChartColor,
  props<{ id: number, color: string }>()
);

export const changeChartType = createAction(
  DashBoardActionsEnum.changeChartType,
  props<{ id: number, chartType: 'bar' | 'line' }>()
);

export const removeChartData = createAction(
  DashBoardActionsEnum.removeChart
);

export const modifyFilterDate = createAction(
  DashBoardActionsEnum.modifyFilterDate,
  props<{ from: Date; to: Date }>()
);

export const addSelectedCharts = createAction(
  DashBoardActionsEnum.addChartSelected,
  props<{ id, selectedCharts: Array<ChartModel> }>()
);

export const ErrorDashboardAction = createAction(DashBoardActionsEnum.dashBoardError, props<({ error: Error })>());


