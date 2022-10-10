const { validationResult } = require('express-validator');
const dbSvc = require('../../svc/db');

const reminderSvc = require('../../svc/reminder');

module.exports = {
    getAllReminders: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const reminders = reminderSvc.getAllReminders();
            return res.status(200).send(reminders);
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    createReminder: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {text, due_date, priority} = req.body;
            reminderSvc.createReminder(text, due_date, priority);
            return res.status(201).send('Resource created');
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    getReminderById: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {reminderId} = req.params;
            const reminders = reminderSvc.getReminderById(reminderId);
            return reminders.length > 0 ? res.status(200).send(reminders) : res.status(404).send('Reminder not found');
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    deleteReminderById: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {reminderId} = req.params;
            const reminderExists = reminderSvc.deleteReminderById(reminderId);
            if (reminderExists){
                return res.status(200).send('Reminder deleted');
            }else{
                return res.status(404).send('Reminder not found')
            }
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    updateReminder: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {reminderId} = req.params;
            const {text, due_date, priority} = req.body;
            const reminderExists = reminderSvc.updateReminder(reminderId, text, due_date, priority);
            if (reminderExists){
                return res.status(200).send('Reminder updated');
            }else{
                return res.status(404).send('Reminder not found')
            }
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    filterRemindersByCreationDateRange: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {dateFrom, dateUntil} = req.query;
            const reminders = reminderSvc.filterRemindersByCreationDateRange(dateFrom, dateUntil);
            return res.status(200).send(reminders);
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    filterRemindersByDueDateRange: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {dateFrom, dateUntil} = req.query;
            const reminders = reminderSvc.filterRemindersByDueDateRange(dateFrom, dateUntil);
            return res.status(200).send(reminders);
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    getRemindersByPriority: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {priority} = req.params;
            const reminders = reminderSvc.getRemindersByPriority(priority);
            return res.status(200).send(reminders);
        }catch(err){
            return res.status(500).send(err.message);
        }
    },

    getUrgentReminders: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array());
        }

        try{
            const {dateFrom} = req.query;
            const reminders = reminderSvc.getUrgentReminders(dateFrom);
            return res.status(200).send(reminders);
        }catch(err){
            return res.status(500).send(err.message);
        }
    },
}