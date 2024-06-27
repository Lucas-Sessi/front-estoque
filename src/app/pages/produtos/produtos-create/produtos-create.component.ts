import { Component } from '@angular/core';
import { ProdutosService } from '../../../services/produtos';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProdutoInput } from '../types/produtos';

@Component({
  selector: 'app-produtos-create',
  templateUrl: './produtos-create.component.html',
  styleUrl: './produtos-create.component.css',
  providers: [MessageService],
})
export class ProdutosCreateComponent {
  produto: ProdutoInput = {
    descricao:'',
    dt_validade: null,
    qtd_estoque: null,
  }

  constructor(
    private readonly produtoService: ProdutosService,
    private readonly router: Router,
    private messageService: MessageService
  ) {}

  cadastrarProduto() {
    if (!this.produto.descricao || !this.produto.dt_validade || !this.produto.qtd_estoque) {
      this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha todos os campos!'});
      return
    } else {
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
  }

  cancelar() {
    this.router.navigate(['/produtos'])
  }
}
