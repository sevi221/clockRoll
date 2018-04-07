const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');

module.exports.checkOwnerId = (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;

  if (ownerId === userId){
      next();
  } else {
      next(new ApiError(`Invalid time id: ${id}`));
  }
}
