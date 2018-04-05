const express = require('express');
const router = express.Router();
const alarmController = require('../controllers/alarm.controller');
const secureMiddleware = require('../middleware/secure.middleware');
const checkId = require('../middleware/validateId.middleware');


// router.get('/', secureMiddleware.isAuthenticated, alarmController.index);
// router.get('/:id', secureMiddleware.isAuthenticated, checkId.checkId, alarmController.show);
router.post('/', secureMiddleware.isAuthenticated, alarmController.create);
router.put('/:id', secureMiddleware.isAuthenticated, checkId.checkId, alarmController.update);
router.delete('/:id', secureMiddleware.isAuthenticated, checkId.checkId, alarmController.destroy);

module.exports = router;
