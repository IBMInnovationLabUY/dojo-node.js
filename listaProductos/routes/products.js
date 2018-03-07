var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var product = require('../models/Product.js');

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  product.find(function (err, list) {  
    if (err) return next(err);
    res.json(list);
  });
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  product.create(req.body, function (err, post) {
    if (err) return next(err);
    res.send(post);
  });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;