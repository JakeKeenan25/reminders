const express = require('express');
const controller = require('./controller');
const routes = express.Router();

const { param,query, check } = require('express-validator');

routes.route('/').get(controller.getAllReminders).post(controller.createReminder);

routes.route('/:reminderId').get([
    param('reminderId', 'reminderId must be an int').exists({checkFalsy:true}).isInt(),
], controller.getReminderById).put(controller.updateReminder);

routes.route('/filter/creation').get([
    query('dateFrom').exists({checkFalsy: true}).isDate({format:'dd-mm-yyyy'}),
    query('dateUntil').exists({checkFalsy: true}).isDate({format:'dd-mm-yyyy'}),
    check('dateUntil').custom((value, {req}) => {
        if(new Date(value) <= new Date(req.query.dateFrom)){
            throw new Error('dateUtil must be after dateFrom')
        }
    }),
],controller.filterRemindersByCreationDateRange);

routes.route('/filter/due').get(controller.filterRemindersByDueDateRange);

routes.route('/filter/priority/:priority').get(controller.getRemindersByPriority);

routes.route('/filter/urgent').get(controller.getUrgentReminders);

module.exports = routes;