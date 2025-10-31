import {Injectable} from '@angular/core';
import {delay, map, Observable, of} from 'rxjs';
import {Widget, WidgetStatus} from './dashboard.interface';


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
      "id": 1,
      "name": "Проект A",
      "tasksCompleted": 25,
      "tasksTotal": 50,
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "status": "development"
    },
    {
      "id": 2,
      "name": "Проект B",
      "tasksCompleted": 75,
      "tasksTotal": 140,
      "startDate": "2025-06-01",
      "endDate": "2025-03-31",
      "status": "review"
    },
    {
      "id": 3,
      "name": "Проект C",
      "tasksCompleted": 80,
      "tasksTotal": 85,
      "startDate": "2025-06-01",
      "endDate": "2025-09-30",
      "status": "in-progress"
    },
    {
      "id": 4,
      "name": "Веб-портал компании",
      "tasksCompleted": 45,
      "tasksTotal": 60,
      "startDate": "2025-02-15",
      "endDate": "2025-08-30",
      "status": "done"
    },
    {
      "id": 5,
      "name": "Мобильное приложение",
      "tasksCompleted": 120,
      "tasksTotal": 200,
      "startDate": "2025-11-01",
      "endDate": "2025-07-15",
      "status": "in-progress"
    },
    {
      "id": 6,
      "name": "Система аналитики",
      "tasksCompleted": 15,
      "tasksTotal": 80,
      "startDate": "2025-03-10",
      "endDate": "2025-11-20",
      "status": "development"
    },
    {
      "id": 7,
      "name": "Обновление CRM",
      "tasksCompleted": 95,
      "tasksTotal": 95,
      "startDate": "2025-01-20",
      "endDate": "2025-05-10",
      "status": "done"
    },
    {
      "id": 8,
      "name": "Интеграция с API",
      "tasksCompleted": 30,
      "tasksTotal": 45,
      "startDate": "2025-04-01",
      "endDate": "2025-07-15",
      "status": "review"
    },
    {
      "id": 9,
      "name": "Миграция базы данных",
      "tasksCompleted": 65,
      "tasksTotal": 120,
      "startDate": "2025-12-01",
      "endDate": "2025-06-30",
      "status": "development"
    },
    {
      "id": 10,
      "name": "Система отчетности",
      "tasksCompleted": 10,
      "tasksTotal": 35,
      "startDate": "2025-05-01",
      "endDate": "2025-10-31",
      "status": "in-progress"
    },
    {
      "id": 11,
      "name": "Обновление безопасности",
      "tasksCompleted": 40,
      "tasksTotal": 55,
      "startDate": "2025-03-15",
      "endDate": "2025-08-15",
      "status": "review"
    },
    {
      "id": 12,
      "name": "Панель управления",
      "tasksCompleted": 85,
      "tasksTotal": 110,
      "startDate": "2025-09-01",
      "endDate": "2025-04-30",
      "status": "done"
    },
    {
      "id": 13,
      "name": "Автоматизация процессов",
      "tasksCompleted": 55,
      "tasksTotal": 90,
      "startDate": "2025-02-01",
      "endDate": "2025-09-15",
      "status": "in-progress"
    },
    {
      "id": 14,
      "name": "Облачная инфраструктура",
      "tasksCompleted": 70,
      "tasksTotal": 150,
      "startDate": "2025-01-10",
      "endDate": "2025-10-31",
      "status": "development"
    },
    {
      "id": 15,
      "name": "AI-ассистент",
      "tasksCompleted": 25,
      "tasksTotal": 75,
      "startDate": "2025-04-15",
      "endDate": "2025-12-15",
      "status": "review"
    },
    {
      "id": 16,
      "name": "Система уведомлений",
      "tasksCompleted": 50,
      "tasksTotal": 65,
      "startDate": "2025-03-01",
      "endDate": "2025-07-31",
      "status": "done"
    }
  ] as Widget[]).pipe(
    delay(this.handleDelay)
  )


  filterProjects(search: string) {
    return this.projectData
      .pipe(
        map(project => {
          return project.filter(f => search.toLowerCase().includes(f.name.toLowerCase()))
        })
      )
  }

}
