import { Component, OnInit } from '@angular/core';
import { ProdutosPagosService } from '../../../services/produtos-pagos';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProdutosService } from '../../../services/produtos';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ProdutosPagosInput } from '../types/produtos-pagos';
import { ProdutosOutput } from '../../produtos/types/produtos';

@Component({
  selector: 'app-produtos-pagos-create',
  templateUrl: './produtos-pagos-create.component.html',
  styleUrl: './produtos-pagos-create.component.css',
  providers: [MessageService],
})
export class ProdutosPagosCreateComponent implements OnInit {
  produtos: ProdutosOutput[] = [];

  produtoPagos: ProdutosPagosInput = {
    nm_produto: '',
    qtd_paga: null,
    nm_usuario: null,
  }

  constructor(
    private readonly produtosPagosService: ProdutosPagosService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly produtosService: ProdutosService
  ) {}

  ngOnInit(): void {
    this.produtosService.getProdutos().subscribe({
      next: (data) => {
        this.produtos = data.data;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error || 'Erro ao carregar produtos'
        });
      }
    })
  }

  filteredProdutos: any[] = [];

  filterProdutos(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.produtos as any[]).length; i++) {
        let country = (this.produtos as any[])[i];
        if (country.descricao.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            filtered.push(country);
        }
    }

        this.filteredProdutos = filtered;
  }

  cadastrarProdutoPagos() {
    if (!this.produtoPagos.nm_produto || !this.produtoPagos.qtd_paga || !this.produtoPagos.nm_usuario) {
      this.messageService.add({severity:'error', summary:'Erro', detail:'Preencha todos os campos!'});
      return
    } else {
      const produtosAtualizados = {
        nm_produto: this.produtoPagos.nm_produto.descricao,
        qtd_paga: this.produtoPagos.qtd_paga,
        nm_usuario: this.produtoPagos.nm_usuario
      }
  
      this.produtosPagosService.createProdutoPago(produtosAtualizados).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto pago cadastrado com sucesso!'
          });
          this.router.navigate(['/produtos-pagos']);
        },
        error: (error) => {
          if(error.status === 400) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.error[0] || 'Erro ao cadastrar produto pago'
            });
          } else if (error.status === 409) {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.error.error || 'Erro ao cadastrar produto pago'
            });
          }
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(['/produtos-pagos'])
  }
}
