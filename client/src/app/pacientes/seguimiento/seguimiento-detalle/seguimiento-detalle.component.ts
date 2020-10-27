import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Seguimiento } from '../seguimiento';
import { SeguimientoService } from '../seguimiento.service';

@Component({
  selector: 'app-seguimiento-detalle',
  templateUrl: './seguimiento-detalle.component.html',
  styleUrls: ['./seguimiento-detalle.component.scss', '../../pacientes.component.scss']
})
export class SeguimientoDetalleComponent implements OnInit {
    @Input() seguimiento: Seguimiento;
    @Output() deselect = new EventEmitter();

    edit = false;
    planificacion = {
        gastoEnergeticoTotal: 0,
        formulaSintetica: {
            carbohidratos: {
                porcentaje: 0,
                kcal: 0,
                gramos: 0,
                gramosKilosDia: 0,
            },
            proteinas: {
                porcentaje: 0,
                kcal: 0,
                gramos: 0,
                gramosKilosDia: 0,
            },
            grasas: {
                porcentaje: 0,
                kcal: 0,
                gramos: 0,
                gramosKilosDia: 0,
            },
        },
        formulaDesarrollada: {
            alimentos: [],
            kcalTotal: 0,
        },
    };
    distribucion;
    seleccionAlimentos;
    recomendaciones;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private seguimientoService: SeguimientoService,
    ){}

    ngOnInit() {
        if (!this.seguimiento.fecha) {
            this.seguimiento.fecha = moment().toDate();
        }

        console.log(this.seguimiento.planificacion);

        if (this.seguimiento.planificacion) {
            this.planificacion = this.seguimiento.planificacion;
        }

        if (this.seguimiento.distribucion) {
            this.distribucion = this.seguimiento.distribucion;
        }

        if (this.seguimiento.seleccionAlimentos) {
            this.seleccionAlimentos = this.seguimiento.seleccionAlimentos;
        }

        if (this.seguimiento.recomendaciones) {
            this.recomendaciones = this.seguimiento.recomendaciones;
        }
    }

    save(event) {
        this.seguimiento.planificacion = event;
        this.seguimientoService.update(this.seguimiento._id, this.seguimiento).subscribe((seguimiento) => {
            this.messageService.clear();
            this.messageService.add({key: 'tr', severity: 'success', summary: 'Seguimiento guardado!',
            detail: 'El seguimiento se guardó exitosamente.'});
        });
    }

    goBack() {
        this.deselect.emit();
    }
}
