export interface ProdutoInput {
    descricao: string;
    dt_validade: string | null;
    qtd_estoque: number | null;
}

export interface ProdutosOutput {
    cd_produto:  number;
    descricao:   string;
    dt_entrada:  Date;
    dt_validade: Date;
    qtd_estoque: number;
}
