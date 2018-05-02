import {StoreModule, ActionReducerMap} from '@ngrx/store';
import {Params, RouterStateSnapshot} from '@angular/router';
import {
  StoreRouterConnectingModule,
  routerReducer,
  RouterReducerState,
  RouterStateSerializer,
} from '@ngrx/router-store';

import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {Effect, Actions, ofType} from '@ngrx/effects';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

import {RouterNavigationAction, ROUTER_NAVIGATION} from '@ngrx/router-store';
import {Observable} from 'rxjs/Observable';
import {QueryCondition, QueryConditionAction} from './query-condition';


interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {url, root: {queryParams}} = routerState;
    const {params} = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return {url, params, queryParams};
  }
}


@Injectable()
export class MyEffect {
  // @Effect({dispatch: false})
  @Effect()
  translateUrl$: Observable<any> = this.actions$
    .ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map((action) => action.payload.routerState)
    .switchMap(routerState => {
      console.log('routerState is', routerState);
      const {url, params, queryParams} = routerState;
      // const  = payload;
      console.log('url', url, 'params', params);
      console.log('queryParams', queryParams);
      const newState: QueryCondition = {
        accountId: params.accountId,
        dateRange: {
          startDate: new Date(queryParams.startDate),
          endDate: new Date(queryParams.endDate),
        },
        segmentOptions: queryParams.segmentOptions,
        sortKey: queryParams.sortKey,
        filter: queryParams.filter,
      };
      const action = new QueryConditionAction(newState);
      console.log('action to be dispatched', action);
      return Observable.of(action);

    });

  constructor(private actions$: Actions,
              private router: Router,
              private location: Location) {
  }
}
