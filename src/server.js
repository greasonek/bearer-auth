'use strict';

const acl = require('./auth/middleware/acl');
const bearer = require('./auth/middleware/bearer');


// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const authRoutes = require('./auth/router/index.router.js');
const todoRoutes = require('./auth/router/todo.router');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(todoRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);


// add routes that are based on permission based roles
app.get('/read', bearer, acl('read'), (req, res) => {
  res.status(200).send('you have read access');
});
app.post('/create', bearer, acl('c`reate'), (req, res) => {
  res.status(200).send('you have create access');
});
app.put('/update', bearer, acl('update'), (req, res) => {
  res.status(200).send('you have update access');
});
app.delete('/delete', bearer, acl('delete'), (req, res) => {
  res.status(200).send('you have delete access');
});

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};