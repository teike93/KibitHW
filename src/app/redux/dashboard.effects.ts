import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import {ChartGeneratorService} from '../services/chart-generator.service';

@Injectable()
export class DashboardEffects {

  // loadMovies$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Movies Page] Load Movies'),
  //   mergeMap(() => this.moviesService.getAll()
  //     .pipe(
  //       map(movies => ({ type: '[Movies API] Movies Loaded Success', payload: movies })),
  //       catchError(() => EMPTY)
  //     ))
  //   )
  // );


  constructor(
    private actions$: Actions,
    private chartGen: ChartGeneratorService
  ) {}
}
