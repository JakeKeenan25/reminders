const express = require('express');
const router = require('./routes/router');
const morgan = require('morgan');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use('/v1/', router)
module.exports = app;
