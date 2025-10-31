import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'lib-sidebar',
  imports: [
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  menuItems = [
    {
      label: 'Backlog',
      icon: 'backlog'
    },
    {
      label: 'Board',
      icon: 'board'
    },
    {
      label: 'Report',
      icon: 'report'
    }

  ]

}
