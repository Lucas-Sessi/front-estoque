import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private  http: HttpClient) {}

    url = `http://localhost:5000`;

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