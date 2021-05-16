import { model, Schema, Model, Document } from 'mongoose';

export interface ITablaComposicion extends Document {
    alimento: string;
    carbohidratos: number;
    proteinas: number;
    grasas: number;
}

const TablaComposicionSchema = new Schema({
    alimento: { type: String, required: true },
    carbohidratos: { type: Number, required: true },
    proteinas: { type: Number, required: true },
    grasas: { type: Number, required: true },
});

export const TablaComposicion: Model<ITablaComposicion> = model('TablaComposicions', TablaComposicionSchema, 'tablaComposicions');
