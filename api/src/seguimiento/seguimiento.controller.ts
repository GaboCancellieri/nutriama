import moment from "moment";
import { Query } from "mongoose";
import { ISeguimiento, Seguimiento } from "./seguimiento.schema";
import { ITablaComposicion, TablaComposicion } from "./tablaComposicion.schema";

export function getSeguimientos(): Query<ISeguimiento[], ISeguimiento, {}> {
    return Seguimiento.find({});
};
  
export function getSeguimientosPaciente(idPaciente: string, fecha: Date): Query<ISeguimiento[], ISeguimiento, {}> {
    return Seguimiento.find({
        'paciente.id': idPaciente,
        fecha: { $lte: moment(fecha).endOf('month').toDate(), $gte: moment(fecha).startOf('month').toDate() }
    });
};
  
export async function createSeguimiento() {
    var newSeguimiento = new Seguimiento();
    await newSeguimiento.save();
    return newSeguimiento
};
  
export function getSeguimiento(idSeguimiento: string): Query<ISeguimiento | null, ISeguimiento, {}> {
    return Seguimiento.findById(idSeguimiento);
};

export function updateSeguimiento(idSeguimiento: string, {}): Query<ISeguimiento | null, ISeguimiento, {}> {
    return Seguimiento.findOneAndUpdate({_id: idSeguimiento}, {}, {new: true, useFindAndModify: true});
};

export function deleteSeguimiento(idSeguimiento: string): Query<any, ISeguimiento, {}> {
    return Seguimiento.remove({ _id: idSeguimiento });
};

export function getTablaComposicion(): Query<ITablaComposicion[], ITablaComposicion, {}> {
    return TablaComposicion.find();
}
  