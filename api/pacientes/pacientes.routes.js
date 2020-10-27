'use strict';
module.exports = function(app) {
  var pacientes = require('./pacientes.controller');

  // Paciente Routes
  app.route('/pacientes')
    .get(pacientes.getPacientes)
    .post(pacientes.createPaciente);

  app.route('/pacientes/:idPaciente')
    .get(pacientes.getPaciente)
    .patch(pacientes.updatePaciente)
    .delete(pacientes.deletePaciente);
};
