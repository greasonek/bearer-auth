'user strict';

require('dotenv').config();

const app = require('../../../src/server');
const supertest = require('supertest');
const { sequelize, userModel } = require('../../../src/auth/models');
const mockServer = supertest(app);

// define a user to test
let testWriter;
// before all, sync up the db and create the user in the db to test aainst
beforeAll(async () => {
  await sequelize.sync();
  testWriter = await userModel.create({
    username: 'Writer',
    password: '1234',
    role: 'writer',
  });
});
// after all, drop the table
afterAll(async () => {
  await sequelize.drop();
});
// write some tests based off the mock user
// /read, /create, /update, /delete
// testWriter has read/write access (read and create)
describe('ACL Integration', () => {
  test('the user should be able to access the read route', async () => {
    let response = await mockServer
      .get('/read')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('you have read access');
    // basic - can set auth using .auth property in supertest
    // bearer - we have to explicitly do .set('Authorization', `Bearer ${token}) --> how do we get the token of the test writer?
    // token comes from the database -- access it by doing console.log(testWriter.token)(or whatever the user's name was.token)
  });
});
describe('ACL Integration', () => {
  test('the user should be able to access the create route', async () => {
    let response = await mockServer
      .get('/create')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('you have create access');
  });
});
describe('ACL Integration', () => {
  test('the user should be able to access the udpate route', async () => {
    let response = await mockServer
      .get('/update')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(200);
    expect(response.text).toEqual('you have udpate access');
  });
});
describe('ACL Integration', () => {
  test('the user should be able to access the delete route', async () => {
    let response = await mockServer
      .get('/delete')
      .set('Authorization', `Bearer ${testWriter.token}`);
    expect(response.status).toBe(500);
    expect(response.text).toEqual('you do have delete access');
  });
});
