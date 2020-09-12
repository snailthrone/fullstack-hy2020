import styled from 'styled-components'

import { Heading2 } from '../common'

import Button from '../Button'
import { Form, FormInput } from '../common'

export const Container = styled.div`
  background-color: inherit;
  padding: 0 16px 16px 16px;
`

export const Heading = styled(Heading2)`
  text-align: left;
  padding: 0 16px;
`

export const Text = styled.p`
  font-size: 12px;
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 300;
  word-wrap: break-word;
`

export const Emphasis = styled.em`
  font-style: italic;
`

export const Strong = styled.strong`
  font-weight: 700;
`

export const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

export const LikeButton = styled(Button)`
  font-size: 12px;
  margin: initial;
  margin-left: 8px;
  padding: 4px 8px;
`

export const RemoveButton = styled(LikeButton)`
  display: inline-block;
  margin: auto;
`

export const CommentForm = styled(Form)`
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  max-width: initial;

  ${FormInput} {
    flex: 2;
    margin-left: initial;
  }
`

export const CommentButton = styled(LikeButton)`
  display: initial;
  flex: 1;
  margin: auto auto auto 4px;
`

export const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`

export const CommentListItem = styled.li`
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 12px;
  font-weight: 300;
  margin: auto auto 1.5em auto;
`