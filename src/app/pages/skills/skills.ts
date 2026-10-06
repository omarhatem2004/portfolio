import { Component, OnInit, inject, signal } from '@angular/core';
import { ISkillGroup } from '../../models';
import { SkillsService } from '../../services/skills.service';

@Component({
  imports: [],
  selector: 'app-skills',
  styleUrl: './skills.css',
  templateUrl: './skills.html',
})
export class Skills implements OnInit {
  private service = inject(SkillsService);
  skills = signal<ISkillGroup[]>([]);

  ngOnInit() {
    this.service.getAll().subscribe((data) => this.skills.set(data));
  }
}