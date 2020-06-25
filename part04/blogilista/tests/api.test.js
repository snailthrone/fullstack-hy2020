const mongoose = require('mongoose')
const supertest = require('supertest')

const initialBlogs = require('./initialBlogs')
const initialUsers = require('./initialUsers')
const { blogsInDatabase, newBlog, usersInDatabase } = require('./testHelper')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  // const blogs =
  const users = initialUsers.map(user => new User(user))
  const userPromises = users.map(user => user.save())
  await Promise.all(userPromises)

  await Blog.deleteMany({})
  const u = await User.find({})
  const user = await User.findById(u[0]._id)
  const blogs = initialBlogs.map(blog => new Blog({ ...blog, user: user._id }))
  const blogPromises = blogs.map(blog => blog.save())
  await Promise.all(blogPromises)

  user.blogs = user.blogs.concat(blogs[0])
  await user.save()
})

describe('blogs http get', () => {
  test('blogs are returned as json', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('response contains a correct amount of blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('blog id field is `id` and blog has user data', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0].user).toBeDefined()
  })
})

describe('creating a blog', () => {
  let token
  beforeEach(async() => {
    const user = {
      'name': 'Charlie Brown',
      'username': 'charliebrown',
      'password': 'secret_password'
    }
    // create user
    await api.post('/api/users').send(user)

    // login
    const loginResponse = await api.post('/api/login').send(user)
    token = loginResponse.body.token
  })

  test('new blog can be added', async () => {
    const blogsAtStart = await blogsInDatabase()

    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDatabase()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
  })

  test('new blog cannot be added without token', async () => {
    const response = await api.post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('Unauthorized')
  })

  test('response has a user', async () => {
    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    expect(response.body.user).toBeDefined()
  })

  test('likes value is zero if it is not defined', async () => {
    // eslint-disable-next-line no-unused-vars
    const withoutLikes = (({ likes, ...rest }) => rest)(newBlog)
    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(withoutLikes)
    expect(response.body.likes).toBe(0)
  })

  test('likes value remains if it is defined', async () => {
    const response = await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    expect(response.body.likes).toBe(newBlog.likes)
  })

  test('returns HTTP 400 Bad request if title is not defined', async () => {
    // eslint-disable-next-line no-unused-vars
    const withoutTitle = (({ title, ...rest }) => rest)(newBlog)
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(withoutTitle)
      .expect(400)
  })

  test('returns HTTP 400 Bad request if url is not defined', async () => {
    // eslint-disable-next-line no-unused-vars
    const withoutUrl = (({ url, ...rest }) => rest)(newBlog)
    await api.post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(withoutUrl)
      .expect(400)
  })
})

