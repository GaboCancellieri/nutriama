'use strict';
module.exports = function(app) {
  var plato = require('./platos.controller');

  // Tipo Plan Routes
  app.route('/platos')
    .get(plato.getPlatos)
    .post(plato.createPlato);

  app.route('/platos/:idPlato')
    .get(plato.getPlato)
    .patch(plato.updatePlato)
    .delete(plato.deletePlato);
};
