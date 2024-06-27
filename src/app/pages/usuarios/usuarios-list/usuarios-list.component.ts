import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from '../../../services/usuarios';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrl: './usuarios-list.component.css',
  providers: [MessageService, ConfirmationService],
})
export class UsuariosListComponent implements OnInit {
  usuarios$: any;
  usuarios: any[] = [];
  isLoading: boolean = true;

  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly router: Router,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.usuarios$ = new Observable<any[]>();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.data;

        this.isLoading = false;        
      },
      error: (error) => {
        if(error.status === 400 || error.status === 500) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.error || 'Erro ao carregar usuários',
          });
        }
    }
  })
  }

  adicionarUsuario() {
    this.router.navigate(['/usuarios/adicionar']);
  }

  editarUsuario(id: number) {
    this.router.navigate([`/usuarios/editar/${id}`]);
  }

  deletarUsuario(id: number, event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Você tem certeza que deseja excluir este usuário?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.usuariosService.deleteUsuario(id).subscribe({
            next: () => {
              this.getUsuarios();
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Usuário deletado com sucesso!' });
            },
            error: (error) => {
              console.error(error);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Erro ao deletar produto!'})
            }
          })
      },
      reject: () => {
          this.getUsuarios();
      }
  });
  }
}
