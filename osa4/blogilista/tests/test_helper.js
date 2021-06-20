const Blog = require('../models/blog')

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

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Test blog',
    author: 'unknown',
    url: 'https://test.com',
    likes: 0
  })
  await note.save()
  await note.remove()

  return note._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, exampleBlog, nonExistingId, blogsInDb
}