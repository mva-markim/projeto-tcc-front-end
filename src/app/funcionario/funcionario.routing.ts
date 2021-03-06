import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GetUserResolve } from '../user/get-user.resolve';
import { FuncionarioComponent } from './funcionario.component';
import { GetTopicoNomeResolve } from '../forum/getTopicoResolve';
import { BuscaEventoResolve } from '../evento/busca-evento.resolve';
import { BuscaAgendaResolve } from '../agenda/busca-agenda.resolve';
import { FuncionarioMeusDadosComponent } from './meus-dados/meus-dados.component';
import { FuncionarioMeusEventosComponent } from './meus-eventos/meus-eventos.component';
import { HomeFuncionarioComponent } from './home-funcionario/home-funcionario.component';
import { FuncionarioMinhasAgendaComponent } from './minhas-agenda/minhas-agenda.component';
import { FuncionarioAlterarFotoComponent } from './meus-dados/alterar-foto/alterar-foto.component';
import { FuncionarioCriarEventoComponent } from './meus-eventos/criar-evento/criar-evento.component';
import { FuncionarioAlterarSenhaComponent } from './meus-dados/alterar-senha/alterar-senha.component';
import { FuncionarioAlterarDadosComponent } from './meus-dados/alterar-dados/alterar-dados.component';
import { FuncionarioCriarAgendaComponent } from './minhas-agenda/criar-agenda/criar-agenda.component';
import { FuncionarioAlterarEventoComponent } from './meus-eventos/alterar-evento/alterar-evento.component';
import { FuncionarioAlterarAgendaComponent } from './minhas-agenda/alterar-agenda/alterar-agenda.component';
import { FuncionarioDetalhesEventoComponent } from './meus-eventos/detalhes-evento/detalhes-evento.component';
import { FuncionarioDetalhesAgendaComponent } from './minhas-agenda/detalhes-agenda/detalhes-agenda.component';
import { FuncionarioConfirmaPresencaComponent } from './meus-eventos/confirma-presenca/confirma-presenca.component';
import { ListaTopicosFuncionarioComponent } from './forum-funcionario/lista-topicos-funcionario/lista-topicos-funcionario.component';
import { CriarTopicoFuncionarioComponent } from './forum-funcionario/criar-topico-funcionario/criar-topico-funcionario.component';
import { EditarTopicoFuncionarioComponent } from './forum-funcionario/editar-topico-funcionario/editar-topico-funcionario.component';



const routes: Routes = [
  {
    path: '', component: FuncionarioComponent, resolve: { user: GetUserResolve },
    children: [
      { path: '', component: HomeFuncionarioComponent },
      { path: 'meus-dados', component: FuncionarioMeusDadosComponent, resolve: { user: GetUserResolve } },
      { path: 'meus-eventos', component: FuncionarioMeusEventosComponent, resolve: { user: GetUserResolve } },
      { path: 'agendas-de-eventos', component: FuncionarioMinhasAgendaComponent, resolve: { user: GetUserResolve } },

      { path: 'criar-evento', component: FuncionarioCriarEventoComponent },
      { path: 'criar-agenda', component: FuncionarioCriarAgendaComponent, resolve: { user: GetUserResolve } },

      { path: 'alterar-senha', component: FuncionarioAlterarSenhaComponent },
      { path: 'alterar-foto', component: FuncionarioAlterarFotoComponent },
      { path: 'alterar-dados', component: FuncionarioAlterarDadosComponent, resolve: { user: GetUserResolve } },

      { path: 'topicos/:nomeEvento/criar-topico', component: CriarTopicoFuncionarioComponent },
      { path: 'topicos/:nomeEvento/editar-topico/:nomeTopico', component: EditarTopicoFuncionarioComponent, resolve: { nomeTopico: GetTopicoNomeResolve } },

      { path: 'editar-evento/:id', component: FuncionarioAlterarEventoComponent, resolve: { evento: BuscaEventoResolve } },
      { path: 'editar-agenda/:id', component: FuncionarioAlterarAgendaComponent, resolve: { agenda: BuscaAgendaResolve } },

      { path: 'confirmacao-presenca/:id', component: FuncionarioConfirmaPresencaComponent },
      
      { path: 'topicos/:nomeEvento', component: ListaTopicosFuncionarioComponent },

      { path: 'meus-eventos/detalhes-evento/:id', component: FuncionarioDetalhesEventoComponent },
      { path: 'agendas-de-eventos/detalhes-agenda/:id', component: FuncionarioDetalhesAgendaComponent, resolve: { user: GetUserResolve } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FuncionarioRoutingModule { }
