import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EstoqueService } from '../../../services/estoque';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-estoque-list',
  templateUrl: './estoque-list.component.html',
  styleUrl: './estoque-list.component.css',
  providers: [MessageService],
})
export class EstoqueListComponent implements OnInit {
  produtos$: Observable<any>;
  produtos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly estoqueService: EstoqueService,
    private router: Router,
    private messageService: MessageService,
  ) {
    this.produtos$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.getEstoque();
  }

  getEstoque() {
    this.produtos$ = this.estoqueService.getEstoque();
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
