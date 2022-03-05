const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', (request, response, next) => {
  User.find({}).populate('blogs', { author: 1, title: 1, url: 1 })
  .then(users => {
    response.json(users)
  })
  .catch(error => next(error))
})

usersRouter.post('/', async (request, response,) => {
  const body = request.body

  if (!body.password || !(typeof body.password === 'string') || body.password.length < 3) {
    response.status(400).json({ error: 'password is not valid' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter