const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const User = require('../models/user')

blogRouter.get('/', (request, response, next) => {
  Blog.find({}).populate('user', { username: 1, name: 1 })
  .then(blogs => {
    response.json(blogs)
  })
  .catch(error => next(error))
})

blogRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  const user = request.user

  const blog = new Blog({...request.body, user: user.id})

  blog.save()
  .then(result => {
    user.blogs = user.blogs.concat(result.id)
    user.save().then(() => {
      response.status(201).json(result)
    })
    .catch(error => next(error))

  })
  .catch(error => next(error))
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const id = request.params.id
  const user = request.user

  const blog = await Blog.findById(id).populate('user', { id: 1 })

  // Doesn't exists at all
  if (!blog) response.status(204).end()

  if (!blog.user || blog.user.id !== user.id) {
    response.status(401).json({ error: 'you don\' have permission to delete this blog' })
  }


  blog.remove()
    .then(async () => {
      const userBlogs = await User.findById(user.id).populate('blogs')
      userBlogs.blogs = userBlogs.blogs.filter(blog => blog.id !== id)
      await userBlogs.save()
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {
  const id = request.params.id
  // const user = request.user

  const blog = await Blog.findById(id).populate('user', { id: 1 })

  // Doesn't exists at all
  if (!blog) response.status(404).end()

  // if (!blog.user || blog.user.id !== user.id) {
  //   response.status(401).json({ error: 'you don\' have permission to edit this blog' })
  // }

  const body = request.body

  const data = {
    author: body.author || blog.author,
    likes: body.likes !== undefined ? body.likes : blog.likes,
    title: body.title || blog.title,
    url: body.url || blog.url
  }

  Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

module.exports = blogRouter