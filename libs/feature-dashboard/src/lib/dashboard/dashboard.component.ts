import {Component, ChangeDetectionStrategy} from '@angular/core';
import {CdkDragPlaceholder, DragDropModule} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@db/sidebar';
import {DashboardWorkspaceComponent} from './dashboard-workspace';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, SidebarComponent, DashboardWorkspaceComponent, CdkDragPlaceholder],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {

}
