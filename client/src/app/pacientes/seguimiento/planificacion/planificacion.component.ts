import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import * as constantesGET from '../constantes';
import { SeguimientoService } from '../seguimiento.service';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.scss']
})
export class PlanificacionComponent implements OnInit{

  @Input() paciente;
  @Input() planificacion;
  @Input() newSeguimiento;
  @Output() onsave = new EventEmitter();

  modelCarbohidratos: any = {
    porcentaje: 55,
  };
  modelProteinas: any = {
    porcentaje: 30,
  };
  modelGrasas: any = {
    porcentaje: 15,
  };
  modelAlimento: any = {
    nombre: null,
    cantidad: 0,
    carbohidratos: 0,
    proteinas: 0,
    grasas: 0,
  };
  modelTotales: any = {
    kcal: 0,
    carbohidratos: 0,
    proteinas: 0,
    grasas: 0,
  };
  modelRestantes: any = {
    kcal: 0,
    carbohidratos: 0,
    proteinas: 0,
    grasas: 0,
  };
  actividadFisica;
  factoresActividad;
  OMS;
  x: number;
  y: number;
  peso: number;
  nivelesActividad = [
    {label: 'Muy Leve', value: null},
    {label: 'Leve', value: 'Leve'},
    {label: 'Moderado', value: 'Moderado'},
    {label: 'Intenso', value: 'Intenso'},
    {label: 'Excepcional', value: 'Excepcional'},
];
  edit = false;
  errorMessage = [{key: 'errorPorcentaje', severity: 'error', summary: 'Error', detail: 'El porcentaje total debe sumar 100%'}];
  tablaComposicion = [];
  alimentoSeleccionado;

  constructor(
    private seguimientoService: SeguimientoService,
  ){}

  ngOnInit() {
    this.factoresActividad = (this.paciente.sexo === 'femenino') ? constantesGET.FactoresActMujer : constantesGET.FactoresActHombre;
    this.OMS = (this.paciente.sexo === 'femenino') ? constantesGET.OMSMujer : constantesGET.OMSHombre;

    const edad = moment().diff(moment(this.paciente.fechaNacimiento).toDate(), 'years');
    for (const value of this.OMS) {
      if (edad > value.desde && edad <= value.hasta ) {
        this.x = value.x;
        this.y = value.y;
      }
    }

    if (!this.newSeguimiento) {
      this.modelCarbohidratos = this.planificacion.formulaSintetica.carbohidratos;
      this.modelProteinas = this.planificacion.formulaSintetica.proteinas;
      this.modelGrasas = this.planificacion.formulaSintetica.grasas;
      this.modelRestantes.kcal = this.getRound(this.planificacion.gastoEnergeticoTotal);
      this.modelRestantes.carbohidratos = this.getRound(this.modelCarbohidratos.kcal);
      this.modelRestantes.proteinas = this.getRound(this.modelProteinas.kcal);
      this.modelRestantes.grasas = this.getRound(this.modelGrasas.kcal);
      if (this.planificacion.formulaDesarrollada) {
        for (const alimento of this.planificacion.formulaDesarrollada.alimentos) {
          this.updateTotales(alimento, true);
        }
      }
    }

    this.getTablaComposicions();
  }

  getTablaComposicions() {
      this.seguimientoService.getTablaComposicions().subscribe( tabla => {
          this.tablaComposicion = tabla;
    });
  }

  save() {
    this.planificacion.formulaSintetica.carbohidratos = this.modelCarbohidratos;
    this.planificacion.formulaSintetica.proteinas = this.modelProteinas;
    this.planificacion.formulaSintetica.grasas = this.modelGrasas;
    this.onsave.emit(this.planificacion);
    this.edit = false;
  }

  calcularGET() {
    let factor = 1;
    if (!this.actividadFisica) {
      factor = this.factoresActividad[0].factor;
    } else {
      for (const value of this.factoresActividad) {
        if (this.actividadFisica === value.nivel) {
          factor = value.factor;
        }
      }
    }

    this.planificacion.gastoEnergeticoTotal = (this.x * this.planificacion.peso + this.y) * factor;
    this.calcularFormulaSintetica();
  }

