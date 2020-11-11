const request = require('supertest');
const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize

let access_token;
let token_customer;

afterAll(done => {
  queryInterface.bulkDelete("Categories")
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
      done()
    }).catch(err => {
      console.log(err)
    })
})

describe('Test endpoint POST /categories', () => {
  it('Test create category success', (done) => {
    request(app)
      .post('/categories')
      .set({ access_token })
      .send({
        name: "Sepatu"
      })
      .then(response => {
        const { body, status } = response
        expect(status).toBe(201)
        expect(body).toHaveProperty('name', expect.any(String))
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  it('Test create category no access token', (done) => {
    request(app)
      .post('/categories')
      .send({
        name: "Sepatu"
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

  it('Test create category role is not authorized', (done) => {
    request(app)
      .post('/categories')
      .set({ access_token: token_customer })
      .send({
        name: "Sepatu"
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
})