import {ChangeDetectionStrategy, Component, computed, input, OnDestroy, OnInit, output} from '@angular/core';
import {Widget} from '@db/data-access';
import {DatePipe} from '@angular/common';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';

@Component({
  selector: 'lib-progress-widget',
  imports: [
    DatePipe,
    MatIconButton,
    MatIcon,
    MatProgressBar,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
  ],
  templateUrl: './progress-widget.component.html',
  styleUrl: './progress-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressWidgetComponent implements OnInit, OnDestroy {
  dataProgressWidget = input.required<Widget>();
  deleteWidget = output<number>();

  // 👇 ВЫЧИСЛЯЕМЫЕ СВОЙСТВА ДЛЯ ШАБЛОНА
  progressPercentage = computed(() => {
    const data = this.dataProgressWidget();
    return data.tasksTotal > 0
      ? Math.round((data.tasksCompleted / data.tasksTotal) * 100)
      : 0;
  });

  remainingTasks = computed(() => {
    const data = this.dataProgressWidget();
    return data.tasksTotal - data.tasksCompleted;
  });

  progressColor = computed(() => {
    const percentage = this.progressPercentage();
    if (percentage >= 80) return 'primary';
    if (percentage >= 50) return 'accent';
    return 'warn';
  });

  statusText = computed(() => {
    const data = this.dataProgressWidget();
    const statusMap: { [key: string]: string } = {
      'development': 'В разработке',
      'in-progress': 'В работе',
      'review': 'На проверке',
      'done': 'Завершен'
    };
    return statusMap[data.status] || data.status;
  });

  private updateInterval?: any;

  ngOnInit() {
    console.log('📊 ProgressWidget data:', this.dataProgressWidget());
    console.log('📅 Start date:', this.dataProgressWidget().startDate);
    console.log('📅 End date:', this.dataProgressWidget().endDate);
    // Real-time обновление каждые 5 секунд
    this.updateInterval = setInterval(() => {
      console.log('Progress widget auto-refresh');
      // Для демо можно добавить логику обновления
    }, 5000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  onDelete() {
    this.deleteWidget.emit(this.dataProgressWidget().id);
  }
}
