import {Routes} from '@angular/router';
import {LayoutComponent} from '@db/layout';


export const routes: Routes = [{
  path: '', component: LayoutComponent,
  children: [{
    path: 'dashboard', loadChildren: () => import('@db/dashboard').then(menubar => menubar.dashboardRoutes)
  }]

}];
