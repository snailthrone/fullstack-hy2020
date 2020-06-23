const dummy = (blogs) => 1

const getAuthors = (blogs) => [...new Set(blogs.map(({ author }) => author))]

const favouriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map(({ likes }) => likes))
  return blogs.find(({ likes }) => likes === mostLikes)
}

const mostBlogs = (blogs) => {
  const authors = getAuthors(blogs).map(author => ({ author, blogs: blogs.filter((b) => b.author === author).length }))
  const mostBlogs = Math.max(...authors.map((b) => b.blogs))
  return authors.find(author => author.blogs === mostBlogs)
}

const totalLikes = (blogs) => blogs.map(({ likes }) => likes).reduce((c, p) => c + p, 0)

const mostLikes = (blogs) => {
  const authors = getAuthors(blogs).map(author => ({ author, likes: totalLikes(blogs.filter((b) => b.author === author)) }))
  const mostLikes = Math.max(...authors.map((b) => b.likes))
  return authors.find(author => author.likes === mostLikes)
}

module.exports = {
  dummy,
  favouriteBlog,
  mostBlogs,
  mostLikes,
  totalLikes
}
