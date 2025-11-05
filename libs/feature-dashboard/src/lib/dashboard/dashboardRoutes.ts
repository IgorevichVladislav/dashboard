import {DashboardComponent, DashboardWorkspaceComponent} from '@db/dashboard';
import {Route} from '@angular/router';

export const dashboardRoutes: Route[] = [{
  path: '',
  component: DashboardComponent,
  children: [{
    path: ':id', component: DashboardWorkspaceComponent
  }]
}];

