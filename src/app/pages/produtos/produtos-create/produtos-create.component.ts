import { Component } from '@angular/core';
import { ProdutosService } from '../../../services/produtos';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrl: './produtos-create.component.css',
  providers: [MessageService],
})
export class ProdutosCreateComponent {
  produto: any = {
    descricao:'',
    dt_validade:'',
    qtd_estoque: null,
  }

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  cadastrarProduto() {
    this.produtoService.createProduto(this.produto).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Produto cadastrado com sucesso!',
        })
        this.router.navigate(['/produtos'])
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: error.error.error[0] || 'Erro ao cadastrar produto',
        })
      }
    })
  }

  cancelar() {
    this.router.navigate(['/produtos'])
  }
}
