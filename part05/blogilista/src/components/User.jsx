import React from 'react'
import { arrayOf, shape, string } from 'prop-types'

const User = ({ blogs, name }) => (
  <div>
    <h2>{name}</h2>
    <h3>Added blogs</h3>
    <ul>
      {blogs.map(({ title }) => <li key={title}>{title}</li>)}
    </ul>
  </div>
)

User.propTypes = {
  blogs: arrayOf(shape({
    title: string.isRequired,
    author: string,
    url: string
  })).isRequired,
  name: string.isRequired
}

export default User