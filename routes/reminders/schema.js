const { checkSchema } = require('express-validator');
const constants = require('../../utils/constants');
module.exports = {
    createReminder: checkSchema({
        text:{
            in:["body"],
            isAscii: true,
            isEmpty: false,
            isLength: {
                errorMessage: 'Text too long',
                options: { max: 4096 },
            },
        },
        due_date:{
            in:["body"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: 'YYYY-MM-DD'
                }
            }
        },
        priority:{
            in:["body"],
            isAscii: true,
            isEmpty: false,
            isIn: {
                options: [[constants.priorityLevels.high, constants.priorityLevels.medium, constants.priorityLevels.low]],
                errorMessage: `priority only accepts: ${constants.priorityLevels.high}, ${constants.priorityLevels.medium}, ${constants.priorityLevels.low}`
            },
        }
    }),
    getReminderById: checkSchema({
        reminderId:{
            in:["params"],
        },
    }),
    updateReminder: checkSchema({
        reminderId:{
            in:["params"],
        },
        text:{
            in:["body"],
            isAscii: true,
            isEmpty: false,
            isLength: {
                errorMessage: 'Text too long',
                options: { max: 4096 },
            },
        },
        due_date:{
            in:["body"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: 'YYYY-MM-DD'
                }
            }
        },
        id: {
            optional: true, // Set to optional to pass validation if id is absent, if present the custom error will be thrown
            custom: {
                options: () => {
                    throw new Error('You cannot update the reminder ID')
                }
            }
        },
        creation_date: {
            optional: true, // Set to optional to pass validation if creation date is absent, if present the custom error will be thrown
            custom: {
                options: () => {
                    throw new Error('You cannot update the Creation Date')
                }
            }
        }
    }),
    deleteReminderById: checkSchema({
        reminderId:{
            in:["params"],
        },
    }),
    filterRemindersByCreationDateRange: checkSchema({
        dateFrom:{
            in:["query"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: constants.dateFormat
                }
            }
        },
        dateUntil:{
            in:["query"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: constants.dateFormat
                }
            },
            custom: {
                options: (value, { req }) => {
                    if (new Date(value).getTime() < new Date(req.query.dateFrom).getTime()){
                        throw new Error('dateUntil must be after dateFrom')
                    }
                    return true // Indicates the success of this synchronous custom validator
                },
            },
        },
    }),
    filterRemindersByDueDateRange: checkSchema({
        dateFrom:{
            in:["query"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: constants.dateFormat
                }
            }
        },
        dateUntil:{
            in:["query"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: constants.dateFormat
                }
            }
        },
        custom: {
            options: (value, { req }) => {
                if (new Date(value).getTime() < new Date(req.query.dateFrom).getTime()){
                    throw new Error('dateUntil must be after dateFrom')
                }
                return true // Indicates the success of this synchronous custom validator
            },
        },
    }),
    getRemindersByPriority: checkSchema({
        priority:{
            in:["params"],
            isAscii: true,
            isEmpty: false,
            isIn: {
                options: [[constants.priorityLevels.high, constants.priorityLevels.medium, constants.priorityLevels.low]],
                errorMessage: `priority only accepts: ${constants.priorityLevels.high}, ${constants.priorityLevels.medium}, ${constants.priorityLevels.low}`
            },
        }
    }),
    getUrgentReminders: checkSchema({
        dateFrom:{
            in:["query"],
            isAscii: true,
            isEmpty: false,
            isDate: {
                options: {
                    format: constants.dateFormat
                }
            }
        },
    }),
}