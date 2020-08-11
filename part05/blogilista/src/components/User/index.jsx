import React from 'react'
import { arrayOf, shape, string } from 'prop-types'

import * as s from './index.styled'
import { Heading2, Heading3, ListItem, UnorderedList } from '../common'

const User = ({ blogs, name }) => (
  <s.Container>
    <Heading2>{name}</Heading2>
    <Heading3>Added blogs</Heading3>
    <UnorderedList>
      {blogs.map(({ title }) => <ListItem key={title}>{title}</ListItem>)}
    </UnorderedList>
  </s.Container>
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