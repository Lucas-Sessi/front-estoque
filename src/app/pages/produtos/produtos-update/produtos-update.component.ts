import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../../services/produtos';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProdutoInput } from '../types/produtos';

@Component({
  selector: 'app-produtos-update',
  templateUrl: './produtos-update.component.html',
  styleUrl: './produtos-update.component.css',
  providers: [MessageService],
})
export class ProdutosUpdateComponent implements OnInit {
  produto: ProdutoInput = {
    descricao: '',
    dt_validade: null,
    qtd_estoque: null,
  }

  cd_produto: number = 0;

  constructor(
    private readonly produtosService: ProdutosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cd_produto = params['cd_produto']

      if(this.cd_produto) {
        this.produtosService.findOneProduto(this.cd_produto).subscribe({
          next: (data: any) => {
            this.produto.descricao = data.data.descricao
            this.produto.dt_validade = data.data.dt_validade
            this.produto.qtd_estoque = data.data.qtd_estoque
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao carregar produto',
            })
          }
        })
      }
    })
  }

  atualizarProduto() {
    if (!this.produto.descricao || !this.produto.dt_validade || !this.produto.qtd_estoque) {
      this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha todos os campos!'});
      return
    } else {
      this.produtosService.updateProduto(this.cd_produto, this.produto).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto atualizado com sucesso!',
          })
          this.router.navigate(['/produtos'])
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar produto!',
          })
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(['/produtos'])
  }
}
