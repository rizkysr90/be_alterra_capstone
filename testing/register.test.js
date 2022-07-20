const app = require('../app')
const request = require('supertest')

describe('Endpoint register user ', () => {
    // Positif Test
    test('create data users success new User', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_REGISTER}`)
        .send({
                email : "tes1@gmail.com",
                password : "tes1123456",
                name : "tes1"
            })
        .set('Accept', 'application/json')
        
        const {code, data} = response.body
        expect(response.status).toBe(201)
    })

    // negatif test
    test('create data users Error Data Sudah Digunakan', async() => {
        const response = await request(app)
        .post(`${process.env.BASE_URL}/${process.env.URL_ROUTER_REGISTER}`)
        .send({
                email : "angel@gmail.com",
                password : "adaangle123",
                name : "Angel"
            })
        .set('Accept', 'application/json')
        
        const {code, message} = response.body
        expect(response.status).toBe(400);
        expect(message).toBe(`Email sudah digunakan`)
    })
})



    // test('delete data users success', async() => {
    //     const response = await request(app)
    //     .delete(`${process.env.BASE_URL}/${process.env.URL_ROUTER_USER}/1`)
    //     const {status, message} = response.body
    //     console.log(status, message, response.body)
    // })
    
