import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutosPagosService } from '../../../services/produtos-pagos';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos-pagos-list',
  templateUrl: './produtos-pagos-list.component.html',
  styleUrl: './produtos-pagos-list.component.css',
  providers: [MessageService],
})
export class ProdutosPagosListComponent implements OnInit {
  produtos$: Observable<any>;
  produtos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly produtosPagosService: ProdutosPagosService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.produtos$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.getEstoque();
  }

  getEstoque() {
    this.produtos$ = this.produtosPagosService.getProdutosPagos();
    this.produtos$.subscribe({
      next: (data) => {
        this.produtos = data;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Estoque carregado com sucesso',
        });
      }
    })
  }
}
