import { model, Schema, Model, Document } from 'mongoose';

export interface IUsuario extends Document {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  rol: string;
  isActive: boolean;
  isAdmin: boolean;
}

const UsuarioSchema = new Schema({
    nombre: {type: String, required: true },
    apellido: {type: String, required: true },
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    rol: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: true},
    isAdmin: {type: Boolean, required: true, default: false},
});

export const Usuario: Model<IUsuario> = model('Usuario', UsuarioSchema, 'usuarios');
