import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { PlatoService } from './platos.service';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.scss'],
  providers: [ MessageService, ]
})
export class PlatosComponent implements OnInit {
    @ViewChild('f', { read: NgForm }) form: NgForm;

    platos = [];
    auxPlatos = [];

    tipos = [
        {label: 'Carne', value: 'Carne'},
        {label: 'Vegetariano', value: 'Vegetariano'},
        {label: 'Vegano', value: 'Vegano'},
    ];

    model: any = {
        ingredientes: [],
    };
    checked = false;
    filtros: any = {
        esColacion: null,
    };
    ingredientes = [];
    selectedIngrediente = null;
    onAddIngrediente = false;
    displayAgregar = false;

    constructor(
        private platosService: PlatoService,
        private messageService: MessageService,
    ){}

    ngOnInit() {
        this.getPlatos();

        this.ingredientes = [
            { nombre: 'Carne Magra', tienePorcion: true },
            { nombre: 'Merluza', tienePorcion: true },
            { nombre: 'Lechuga', tienePorcion: true },
            { nombre: 'Tomate', tienePorcion: true },
            { nombre: 'Zapallo', tienePorcion: true },
            { nombre: 'Papa', tienePorcion: true },
            { nombre: 'Leche'},
            { nombre: 'Queso', tienePorcion: true },
            { nombre: 'Acelga', tienePorcion: true },
            { nombre: 'Arvejas', tienePorcion: true },
            { nombre: 'Choclo', tienePorcion: true },
            { nombre: 'Café'},
            { nombre: 'Té'},
            { nombre: 'Galletas', tienePorcion: true },
        ];

        this.ingredientes = this.ingredientes.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
    }

    getPlatos() {
        this.platosService.findAll().subscribe( platos => {
            this.platos = platos;
            this.auxPlatos = Object.assign(platos);
        });
    }

    save() {
        const plato = {
            nombre: this.model.nombre,
            tipo: this.model.tipo,
            esColacion: this.checked,
            imagen: this.model.imagen,
            ingredientes: this.model.ingredientes,
        };
        this.platosService.save(plato).subscribe( platoGuardado => {
            this.messageService.clear('c');
            this.messageService.add({key: 'c', severity: 'success', summary: 'Plato agregado!',
            detail: 'Plato agregado exitosamente.'});
            this.platos.push(plato);
            this.model = {
                ingredientes: [],
            };
            this.checked = false;
            this.displayAgregar = false;
            this.form.resetForm();
        });
    }

    filtrar() {
        this.auxPlatos = Object.assign(this.platos);
        if (this.filtros.nombre) {
            this.auxPlatos = this.auxPlatos.filter(p => p.nombre.toLowerCase().includes(this.filtros.nombre.toLowerCase()));
        }

        if (this.filtros.tipo) {
            this.auxPlatos = this.auxPlatos.filter(p => {
                return p.tipo.toLowerCase() === this.filtros.tipo.toLowerCase();
            });
        }

        if (this.filtros.esColacion !== null && this.filtros.esColacion !== undefined) {
            this.auxPlatos = this.auxPlatos.filter(p => p.esColacion === this.filtros.esColacion);
        }
    }

    addIngrediente() {
        this.model.ingredientes.push(this.selectedIngrediente);
        this.selectedIngrediente = null;
        this.onAddIngrediente = false;
    }

    removeIngrediente() {
        this.model.ingredientes.pop();
    }

    onReject() {
        this.messageService.clear('c');
      }
}
