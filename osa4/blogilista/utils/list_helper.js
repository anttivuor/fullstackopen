const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((p, c) => p + c.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (!blogs.length) return null
  return blogs.reduce((p, c) => {
    if (p.likes > c.likes) return p
    return c
  }, {})
}

const mostBlogs = (blogs) => {
  if (!blogs.length) return null
  const numberOfBlogsByAuthor = _.countBy(blogs, 'author')
  const authorBlogs = Object.keys(numberOfBlogsByAuthor).map(key => ({ author: key, blogs: numberOfBlogsByAuthor[key] }))
  return _.maxBy(authorBlogs, 'blogs')
}

const mostLikes = (blogs) => {
  if (!blogs.length) return null
  const authorLikes = []
  blogs.forEach(b => {
    const index = authorLikes.findIndex(a => a.author === b.author)
    if (index === -1) authorLikes.push({ author: b.author, likes: b.likes })
    else {
      authorLikes[index] = {
        author: b.author,
        likes: b.likes + authorLikes[index].likes
      }
    }
  })
  const maxLikes = _.maxBy(authorLikes, 'likes')

  console.log(authorLikes)
  return {
    author: maxLikes.author,
    likes: maxLikes.likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}