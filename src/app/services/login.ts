import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private  http: HttpClient) {}

    url = `http://localhost:5000/login`;

    login(username: string, password: string): Observable<any> {
        return this.http.post(this.url, {username, password});
    }
}