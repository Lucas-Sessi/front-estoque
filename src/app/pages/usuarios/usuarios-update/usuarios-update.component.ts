import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import sha1 from 'sha1';
import { UsuarioInput } from '../types/usuarios';

@Component({
  selector: 'app-usuarios-update',
  templateUrl: './usuarios-update.component.html',
  styleUrl: './usuarios-update.component.css',
  providers: [MessageService],
})
export class UsuariosUpdateComponent implements OnInit {
  usuario: UsuarioInput = {
    nm_completo: '',
    nm_usuario: '',
    senha: '',
    confirmacao_senha: '',
  }

  idUsuario: number = 0;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idUsuario = params['id']

      if(this.idUsuario) {
        this.usuariosService.findOneUsuario(this.idUsuario).subscribe({
          next: (data: any) => {
            console.log("🚀 ~ UsuariosUpdateComponent ~ this.usuariosService.findOneUsuario ~ data:", data)
            this.usuario.nm_completo = data.data.nm_completo
            this.usuario.nm_usuario = data.data.nm_usuario
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao carregar usuário',
            })
          }
        })
      }
    })  
  }

  editarUsuario() {
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
      const novoUsuarioEditado = {
        nm_completo: this.usuario.nm_completo,
        nm_usuario: this.usuario.nm_usuario,
        senha: sha1(this.usuario.senha.trim()),
      }
  
      this.usuariosService.updateUsuario(this.idUsuario, novoUsuarioEditado).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Usuário atualizado com sucesso!',
          })
          this.router.navigate(['/usuarios'])
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Erro ao atualizar usuário',
          })
        }
      })
    }
  }

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
