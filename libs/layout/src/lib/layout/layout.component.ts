import {Component, input} from '@angular/core';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {DashboardComponent, DashboardWorkspaceComponent} from '@db/dashboard';
import {RouterOutlet} from '@angular/router';
import {Widget} from '@db/data-access';

@Component({
  selector: 'lib-layout',
  imports: [
    SidebarComponent,
    DashboardWorkspaceComponent,
    RouterOutlet,
    DashboardComponent
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {

}
