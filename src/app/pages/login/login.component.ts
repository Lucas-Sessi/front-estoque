import { Component } from '@angular/core';
import { AuthService } from '../../guards/auth.service';
import { MessageService } from 'primeng/api';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private readonly authService: AuthService,
    private messageService: MessageService,
    private readonly loginService: LoginService,
  ) {}

  login() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (user) => {
          this.authService.login(user.data);

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Login successful',
          });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'email ou senha incorreto!',
        });
      },
    });
  }
}
