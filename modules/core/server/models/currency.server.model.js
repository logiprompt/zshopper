'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Newpost Schema
 */
var CurrencySchema = new Schema({
  currency_id: {
    type: Number,
    default: Date.now
  },
  currency: {
    type: String,
    default: '',
    required: 'Please enter  Currency',
    trim: true
  },
 shortname: {
    type: String,
    default:'',
    required: 'Please enter shortname '
  },
  symbol: {
    type: String,
    default:'',
    required: 'Please enter symbol '
  },
  
  status: {
    type: Number,
    default: '',
    required: 'Please select  status',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  modified: {
    type: Date,
    default: Date.now
  },
  created_user: {
    type: String,
   
  },
  modified_user: {
    type: String,
   
  },
  created_ip: {
    type: String,
   
  },
  modified_ip: {
    type: String,
   
  }

});

module.exports=mongoose.model('Sys_currency', CurrencySchema);
