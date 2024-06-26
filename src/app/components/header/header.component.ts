import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;

  ngOnInit() {
      this.items = [
        { label: 'Produtos', icon: 'pi pi-tags', routerLink: ['/produtos'] },
        { label: 'Produtos pagos', icon: 'pi pi-box', routerLink: ['/produtos-pagos'] },
        { label: 'Usuários', icon: 'pi pi-user', routerLink: ['/usuarios']},
      ];

      this.activeItem = this.items[0];
  }
}