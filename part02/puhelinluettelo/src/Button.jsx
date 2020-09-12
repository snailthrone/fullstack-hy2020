import React from 'react'

const Button = ({ handler, title, type = 'button' }) => (
  <button onClick={handler} type={type}>{title}</button>
)

export default Button
