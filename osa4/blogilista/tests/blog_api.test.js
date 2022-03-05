const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const loginCredentials = {
  username: helper.initialUsers[0].username,
  password: helper.initialUsers[0].password
}

const getUser = async () => {
  const login = await api.post('/api/login').send(loginCredentials)
  return login.body
}

const getBearer = (token) => `Bearer ${token}`

const insertBlog = async (blog) => {
  const user = await getUser()
  await api.post('/api/blogs').set('Authorization', getBearer(user.token)).send(blog)
}

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
  await Blog.deleteMany({})
  await Promise.all(helper.initialBlogs.map(async (blog) => await insertBlog(blog)))
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('each blog is identified by "id" property', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('blog is added correctly to MongoDB', async () => {
  const user = await getUser()
  const add = await api.post('/api/blogs').set('Authorization', getBearer(user.token)).send(helper.exampleBlog)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body).toContainEqual({...add.body, user: { id: user.id, name: user.name, username: user.username }})
})

test('blog has correct default value for number of likes', async () => {
  const user = await getUser()
  const blog = helper.exampleBlog
  delete blog.likes
  const add = await api.post('/api/blogs').set('Authorization', getBearer(user.token)).send(blog)
  const response = await api.get('/api/blogs')

  expect(response.body.find(x => x.id === add.body.id).likes).toBe(0)
})

test('adding blog should return error 400 if title and/or url is missing', async () => {
  const user = await getUser()
  const blog = helper.exampleBlog
  delete blog.title
  delete blog.url

  const add = await api.post('/api/blogs').set('Authorization', getBearer(user.token)).send(blog)
  expect(add.statusCode).toBe(400)
})

test('deleting should work', async () => {
  const user = await getUser()
  const blogs = await api.get('/api/blogs')
  const idToBeDeleted = blogs.body[0].id

  const remove = await api.delete(`/api/blogs/${idToBeDeleted}`).set('Authorization', getBearer(user.token))
  const response = await api.get('/api/blogs')

  expect(remove.statusCode).toBe(204)
  expect(response.body).toHaveLength(1)
})

test('updating should work', async () => {
  const user = await getUser()
  const blogs = await api.get('/api/blogs')
  const blogToBeUpdated = blogs.body[0]

  blogToBeUpdated.author = 'Testi Testinen'

  await api.put(`/api/blogs/${blogToBeUpdated.id}`).set('Authorization', getBearer(user.token)).send(blogToBeUpdated)
  const response = await api.get('/api/blogs')

  expect(response.statusCode).toBe(200)
  expect(response.body).toContainEqual(blogToBeUpdated)
})

test('adding blog should fail without valid authorization', async () => {
  const add = await api.post('/api/blogs').set('Authorization', getBearer('test_token_invalid')).send(helper.exampleBlog)

  const response = await api.get('/api/blogs')

  expect(add.statusCode).toBe(401)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close();
})