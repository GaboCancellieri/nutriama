import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Seguimiento } from '../seguimiento/seguimiento';
import { CrudService } from '../../shared/crud.service';
import { Observable } from 'rxjs';

@Injectable()
export class SeguimientoService extends CrudService<Seguimiento, string> {

  constructor(protected http: HttpClient) {
    super(http, '/seguimientos');
  }

  getSeguimientosPaciente(idPaciente: string, fecha: string): Observable<Seguimiento[]> {
      return this.http.get<Seguimiento[]>(`http://localhost:3000/seguimiento/${idPaciente}/${fecha}`);
  }

  getTablaComposicions(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/seguimientos/tabla/composicion`);
}
}
