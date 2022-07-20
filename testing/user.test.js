const app = require('../app')
const request = require('supertest')

const bcrypt = require('bcrypt')

const { sequelize } = require('../src/models');
const userData = require('../src/masterdata/users.json').map((eachData) => {
    eachData.createdAt = new Date();
    eachData.updatedAt = new Date();
    eachData.password =  bcrypt.hashSync(eachData.password,+process.env.SALT_ROUNDS);
    return eachData;
  })

const productData = require('../src/masterdata/products.json').map((eachData) => {
    eachData.createdAt = new Date();
    eachData.updatedAt = new Date();
    return eachData;
})

const product_imagesData = require('../src/masterdata/product_images.json').map((eachData) => {
    eachData.createdAt = new Date();
    eachData.updatedAt = new Date();
    return eachData;
})

const categoriesData = require('../src/masterdata/categories.json').map((eachData) => {
    eachData.createdAt = new Date();
    eachData.updatedAt = new Date();
    return eachData;
})

const citiesData = require('../src/masterdata/cities.json').map((eachData) => {
    eachData.createdAt = new Date();
    eachData.updatedAt = new Date();
    return eachData;
})

beforeAll(async () => {
    try {
        await sequelize.sync({force:true});
        await sequelize.queryInterface.bulkInsert('Cities', citiesData, {});
        await sequelize.queryInterface.bulkInsert('Categories', categoriesData, {});
        await sequelize.queryInterface.bulkInsert('Users', userData, {});
        await sequelize.queryInterface.bulkInsert('Products', productData, {});
        await sequelize.queryInterface.bulkInsert('Product_images', product_imagesData, {});

    } catch(e) {
        console.log('Error at service test',e)
    }
        
},100000)

afterAll(async () => {    
    await sequelize.close();
})

let token = null;
// Login terlebih dahulu agar bisa mengakses Semua Users
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

describe('Endpoint User Get All', () => {
    test('Get user By All', async() => {
        const response = await request(app)
        .get(`${process.env.BASE_URL}/${process.env.URL_ROUTER_USER}?page=1`)
        .set('Authorization', 'Bearer ' + token)
        const {messege} = response.body
        expect(messege).toBe('Succcess')
    })
})