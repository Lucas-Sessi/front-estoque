export interface UsuariosOutput {
    nm_completo:    string;
    nm_usuario:     string;
    senha:          string;
    id:             number;
    dt_criacao:     Date;
    dt_atualizacao: Date;
}

export interface UsuarioInput {
    nm_completo: string;
    nm_usuario:  string;
    senha:       string;
    confirmacao_senha: string;
}
