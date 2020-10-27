import { Component, OnInit, ViewChild } from '@angular/core';
import { PacienteService } from './pacientes.service';
import { Paciente } from './paciente';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  providers: [ MessageService, ]
})
export class PacientesComponent implements OnInit {
  @ViewChild('f') formAgregar: NgForm;

  model: any = {};
  es: any;
  cols: any;
  pacientes: Paciente[];
  selectedPaciente: Paciente;
  checked = true;
  displayAgregar = false;

  constructor(
    private pacienteService: PacienteService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'documento', header: 'Documento' },
      { field: 'fechaNacimiento', header: 'Edad' },
    ];

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

    this.getPacientes();
  }

  getPacientes() {
    this.pacienteService.findAll().subscribe(pacientes => {
      this.pacientes = pacientes;
    });
  }

  agregarPaciente() {
    if (this.model.nombre && this.model.apellido && this.model.documento && this.model.altura
      && this.model.peso && this.model.fechaNacimiento) {
      this.model.sexo = (this.checked) ? 'femenino' : 'masculino';
      this.model.documento = this.model.documento.replace(/\./g, '');
      this.model.fechaNacimiento = moment(this.model.fechaNacimiento, 'dd/MM/yyyy').toDate();
      this.pacienteService.save(this.model).subscribe(paciente => {
        this.model = {};
        this.pacientes.push(paciente);
        this.formAgregar.reset();
        this.displayAgregar = false;
        this.messageService.add({severity: 'success', summary: 'Paciente agregado!', detail: 'Paciente agregado exitosamente.'});
      });
    }
  }

  calcularEdad(fechaNacimiento: Date) {
    return moment().diff(moment(fechaNacimiento), 'years');
  }

  goToDetalle() {
    this.router.navigate([`/paciente`, this.selectedPaciente._id]);
  }

  onReject() {
    this.messageService.clear('c');
  }
}
