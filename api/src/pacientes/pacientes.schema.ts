import { model, Schema, Model, Document } from 'mongoose';

export interface IPaciente extends Document {
    nombre: string,
    apellido: string,
    documento: string,
    password?: string,
    altura: number,
    peso: number,
    sexo: string,
    fechaNacimiento: Date,
    email?: string,
    telefono?: string,
    createdAt: Date,
    isActive: boolean,
}

const Usuario = new Schema({
    email: {type: String, required: true, unique: true},
});

const PacienteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    documento: { type: String, required: true },
    password: {type: String, required: false},
    altura: { type: Number, required: true },
    peso: { type: Number, required: true },
    sexo: { type: String, required: true },
    fechaNacimiento: { type: Date, required: true },
    email: { type: String },
    telefono: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: {
      type: Date,
      default: new Date()
    },
    
});

export const Paciente: Model<IPaciente> = model('Paciente', PacienteSchema, 'pacientes');
