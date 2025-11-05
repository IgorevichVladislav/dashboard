import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  OnInit,
  output,
  signal, viewChild
} from '@angular/core';
import {Widget} from '@db/data-access';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {DatePipe, DecimalPipe} from '@angular/common';
import {MatProgressBar} from '@angular/material/progress-bar';
import {ChartConfiguration} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

@Component({
  selector: 'lib-timeline-widget',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    MatCardContent,
    DecimalPipe,
    MatProgressBar,
    DatePipe,
    BaseChartDirective
  ],
  templateUrl: './timeline-widget.component.html',
  styleUrl: './timeline-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineWidgetComponent implements OnInit, OnDestroy {
  dataTimelineWidget = input.required<Widget>();
  deleteWidget = output<number>();

  // Вычисляемые свойства для таймлайна
  daysPassed = computed(() => {
    const data = this.dataTimelineWidget();
    const start = new Date(data.startDate);
    const today = new Date();
    const end = new Date(data.endDate);

    // 👇 СРАЗУ ОГРАНИЧИВАЕМ СЕГОДНЯШНЮЮ ДАТУ КОНЦОМ ПРОЕКТА
    const effectiveToday = today > end ? end : today;
    return Math.max(0, Math.floor((effectiveToday.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  });

  totalDays = computed(() => {
    const data = this.dataTimelineWidget();
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    return Math.max(1, Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24)));
  });

  daysRemaining = computed(() => {
    return Math.max(0, this.totalDays() - this.daysPassed());
  });

  progressPercentage = computed(() => {
    return Math.min(100, Math.max(0, (this.daysPassed() / this.totalDays()) * 100));
  });

  isDelayed = computed(() => {
    return new Date() > new Date(this.dataTimelineWidget().endDate);
  });

  displayDaysRemaining = computed(() => {
    if (this.isDelayed()) {
      return Math.abs(this.daysRemaining());
    }
    return this.daysRemaining();
  });

// Дополнительные вычисляемые свойства для визуализации
  timelineSegments = computed(() => {
    const passed = this.daysPassed();
    const total = this.totalDays();

    // 👇 ГАРАНТИРУЕМ что не превысим 100%
    const passedPercentage = Math.min(100, (passed / total) * 100);
    const remainingPercentage = Math.max(0, 100 - passedPercentage);
    const currentPosition = Math.min(100, passedPercentage);

    return {
      passedPercentage: passedPercentage,
      remainingPercentage: remainingPercentage,
      currentPosition: currentPosition
    };
  });

  currentDate = signal(new Date());
  private updateInterval?: any;

  ngOnInit() {
    // Обновление каждую минуту для пересчета дней
    this.updateInterval = setInterval(() => {
      this.currentDate.set(new Date());
    }, 60000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  onDelete() {
    this.deleteWidget.emit(this.dataTimelineWidget().id);
  }
}
