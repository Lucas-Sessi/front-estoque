import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './pages/login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LayoutDefaultComponent } from './pages/layout-default/layout-default.component';
import { TableModule } from 'primeng/table';
import { ProdutosListComponent } from './pages/produtos/produtos-list/produtos-list.component';
import { MenuModule } from 'primeng/menu';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProdutosPagosListComponent } from './pages/produtos-pagos/produtos-pagos-list/produtos-pagos-list.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosCreateComponent } from './pages/produtos/produtos-create/produtos-create.component';
import { DialogModule } from 'primeng/dialog';
import { ProdutosUpdateComponent } from './pages/produtos/produtos-update/produtos-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LayoutDefaultComponent,
    ProdutosPagosListComponent,
    ProdutosListComponent,
    HomeComponent,
    ProdutosCreateComponent,
    ProdutosUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    TabMenuModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    AppRoutingModule,
    TabMenuModule,
    TableModule,
    MenuModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
