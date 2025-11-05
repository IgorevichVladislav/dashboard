
export type WidgetType = 'progress' | 'task' | 'timeline';

export interface Widget {
  id: number
  name: string
  tasksCompleted: number
  tasksTotal: number
  startDate: string
  endDate: string
  status: string
}

export interface WidgetConfig {
  projectId: number;
  widgets: {
    id: number;
    type: WidgetType;
    data: Widget;
  }[];
}
