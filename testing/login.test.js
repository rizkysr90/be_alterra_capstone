const app = require('../app')
const request = require('supertest')

describe('Endpoint login user', () => {
    // Positif test
    test('login success', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_LOGIN}`)
        .send({
                email : "rqizkiiqq@gmail.com",
                password : "rqizkiiqq123456"
            })
        .set('Accept', 'application/json')

        const {code, data} = response.body
        expect(response.status).toBe(200)
    })

    // negatif test
    test('login Failed user not found', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_LOGIN}`)
        .send({
            email : "binarAcademy@gmail.com",
            password : "binarAcademy"
        })
        .set('Accept', 'application/json')
        
        const {code, message} = response.body
        expect(response.status).toBe(404);
        expect(message).toBe(`User not found`)
    })

    test('login Failed user Password tidak sesuai', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_LOGIN}`)
        .send({
            email : "angel@gmail.com",
            password : "adaangle1234567",
            })
        .set('Accept', 'application/json')

        const {code, message} = response.body
        expect(response.status).toBe(400);
        expect(message).toBe(`Password tidak sesuai`)
    })
})
