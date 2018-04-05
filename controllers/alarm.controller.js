const mongoose = require('mongoose');
const Alarm = require('../models/alarm.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Alarm.find({ownerId: req.user._id})
    .then(alarm => res.json(alarm))
    .catch(error => next(error));
};

module.exports.get = (req, res, next) => {
  const id = req.params.id;

    Alarm.find({ _id: id, ownerId: req.user._id })
      .then(alarm => {
        if (alarm) {
          res.json(alarm)
        } else {
          next(new ApiError(`Alarm not set`, 404));
        }
      }).catch(error => next(error));
};

module.exports.create = (req, res, next) => {
  req.body.ownerId = req.user._id;
  const alarm = new Alarm(req.body);
  alarm.save()
    .then(() => {
      res.status(201).json(alarm);
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
         console.log(error);
         next(new ApiError(error.errors));
       } else {
         next(new ApiError(error.message, 500));
       }
     })
};

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  req.body.ownerId = req.user._id;
    Alarm.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(alarm => {
        if (alarm) {
          res.status(200).json(alarm)
        } else {
          next(new ApiError(`Alarm not set`, 404));
        }
      }).catch(error => next(error));

};

module.exports.destroy = (req, res, next) => {
  const id = req.params.id;
  Alarm.findByIdAndRemove(id)
    .then(alarm => {
      if (alarmd){
        res.status(204).json()
      } else {
        next(new ApiError(`Alarm not set`, 404));
      }
    }).catch(error => next(error));
};
