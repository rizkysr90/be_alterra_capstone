const app = require('../app')
const request = require('supertest')
const fs = require('fs')

let token = null;
// Login terlebih dahulu agar bisa mengakses update profile
beforeAll(function(done) {
    request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_LOGIN}`)
        .send({
                email : "angel@gmail.com",
                password : "adaangle123"
            })
        .set('Accept', 'application/json')
        .end(function(err, res) {
            token = res.body.data.token; // Or something
            done();
        });
  });

describe('Endpoint Profile', () => {
    test('Get By Id Success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PROFILE}/1`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(response.status).toBe(200);
    })

    test('update profile user Not Image', async() => {
        const response = await request(app)
        .put(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PROFILE}/1`)
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + token)
        .field('name', 'Rizky')
        .field('city_id', 1)
        .field('phone_number', '085696241231')
        .field('address', 'Kota')

        const {code, data} = response.body
        expect(code).toBe(200);
        expect(data).toBe('Success update data')
    })

    // test('update profile user Image', async() => {
    //     const response = await request(app)
    //     .put(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PROFILE}/1`)
    //     .set('content-type', 'multipart/form-data')
    //     .set('Authorization', 'Bearer ' + token)
    //     .field('name', 'Rizky')
    //     .field('city_id', 1)
    //     .field('phone_number', '085696241231')
    //     .field('address', 'Kota')
    //     .attach('image', fs.readFileSync(`${__dirname}/upload.png`), 'public/static/images/file.png')

    //     const {code, data} = response.body
    //     expect(code).toBe(200);
    //     expect(data).toBe('Success update data')
    // })

})


