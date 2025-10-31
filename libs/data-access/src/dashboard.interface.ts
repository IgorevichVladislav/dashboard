export type WidgetStatus = 'development' | 'in-progress' | 'review' | 'done';

export interface Widget {
  id: number
  name: string
  tasksCompleted: number
  tasksTotal: number
  startDate: string
  endDate: string
  status: WidgetStatus
  backgroundColor?: string
  color?: string
}
