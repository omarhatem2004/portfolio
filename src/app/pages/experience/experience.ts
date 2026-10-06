import { Component, OnInit, inject, signal } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { IJob } from '../../models';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements OnInit {
  private service = inject(ExperienceService);
  jobs = signal<IJob[]>([]);

  ngOnInit() {
    this.service.getAll().subscribe((data) => this.jobs.set(data));
  }
}