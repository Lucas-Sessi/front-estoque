import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios';
import { MessageService } from 'primeng/api';
import sha1 from 'sha1';
import { UsuarioInput } from '../types/usuarios';


@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styleUrl: './usuarios-create.component.css',
  providers: [MessageService],
})
export class UsuariosCreateComponent {
  usuario: UsuarioInput = {
    nm_completo: '',
    nm_usuario: '',
    senha: '',
    confirmacao_senha: '',
  }

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
    private readonly messageService: MessageService,
  ) {}

  cadastrarUsuario() {

    if (this.usuario.senha !== this.usuario.confirmacao_senha) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Senhas diferentes',
      });

      return;
    }

    const senhaComEspacos = /\s/;

    if (senhaComEspacos.test(this.usuario.senha)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Sua senha não pode conter espaços!',
      });
      return;
    }

    if (!this.usuario.nm_completo || !this.usuario.nm_usuario || !this.usuario.senha || !this.usuario.confirmacao_senha) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Preencha todos os campos',
      });
      return;
    } else {
    const novoUsuario = {
      nm_completo: this.usuario.nm_completo,
      nm_usuario: this.usuario.nm_usuario,
      senha: sha1(this.usuario.senha),
    }
    
    this.usuariosService.createUsuario(novoUsuario).subscribe({
      next: (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Usuário cadastrado com sucesso',
        });

        this.router.navigate(['/usuarios']);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.error.error || 'Erro ao cadastrar usuário',
        });
      }
    })
  }
}

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
