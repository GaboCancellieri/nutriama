'use strict';
var mongoose = require('mongoose'),
TipoPlan = mongoose.model('TipoPlans');

exports.getTipoPlans = (req, res) => {
  TipoPlan.find({}, (err, tipoPlan) => {
    if (err)
      res.send(err);
    res.json(tipoPlan);
  });
};

exports.createTipoPlan = (req, res) => {
  var new_tipoPlan = new TipoPlan(req.body);
  new_tipoPlan.save((err, tipoPlan) => {
    if (err)
      res.send(err);
    res.json(tipoPlan);
  });
};

exports.getTipoPlan = (req, res) => {
  TipoPlan.findById(req.params.idTipoPlan, (err, tipoPlan) => {
    if (err)
      res.send(err);
    res.json(tipoPlan);
  });
};

exports.updateTipoPlan = (req, res) => {
  TipoPlan.findOneAndUpdate({_id: req.params.idTipoPlan}, req.body, {new: true}, (err, tipoPlan) => {
    if (err)
      res.send(err);
    res.json(tipoPlan);
  });
};

exports.deleteTipoPlan = (req, res) => {
  TipoPlan.remove({
    _id: req.params.idTipoPlan
  }, (err, tipoPlan) => {
    if (err)
      res.send(err);
    res.json(tipoPlan);
  });
};
