import {Component, ChangeDetectionStrategy, signal, input} from '@angular/core';
import {CdkDragPlaceholder, DragDropModule} from '@angular/cdk/drag-drop';
import {CommonModule} from '@angular/common';
import {DashboardWorkspaceComponent} from './dashboard-workspace';
import {Widget} from '@db/data-access';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'lib-dashboard',
  standalone: true,
  imports: [CommonModule, DragDropModule, DashboardWorkspaceComponent, CdkDragPlaceholder, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  activeWidget = input<Widget>()
  selectProject = signal<Widget | null>(null);

  onSelectProject(widget: Widget) {
    this.selectProject.set(widget);
  }

}
