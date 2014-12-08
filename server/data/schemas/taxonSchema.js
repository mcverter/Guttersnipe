/**
 *
 * Node of Resource Taxonomy
 * {1) Type
 * (2) image name
 * (3)Contents
 */
var mongoose = require('mongoose'),

  TaxonSchema = new mongoose.Schema({
    type: String,
    image: String,
    comment: String,
    parent: 'Moo',
    todos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Taxon'
    }],
    children: 'Moo'
  });

module.exports = TaxonSchema;