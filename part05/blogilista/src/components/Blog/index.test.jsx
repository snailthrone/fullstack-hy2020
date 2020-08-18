import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen } from '../../../test-utils'

import Blog from '.'

const mockBlog = {
  comments: [{ content: 'this is a test comment', id: 'foo' }],
  author: 'Jerome Cukier',
  id: 'foo',
  likes: 5,
  title: 'You may not need d3',
  url: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/',
  user: {
    id: 'bar',
    name: 'John Doe',
    username: 'johndoe'
  }
}

test('renders content', () => {
  const component = render(<Blog blog={mockBlog} />)

  expect(component.container).toHaveTextContent(mockBlog.title)
  expect(component.container).toHaveTextContent(mockBlog.author)
  expect(component.container).toHaveTextContent(mockBlog.url)
  expect(component.container).toHaveTextContent(mockBlog.likes)
  expect(component.container).toHaveTextContent(mockBlog.user.name)
  expect(component.container).toHaveTextContent(mockBlog.comments[0].content)

})





