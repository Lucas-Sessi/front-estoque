import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { ProdutosService } from '../../../services/produtos';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrl: './produtos-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class ProdutosListComponent implements OnInit {
  produtos$: Observable<any>;
  produtos: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly produtosService: ProdutosService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.produtos$ = new Observable<any[]>();
  }

  ngOnInit() {
    this.getProdutos();
  }

  getProdutos() {
    this.produtos$ = this.produtosService.getProdutos();
    this.produtos$.subscribe({
      next: (data) => {
        console.log('data', data.data)
        this.produtos = data.data;
        
        this.isLoading = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Produtos carregados com sucesso',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Erro ao carregar produtos',
        });
      }
    })
  }

  adicionarProduto() {
    this.router.navigate(['/produtos/adicionar']);
  }

  editarProduto(cd_produto: number) {
    console.log('esse é o id do editar: ', cd_produto)
    this.router.navigate([`/produtos/editar/${cd_produto}`]);
  }

  deletarProduto(cd_produto: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir este produto?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.produtosService.deleteProdutos(cd_produto).subscribe({
            next: () => {
              this.getProdutos();
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Produto deletado com sucesso!' });
            },
            error: (error) => {
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao deletar produto!'})
            }
          })
      },
      reject: () => {
          this.getProdutos();
      }
  });
  }
}
