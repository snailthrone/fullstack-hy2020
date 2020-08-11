import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from '../Button'

export const Container = styled.div`
  background-color: inherit;
  padding: 16px;
`

export const AddButton = styled(Button)`
  display: inline-block;
`

export const Post = styled.div`
  margin: auto auto 16px auto;
`

export const BlogLink = styled(Link)`
  color: #000;
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 16px;
  font-weight: 400;
  text-decoration: none;
`

export const Author = styled.em`
  font-size: 12px;
  font-weight: 300;
  font-style: italic;
`