const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token;
let token_customer;
let id;

beforeAll(done => {
  request(app)
    .post('/login')
    .send({
      email: 'admin@mail.com',
      password: '1234'
    }).then(response => {
      access_token = response.body.access_token
      return request(app).post('/login').send({
        email: 'customer@mail.com',
        password: '1234'
      })
    })
    .then(response => {
      token_customer = response.body.access_token
      return request(app).post('/products').set({ access_token }).send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: 10
      })
    })
    .then(response => {
      id = response.body.id
      done()
    })
    .catch(err => {
      console.log(err)
    })
})

describe('Test endpoint DELETE /products', () => {
  it('Test delete product success', (done) => {
    request(app)
      .delete(`/products/${id}`)
      .set({ access_token })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('msg', 'Product has been deleted')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test delete product no access token', (done) => {
    request(app)
      .delete(`/products/${id}`)
      .then(response => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authentication failed')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test delete product role is not authorized', (done) => {
    request(app)
      .delete(`/products/${id}`)
      .set({ access_token: token_customer })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(401)
        expect(body).toHaveProperty('msg', 'Authorization failed, please login as admin')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})