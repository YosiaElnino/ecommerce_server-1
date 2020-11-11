const { beforeAll } = require('@jest/globals');
const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token;
let token_customer;
let id;

afterAll(done => {
  queryInterface.bulkDelete("Products")
    .then(() => { done() })
    .catch(err => { done() })
})

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


describe('Test endpoint PUT /products', () => {
  it('Test update product success', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set({ access_token })
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: 2000000000,
        stock: 2
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(200)
        expect(body).toHaveProperty('name', expect.any(String))
        expect(body).toHaveProperty('description', expect.any(String))
        expect(body).toHaveProperty('image_url', expect.any(String))
        expect(body).toHaveProperty('price', expect.any(Number))
        expect(body).toHaveProperty('stock', expect.any(Number))
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test update product no access token', (done) => {
    request(app)
      .put(`/products/${id}`)
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: 2000000000,
        stock: 2
      })
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

  it('Test update product role is not authorized', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set({ access_token: token_customer })
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: 2000000000,
        stock: 2
      })
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

  it('Test update product stock is less than 0', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set({ access_token })
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: 2000000000,
        stock: -1
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Stock must be greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test update product price is less than 0', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set({ access_token })
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: -2,
        stock: 2
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Price must be greater than 0')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test update product data type error', (done) => {
    request(app)
      .put(`/products/${id}`)
      .set({ access_token })
      .send({
        name: "Tas",
        description: "Fancy bag",
        image_url: "https://i.pinimg.com/originals/cb/69/8c/cb698ce8b5dd00861f95db2765a6a8e6.jpg",
        price: "expensive",
        stock: 2
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Please fill price with number')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})