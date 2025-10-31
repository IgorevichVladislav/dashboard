import {
  ChangeDetectionStrategy,
  Component,
  computed, effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild, ViewContainerRef
} from '@angular/core';
import {ProgressWidgetComponent} from '@db/widgets';
import {ProjectService, Widget} from '@db/data-access';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup} from '@angular/cdk/drag-drop';
import {wrapGrid} from 'animate-css-grid'

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
    CdkDragPlaceholder
  ],
  templateUrl: './dashboard-workspace.component.html',
  styleUrl: './dashboard-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardWorkspaceComponent implements OnInit {

  constructor() {
    effect(() => {
      const widgets = this.widgets();
      localStorage.setItem('localWidgets', JSON.stringify(widgets));
    })
  }

  #projectService = inject(ProjectService)
  dashboard = viewChild.required('dashboardBody', {read: ElementRef})
  widgetContainer = viewChild.required('widgetContainerRef', {read: ViewContainerRef});

  dataProgress = toSignal(this.#projectService.projectData, {
    initialValue: []
  })

  widgets = signal<Widget[]>([]);

  widgetsToAdd = computed(() => {
    const widgetId = this.widgets().map(widgetId => widgetId.id)

    return this.dataProgress().filter(f => !widgetId.includes(f.id))
  })

  async addWidget(widget: Widget) {


    this.widgets.set([...this.widgets(), {...widget}])
  }

  deleteById(id: number) {
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


  drop(event: CdkDragDrop<number, any>) {

    const {previousContainer, container} = event;
    this.updateWidgetPosition(previousContainer.data, container.data);
  }

  ngOnInit() {
    const savedWidgets = localStorage.getItem('localWidgets');
    if (savedWidgets) {
      const saved = JSON.parse(savedWidgets);
      this.widgets.set(saved);
    }

    // Анимация для плавного передвижения виджетов
    wrapGrid(this.dashboard().nativeElement, {duration: 1000})
  }
}
