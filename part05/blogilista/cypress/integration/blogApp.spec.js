const mockUser = {
  name: 'Jane Doe',
  username: 'doejane',
  password: 'password'
}

const mockBlog = {
  title: 'You might not need D3',
  author: 'Jerome Cukier',
  url: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser(mockUser)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to Application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('doejane')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'Jane Doe logged in')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
      cy.get('.notification').should('not.contain', 'Invalid username or password')
    })

    it('fails with wrong credentials', function() {
      // TODO: bonus: ensure notification is red
      cy.get('#username').type('johndoe')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.notification').should('contain', 'Invalid username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
      cy.get('.notification').should('not.contain', 'Jane Doe logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(mockUser)
    })

    it('a new blog can be created', function() {
      cy.get('#blog-form-button').click()

      cy.get('#title').type(mockBlog.title)
      cy.get('#author').type(mockBlog.author)
      cy.get('#url').type(mockBlog.url)
      cy.get('#add-blog-button').click()
      cy.contains(mockBlog.title)
      cy.contains(mockBlog.author)
    })

    describe('a blog exists', function() {
      beforeEach(function() {
        cy.createBlog(mockBlog)
      })

      it('blog can be liked', function() {
        cy.get('.info-button').click()
        cy.contains(mockBlog.url)
        cy.contains('likes')
        cy.contains(mockUser.name)

        cy.get('.blog-likes').then((likes) => {
          const oldLikes = likes.text()
          cy.get('.like-button').click()
          cy.get('.blog-likes').should((newLikes) => {
            expect(newLikes.text()).not.to.eq(oldLikes)
          })
        })
      })

      describe('removing a blog', function() {
        beforeEach(function() {
          cy.createUser({ name: 'John Doe', username: 'doejohn', password: 'password' })
          cy.get('#logout-button').click()
        })

        it('user who created the blog can remove', function() {
          cy.login(mockUser)

          cy.get('.remove-button').click()

          cy.get('.notification').should('contain', 'Removed')
          cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
          cy.get('.notification').should('have.css', 'border-style', 'solid')
          cy.get('.notification').should('not.contain', 'Could not remove')
        })

        it('user who did not create the blog cannot remove', function() {
          cy.login({ username: 'doejohn', password: 'password' })

          cy.get('.remove-button').click()

          cy.get('.notification').should('contain', 'Could not remove')
          cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
          cy.get('.notification').should('have.css', 'border-style', 'solid')
          cy.get('.notification').should('not.contain', 'Removed')
        })
      })
    })

    describe('blog order', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'React patterns',
          author: 'Michael Chan',
          url: 'https://reactpatterns.com/',
          likes: 7,
        })
        cy.createBlog({
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
        })
        cy.createBlog({
          title: 'Canonical string reduction',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
          likes: 12,
        })
      })
      it('blogs are ordered descending by likes', function() {
        cy.get('.info-button').each($button => {
          $button.click()
        })
        cy.get('.blog-likes')
          .should('have.length', 3)
          .then($likes => $likes.toArray().map(($like) => Number($like.textContent)))
          .then(likes => {
            const likesCopy = likes.slice()
            const sorted = likesCopy.sort((a, b) => b - a)
            expect(likes, 'likes are sorted').to.deep.equal(sorted)
          })
      })
    })
  })
})