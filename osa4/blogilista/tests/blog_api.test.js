const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
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
  const add = await api.post('/api/blogs').send(helper.exampleBlog)
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(response.body).toContainEqual(add.body)
})

test('blog has correct default value for number of likes', async () => {
  const blog = helper.exampleBlog
  delete blog.likes
  const add = await api.post('/api/blogs').send(blog)
  const response = await api.get('/api/blogs')

  expect(response.body.find(x => x.id === add.body.id).likes).toBe(0)
})

test('adding blog should return error 400 if title and/or url is missing', async () => {
  const blog = helper.exampleBlog
  delete blog.title
  delete blog.url

  const add = await api.post('/api/blogs').send(blog)
  expect(add.statusCode).toBe(400)
})

test('deleting should work', async () => {
  const blogs = await api.get('/api/blogs')
  const idToBeDeleted = blogs.body[0].id

  const remove = await api.delete(`/api/blogs/${idToBeDeleted}`)
  const response = await api.get('/api/blogs')

  expect(remove.statusCode).toBe(204)
  expect(response.body).toHaveLength(1)
})

test('updating should work', async () => {
  const blogs = await api.get('/api/blogs')
  const blogToBeUpdated = blogs.body[0]

  blogToBeUpdated.author = 'Testi Testinen'

  await api.put(`/api/blogs/${blogToBeUpdated.id}`).send(blogToBeUpdated)
  const response = await api.get('/api/blogs')

  expect(response.body).toContainEqual(blogToBeUpdated)
})

afterAll(() => {
  mongoose.connection.close();
})