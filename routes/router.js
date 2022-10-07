const express = require('express');
const reminderRoutes = require('./reminders/routes');
const router = express.Router();
router.use('/reminders/', reminderRoutes);
module.exports = router;
