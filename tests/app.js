const request = require('supertest');
const app = require('../app');
const sinon = require('sinon');
const dbSvc = require('../svc/db');
const testData = require('./fixtures/testData');
const assert = require('assert');
const { dbData } = require('./fixtures/testData');

describe('Testing app.js (server)', function() {

    let server, stub_FetchData = sinon.stub(dbSvc, "fetchData");

    // Called once before any of the tests in this block begin.
    before(function(done) {
        server = app.listen(done);
    });

    after(function(done){
        server.close(done)
    })

    describe('/v1/reminders/', function() {
        it('should return all reminders', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.dbData)
                done();
            });
        });
    });

    describe('/v1/reminders/:reminderId', function() {
        it('should return reminder by id', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/0')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.getReminderById)
                done();
            });
        });
        it('should throw error if id is not found', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/2')
            .expect(404, function(err, res) {
                assert.deepEqual(res.text, 'Reminder not found');
                done();
            });
        });
    });

    describe('/v1/reminders/:reminderId', function() {
        it('should delete reminder by id', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .delete('/v1/reminders/0')
            .expect(200, function(err, res) {
                assert.deepEqual(res.text, 'Reminder deleted')
                done();
            });
        });
        it('should throw error if id is not found', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/2')
            .expect(404, function(err, res) {
                assert.deepEqual(res.text, 'Reminder not found');
                done();
            });
        });
    });

    describe('/v1/reminders/', function() {
        it('should create reminder', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .post('/v1/reminders/')
            .send({
                "due_date": "2022-10-15",
                "text": "test",
                "priority": "high"
            })
            .expect(201, function(err, res) {
                assert.deepEqual(res.text, 'Resource created')
                done();
            });
        });
        it('should throw error if invalid post data to create reminder', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .post('/v1/reminders/')
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.createReminder.error));
                done();
            });
        });
    });

    describe('/v1/reminders/', function() {
        it('should update reminder', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .put('/v1/reminders/0')
            .send({
                "due_date": "2022-10-15",
                "text": "test",
                "priority": "high"
            })
            .expect(200, function(err, res) {
                assert.deepEqual(res.text, 'Reminder updated')
                done();
            });
        });
        it('should throw error if invalid data to create reminder', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .put('/v1/reminders/0')
            .send({
                "due_date": "2022-10-15",
                "text": "test",
                "priority": "high",
                "id": 12
            })
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.updateReminder.error));
                done();
            });
        });
        it('should throw error if reminder not found', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .put('/v1/reminders/2')
            .send({
                "due_date": "2022-10-15",
                "text": "test",
                "priority": "high"
            })
            .expect(404, function(err, res) {
                assert.deepEqual(res.text, 'Reminder not found');
                done();
            });
        });
    });

    describe('/v1/reminders/filter/creation', function() {
        it('should return reminders between dates', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/creation?dateFrom=2022-10-01&dateUntil=2022-10-10')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.filterRemindersByCreationDateRange.data)
                done();
            });
        });
        it('should throw error if invalid query data', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/creation?dateFrom=2022-10-01&dateUntil=2021-10-10')
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.filterRemindersByCreationDateRange.error));
                done();
            });
        });
    });

    describe('/v1/reminders/filter/due', function() {
        it('should return reminders between dates', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/due?dateFrom=2022-10-01&dateUntil=2022-10-10')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.filterRemindersByDueDateRange.data);
                done();
            });
        });
        it('should throw error if invalid query data', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/due?dateFrom=2022-10-01&dateUntil=202-10-10')
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.filterRemindersByDueDateRange.error));
                done();
            });
        });
    });

    describe('/v1/reminders/filter/priority/:priority', function() {
        it('should return reminders between dates', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/priority/high')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.getRemindersByPriority.data);
                done();
            });
        });
        it('should throw error if invalid priority', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/priority/mid')
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.getRemindersByPriority.error));
                done();
            });
        });
    });

    describe('/v1/reminders/filter/urgent', function() {
        it('should return reminders between dates', function(done) {
            stub_FetchData.returns([{
                "id": 0,
                "creation_date": "2022-10-08",
                "due_date": "2022-10-07",
                "text": "test",
                "priority": "high"
            },{
                "id": 1,
                "creation_date": "2022-10-08",
                "due_date": "2022-10-08",
                "text": "test",
                "priority": "high"
            }]);
            request(app)
            .get('/v1/reminders/filter/urgent?dateFrom=2022-09-30')
            .expect(200, function(err, res) {
                assert.deepEqual(res.body, testData.getUrgentReminders.data);
                done();
            });
        });
        it('should throw error if invalid priority', function(done) {
            stub_FetchData.returns(testData.dbData);
            request(app)
            .get('/v1/reminders/filter/urgent?dateFrom=202-09-30')
            .expect(400, function(err, res) {
                assert.deepEqual(res.text, JSON.stringify(testData.getUrgentReminders.error));
                done();
            });
        });
    });
});