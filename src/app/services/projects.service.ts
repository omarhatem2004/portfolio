import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { IProject } from '../models';

@Injectable({ providedIn: 'root' })
export class ProjectsService {
    private http = inject(HttpClient);
    private url = `${API_URL}/projects`;

    getAll() { return this.http.get<IProject[]>(this.url); }
    create(project: IProject) { return this.http.post<IProject>(this.url, project); }
    update(id: string, project: IProject) { return this.http.put<IProject>(`${this.url}/${id}`, project); }
    remove(id: string) { return this.http.delete(`${this.url}/${id}`); }
}