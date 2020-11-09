const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token;
let token_customer;

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
      done()
    }).catch(err => {
      console.log(err)
    })
})

beforeAll(done => {
  request(app)
    .post('/login')
    .send({
      email: 'customer@mail.com',
      password: '1234'
    }).then(response => {
      token_customer = response.body.access_token
      done()
    }).catch(err => {
      console.log(err)
    })
})

describe('Test endpoint POST /products', () => {
  it('Test create product success', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: 10
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(201)
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

  it('Test create product no access token', (done) => {
    request(app)
      .post('/products')
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: 10
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

  it('Test create product role is not authorized', (done) => {
    request(app)
      .post('/products')
      .set({ access_token: token_customer })
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: 10
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

  it('Test create product name is required', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: "",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: 10
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Name is required')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test create product stock is less than 0', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: -5
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

  it('Test create product price is less than 0', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: -5,
        stock: 10
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

  it('Test create product data type error', (done) => {
    request(app)
      .post('/products')
      .set({ access_token })
      .send({
        name: "Sepatu",
        description: "Sepatu merah celana biru ku tak peduli",
        image_url: "https://static.shop.adidas.co.id/media/catalog/product/cache/2/thumbnail/1200x/9df78eab33525d08d6e5fb8d27136e95/B/B/BB6166_SL_eCom.jpg",
        price: 2000000,
        stock: "ten"
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(400)
        expect(body).toHaveProperty('msg', 'Please fill stock with number')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})
