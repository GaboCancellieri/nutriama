'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlatoSchema = new Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  esColacion: { type: Boolean, required: true },
  imagen: { type: String, required: true },
  ingredientes: [{
      nombre: { type: String, required: true },
      tienePorcion: { type: Boolean, required: true },
  }],
  equivalencias: [{ type: Schema.Types.ObjectId, ref: 'Platos' }],
});

module.exports = mongoose.model('Platos', PlatoSchema, 'platos');