describe('deleting a blog', () => {
  const mockBlog = {
    title: 'You may not need d3',
    author: 'Jerome Cukier',
    url: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/',
    likes: 10
  }
  let mockBlogId
  let token
  beforeEach(async() => {
    const user = {
      'name': 'Charlie Brown',
      'username': 'charliebrown',
      'password': 'secret_password'
    }
    // create user
    await api.post('/api/users').send(user)

    // login
    const loginResponse = await api.post('/api/login').send(user)
    token = loginResponse.body.token

    // add blog
    const blogResponse = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(mockBlog)
    mockBlogId = blogResponse.body.id
  })

  test('returns HTTP 204', async () => {
    await api.delete(`/api/blogs/${mockBlogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)
  })

  test('amout of blogs in database decreases', async () => {
    const blogsAtStart = await blogsInDatabase()

    await api.delete(`/api/blogs/${mockBlogId}`).set('Authorization', `bearer ${token}`)

    const blogsAtEnd = await blogsInDatabase()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('database does not contain title of blog to be deleted', async () => {
    await api.delete(`/api/blogs/${mockBlogId}`).set('Authorization', `bearer ${token}`)

    const blogsAtEnd = await blogsInDatabase()
    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(mockBlog.title)
  })
})

describe('updating a blog', () => {
  test('request returns HTTP 200', async () => {
    const blogs = await blogsInDatabase()
    const [ blogToModify ] = blogs;
    await api.put(`/api/blogs/${blogToModify.id}`)
      .send(blogToModify)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('amount of likes is changed', async () => {
    const blogs = await blogsInDatabase()
    const [ blogToModify ] = blogs;
    const likes = 100

    const response = await api.put(`/api/blogs/${blogToModify.id}`).send({ ...blogToModify, likes })

    expect(response.body.likes).not.toBe(blogs[0].likes)
    expect(response.body.likes).toBe(likes)
  })

  test('title is changed', async () => {
    const blogs = await blogsInDatabase()
    const [ blogToModify ] = blogs;
    const { title } = blogs[3]

    const response = await api.put(`/api/blogs/${blogToModify.id}`)
      .send({ ...blogToModify, title })

    expect(response.body.author).toBe(blogToModify.author)
    expect(response.body.title).toBe(title)
  })

  test('url is changed', async () => {
    const blogs = await blogsInDatabase()
    const [ blogToModify ] = blogs;
    const { url } = blogs[3]

    const response = await api.put(`/api/blogs/${blogToModify.id}`)
      .send({ ...blogToModify, url })

    expect(response.body.title).toBe(blogToModify.title)
    expect(response.body.url).toBe(url)
  })

  test('author is changed', async () => {
    const blogs = await blogsInDatabase()
    const [ blogToModify ] = blogs;
    const { author } = blogs[3]

    const response = await api.put(`/api/blogs/${blogToModify.id}`)
      .send({ ...blogToModify, author })

    expect(response.body.url).toBe(blogToModify.url)
    expect(response.body.author).toBe(author)
  })
})

describe('getting users', () => {
  test('users are returned as json', async () => {
    await api.get('/api/users/')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('user object has a correct shape', async () => {
    const response = await api.get('/api/users/')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0].name).toBeDefined()
    expect(response.body[0].username).toBeDefined()
    expect(response.body[0].blogs[0].title).toBeDefined()
  })

})

describe('creating a new user', () => {
  test('new user can be added', async () => {
    const newUser = {
      name: 'Eemeli Martti',
      password: 'salasana',
      username: 'snailthrone',
    }
    const usersAtStart = await usersInDatabase()
    await api.post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  })

  test('creation fails if username is taken', async() => {
    const usersAtStart = await usersInDatabase()
    const result = await api.post('/api/users/')
      .send(initialUsers[0])
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username is not defined', async() => {
    const usersAtStart = await usersInDatabase()
    const newUser = {
      name: 'Charlie Brown',
      password: 'password'
    }
    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` is required')
    const usersAtEnd = await usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if username\'s length is less than three', async() => {
    const usersAtStart = await usersInDatabase()
    const newUser = {
      name: 'Charlie Brown',
      username: 'cb',
      password: 'password'
    }
    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('is shorter than the minimum allowed length')
    const usersAtEnd = await usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails if password is less than three', async() => {
    const usersAtStart = await usersInDatabase()
    const newUser = {
      name: 'Charlie Brown',
      username: 'charliebrown',
      password: 'cb'
    }
    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('Password is too short')
    const usersAtEnd = await usersInDatabase()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('login', () => {
  const mockUser = {
    name: 'Foobar',
    username: 'foo',
    password: 'bar'
  }
  beforeEach(async () => {
    await api.post('/api/users/').send(mockUser)
  })
  test('login succes with correct status and response', async () => {
    await api.post('/api/login/')
      .send(mockUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('response has a token', async () => {
    const response = await api.post('/api/login/').send(mockUser)
    expect(response.body.token).toBeDefined()
  })

  test('login fails if user is not found', async () => {
    await api.post('/api/login/').send().expect(401).expect('Content-Type', /application\/json/)
  })

  test('login fails if password is wrong', async () => {
    await api.post('/api/login/').send({ ...mockUser, password: 'password' }).expect(401).expect('Content-Type', /application\/json/)
  })
})

afterAll(async () => {
  mongoose.connection.close()
})
