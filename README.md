# Setup

- Install first: npm install
- To Run: npm start
- To Test: npm test
- To Start Dev work: npm run dev

- Postman collection located in OAS folder
- API spec (swagger) located in OAS folder

-----------------

# Reminders

We're building a reminders/to-do application, and we want to build the service layer to support our
reminder application.  

## Reminder Data

A single reminder has the following fields:

- id (generated upon creation)
- text (utf-8, max length 4096 characters) 
- creation date
- due date
- priority (low/medium/high)

## Required Service Functionality

### Add a reminder

Our service should be able to add a reminder and store it in memory for the purposes of this exercise. When
a reminder is created, it should be given a unique id.

### Retrieve a reminder by id

For a given reminder id, return the fully populated remainder object.

### Find all reminders

### Find all reminders within a creation date range

Reminders sort by date ascending (oldest first)

### Find all reminders within a due date range

Reminders sort by date descending (newest first)

### Find all reminders by a given priority

### Remove a reminder by id

This should throw if the reminder does not exist.

### Update a reminder by id

When updating a reminder, you should not be able to update the creation date or id. This should throw if the reminder
does not exist.

### Find URGENT reminders

An urgent reminder is any reminder that will be due in 7 days from a given date
and has a priority of high. Return urgent reminders sorted by due date ascending (soonest due date first).

## URLs to support API

Before writing any of the above code, write examples of what URL requests might look like to achieve each of the operations listed above.

Write out the http method, url, and any other data that might be sent with the request.

# Extra Credit

Add controllers and write an HTTP server to support the service code above.s
readme.md
Displaying readme.md.