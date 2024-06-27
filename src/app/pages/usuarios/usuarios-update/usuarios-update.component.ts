import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../services/usuarios';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import sha1 from 'sha1';

@Component({
  selector: 'app-usuarios-update',
  templateUrl: './usuarios-update.component.html',
  styleUrl: './usuarios-update.component.css',
  providers: [MessageService],
})
export class UsuariosUpdateComponent implements OnInit {
  usuario: any = {
    nm_completo: '',
    nm_usuario: '',
    nova_senha: '',
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
    if (this.usuario.nova_senha !== this.usuario.confirmacao_senha) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Senhas diferentes',
      });

      return;
    }

    const novoUsuarioEditado = {
      nm_completo: this.usuario.nm_completo,
      nm_usuario: this.usuario.nm_usuario,
      senha: sha1(this.usuario.nova_senha),
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

  cancelar() {
    this.router.navigate(['/usuarios']);
  }

}
