'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoPlanSchema = new Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('TipoPlans', TipoPlanSchema);