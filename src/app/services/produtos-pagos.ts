import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class ProdutosPagosService {

    constructor(private http: HttpClient) {}

    url = `http://localhost:5000`;

    getProdutosPagos(): Observable<any> {
        return this.http.get(`${this.url}/paid-products`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    findOneProdutoPago(id: number): Observable<any> {
        return this.http.get(`${this.url}/paid-products/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    createProdutoPago(data: any): Observable<any> {
        return this.http.post(`${this.url}/paid-products`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    updateProdutoPago(id: number, data: any): Observable<any> {
        return this.http.patch(`${this.url}/paid-products/${id}`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    deleteProdutoPago(id: number): Observable<any> {
        return this.http.delete(`${this.url}/paid-products/${id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}