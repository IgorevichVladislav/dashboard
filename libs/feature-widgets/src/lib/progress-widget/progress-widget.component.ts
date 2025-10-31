import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {Widget} from '@db/data-access';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'lib-progress-widget',
  imports: [
    DecimalPipe,
    DatePipe,
    MatIconButton,
    MatIcon,
  ],
  templateUrl: './progress-widget.component.html',
  styleUrl: './progress-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressWidgetComponent {
data = input.required<Widget>();
deleteWidget = output<number | null>();
}
