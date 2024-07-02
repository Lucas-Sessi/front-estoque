import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private  http: HttpClient) {}

    url = environment.apiUrl;

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.url}/login`, {username, password});
    }

    verifyToken(): Observable<any> {
        const token = sessionStorage.getItem('token');
        
        return this.http.get(`${this.url}/verify-token`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
    }
}