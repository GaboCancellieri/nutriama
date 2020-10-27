'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TablaComposicionSchema = new Schema({
  alimento: { type: String, required: true },
  carbohidratos: { type: Number, required: true },
  proteinas: { type: Number, required: true },
  grasas: { type: Number, required: true },
});

module.exports = mongoose.model('TablaComposicions', TablaComposicionSchema, 'tablaComposicions');