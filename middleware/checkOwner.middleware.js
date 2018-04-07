const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');
const Alarm = require('../models/alarm.model');

module.exports.checkUserId = (req, res, next) => {
  const id = req.params.id;
  const userId = JSON.stringify(req.user._id);

  Alarm.findById(id)
    .then(alarm => {
      if (JSON.stringify(alarm.ownerId) === userId){
          next();
      } else {
          next(new ApiError('Unautorized'));
      }
    })
}
