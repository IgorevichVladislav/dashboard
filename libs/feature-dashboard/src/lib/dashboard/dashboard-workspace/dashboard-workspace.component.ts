import {
  ChangeDetectionStrategy,
  Component, ComponentRef,
  computed, effect,
  ElementRef,
  inject, input,
  OnInit, QueryList,
  signal,
  viewChild, ViewChildren, ViewContainerRef
} from '@angular/core';
import {ProgressWidgetComponent, TasksWidgetComponent} from '@db/widgets';
import {DataService, ProjectService, Widget} from '@db/data-access';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragPlaceholder,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {wrapGrid} from 'animate-css-grid'
import {ActivatedRoute} from '@angular/router';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {WidgetType} from '../../../../../data-access/src/dashboard.interface';

const WIDGETS: { type: WidgetType; name: string; loadComponent: () => Promise<any> }[] = [
  {
    type: 'progress',
    name: 'Progress',
    loadComponent: () => import('@db/widgets').then(m => m.ProgressWidgetComponent)
  },
  {
    type: 'task',
    name: 'Tasks',
    loadComponent: () => import('@db/widgets').then(m => m.TasksWidgetComponent)
  },
  {
    type: 'timeline',
    name: 'Timeline',
    loadComponent: () => import('@db/widgets').then(m => m.TimelineWidgetComponent)
  },
];

interface WithDeleteWidget {
  deleteWidget?: {
    subscribe: (callback: () => void) => void;
  };
}

@Component({
  selector: 'lib-dashboard-workspace',
  imports: [
    ProgressWidgetComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    CdkDragPlaceholder,
    AsyncPipe,
    JsonPipe,
    TasksWidgetComponent
  ],
  templateUrl: './dashboard-workspace.component.html',
  styleUrl: './dashboard-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWorkspaceComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #dataService = inject(DataService)
  #projectService = inject(ProjectService)
  id = input<number>();
  dashboard = viewChild('dashboardBody', {read: ElementRef})

  // Добавляем ViewChildren для контейнеров в цикле
  @ViewChildren('widgetContainer', { read: ViewContainerRef })
  widgetContainers!: QueryList<ViewContainerRef>;

  constructor() {
    effect(() => {
      const widgets = this.widgets();
      localStorage.setItem('localWidgets', JSON.stringify(widgets));
      const name = this.project()?.name
      console.log(name)
    })
  }

  currentProject = computed(() => {
    const projectId = Number(this.id());
    const allProject = this.dataProgress();
    return allProject.find(p => p.id === projectId) || null
  })

  project = input<Widget>()

  dataProgress = toSignal(this.#projectService.projectData, {
    initialValue: []
  })

  addedWidgetTypes = signal<WidgetType[]>([]);
  widgets = signal<Widget[]>([]);
  createdWidgets = signal<{ type: WidgetType, ref: any }[]>([]);

  widgetsToAdd = computed(() => {
    const widgetId = this.widgets().map(widgetId => widgetId.id)
    return this.dataProgress().filter(f => !widgetId.includes(f.id))
  })

  async addWidget(widgetType: WidgetType) {
    const project = this.currentProject();
    const widgetConfig = WIDGETS.find(w => w.type === widgetType)
    if (!project || !widgetConfig) return

    // Сначала добавляем тип виджета
    this.addedWidgetTypes.update(type => [...type, widgetConfig.type]);

    // Ждем обновления DOM и создаем компонент
    setTimeout(() => {
      this.createWidgetForType(widgetType, project);
    });
  }

  private async createWidgetForType(widgetType: WidgetType, project: any) {
    const widgetConfig = WIDGETS.find(w => w.type === widgetType);
    if (!widgetConfig) return;

    const componentLoad = await widgetConfig.loadComponent();

    // Находим индекс этого виджета и соответствующий контейнер
    const index = this.addedWidgetTypes().indexOf(widgetType);
    const container = this.widgetContainers.get(index);

    if (!container) {
      console.error('Container not found for widget:', widgetType);
      return;
    }

    const componentRef = container.createComponent(componentLoad)

    switch (widgetConfig.type) {
      case 'progress':
        componentRef.setInput('dataProgressWidget', project);
        break;
      case 'timeline':
        componentRef.setInput('dataTimelineWidget', project);
        break;
      case 'task':
        componentRef.setInput('dataTaskWidget', project);
        break;
    }

    const instance = componentRef.instance as WithDeleteWidget;

    instance?.deleteWidget?.subscribe(() => {
      console.log('🗑️ Удаляем виджет:', widgetType);
      componentRef.destroy();
      this.addedWidgetTypes.update(types => types.filter(t => t !== widgetType));
    });

    this.createdWidgets.update(widgets => [...widgets, { type: widgetType, ref: componentRef }]);
  }

  availableWidgets = computed(() => {
    const addedTypes = this.addedWidgetTypes();
    return WIDGETS.filter(widget => !addedTypes.includes(widget.type));
  });

  deleteByType(id: number) {
    const widgets = this.widgets();
    if (!id) return
    return this.widgets.set(widgets.filter(w => w.id !== id))
  }

  updateWidgetPosition(sourceWidgetId: number, targetWidgetId: number) {
    const sourceIndex = this.widgets().findIndex(w => w.id === sourceWidgetId);
    if (sourceIndex === -1) return

    const newWidgets = [...this.widgets()]
    const sourceWidgets = newWidgets.splice(sourceIndex, 1)[0];
    const targetIndex = newWidgets.findIndex(window => window.id === targetWidgetId);

    if (targetIndex === -1) return
    newWidgets.splice(targetIndex, 0, sourceWidgets)
    this.widgets.set(newWidgets);
  }

  drop(event: CdkDragDrop<WidgetType[]>) {
    const types = [...this.addedWidgetTypes()];
    moveItemInArray(types, event.previousIndex, event.currentIndex);
    this.addedWidgetTypes.set(types);
  }

  ngOnInit() {
    const savedWidgets = localStorage.getItem('localWidgets');
    if (savedWidgets) {
      const saved = JSON.parse(savedWidgets);
      this.widgets.set(saved);
    }
  }

  ngAfterViewChecked() {
    //Анимация для плавного передвижения виджетов
    const dashboardEl = this.dashboard();
    if (dashboardEl) {
      wrapGrid(dashboardEl.nativeElement, {duration: 200})
    }
  }
}
