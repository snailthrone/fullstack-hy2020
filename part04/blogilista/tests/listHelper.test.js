const listHelper = require('../utils/listHelper')
const initialBlogs = require('./initialBlogs')

const listWithOneBlog = [initialBlogs[0]]
const { author, likes } = listWithOneBlog[0]

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('favourite blog', () => {
  test('when list has only one blog equal the favourite to that', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('with all blogs favourite blogs is third blog', () => {
    const result = listHelper.favouriteBlog(initialBlogs)
    expect(result).toEqual(initialBlogs[2])
  })
})

describe('most blogs', () => {
  test('with one blog equals to that writer and one blog', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author, blogs: 1 })
  })
  test('with all blogs equals to Rober C. Martin with three blogs', () => {
    const result = listHelper.mostBlogs(initialBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('with one blog equals to that writer and equals the likes of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({ author, likes })
  })
  test('with all blogs equals to Edsger W. Dijkstra with 17 likes', () => {
    const result = listHelper.mostLikes(initialBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(listWithOneBlog[0].likes)
  })

  test('with all blogs equals to 36', () => {
    const result = listHelper.totalLikes(initialBlogs)
    expect(result).toBe(36)
  })
})
