import {
  ChangeDetectionStrategy,
  Component,
  computed, ElementRef, EventEmitter, Input,
  input, Output,
  output,
  Type, ViewChild,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import {Widget} from '@db/data-access';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'lib-tasks-widget',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatCardContent,
    MatIconButton
  ],
  templateUrl: './tasks-widget.component.html',
  styleUrl: './tasks-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksWidgetComponent {
  dataTaskWidget = input.required<Widget>();
  deleteWidget = output<number>();

  //@ViewChild('chart', { static: true }) chartEl!: ElementRef;
  chartElement = viewChild('chart', {read: ElementRef})
  chart!: ApexCharts;


  completionRate = computed(() => {
    const data = this.dataTaskWidget();
    return data.tasksTotal > 0
      ? Math.round((data.tasksCompleted / data.tasksTotal) * 100)
      : 0;
  });

  remainingTasks = computed(() => {
    const data = this.dataTaskWidget();
    return data.tasksTotal - data.tasksCompleted;
  });

  ngOnInit() {
    // Ждем пока данные появятся и chartEl будет доступен
    setTimeout(() => {
      this.renderChart();
    });
  }

  private renderChart() {
    const data = this.dataTaskWidget();
    const remaining = this.remainingTasks();

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: 'bar',
        height: 200,
      },
      series: [
        {
          name: 'Выполнено',
          data: [data.tasksCompleted],
        },
        {
          name: 'Осталось',
          data: [remaining],
        },
      ],
      xaxis: {
        categories: ['Задачи'],
      },
      colors: ['#4caf50', '#ff9800'],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: number) {
          return val.toString();
        }
      },
    };

    if (this.chartElement() && this.chartElement()?.nativeElement) {
      this.chart = new ApexCharts(this.chartElement()?.nativeElement, options);
      this.chart.render();
    }
  }

  ngOnDestroy() {
    this.chart?.destroy();
  }

  onDelete() {
    this.deleteWidget.emit(this.dataTaskWidget().id);
  }
}
