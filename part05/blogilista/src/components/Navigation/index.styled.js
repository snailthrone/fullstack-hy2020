import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Button from '../Button'

export const LoginStatus = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex: 1;
`

export const LoginStatusText = styled.span`
  font-family: 'Merriweather Sans', sans-serif;
  flex: 1;
  font-size: 12px;
`

export const LogoutButton = styled(Button)`
  flex: 1;
  margin-left: 8px;
`

export const Navigation = styled.nav`
  align-items: center;
  background-color: #009eae;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  padding: 0 8px;
`

export const NavigationList = styled.ul`
  display: inherit;
  flex: 5;
  list-style: none;
  padding: 0;
  width: 100%;
`

export const NavigationListItem = styled.li`
  margin: auto 5px;
  
  &:first-child {
    margin-left: 0;
  }
`

export const NavigationListItemLink = styled(Link)`
  color: #000;
  font-family: 'Merriweather Sans', sans-serif;
  font-weight: 300;
  font-size: 12px;
  text-decoration: none;
`