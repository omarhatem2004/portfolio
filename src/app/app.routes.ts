import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Experience } from './pages/experience/experience';
import { Projects } from './pages/projects/projects';
import { Skills } from './pages/skills/skills';
import { Contact } from './pages/contact/contact';
import { Login } from './admin/login/login';
import { authGuard } from './services/auth.guard';
import { Dashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [
    { path: '', component: Home, title: 'Home | Omar Hatem' },
    { path: 'home', component: Home, title: 'Home | Omar Hatem' },
    { path: 'about', component: About, title: 'About | Omar Hatem' },
    { path: 'experience', component: Experience, title: 'Experience | Omar Hatem' },
    { path: 'projects', component: Projects, title: 'Projects | Omar Hatem' },
    { path: 'skills', component: Skills, title: 'Skills | Omar Hatem' },
    { path: 'contact', component: Contact, title: 'Contact | Omar Hatem' },
    { path: 'admin/login', component: Login, title: 'Admin login' },
    { path: 'admin', component: Dashboard, canActivate: [authGuard], title: 'Admin' },
    { path: '**', redirectTo: '' },
];
