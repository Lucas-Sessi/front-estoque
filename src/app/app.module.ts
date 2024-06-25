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
import { EstoqueListComponent } from './pages/estoque/estoque-list/estoque-list.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LayoutDefaultComponent,
    EstoqueListComponent
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
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
