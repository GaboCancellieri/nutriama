'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PacienteSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  documento: { type: String, required: true },
  altura: { type: Number, required: true },
  peso: { type: Number, required: true },
  sexo: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  email: { type: String },
  telefono: { type: String },
  estado: { type: String, default: 'activo' },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Pacientes', PacienteSchema);