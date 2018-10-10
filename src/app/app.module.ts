import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ErrorsModule } from './errors/errors.module';
import { AccountModule } from './account/account.module';
import { AuthGuard } from './guarda-rotas/auth.guard';
import { UsuarioGuard } from './guarda-rotas/usuario.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ErrorsModule,
    AccountModule,
    AppRoutingModule
  ],
  providers: [AuthGuard,UsuarioGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }