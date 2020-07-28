import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import NewBlog from '.'

const createBlog = jest.fn()

test('callback function is called', async () => {
  const component = render(<NewBlog createBlog={createBlog} />)

  const titleField = component.container.querySelector('#title')
  const authorField = component.container.querySelector('#author')
  const urlField = component.container.querySelector('#url')
  const submitButton = component.getByText('Add')

  fireEvent.change(titleField, { target: { value: 'You May Not Need D3' } })
  fireEvent.change(authorField, { target: { value: 'Jerome Cukier' } })
  fireEvent.change(urlField, { target: { value: 'http://www.jeromecukier.net/2015/05/19/you-may-not-need-d3/' } })

  fireEvent.click(submitButton)

  expect(createBlog).toHaveBeenCalled()

})