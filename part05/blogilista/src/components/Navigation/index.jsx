import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userLogout } from '../../reducers/userReducer'

import * as s from './index.styled'

const Navigation = () => {
  const dispatch = useDispatch()
  const { login: { user: { name } } } = useSelector(state => state)
  const logout = () => dispatch(userLogout())

  return (
    <s.Navigation>
      <s.NavigationList>
        <s.NavigationListItem>
          <s.NavigationListItemLink to="/">
            Blogs
          </s.NavigationListItemLink>
        </s.NavigationListItem>
        <s.NavigationListItem>
          <s.NavigationListItemLink to="/users/">
            Users
          </s.NavigationListItemLink>
        </s.NavigationListItem>
      </s.NavigationList>
      <s.LoginStatus>
        <s.LoginStatusText>{name}</s.LoginStatusText>
        <s.LogoutButton id="logout-button" onClick={logout} type="button">Logout</s.LogoutButton>
      </s.LoginStatus>
    </s.Navigation>
  )
}

export default Navigation
