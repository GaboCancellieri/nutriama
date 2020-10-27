'use strict';
module.exports = function(app) {
  var tipoPlans = require('./tipoPlan.controller');

  // Tipo Plan Routes
  app.route('/tipoPlanes')
    .get(tipoPlans.getTipoPlans)
    .post(tipoPlans.createTipoPlan);

  app.route('/tipoPlanes/:idTipoPlan')
    .get(tipoPlans.getTipoPlan)
    .patch(tipoPlans.updateTipoPlan)
    
    .delete(tipoPlans.deleteTipoPlan);
};
