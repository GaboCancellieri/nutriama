'use strict';
module.exports = function(app) {
  var seguimiento = require('./seguimiento.controller');

  // Seguimiento Routes
  app.route('/seguimiento/:idPaciente/:fecha')
  .get(seguimiento.getSeguimientosPaciente)

  app.route('/seguimientos')
    .get(seguimiento.getSeguimientos)
    .post(seguimiento.createSeguimiento);

  app.route('/seguimientos/:idSeguimiento')
    .get(seguimiento.getSeguimiento)
    .patch(seguimiento.updateSeguimiento)
    .delete(seguimiento.deleteSeguimiento);

  app.route('/seguimientos/tabla/composicion')
  .get(seguimiento.getTablaComposicion)
};
