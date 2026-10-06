import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AdminExperience } from '../admin-experience/admin-experience';
import { AdminProjects } from '../admin-projects/admin-projects';
import { AdminSkills } from '../admin-skills/admin-skills';
import { AdminProfile } from '../admin-profile/admin-profile';

@Component({
  selector: 'app-dashboard',
  imports: [AdminExperience, AdminProjects, AdminSkills, AdminProfile],
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private auth = inject(AuthService);
  private router = inject(Router);
  tabs = ['experience', 'projects', 'skills', 'profile'];
  tab = signal('experience');

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}