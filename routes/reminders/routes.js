const express = require('express');
const controller = require('./controller');
const routes = express.Router();
const schema = require('./schema');

routes.route('/')
    .get(controller.getAllReminders)
    .post([schema.createReminder], controller.createReminder);

routes.route('/:reminderId')
    .get([schema.getReminderById], controller.getReminderById)
    .put([schema.updateReminder], controller.updateReminder)
    .delete([schema.deleteReminderById], controller.deleteReminderById);

routes.route('/filter/creation')
    .get([schema.filterRemindersByCreationDateRange], controller.filterRemindersByCreationDateRange);

routes.route('/filter/due')
    .get([schema.filterRemindersByDueDateRange], controller.filterRemindersByDueDateRange);

routes.route('/filter/priority/:priority')
    .get([schema.getRemindersByPriority], controller.getRemindersByPriority);

routes.route('/filter/urgent')
    .get([schema.getUrgentReminders], controller.getUrgentReminders);

module.exports = routes;