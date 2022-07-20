const app = require('../app')
const request = require('supertest')

let token = null;
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

  describe('Endpoint myproduct Get By All', () => {
      // Positif Test
        test('Get By All myproduct success', async() => {
            const response = await request(app)
            .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=1`)
            .set('Authorization', 'Bearer ' + token)
            const {code, data} = response.body
            expect(code).toBe(200);
        })

        // Negatif Test
        test('Get By All myproduct not found', async() => {
            const response = await request(app)
            .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}?page=100`)
            .set('Authorization', 'Bearer ' + token)
            const {code, message} = response.body
            expect(code).toBe(404)
            expect(message).toBe('Product not found');
        })
  })

describe('Endpoint myproduct Get By id', () => {
    // Positif Test
    test('Get By id myproduct success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}/1`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200);
    })

     // Negatif Test
     test('Get By id myproduct Tidak Ditemukan', async() => {
         const id = 100;
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}/${id}`)
        .set('Authorization', 'Bearer ' + token)
        const {code, message} = response.body
        expect(code).toBe(401)
        expect(message).toBe(`id ${id} Tidak Ditemukan`);
    })
})

describe('Endpoint myproduct Terjual', () => {
    // Positif Test
    // masterdata status harus false
    test('Get terjual myproduct success', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}/terjual?page=1`)
        .set('Authorization', 'Bearer ' + token)
        const {code, data} = response.body
        expect(code).toBe(200);
    })

    // Negatif Test
    test('Get terjual myproduct not found', async() => {
       const response = await request(app)
       .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}/terjual?page=100`)
       .set('Authorization', 'Bearer ' + token)
       const {code, message} = response.body
       expect(code).toBe(404)
       expect(message).toBe(`Product not found`);
   })
})

describe('Endpoint myproduct Create', () => {
    test('Create myproduct Success', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_MYPRODUCT}`)
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + token)
        .field('name', 'Rizky')
        .field('price', 250000)
        .field('description', 'jam Tangan bekas')
        .field('isActive', true)
        .field('status', true)
        .field('id_user', 1)
        .field('id_category', 1)
        .attach('gambar', `${__dirname}/upload.jpg`)
        .attach('gambar', `${__dirname}/Pengertian-Bahasa-Pemrograman.jpeg`)
        .attach('gambar', `${__dirname}/Screenshot.png`)


        const {code, data} = response.body
        expect(code).toBe(201);
    }, 50000)
})
