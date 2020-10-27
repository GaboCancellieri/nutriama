'use strict';

const moment = require('moment');

var mongoose = require('mongoose'),
Seguimiento = mongoose.model('Seguimientos'),
TablaComposicion = mongoose.model('TablaComposicions');

exports.getSeguimientos = (req, res) => {
  Seguimiento.find({}, (err, seguimientos) => {
    if (err)
      res.send(err);
    res.json(seguimientos);
  });
};

exports.getSeguimientosPaciente = (req, res) => {
    Seguimiento.find({
      'paciente.id': req.params.idPaciente,
      fecha: { $lte: moment(req.params.fecha).endOf('month').toDate(), $gte: moment(req.params.fecha).startOf('month').toDate() }
    }, (err, seguimientos) => {
      if (err)
        res.send(err);
      res.json(seguimientos);
    });
  };

exports.createSeguimiento = (req, res) => {
  var new_seguimiento = new Seguimiento(req.body);
  new_seguimiento.save((err, seguimiento) => {
    if (err)
      res.send(err);
    res.json(seguimiento);
  });
};

exports.getSeguimiento = (req, res) => {
  Seguimiento.findById(req.params.idSeguimiento, (err, seguimiento) => {
    if (err)
      res.send(err);
    res.json(seguimiento);
  });
};

exports.updateSeguimiento = (req, res) => {
  Seguimiento.findOneAndUpdate({_id: req.params.idSeguimiento}, req.body, {new: true, useFindAndModify: true}, (err, seguimiento) => {
    if (err)
      res.send(err);
    res.json(seguimiento);
  });
};

exports.deleteSeguimiento = (req, res) => {
  Seguimiento.remove({
    _id: req.params.idSeguimiento
  }, (err, seguimiento) => {
    if (err)
      res.send(err);
    res.json(seguimiento);
  });
};

exports.getTablaComposicion = (req, res) => {
  TablaComposicion.find({}, (err, seguimientos) => {
    if (err)
      res.send(err);
    res.json(seguimientos);
  });
}
