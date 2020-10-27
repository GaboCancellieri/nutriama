'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeguimientoSchema = new Schema({
    peso: { type: Number, required: true },
    fecha: { type: Date, required: true },
    paciente: {
        id: { type: Schema.Types.ObjectId, ref: 'Pacientes' },
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        documento: { type: String, required: true },
        sexo: { type: String, required: true },
        fechaNacimiento: { type: Date, required: true },
    },
    planificacion: {
        peso: Number,
        actividadFisica: String,
        gastoEnergeticoTotal: Number,
        formulaSintetica: {
            carbohidratos: {
                porcentaje: Number,
                kcal: Number,
                gramos: Number,
                gramosKilosDia: Number,
            },
            proteinas: {
                porcentaje: Number,
                kcal: Number,
                gramos: Number,
                gramosKilosDia: Number,
            },
            grasas: {
                porcentaje: Number,
                kcal: Number,
                gramos: Number,
                gramosKilosDia: Number,
            },
        },
        formulaDesarrollada: {
            alimentos: [{
                nombre: String,
                cantidad: Number,
                carbohidratos: Number,
                proteinas: Number,
                grasas: Number,
            }],
            kcalTotal: Number,
        },
    },
    distribucion: {
        tipoPlan: String,
        comidas: [{
            nombre: String,
            ingredientes: [{
                cantidad: String,
                nombre: String,
                imagen: String,
            }],
            equivalencias: [{
                cantidad: String,
                alimento: {
                    nombre: String,
                    imagen: String,
                }
            }]
        }],
    },
    seleccionAlimentos: [{
        categoria: String,
        descripcion: String,
    }],
    recomendaciones: [{
        titulo: String,
        descripcion: String,
    }]
  });

module.exports = mongoose.model('Seguimientos', SeguimientoSchema, 'seguimientos');