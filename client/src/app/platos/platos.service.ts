import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plato } from './plato';
import { CrudService } from '../shared/crud.service';

@Injectable()
export class PlatoService extends CrudService<Plato, string> {

  constructor(protected http: HttpClient) {
    super(http, '/platos');
  }

}
