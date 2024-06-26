import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    constructor(private http: HttpClient) {}

    url = `http://localhost:5000`;

    getProdutos(): Observable<any> {
        return this.http.get(`${this.url}/products`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    deleteProdutos(cd_produto: number): Observable<any> {
        return this.http.delete(`${this.url}/products/${cd_produto}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}