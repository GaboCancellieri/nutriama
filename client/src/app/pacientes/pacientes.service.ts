import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from './paciente';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class PacienteService extends CrudService<Paciente, string> {

  constructor(protected http: HttpClient) {
    super(http, '/pacientes');
  }

}
