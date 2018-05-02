import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreRouterConnectingModule, routerReducer, RouterStateSerializer} from '@ngrx/router-store';
import {EffectsModule} from '@ngrx/effects';


import {AppRoutingModule} from './app-routing.module';
import {counterReducer} from './counter';

import {RouterEffects} from './navigation-effects';

import {AppComponent} from './app.component';
import {DefaultViewComponent} from './default-view/default-view.component';
import {CampaignListComponent} from './campaign-list/campaign-list.component';

import {MyEffect, reducers, CustomSerializer} from './my-effect';
import {queryConditionReducer} from './query-condition';

@NgModule({
  declarations: [
    AppComponent,
    DefaultViewComponent,
    CampaignListComponent
  ],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(
      [
        RouterEffects,
        MyEffect
      ]
    ),
    StoreModule.forRoot({
      count: counterReducer,
      ... reducers,
      queryCondition: queryConditionReducer,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router', // name of reducer key
    }),
    AppRoutingModule,
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
