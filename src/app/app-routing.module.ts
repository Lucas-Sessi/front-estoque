import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutDefaultComponent } from './pages/layout-default/layout-default.component';
import { loginGuard } from './guards/login.guard';
import { EstoqueListComponent } from './pages/estoque/estoque-list/estoque-list.component';

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
        path: 'estoque',
        component: EstoqueListComponent,
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
