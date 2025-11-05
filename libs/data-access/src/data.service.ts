import {Injectable, signal} from '@angular/core';
import {Widget} from './dashboard.interface';

@Injectable({providedIn: 'root'})

export class DataService {

  // Сигнал для текущего выбранного проекта
  currentProject = signal<Widget | null>(null);

  // Метод для установки текущего проекта
  setCurrentProject(project: Widget) {
    this.currentProject.set(project);
  }

  // Метод для получения текущего проекта
  getCurrentProject() {
    return this.currentProject();
  }

}
