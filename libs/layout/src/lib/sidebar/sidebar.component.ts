import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
  signal,
} from '@angular/core';
import {DataService, ProjectService, Widget} from '@db/data-access';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {toSignal} from '@angular/core/rxjs-interop';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {debounceTime} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'lib-sidebar',
  imports: [
    MatFormField,
    MatOption,
    MatSelect,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  #dataService = inject(DataService);
  #projectService = inject(ProjectService)
  #router = inject(Router);
  selectProject = output<Widget>();

  projects = toSignal(this.#projectService.projectData, {initialValue: []});

  filter = signal<{ searchName: string, searchStatus: string }>({searchName: '', searchStatus: 'all'});

  constructor() {
    this.filtersForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(value => {
        this.filter.set({
          searchName: value.searchName ?? '',
          searchStatus: value.searchStatus ?? 'all'
        });
      });
  }

  onSelect(project: Widget) {
    this.selectProject.emit(project);
    this.#router.navigate(['/dashboard', project.id]);

    this.#dataService.setCurrentProject(project);
  }

  filtersForm = new FormGroup({
    searchName: new FormControl(''),
    searchStatus: new FormControl('all')
  })


  filteredProjects() {
    const {searchName, searchStatus} = this.filter();
    const projects = this.projects();
    if (!projects) return

    return projects.filter(p => {
      const matchName = p.name.toLowerCase().includes(searchName.toLowerCase())
      const matchStatus = searchStatus === 'all' ? projects : p.status.includes(searchStatus)
      return matchName && matchStatus
    })

  }

}
