import React from 'react'
import { useSelector } from 'react-redux'

import { Heading3 } from '../common'

import * as s from './index.styled'

const Users = () => {
  const { login: { users } } = useSelector(state => state)
  return (
    <s.Container>
      <Heading3>Users</Heading3>
      <s.Table cellspacing="0" cellpadding="0">
        <s.TableHead>
          <s.TableRow>
            <s.TableHeadCell>Name</s.TableHeadCell>
            <s.TableHeadCell type="number">Blogs created</s.TableHeadCell>
          </s.TableRow>
        </s.TableHead>
        <tbody>
          {users.map(({ blogs, id, name }) => (
            <s.TableRow key={`tr-${name}`}>
              <s.TableCell><s.UserLink to={`/users/${id}`}>{name}</s.UserLink></s.TableCell>
              <s.TableCell type="number">{blogs.length}</s.TableCell>
            </s.TableRow>
          ))}
        </tbody>
      </s.Table>
    </s.Container>
  )
}

export default Users
