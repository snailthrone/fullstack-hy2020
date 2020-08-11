import styled from 'styled-components'

import Button from '../Button'
import { Heading2 } from '../common'

export const Container = styled.div`
  margin: auto;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
`

export const Heading = styled(Heading2)`
  text-align: center;
`

export const LoginButton = styled(Button)`

`