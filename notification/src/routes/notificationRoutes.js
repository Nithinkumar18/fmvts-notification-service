const express = require('express');
const router = express.Router();
const notificationController = require('../controller/notificationController');
const {authorizeRole} = require('../middleware/authorizeUserRole');

router.get('/eventType',authorizeRole(["admin"]),notificationController.viewNotificationsByEventType);
router.get('/lastQTR/:event',authorizeRole(["admin"]),notificationController.viewEventsByTypeInLastQuarter);

module.exports = router;