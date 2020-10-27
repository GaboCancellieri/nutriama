import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from '../pacientes.service';
import { Paciente } from '../paciente';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-pacientes',
  templateUrl: './paciente-detalle.component.html',
  styleUrls: ['./paciente-detalle.component.scss'],
})
export class PacienteDetalleComponent implements OnInit {

  model: any = {};
  es: any;
  cols: any;
  paciente: Paciente;
  pacienteAux: Paciente;
  edad: number;
  editar = false;

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    ) {}

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
        monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
        today: 'Hoy',
        clear: 'Borrar'
    };

    this.route.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.getPaciente(params['id']);
    });
  }

  getPaciente(id: string) {
    this.pacienteService.findOne(id).subscribe(paciente => {
      this.paciente = paciente;
      this.pacienteAux = Object.assign({}, paciente);
      this.edad = this.calcularEdad(paciente.fechaNacimiento);
    });
  }

  calcularEdad(fechaNacimiento: Date) {
    return moment().diff(moment(fechaNacimiento), 'years');
  }

  updatePaciente() {
    let validMail = true;
    if (this.pacienteAux.email && this.pacienteAux.email.trim()) {
      validMail = this.validateMail();
    }

    if (validMail) {
      this.pacienteAux.documento = this.pacienteAux.documento.replace(/\./g, '');
      if (this.pacienteAux.telefono) {
        this.pacienteAux.telefono = this.pacienteAux.telefono.replace(/\(/g, '');
        this.pacienteAux.telefono = this.pacienteAux.telefono.replace(/\)\s/g, '');
        this.pacienteAux.telefono = this.pacienteAux.telefono.replace(/\-/g, '');
      }
      this.paciente = Object.assign({}, this.pacienteAux);
      console.log(this.paciente.telefono);
      this.pacienteService.update(this.paciente._id, this.paciente).subscribe(paciente => {
        this.messageService.clear();
        this.messageService.add({key: 'c', severity: 'success', summary: 'Paciente Actualizado!', detail: 'Paciente actualizado exitosamente.'});
        this.editar = false;
      });
    } else {
      this.messageService.clear();
      this.messageService.add({key: 'c', severity: 'error', summary: 'Mail Inválido!', detail: 'Ingrese un mail valido.'});
    }
  }

  crearUsuario() {
    if (this.paciente.email) {

    } else {
      this.messageService.clear();
      this.messageService.add({key: 'c', severity: 'error', summary: 'Paciente no tiene mail!', detail: 'Se requiere email de paciente.'});
    }
  }

  cancelEdit() {
    this.pacienteAux = Object.assign({}, this.paciente);
    this.editar = false;
  }

  validateMail() {
    return this.pacienteAux.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) !== null;
  }

  onReject() {
    this.messageService.clear('c');
  }

  onDelete() {
    this.confirmationService.confirm({
      message: '¿Está seguro que quiere inactivar al paciente? Al inactivarlo no podrá continuar con el seguimiento.',
      header: '¿Inactivar Paciente?',
      icon: 'pi pi-exclamation-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-rounded p-button-raised p-button-sm',
      acceptLabel: 'Inactivar',
      acceptIcon: 'pi pi-lock',
      rejectButtonStyleClass: 'p-button-info p-button-rounded p-button-raised p-button-sm',
      rejectLabel: 'Cancelar',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.paciente.estado = 'inactivo';
        this.pacienteService.update(this.paciente._id, this.paciente).subscribe( paciente => {
          this.messageService.clear();
          this.messageService.add({key: 'c', severity: 'success', summary: 'Paciente inactivado!', detail: 'El paciente fue inactivado.'});
        });
      },
  });
  }

  onActivate() {
    this.confirmationService.confirm({
      message: '¿Está seguro que quiere activar al paciente? Al activarlo podrá continuar con el seguimiento.',
      header: 'Activar Paciente?',
      icon: 'pi pi-exclamation-circle',
      acceptButtonStyleClass: 'p-button-success p-button-rounded p-button-raised p-button-sm',
      acceptLabel: 'Activar',
      acceptIcon: 'pi pi-lock-open',
      rejectButtonStyleClass: 'p-button-info p-button-rounded p-button-raised p-button-sm',
      rejectLabel: 'Cancelar',
      rejectIcon: 'pi pi-times',
      accept: () => {
        this.paciente.estado = 'activo';
        this.pacienteService.update(this.paciente._id, this.paciente).subscribe( paciente => {
          this.messageService.clear();
          this.messageService.add({key: 'c', severity: 'success', summary: 'Paciente activado!', detail: 'El paciente fue activado.'});
        });
      },
  });
  }
}
