const dbSvc = require('./db');
const generatorSvc = require('./generator');

module.exports = {
    getAllReminders: () => {
        return dbSvc.fetchData();
    },
    createReminder: (text, due_date, priority) => {
        const obj = {
            id: generatorSvc.next().value,
            creation_date: new Date().toISOString().split('T')[0], // ISO Standard without the time
            due_date,
            text,
            priority
        }
        const data = [...dbSvc.fetchData(), obj];
        dbSvc.pushData(data);
    },
    getReminderById: (reminderId) => {
        return dbSvc.fetchData().filter(ele => ele.id === Number(reminderId));
    },
    deleteReminderById: (reminderId) => {
        let data = dbSvc.fetchData();
        const reminderExists = data.some(ele => ele.id === Number(reminderId));
        if (reminderExists){
            data = data.filter(ele => ele.id !== Number(reminderId))
            dbSvc.pushData(data);
        }
        return reminderExists;
    },
    updateReminder: (reminderId, text, due_date, priority) => {
        let data = dbSvc.fetchData();
        const reminderExists = data.some(ele => ele.id === Number(reminderId));
        if (reminderExists){
            dbSvc.fetchData().map(ele => {
                if (ele.id === Number(reminderId)){
                    ele.text = text;
                    ele.priority = priority;
                    ele.due_date = due_date;
                }
            });
        }
        return reminderExists;
    },
    filterRemindersByCreationDateRange: (dateFrom, dateUntil) => {
        return dbSvc.fetchData().filter(ele => {
            const creationDate = new Date(ele.creation_date);
            if (creationDate >= new Date(dateFrom) && creationDate <= new Date(dateUntil)){
                return ele;
            }
        }).sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
    },
    filterRemindersByDueDateRange: (dateFrom, dateUntil) => {
        return dbSvc.fetchData().filter(ele => {
            const dueDate = new Date(ele.due_date);;
            if (dueDate >= new Date(dateFrom) && dueDate <= new Date(dateUntil)){
                return ele;
            }
        }).sort((a, b) => new Date(b.due_date) - new Date(a.due_date));
    },
    getRemindersByPriority: (priority) => {
        return dbSvc.fetchData().filter(ele => ele.priority === priority);
    },
    getUrgentReminders: (dateFrom) => {
        return dbSvc.fetchData().filter(ele => {
            const dueDate = new Date(ele.due_date);
            let dateUntil = new Date(dateFrom);
            dateUntil.setDate(dateUntil.getDate() + 7);
            if (dueDate.toISOString() === dateUntil.toISOString()){
                return ele;
            }
        }).sort((a, b) => new Date(a.due_date) - new Date(b.due_date));
    }
}