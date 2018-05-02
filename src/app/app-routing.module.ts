import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {DefaultViewComponent} from './default-view/default-view.component';
import {CampaignListComponent} from './campaign-list/campaign-list.component';

const routes: Routes = [
  {
    path: 'accounts/:accountId',
    component: CampaignListComponent,
  },
  {
    path: '**',
    component: DefaultViewComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
