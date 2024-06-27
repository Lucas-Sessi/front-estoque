export interface ProdutosPagosInput {
        nm_produto: any,
        qtd_paga: number | null,
        nm_usuario: number | null,
}

export interface ProdutosPagosOutput {
        id:         number;
        nm_produto: string;
        qtd_paga:   number;
        dt_entrega: Date;
        nm_usuario: string;
}
