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
        { label: 'Estoque', icon: 'pi pi-box', routerLink: ['/estoque'] },
        { label: 'Usuários', icon: 'pi pi-user', routerLink: ['/usuarios']},
        { label: 'Produtos', icon: 'pi pi-tags', routerLink: ['/produtos'] },
      ];

      this.activeItem = this.items[0];
  }
}