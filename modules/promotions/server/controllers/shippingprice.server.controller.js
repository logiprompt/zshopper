'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
multer = require('multer'),
mongoose = require('mongoose'),
shippingPrice = require('../models/shippingprice.server.model.js'),
Country= mongoose.model('Sys_country'),
errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/* add promotion product price rule*/
exports.addshippingPrice = function (req, res, next) {
    var today=Date.now();
    var picpath = "";
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads');
        },
        filename: function (req, file, callback) {
           // console.log(file);
            var ext =  file.originalname.substr(file.originalname.length - 3); // => "Tabs1"
            callback(null, file.fieldname + '-' + today +'.' +  '.png'); // => "Tabs1");
            picpath = "uploads/" + file.fieldname + '-' + today + '.' + '.png';
        }
    });

    var upload = multer({ storage: storage }).single('image');

    upload(req, res, function (err) {
        var reqBody = req.body;
       // console.log(req.body);
        if (err) {
            return res.end("Error uploading file.");
        }
        else {
            reqBody['image'] = picpath;
            shippingPrice.create(reqBody, function (err) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(reqBody);
                }
            });

        }
    });

    // shippingPrice.create(req.body, function (err, post) {
        
    //     if (err) {
    //         return res.status(400).send({
    //             message: errorHandler.getErrorMessage(err)
    //         });
    //     } else {
    //         res.json("shippingprice added");
    //     }
    // });
}

// get list of all countries
exports.getShippingCountryList = function (req, res, next) {
    Country.find().exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

// get list of all shipping price rules
exports.getShippingPriceList = function (req, res, next) {
    shippingPrice.find().populate({ path: 'displayIn', select: 'country', model:'Sys_country' }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}


//delete shipping price rule
exports.deleteShippingPrice = function (req, res, next) {
   // console.log(req.query.itemId);
    shippingPrice.remove({ _id: req.query.itemId }).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json("data deleted");
        }
    })
}

/** 
*Delete currency by IDs
*
**/
exports.delChecked = function (request, response) {

    var arr = request.query.itemId;
console.log(arr);
    shippingPrice.deleteMany({ _id: { '$in': arr } }).exec(function (err, data) {
        if (err) throw err;
        response.json({
            status: 1,
        });


    });


};

//get shipping price rule details
exports.getShippingPriceDetails = function (req, res, next) {
    shippingPrice.findById(req.query.itemId).exec(function (err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(data);
        }
    })
}

//update product price rule
exports.updateShippingPriceRule = function (req, res, next) {

    
    var picpath="";
    var today=Date.now();
    var storage = multer.diskStorage({
      destination: function (req, file, callback) {
      callback(null, './public/uploads');
      },
      filename: function (req, file, callback) {
      
      callback(null, file.fieldname + '-' + today+'.png');
      picpath="uploads/"+file.fieldname + '-' + today+'.png';
      
      }
    });

    var upload = multer({ storage : storage}).single('image');
  upload(req,res,function(err) {

    var reqBody = req.body;
    var userId = reqBody.id;
    var data={};


    shippingPrice.findById(userId).exec(function (err, data) {

  if(err) {
  return res.end("Error uploading file.");
  }
  else{
    if (reqBody.defaultLang==reqBody.userSelectedLang) 
            {             
                    data.ruleName = reqBody.ruleName,
                    data.description = reqBody.description
            }

            else 
            {
                var obj = {};
                obj.ruleName = reqBody.ruleName;
                obj.description = reqBody.description;
                data['oLang'][reqBody.userSelectedLang] = obj;            
            }
    
    if(picpath==''){
                    data.displayIn = reqBody.displayIn,
                    data.startDate = reqBody.startDate,
                    data.endDate = reqBody.endDate,
                    data.values = reqBody.values,
                    data.conditionsStatus = reqBody.conditionsStatus,
                    data.stopRuleProcess = reqBody.stopRuleProcess,
                    data.discountAmount = reqBody.discountAmount,
                    data.applyTo = reqBody.applyTo,
                    data.actionApplyTo = reqBody.actionApplyTo,
                    data.conditions = reqBody.conditions,
                    data.status = reqBody.status
            }
            else{      
                    data.displayIn = reqBody.displayIn,
                    data.startDate = reqBody.startDate,
                    data.endDate = reqBody.endDate,
                    data.values = reqBody.values,
                    data.conditionsStatus = reqBody.conditionsStatus,
                    data.stopRuleProcess = reqBody.stopRuleProcess,
                    data.discountAmount = reqBody.discountAmount,
                    data.applyTo = reqBody.applyTo,
                    data.actionApplyTo = reqBody.actionApplyTo,
                    data.conditions = reqBody.conditions,
                    data.status = reqBody.status,
                    data.image = picpath
            }
       
            shippingPrice.update({ '_id': userId },
                { $set: data }).exec(function (error, output) {
                    if (error) {
                        res.status(500).send(error);
                        return;
                    }
                    res.json(output);
                    return;


                })
  
  
  
            }
  
    res.json({
          data:199
          });
        })
  });
   
    
}