const app = require('../app')
const request = require('supertest')

let token = null;
let id = 1;
// Login terlebih dahulu agar bisa mengakses product buyer
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
            done();
        });
  });


describe('Endpoint product Get ById', () => {
    // Positif test
    const id = 1
    test('Get By Id product success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}/${id}`)
        .set('Authorization', 'Bearer ' + token)
        const {code, message} = response.body
        expect(code).toBe(200);
    })

    // Negatif test
    test('Get By Id product Tidak Ditemukan', async() => {
        const id = 100;
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}/${id}`)
        .set('Authorization', 'Bearer ' + token)
        const {code, message} = response.body
        expect(code).toBe(401);
        expect(message).toBe(`id ${id} Tidak Ditemukan`)
    })
})


describe('Endpoint product Get by All', () => {
    // Positif Test
    test('Get By All product success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}?page=1&row=10`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200);
    })

    test('Get By All Category product success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}?page=1&row=10&category=1`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200);
    })

    test('Get By Search Name product success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}?page=1&row=10&search=AIRism`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200);
    })

    // Negatif Test
    test('Get By All product Array Kosong', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_PRODUCT}?page=100&row=10`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200)
        expect.not.arrayContaining(code)
    })
})