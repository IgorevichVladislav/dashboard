import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from 'rxjs';
import {Widget} from './dashboard.interface';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  handleDelay = Math.round(Math.random() * 500 + 500);

  constructor() {
    console.log(this.handleDelay)
  }

  projectData: Observable<Widget[]> = of([
    {
      id: 1,
      name: 'CRM 2.0 — новая платформа продаж',
      tasksCompleted: 45,
      tasksTotal: 120,
      startDate: '2025-08-01',
      endDate: '2026-04-15',
      status: 'development'
    },
    {
      id: 2,
      name: 'Мобильное приложение для клиентов',
      tasksCompleted: 80,
      tasksTotal: 150,
      startDate: '2025-07-01',
      endDate: '2026-03-30',
      status: 'in-progress'
    },
    {
      id: 3,
      name: 'Переход на микросервисную архитектуру',
      tasksCompleted: 60,
      tasksTotal: 100,
      startDate: '2025-06-15',
      endDate: '2026-02-28',
      status: 'in-progress'
    },
    {
      id: 4,
      name: 'Внедрение аналитической панели',
      tasksCompleted: 95,
      tasksTotal: 100,
      startDate: '2025-01-15',
      endDate: '2025-10-01',
      status: 'done'
    },
    {
      id: 5,
      name: 'Интеграция с внешними API партнёров',
      tasksCompleted: 30,
      tasksTotal: 85,
      startDate: '2025-09-10',
      endDate: '2026-05-20',
      status: 'development'
    },
    {
      id: 6,
      name: 'Автоматизация DevOps-процессов',
      tasksCompleted: 70,
      tasksTotal: 90,
      startDate: '2025-05-20',
      endDate: '2025-12-31',
      status: 'review'
    },
    {
      id: 7,
      name: 'Редизайн корпоративного портала',
      tasksCompleted: 15,
      tasksTotal: 60,
      startDate: '2025-10-01',
      endDate: '2026-07-01',
      status: 'development'
    },
    {
      id: 8,
      name: 'Облачная инфраструктура AWS',
      tasksCompleted: 100,
      tasksTotal: 100,
      startDate: '2025-02-01',
      endDate: '2025-09-30',
      status: 'done'
    },
    {
      id: 9,
      name: 'AI-помощник для службы поддержки',
      tasksCompleted: 50,
      tasksTotal: 120,
      startDate: '2025-04-15',
      endDate: '2026-01-31',
      status: 'in-progress'
    },
    {
      id: 10,
      name: 'Переезд базы данных в облако',
      tasksCompleted: 25,
      tasksTotal: 80,
      startDate: '2025-09-05',
      endDate: '2026-02-10',
      status: 'development'
    },
    {
      id: 11,
      name: 'Внедрение системы уведомлений',
      tasksCompleted: 55,
      tasksTotal: 60,
      startDate: '2025-03-01',
      endDate: '2025-09-15',
      status: 'done'
    },
    {
      id: 12,
      name: 'Система внутреннего документооборота',
      tasksCompleted: 40,
      tasksTotal: 100,
      startDate: '2025-07-20',
      endDate: '2026-03-10',
      status: 'review'
    },
    {
      id: 13,
      name: 'Обновление API для партнёров',
      tasksCompleted: 65,
      tasksTotal: 90,
      startDate: '2025-06-01',
      endDate: '2025-11-30',
      status: 'in-progress'
    },
    {
      id: 14,
      name: 'Панель KPI для руководителей',
      tasksCompleted: 85,
      tasksTotal: 95,
      startDate: '2025-02-15',
      endDate: '2025-08-20',
      status: 'done'
    },
    {
      id: 15,
      name: 'Централизованная система логирования',
      tasksCompleted: 10,
      tasksTotal: 75,
      startDate: '2025-10-10',
      endDate: '2026-06-30',
      status: 'development'
    },
    {
      id: 16,
      name: 'Переобучение ML-моделей рекомендаций',
      tasksCompleted: 35,
      tasksTotal: 100,
      startDate: '2025-09-01',
      endDate: '2026-04-01',
      status: 'review'
    }
  ] as Widget[]).pipe(
    delay(this.handleDelay)
  )

}
