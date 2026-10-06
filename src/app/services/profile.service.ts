import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { API_URL } from "../config";
import { IProfile } from "../models";

@Injectable({ providedIn: 'root' })
export class ProfileService {
    private http = inject(HttpClient);
    private url = `${API_URL}/profile`;

    get() { return this.http.get<IProfile>(this.url); }
    update(profile: IProfile) { return this.http.put<IProfile>(this.url, profile); }
}