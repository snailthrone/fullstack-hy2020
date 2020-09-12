const { ApolloServer, AuthenticationError, gql, PubSub, UserInputError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

// Models
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')

const pubsub = new PubSub()

// Config
const { JWT_SECRET, MONGODB_URI } = require('./utils/config')

mongoose.set('useFindAndModify', false)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connection to MongoDB:', error.message))

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    id: ID!
    genres: [String!]!
  }

  type Token {
    value: String!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Mutation {
    addBook(title: String! author: String! published: Int! genres: [String!]!): Book!
    createUser(username: String! favoriteGenre: String!): User
    editAuthor(name: String!, setBornTo: Int!): Author!
    login(username: String! password: String!): Token
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(name: String genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books')

      return authors.map((a) => ({ name: a.name, born: a.born, bookCount: a.books.length }))
    },
    allBooks: async (root, args) => {
      if (args.name && args.genre) {
        const books = await Book.find({ genres: { $in: [args.genre] } }).populate('author')
        return books.filter(({ author }) => author.name === args.name)
      }
      if (args.name) {
        const books = await Book.find({}).populate('author')
        return books.filter(({ author }) => author.name === args.name)
      }
      if (args.genre) {
        return await Book.find({ genres: { $in: [args.genre] } }).populate('author')
      }
      return await Book.find({}).populate('author')
    },
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.author })

      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const bookAuthor = await Author.findOne({ name: args.author })
      const book = new Book({ ...args, author: bookAuthor })
      bookAuthor.books = bookAuthor.books.concat(book._id)

      try {
        await book.save()
        await bookAuthor.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book })
      return book
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      try {
        return user.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
      return author
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong crendentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      console.log(userForToken)

      return { value: jwt.sign(userForToken, JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})