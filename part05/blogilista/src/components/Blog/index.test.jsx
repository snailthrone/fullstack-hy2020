import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'

import Blog from '.'

const mockBlog = {
  title: 'You may not need d3',
  author: 'Jerome Cukier',
  url: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/',
  likes: 5,
  user: {
    name: 'John Doe'
  }
}

const handleLike = jest.fn()
const removeBlog = jest.fn()

test('renders title and author but not url and likes', () => {
  const component = render(<Blog blog={mockBlog} handleLike={handleLike} removeBlog={removeBlog} />)

  expect(component.container).toHaveTextContent(mockBlog.title)
  expect(component.container).toHaveTextContent(mockBlog.author)
  expect(component.container).not.toHaveTextContent(mockBlog.url)
  expect(component.container).not.toHaveTextContent(mockBlog.likes)
})

test('renders url and likes after show button is pressed', async () => {
  const component = render(<Blog blog={mockBlog} handleLike={handleLike} removeBlog={removeBlog} />)

  const showButton = component.getByText('Show')
  fireEvent.click(showButton)

  expect(component.container).toHaveTextContent(mockBlog.url)
  expect(component.container).toHaveTextContent(mockBlog.likes)
})

test('like button handler is called twice', async () => {
  const component = render(<Blog blog={mockBlog} handleLike={handleLike} removeBlog={removeBlog} />)

  const showButton = component.getByText('Show')
  fireEvent.click(showButton)

  const likeButton = component.getByText('Like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(handleLike).toBeCalledTimes(2)
})




