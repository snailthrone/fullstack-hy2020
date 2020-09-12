import styled from 'styled-components'

export const Notification = styled.div`
  background-color: #f1f1f1;
  border: 4px solid;
  border-color: ${({ status }) => status === 'error' ? 'red' : 'green'};
  color: ${({ status }) => status === 'error' ? 'red' : 'green'};
  border-radius: 4px;
  box-sizing: border-box;
  font-family: 'Merriweather Sans', sans-serif;
  font-size: 12px;
  margin: 4px;
  padding: 4px;
`
