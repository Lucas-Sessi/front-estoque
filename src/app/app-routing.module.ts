import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutDefaultComponent } from './pages/layout-default/layout-default.component';
import { loginGuard } from './guards/login.guard';
import { ProdutosListComponent } from './pages/produtos/produtos-list/produtos-list.component';
import { ProdutosPagosListComponent } from './pages/produtos-pagos/produtos-pagos-list/produtos-pagos-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosCreateComponent } from './pages/produtos/produtos-create/produtos-create.component';
import { ProdutosUpdateComponent } from './pages/produtos/produtos-update/produtos-update.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'produtos-pagos',
        component: ProdutosPagosListComponent,
      },
      {
        path: 'produtos',
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full'
          },
          {
            path: 'list',
            component: ProdutosListComponent,
          },
          {
            path: 'adicionar',
            component: ProdutosCreateComponent,
          },
          {
            path: 'editar/:cd_produto',
            component: ProdutosUpdateComponent,
          }
        ]
      }
    ],
  },
  {
    path: '**',
    redirectTo: 'login'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
