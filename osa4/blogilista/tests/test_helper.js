const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const exampleBlog = {
  title: 'React Native, is it good?',
  author: 'Antti Vuorenmaa',
  url: 'https://anttisblog.com',
  likes: 123
}

const initialUsers = [
  {
    username: 'antti',
    password: '123123',
    name: 'Antti Vuorenmaa'
  },
  {
    username: 'ville',
    password: '321312',
    name: 'Ville Vuorenmaa'
  }
]

const exampleUser = {
  username: 'root',
  password: 'test',
  name: 'Test Testinen'
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, exampleBlog, initialUsers, exampleUser, usersInDb
}