import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  padding: 16px;
`

export const Table = styled.table`
  background-color: #87ffff;
  border-collapse: collapse;
  border: none;
  width: 100%;
`

export const TableHeadCell = styled.th`
  border-collapse: collapse;
  border-spacing: 0;
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 16px;
  padding: 8px 16px;
  text-align: ${({ type }) => type === 'number' ? 'right' : 'left'};
`

export const TableRow = styled.tr`
  &:nth-child(odd) {
    background-color: #009eae;
  }
  
  &:nth-child(even) {
    background-color: #87ffff;
  }
`

export const TableHead = styled.thead`
  ${TableRow} {
    background-color: #87ffff;
  }
`

export const TableCell = styled.td`
  border-collapse: collapse;
  border-spacing: 0;
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 16px;
  font-weight: 300;
  padding: 8px 16px;
  text-align: ${({ type }) => type === 'number' ? 'right' : 'left'};
`

export const UserLink = styled(Link)`
  color: #000;
  text-decoration: none;
`