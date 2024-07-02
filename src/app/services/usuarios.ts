import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    constructor(private http: HttpClient) {}

    url = environment.apiUrl;

    getUsuarios(): Observable<any> {
        return this.http.get(`${this.url}/user`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    findOneUsuario(id: number) {
        return this.http.get(`${this.url}/user/find/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    createUsuario(data: any) {
        return this.http.post(`${this.url}/user`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    updateUsuario(id: number, data: any) {
        return this.http.patch(`${this.url}/user/${id}`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    deleteUsuario(id: number) {
        return this.http.delete(`${this.url}/user/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}