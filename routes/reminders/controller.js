const { validationResult } = require('express-validator');
const dbSvc = require('../../svc/db');
const generatorSvc = require('../../svc/generator');
module.exports = {
    getAllReminders: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const reminders = dbSvc.fetchData();
        return res.status(200).send(reminders);
    },
    createReminder: (req, res) => {
        console.log('In');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const {text, due_date, priority} = req.body;
        console.log(text, due_date, priority)
        const obj = {
            id: generatorSvc.next().value,
            creation_date: new Date('dd-mm-yyyy'),
            due_date,
            text,
            priority
        }
        const data = [...dbSvc.fetchData(), obj];
        console.log(data)
        dbSvc.pushData(data);

        return res.status(201).send('Resource Created');
    },
    getReminderById: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const {reminderId} = req.param;
        const reminders = dbSvc.fetchData().filter(ele => {
            ele.id === reminderId;
        });
        return res.status(200).send(reminders);
    },
    updateReminder: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const reminderId = req.param.reminderId;
        const {text, due_date, priority} = req.body;

        dbSvc.fetchData().map(ele => {
            if (ele.id === reminderId){
                ele.text = text;
                ele.priority = priority;
                ele.due_date = due_date;
            }
        })
        return res.status(204);
    },
    filterRemindersByCreationDateRange: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }


        return res.status(200).send('filterRemindersByCreationDateRange');
    },
    filterRemindersByDueDateRange: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }


        return res.status(200).send('filterRemindersByDueDateRange');
    },
    getRemindersByPriority: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        const {priority} = req.param;
        const reminders = dbSvc.fetchData().filter(ele => {
            ele.priority === priority;
        });

        return res.status(200).send(reminders);
    },
    getUrgentReminders: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }


        return res.status(200).send('getUrgentReminders');
    },
}