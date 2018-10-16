'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Email = mongoose.model('Email'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Email
 */
exports.create = function(req, res) {
  var email = new Email(req.body);
  email.user = req.user;

  email.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(email);
    }
  });
};

/**
 * Show the current Email
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var email = req.email ? req.email.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  email.isCurrentUserOwner = req.user && email.user && email.user._id.toString() === req.user._id.toString();

  res.jsonp(email);
};

/**
 * Update a Email
 */
exports.update = function(req, res) {
  var email = req.email;

  email = _.extend(email, req.body);

  email.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(email);
    }
  });
};

/**
 * Delete an Email
 */
exports.delete = function(req, res) {
  var email = req.email;

  email.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(email);
    }
  });
};

/**
 * List of Emails
 */
exports.list = function(req, res) {
  Email.find().sort('-created').populate('user', 'displayName').exec(function(err, emails) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(emails);
    }
  });
};

/**
 * Email middleware
 */
exports.emailByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Email is invalid'
    });
  }

  Email.findById(id).populate('user', 'displayName').exec(function (err, email) {
    if (err) {
      return next(err);
    } else if (!email) {
      return res.status(404).send({
        message: 'No Email with that identifier has been found'
      });
    }
    req.email = email;
    next();
  });
};
