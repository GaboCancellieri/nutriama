import { Query } from 'mongoose';
import { IPaciente, Paciente } from './pacientes.schema';

export const getPacientes = (): Query<IPaciente[], IPaciente, {}> => {
  return Paciente.find();
};

export const createPaciente = ({nombre, apellido, documento, altura, peso, sexo, fechaNacimiento}: 
    {nombre: string, apellido: string, documento: string, altura: number, peso: number, sexo: string, fechaNacimiento: Date}): Promise<IPaciente> => {
  var new_paciente = new Paciente({
      nombre,
      apellido,
      documento,
      altura,
      peso,
      sexo,
      fechaNacimiento,
  });
  return new_paciente.save();
};

export const getPaciente = (idPaciente: string) => {
  return Paciente.findById(idPaciente);
};

export const updatePaciente = (idPaciente: string, { nombre, apellido, documento, email, telefono }: 
    { nombre: string, apellido: string, documento: string, email: string, telefono: string }): Query<IPaciente | null, IPaciente, {}> => {
  return Paciente.findOneAndUpdate({_id: idPaciente}, { nombre, apellido, documento, email, telefono }, {new: true, useFindAndModify: true});
};

export const deletePaciente = (idPaciente: string) => {
  return Paciente.findOneAndUpdate({_id: idPaciente}, { isActive: false }, {new: true, useFindAndModify: true});
};
