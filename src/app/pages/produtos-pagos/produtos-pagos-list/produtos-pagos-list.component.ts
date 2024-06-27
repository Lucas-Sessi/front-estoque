import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutosPagosService } from '../../../services/produtos-pagos';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos-pagos-list',
  templateUrl: './produtos-pagos-list.component.html',
  styleUrl: './produtos-pagos-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProdutosPagosListComponent implements OnInit {
  produtosPagos$: Observable<any>;
  produtosPagos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly produtosPagosService: ProdutosPagosService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.produtosPagos$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.getProdutosPagos();
  }

  getProdutosPagos() {
    this.produtosPagos$ = this.produtosPagosService.getProdutosPagos();
    this.produtosPagos$.subscribe({
      next: (data) => {
        this.produtosPagos = data.data;

        this.isLoading = false;
      },
      error: (error) => {
        if(error.status === 400 || error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.error || 'Erro ao carregar produtos pagos',
          });
        }
      }
    })
  }

  adicionarProdutoPagos() {
    this.router.navigate(['/produtos-pagos/adicionar']);
  }

  editarProdutoPagos(id: number) {
    this.router.navigate([`/produtos-pagos/editar/${id}`]);
  }

  deletarProdutoPagos(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir este log de produto pago?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.produtosPagosService.deleteProdutoPago(id).subscribe({
            next: () => {
              this.getProdutosPagos();
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Produto Pago deletado com sucesso!' });
            },
            error: (error) => {
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao deletar produto pago!'})
            }
          })
      },
      reject: () => {
          this.getProdutosPagos();
      }
  });
  }
}
