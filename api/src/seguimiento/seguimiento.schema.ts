import { model, Schema, Model, Document } from 'mongoose';

export interface ISeguimiento extends Document {
    peso: number;
    fecha: Date;
    paciente: {
        id: string;
        nombre: string;
        apellido: string;
        documento: string;
        sexo: string;
        fechaNacimiento: Date;
    },
    planificacion: {
        peso: number;
        actividadFisica: string;
        gastoEnergeticoTotal: number;
        formulaSintetica: {
            carbohidratos: {
                porcentaje: number;
                kcal: number;
                gramos: number;
                gramosKilosDia: number;
            },
            proteinas: {
                porcentaje: number;
                kcal: number;
                gramos: number;
                gramosKilosDia: number;
            },
            grasas: {
                porcentaje: number;
                kcal: number;
                gramos: number;
                gramosKilosDia: number;
            },
        },
        formulaDesarrollada: {
            alimentos: [{
                nombre: string;
                cantidad: number;
                carbohidratos: number;
                proteinas: number;
                grasas: number;
            }],
            kcalTotal: number;
        },
    },
    distribucion: {
        tipoPlan: string;
        comidas: [{
            nombre: string;
            ingredientes: [{
                cantidad: string;
                nombre: string;
                imagen: string;
            }],
            equivalencias: [{
                cantidad: string;
                alimento: {
                    nombre: string;
                    imagen: string;
                }
            }]
        }],
    },
    seleccionAlimentos: [{
        categoria: string;
        descripcion: string;
    }],
    recomendaciones: [{
        titulo: string;
        descripcion: string;
    }],
}

const SeguimientoSchema = new Schema({
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
    }],
});

export const Seguimiento: Model<ISeguimiento> = model('Seguimiento', SeguimientoSchema, 'seguimientos');
