const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const consts = require('../utils/constants');

const User = require('../models/user');

exports.sign_up = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length > 0) {
            return res.status(409).json({
                message: "Mail exist"
            });
        } else {
            bcrypt.hash(req.body.password, 10, function(err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = User({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash 
                    });
                    user.save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: "User Created"
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });            
                } 
            })
        }
    })
}

exports.log_in = (req, res, next) => {
    User.find({ email: req.body.email })
    .exec()
    .then(user => {
        if (user.length < 1) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              consts.jwt_key,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed"
          });
        });
      })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}