import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { IProject } from '../../models';
import { ProjectsService } from '../../services/projects.service';


@Component({
  imports: [],
  selector: 'app-projects',
  styleUrl: './projects.css',
  templateUrl: './projects.html',
})
export class Projects implements OnInit {
  private service = inject(ProjectsService);
  projects = signal<IProject[]>([]);
  featured = computed(() => this.projects().filter((p) => p.featured));
  cards = computed(() => this.projects().filter((p) => !p.featured));

  ngOnInit() {
    this.service.getAll().subscribe((data) => this.projects.set(data));
  }
}
