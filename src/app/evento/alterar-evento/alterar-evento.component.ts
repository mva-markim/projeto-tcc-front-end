import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { Agenda } from '../../agenda/agenda';
import { Funcionario } from '../../funcionario/funcionario';
import { ScriptService } from '../../../script.service';
import { FuncionarioService } from '../../funcionario/funcionario.service';
import { Evento } from '../evento';
import { EventoService } from '../evento.service';
import { AgendaService } from '../../agenda/agenda.service';

@Component({
  selector: 'app-alterar-evento',
  templateUrl: './alterar-evento.component.html',
  styleUrls: ['./alterar-evento.component.css']
})
export class AlterarEventoComponent implements OnInit {

  form: FormGroup;
  agendas: Agenda[] = [];
  funcionarios: Funcionario[] = [];
  evento: Evento = new Evento();
  lista: Funcionario[] = [];
  fileToUpload: File = null;

  constructor(
    private script: ScriptService,
    private agendaService: AgendaService,
    private funcionarioService: FuncionarioService,
    private formBuild: FormBuilder,
    private eventoService: EventoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.script.load('konohajs').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));

    this.agendaService.getAllAgendas().subscribe(
      (data: Agenda[]) => { this.agendas = data },
      (err) => {
        console.log(err);
      }
    );
    this.evento = this.route.snapshot.data['evento'];

    this.atualizaCampos(this.evento);

    this.funcionarioService.getAll().subscribe(
      (data: Funcionario[]) => {
        this.funcionarios = data
      },
      (err) => {
        console.log(err);
      }
    );

  }

  adicionarFuncionario(funcionario) {
    this.lista.push(funcionario);
  }

  atualizaCampos(event: Evento) {
    this.form = this.formBuild.group({
      lista: this.funcionarios,
      nome: [event.Nome, [Validators.required, Validators.maxLength(100)]],
      local: [event.Local, [Validators.required, Validators.maxLength(100)]],
      diaEvento: [event.DataInicio, [Validators.required]],
      dataInicio: [event.DataInicio, [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      dataEncerramento: [event.DataEncerramento, [Validators.required, Validators.pattern('[0-9]{2}[:|\/]{1}[0-9]{2}')]],
      descricao: [event.Descricao, [Validators.required, Validators.maxLength(500)]],
      apresentador: [event.Apresentador, [Validators.required, Validators.maxLength(300)]],
      cargaHoraria: [event.CargaHoraria, Validators.required],
      quantidadeVagas: [event.NumeroVagas, Validators.required],
      tipoEvento: [event.TipoEvento, [Validators.required, Validators.maxLength(50)]],
      imagem: [Validators.required]
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('imagem').setValue({
          value: reader.result.toString().split(',')[1]
        })
      }
    }
  }

  pegaAgendaId(idAgenda) {
    this.evento.AgendaEventoId = idAgenda;
  }

  atualizaEvento() {

    var hrInicio = this.form.get('diaEvento').value + " " + this.form.get('dataInicio').value;
    var hrEncerramento = this.form.get('diaEvento').value + " " + this.form.get('dataEncerramento').value;

    this.evento.Nome = this.form.get('nome').value;
    this.evento.Local = this.form.get('local').value;
    this.evento.DataInicio = hrInicio;
    this.evento.DataEncerramento = hrEncerramento;
    this.evento.Descricao = this.form.get('descricao').value;
    this.evento.Apresentador = this.form.get('apresentador').value;
    this.evento.CargaHoraria = this.form.get('cargaHoraria').value;
    this.evento.NumeroVagas = this.form.get('quantidadeVagas').value;
    this.evento.TipoEvento = this.form.get('tipoEvento').value;
    var path = this.form.get('imagem').value;
    this.evento.PathImagem = path.value;

    this.evento.funcionario = this.lista;
  }

  onSubmit() {

    if (this.form.invalid)
      return;

    this.atualizaEvento();

    this.eventoService.editarEvento(this.evento).subscribe(
      () => { alert("Evento alterado com sucesso."); this.router.navigate(['/funcionario-dashboard']) },
      (err: HttpErrorResponse) => {
        if (err.status == 401) {
          alert("Usuario não logado");
          this.router.navigate(["/login"])
        }
        else {
         alert("Falha ao alterar agenda. Por favor tente novamente");
        }
      }
    );

  }

}