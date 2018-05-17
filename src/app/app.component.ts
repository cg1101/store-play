import {Component} from '@angular/core';
import {Store, createFeatureSelector, select} from '@ngrx/store';
import {Observable} from 'rxjs';


import * as RouterActions from './navigation';
import {QueryCondition} from './query-condition';

export interface AppState {
  count: number;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  queryCondition$: Observable<QueryCondition>;

  constructor(private store: Store<AppState>) {
    this.queryCondition$ = store.select(createFeatureSelector('queryCondition'));

    // this.queryCondition$.subscribe(data => console.log('queryCondition->', data));
  }

  back() {
    console.log('going back');
    this.store.dispatch(new RouterActions.Back());
  }

  forward() {
    console.log('going forward');
    this.store.dispatch(new RouterActions.Forward());
  }

  home() {
    console.log('going home');
    this.store.dispatch(new RouterActions.Go({
      path: ['/abc',
        // {routeParam: 1}
      ],
      query: {
        startDate: '2018-01-10T13:00:03',
        endDate: '2018-10-31T10:00:00',
        segmentOptions: ['gender:male', 'age:13-40'],
        sortKey: 'cpr',
        filter: 'status:3',
      },
      extras: {replaceUrl: false}
    }));
  }
}
