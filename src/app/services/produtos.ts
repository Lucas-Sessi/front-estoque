import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class ProdutosService {
    constructor(private http: HttpClient) {}

    url = environment.apiUrl;

    getProdutos(): Observable<any> {
        return this.http.get(`${this.url}/products`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }

    findOneProduto(cd_produto: number) {
        return this.http.get(`${this.url}/products/find/${cd_produto}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    createProduto(data: any) {
        return this.http.post(`${this.url}/products`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    updateProduto(cd_produto: number, data: any) {
        return this.http.patch(`${this.url}/products/${cd_produto}`, data, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
    }

    deleteProdutos(cd_produto: number): Observable<any> {
        return this.http.delete(`${this.url}/products/${cd_produto}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        });
    }
}