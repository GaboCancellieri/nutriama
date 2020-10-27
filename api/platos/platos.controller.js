'use strict';
var mongoose = require('mongoose'),
Plato = mongoose.model('Platos');

exports.getPlatos = (req, res) => {
  Plato.find({}, (err, plato) => {
    if (err)
      res.send(err);
    res.json(plato);
  });
};

exports.createPlato = (req, res) => {
  var new_plato = new Plato(req.body);
  new_plato.save((err, plato) => {
    if (err)
      res.send(err);
    res.json(plato);
  });
};

exports.getPlato = (req, res) => {
  Plato.findById(req.params.idPlato, (err, plato) => {
    if (err)
      res.send(err);
    res.json(plato);
  });
};

exports.updatePlato = (req, res) => {
  Plato.findOneAndUpdate({_id: req.params.idPlato}, req.body, {new: true}, (err, plato) => {
    if (err)
      res.send(err);
    res.json(plato);
  });
};

exports.deletePlato = (req, res) => {
  Plato.remove({
    _id: req.params.idPlato
  }, (err, plato) => {
    if (err)
      res.send(err);
    res.json(plato);
  });
};
