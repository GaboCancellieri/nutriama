import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-distribucion-alimentaria',
  templateUrl: './distribucion-alimentaria.component.html',
  styleUrls: ['./distribucion-alimentaria.component.scss']
})
export class DistribucionAlimentariaComponent implements OnInit {
  @Input() paciente;
  @Input() distribucion;
  @Input() newSeguimiento;
  @Output() onsave = new EventEmitter();

  tipos = [
    { label: 'Normal', value: 'Normal' },
  ];
  cantidadComidas = [
    { label: 'Tres', value: 3 },
    { label: 'Cuatro', value: 4 },
    { label: 'Cinco', value: 5 },
    { label: 'Seis', value: 6 },
  ];
  numeroComidas;
  tipoDistribucion;
  comidas = [];
  edit = false;
  unidades = [
    { label: 'gramos', value: 'gramos' },
    { label: 'miligramos', value: 'miligramos' },
    { label: 'litros', value: 'litros' },
    { label: 'mililitros', value: 'mililitros' },
    { label: 'tazon', value: 'tazon' },
    { label: 'taza', value: 'taza' },
    { label: 'tacita', value: 'tacita' },
    { label: 'cucharada', value: 'cucharada' },
    { label: 'cucharadita', value: 'cucharadita' },
    { label: 'vaso', value: 'vaso' },
    { label: 'vasito', value: 'vasito' },
    { label: 'rodajas', value: 'rodajas' },
    { label: 'puñados', value: 'puñados' },
  ];
  constructor() {}

  ngOnInit() {
    this.edit = (!this.distribucion) ? true : false;
  }

  makeComidas() {
    this.comidas = [];
    this.comidas.push({
      nombre: 'Desayuno',
      plato: null,
      equivalencias: [],
    },
    {
      nombre: 'Almuerzo',
      plato: null,
      equivalencias: [],
    },
    {
      nombre: 'Cena',
      plato: null,
      equivalencias: [],
    });
    if (this.numeroComidas > 3){
      this.comidas.splice(2, 0, {
        nombre: 'Merienda',
        plato: null,
        equivalencias: [],
      });
    }

    if (this.numeroComidas > 4) {
      this.comidas.splice(1, 0, {
        nombre: 'Colación',
        plato: null,
        equivalencias: [],
      });
    }

    if (this.numeroComidas > 5) {
      this.comidas.splice(3, 0, {
        nombre: 'Colación',
        plato: null,
        equivalencias: [],
      });
    }
  }

  save() {

  }

  getOptions() {
    return [{
      nombre: 'Cafe con leche',
      ingredientes: [
        { nombre: 'Café', cantidad: 0, unidad: null },
        { nombre: 'Leche', cantidad: 0, unidad: null  },
        { nombre: 'Azúcar', cantidad: 0, unidad: null  },
      ]
    }];
  }
}
