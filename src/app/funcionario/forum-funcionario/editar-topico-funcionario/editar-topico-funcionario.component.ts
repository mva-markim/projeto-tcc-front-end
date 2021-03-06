import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-topico-funcionario',
  templateUrl: './editar-topico-funcionario.component.html',
  styleUrls: ['./editar-topico-funcionario.component.css']
})
export class EditarTopicoFuncionarioComponent implements OnInit {
 
  private nomeEvento: string = '';

  constructor(private activated: ActivatedRoute) { }

  ngOnInit() {
    this.nomeEvento = this.activated.snapshot.params['nomeEvento'];
  }

}
