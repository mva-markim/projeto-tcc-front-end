import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './errors/not-found/not-found.component';
import { AuthGuard } from './guarda-rotas/auth.guard';
import { UsuarioGuard } from './guarda-rotas/usuario.guard';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },

    {
        path: 'admin-dashboard',
        loadChildren: '../app/admin/admin.module#AdminModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    {
        path: 'funcionario-dashboard',
        loadChildren: '../app/funcionario/funcionario.module#FuncionarioModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    {
        path: 'participante-dashboard',
        loadChildren: '../app/participante/participante.module#ParticipanteModule',
        canActivate: [AuthGuard],
        canActivateChild: [UsuarioGuard]
    },

    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
