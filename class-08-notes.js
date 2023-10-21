'use strict';

// add role to the user model as well as capabilities (permissions)
// add tests for these additions to user model
// add routes to server that will be permission based off roles
// change database to lab8
// since it does not exist do psql in the terminal then \l to see a list of available databases
// to create a database do CREATE DATABASE lab8; (or whatever name of your db will be) in terminal
// to switch to that database do \c lab8 (or whatever name your terminal is) in terminal to connect to that db
// need to update the db - psql in terminal
// \c lab8
// \dt (lets us look at our table of db)
// SELECT * FROM "Users";
// DROP TABLE "Users";
// hit Enter
// \q
// npm start
// now should be able to create a new user in the POST /signup route with a username/password and a role and the terminal
// will return the users capabilities and the token


// add acl test
// add server test