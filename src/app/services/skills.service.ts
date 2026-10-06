import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../config';
import { ISkillGroup } from '../models';

@Injectable({ providedIn: 'root' })
export class SkillsService {
    private http = inject(HttpClient);
    private url = `${API_URL}/skills`;

    getAll() { return this.http.get<ISkillGroup[]>(this.url); }
    create(skill: ISkillGroup) { return this.http.post<ISkillGroup>(this.url, skill); }
    update(id: string, skill: ISkillGroup) { return this.http.put<ISkillGroup>(`${this.url}/${id}`, skill); }
    remove(id: string) { return this.http.delete(`${this.url}/${id}`); }
}