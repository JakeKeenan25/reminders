module.exports = {
    dbData: [
        {
            "id": 0,
            "creation_date": "2022-10-08",
            "due_date": "2022-10-07",
            "text": "test",
            "priority": "high"
        },
        {
            "id": 1,
            "creation_date": "2022-10-08",
            "due_date": "2022-10-08",
            "text": "test",
            "priority": "high"
        },
        {
            "id": 5,
            "creation_date": "2022-10-10",
            "due_date": "2022-10-20",
            "text": "test",
            "priority": "high"
        },
        {
            "id": 8,
            "creation_date": "2022-12-25",
            "due_date": "2022-10-20",
            "text": "test",
            "priority": "low"
        }
    ],
    getReminderById: [{
        "id": 0,
        "creation_date": "2022-10-08",
        "due_date": "2022-10-07",
        "text": "test",
        "priority": "high"
    }],
    createReminder:{
        error: [{"msg":"Invalid value","param":"text","location":"body"},{"msg":"Invalid value","param":"due_date","location":"body"},{"msg":"Invalid value","param":"due_date","location":"body"},{"msg":"Invalid value","param":"priority","location":"body"},{"msg":"priority only accepts: high, medium, low","param":"priority","location":"body"}]
    },
    updateReminder:{
        error: [{"value":12,"msg":"You cannot update the reminder ID","param":"id","location":"body"}]
    },
    filterRemindersByCreationDateRange:{
        data:[
            {
                creation_date: '2022-10-08',
                due_date: '2022-10-15',
                id: 0,
                priority: 'high',
                text: 'test'
            },
            {
                creation_date: '2022-10-08',
                due_date: '2022-10-08',
                id: 1,
                priority: 'high',
                text: 'test'
            },
            {
                creation_date: '2022-10-10',
                due_date: '2022-10-20',
                id: 5,
                priority: 'high',
                text: 'test'
            }
        ],
        error: [{"value":"2021-10-10","msg":"dateUntil must be after dateFrom","param":"dateUntil","location":"query"}]
    },
    filterRemindersByDueDateRange:{
        data:[
            {
                creation_date: '2022-10-08',
                due_date: '2022-10-08',
                id: 1,
                priority: 'high',
                text: 'test'
            }
        ],
        error: [{"value":"202-10-10","msg":"Invalid value","param":"dateUntil","location":"query"}]
    },
    getRemindersByPriority: {
        data:[
            {
                creation_date: '2022-10-08',
                due_date: '2022-10-15',
                id: 0,
                priority: 'high',
                text: 'test'
            },
            {
                creation_date: '2022-10-08',
                due_date: '2022-10-08',
                id: 1,
                priority: 'high',
                text: 'test'
            },
            {
                creation_date: '2022-10-10',
                due_date: '2022-10-20',
                id: 5,
                priority: 'high',
                text: 'test'
            }
        ],
        error: [{"value":"mid","msg":"priority only accepts: high, medium, low","param":"priority","location":"params"}]
    },
    getUrgentReminders: {
        data:[
            {
                id: 0,
                creation_date: '2022-10-08',
                due_date: '2022-10-07',
                text: 'test',
                priority: 'high'
            }
        ],
        error: [{"value":"202-09-30","msg":"Invalid value","param":"dateFrom","location":"query"}]
    }
}