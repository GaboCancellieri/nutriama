import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from '../paciente';
import * as moment from 'moment';
import { SeguimientoService } from './seguimiento.service';
import { Seguimiento } from './seguimiento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.scss']
})
export class SeguimientoComponent implements OnInit {
  @Input() paciente: Paciente;
  seguimientos: any[];
  selectedSeguimiento: Seguimiento;
  fecha = moment().toDate();
  weekday = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  constructor(
    private router: Router,
    private seguimientoService: SeguimientoService,
  ) {}

  ngOnInit() {
    this.getSeguimientosPaciente();
  }

  getSeguimientosPaciente() {
    this.seguimientoService.getSeguimientosPaciente(this.paciente._id, this.fecha.toISOString()).subscribe( seguimientos => {
      this.seguimientos = seguimientos;
      if (seguimientos.length > 0) {
        seguimientos[0].fecha = moment(seguimientos[0].fecha).toDate();
      }
    });
  }

  verDetalle(seguimiento) {
    this.selectedSeguimiento = seguimiento;
  }

  deselect() {
    this.selectedSeguimiento = null;
  }

  addSeguimiento() {
    const nuevoSeguimiento = new Seguimiento();
    nuevoSeguimiento.paciente = this.paciente;
    this.selectedSeguimiento = nuevoSeguimiento;
  }
}
