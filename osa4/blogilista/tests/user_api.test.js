const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

test('user is added properly', async () => {
  const response = await api.post('/api/users').send(helper.exampleUser)

  expect(response.statusCode).toBe(200)
})

test('creation fails with proper statuscode and message if username already taken', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    ...helper.exampleUser,
    username: usersAtStart[0].username
  }

  const response = await api.post('/api/users').send(newUser)

  expect(response.statusCode).toBe(400)
  expect(response.body.error).toContain('`username` to be unique')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

test('creation fails with proper statuscode and message if password is too short', async () => {
  const usersAtStart = await helper.usersInDb()

  const newUser = {
    ...helper.exampleUser,
    password: '12'
  }

  const response = await api.post('/api/users').send(newUser)

  expect(response.statusCode).toBe(400)
  expect(response.body.error).toContain('password is not valid')

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
})

afterAll(() => {
  mongoose.connection.close();
})