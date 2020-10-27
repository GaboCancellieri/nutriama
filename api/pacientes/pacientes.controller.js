'use strict';
var mongoose = require('mongoose'),
Paciente = mongoose.model('Pacientes');

exports.getPacientes = (req, res) => {
  Paciente.find({}, (err, pacientes) => {
    if (err)
      res.send(err);
    res.json(pacientes);
  });
};

exports.createPaciente = (req, res) => {
  var new_paciente = new Paciente(req.body);
  new_paciente.save((err, paciente) => {
    if (err)
      res.send(err);
    res.json(paciente);
  });
};

exports.getPaciente = (req, res) => {
  Paciente.findById(req.params.idPaciente, (err, paciente) => {
    if (err)
      res.send(err);
    res.json(paciente);
  });
};

exports.updatePaciente = (req, res) => {
  Paciente.findOneAndUpdate({_id: req.params.idPaciente}, req.body, {new: true, useFindAndModify: true}, (err, paciente) => {
    if (err)
      res.send(err);
    res.json(paciente);
  });
};

exports.deletePaciente = (req, res) => {
  Paciente.remove({
    _id: req.params.idPaciente
  }, (err, paciente) => {
    if (err)
      res.send(err);
    res.json(paciente);
  });
};
