import React from 'react';

const InputField = ({ label, handler, value }) => (
  <div>
    { label }:
    {' '}
    <input onChange={handler} type="text" value={value} />
  </div>
)

export default InputField
