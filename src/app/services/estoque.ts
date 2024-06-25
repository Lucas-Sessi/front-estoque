import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class EstoqueService {

    constructor(private http: HttpClient) {}

    url = `http://localhost:5000`;

    getEstoque(): Observable<any> {
        return this.http.get(`${this.url}/paid-products`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}