  calcularFormulaSintetica(value = null){
    if (value === 'porcentaje') {
      // Carbohidratos
      this.modelCarbohidratos.kcal = (this.planificacion.gastoEnergeticoTotal * this.modelCarbohidratos.porcentaje) / 100;
      this.modelCarbohidratos.gramos = this.modelCarbohidratos.kcal / 4;
      this.modelCarbohidratos.gramosKilosDia = this.modelCarbohidratos.gramos / this.planificacion.peso;

      // Proteinas
      this.modelProteinas.kcal = (this.planificacion.gastoEnergeticoTotal * this.modelProteinas.porcentaje) / 100;
      this.modelProteinas.gramos = this.modelProteinas.kcal / 4;
      this.modelProteinas.gramosKilosDia = this.modelProteinas.gramos / this.planificacion.peso;

      // Grasas
      this.modelGrasas.kcal = (this.planificacion.gastoEnergeticoTotal * this.modelGrasas.porcentaje) / 100;
      this.modelGrasas.gramos = this.modelGrasas.kcal / 4;
      this.modelGrasas.gramosKilosDia = this.modelGrasas.gramos / this.planificacion.peso;
    } else {
      // Carbohidratos
      this.modelCarbohidratos.gramos = this.modelCarbohidratos.gramosKilosDia * this.planificacion.peso;
      this.modelCarbohidratos.kcal = this.modelCarbohidratos.gramos * 4;
      this.modelCarbohidratos.porcentaje = Math.round((this.modelCarbohidratos.kcal * 100) / this.planificacion.gastoEnergeticoTotal);

      // Proteinas
      this.modelProteinas.gramos = this.modelProteinas.gramosKilosDia * this.planificacion.peso;
      this.modelProteinas.kcal = this.modelProteinas.gramos * 4;
      this.modelProteinas.porcentaje = Math.round((this.modelProteinas.kcal * 100) / this.planificacion.gastoEnergeticoTotal);

      // Grasas
      this.modelGrasas.gramos = this.modelGrasas.gramosKilosDia * this.planificacion.peso;
      this.modelGrasas.kcal = this.modelGrasas.gramos * 4;
      this.modelGrasas.porcentaje = Math.round((this.modelGrasas.kcal * 100) / this.planificacion.gastoEnergeticoTotal);
    }
  }

  addAlimento() {
    this.planificacion.formulaDesarrollada.alimentos.push({
      nombre: null,
      cantidad: 0,
      carbohidratos: 0,
      proteinas: 0,
      grasas: 0,
    });
  }

  deleteRow(alimento) {
    this.updateTotales(alimento, false);
    this.planificacion.formulaDesarrollada.alimentos = this.planificacion.formulaDesarrollada.alimentos
    .filter( a => a.nombre !== alimento.nombre);
  }

  calcularValoresAlimento() {
    this.modelAlimento.nombre = this.alimentoSeleccionado.alimento;
    this.modelAlimento.carbohidratos = this.getRound((this.alimentoSeleccionado.carbohidratos * this.modelAlimento.cantidad) / 100);
    this.modelAlimento.proteinas = this.getRound((this.alimentoSeleccionado.proteinas * this.modelAlimento.cantidad) / 100);
    this.modelAlimento.grasas = this.getRound((this.alimentoSeleccionado.grasas * this.modelAlimento.cantidad) / 100);
  }

  onRowEditSave() {
    this.planificacion.formulaDesarrollada.alimentos[this.planificacion.formulaDesarrollada.alimentos.length - 1] = this.modelAlimento;
    this.updateTotales(this.modelAlimento, true);
    this.modelAlimento = {};
    this.alimentoSeleccionado = null;
  }

  updateTotales(alimento, plus) {
    if (plus) {
      this.modelTotales.carbohidratos = this.getRound(this.modelTotales.carbohidratos + alimento.carbohidratos);
      this.modelTotales.proteinas = this.getRound(this.modelTotales.proteinas + alimento.proteinas);
      this.modelTotales.grasas = this.getRound( this.modelTotales.grasas + alimento.grasas);
      this.modelTotales.kcal = this.getRound(this.modelTotales.kcal + alimento.carbohidratos + alimento.proteinas + alimento.grasas);
      this.modelRestantes.carbohidratos = this.getRound(this.modelRestantes.carbohidratos - alimento.carbohidratos);
      this.modelRestantes.proteinas = this.getRound(this.modelRestantes.proteinas - alimento.proteinas);
      this.modelRestantes.grasas = this.getRound(this.modelRestantes.grasas - alimento.grasas);
      this.modelRestantes.kcal = this.getRound(this.modelRestantes.kcal - alimento.carbohidratos - alimento.proteinas - alimento.grasas);
    } else {
      this.modelTotales.carbohidratos = this.getRound(this.modelTotales.carbohidratos - alimento.carbohidratos);
      this.modelTotales.proteinas = this.getRound(this.modelTotales.proteinas - alimento.proteinas);
      this.modelTotales.grasas = this.getRound( this.modelTotales.grasas - alimento.grasas);
      this.modelTotales.kcal = this.getRound(this.modelTotales.kcal - alimento.carbohidratos - alimento.proteinas - alimento.grasas);
      this.modelRestantes.carbohidratos = this.getRound(this.modelRestantes.carbohidratos + alimento.carbohidratos);
      this.modelRestantes.proteinas = this.getRound(this.modelRestantes.proteinas + alimento.proteinas);
      this.modelRestantes.grasas = this.getRound(this.modelRestantes.grasas + alimento.grasas);
      this.modelRestantes.kcal = this.getRound(this.modelRestantes.kcal + alimento.carbohidratos + alimento.proteinas + alimento.grasas);
    }
  }

  getRound(num) {
    return Math.round(num * 100) / 100;
  }
}
