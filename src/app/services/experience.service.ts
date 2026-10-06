import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { IJob } from '../models';

@Injectable({ providedIn: 'root' })
export class ExperienceService {
    private http = inject(HttpClient);
    private url = `${API_URL}/experience`;

    getAll() { return this.http.get<IJob[]>(this.url); }
    create(job: IJob) { return this.http.post<IJob>(this.url, job); }
    update(id: string, job: IJob) { return this.http.put<IJob>(`${this.url}/${id}`, job); }
    remove(id: string) { return this.http.delete(`${this.url}/${id}`); }
}