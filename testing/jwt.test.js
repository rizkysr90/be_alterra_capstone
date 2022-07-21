const app = require('../app')
const request = require('supertest')
let token = null;
let failedToken = null;
let stringSubToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhYmMiLCJuYW1lIjoiVXp1bWFraSBCb3J1dG8iLCJpYXQiOjE2NTg0MDc2NTUsImV4cCI6MjA1ODQ5NDA1NX0.aFeaz_1XA7IECha0FnQGnGh5XPnnTCFEKJuzxuTs6iQ';
let id = 1;
beforeAll(function(done) {
    request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_LOGIN}`)
        .send({
                email : "user1@gmail.com",
                password : "123456789"
            })
        .set('Accept', 'application/json')
        .end(function(err, res) {
            token = res.body.data.token; // Or something
            failedToken = res.body.data.token+"failed"; // Or something

            done();
        });
  },50000);
  describe('JWT Middleware', () => {
        test('it should be failed because the token is not added', async() => {
            const response = await request(app)
            .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=1row=10`)
            expect(response.status).toBe(401);
        },5000)
      test('it should be failed because the token is modified', async() => {
          const response = await request(app)
          .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=1row=10`)
          .set('Authorization', 'Bearer ' + failedToken)
          expect(response.status).toBe(401);
      },5000)
      test('',async () => {
        let tokenWithNoUser = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjQsIm5hbWUiOiJVenVtYWtpIEJvcnV0byIsImlhdCI6MTY1ODQwNzY1NSwiZXhwIjoyMDU4NDk0MDU1fQ.r22hDUNZMxM1OQl-siUckweqt97VgRiVCsQieRF7MDY'
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=1row=10`)
        .set('Authorization', 'Bearer ' + tokenWithNoUser)
        expect(response.status).toBe(401);
    },50000)
    test('it should be failed because the token sub payload is string ', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=1row=10`)
        .set('Authorization', 'Bearer ' + stringSubToken)
        expect(response.status).toBe(401);
    },5000)
  })