import React from 'react';

import Button from './Button'
import InputField from './InputField'

const Form = ( { fields, submit }) => (
  <form>
  {
    fields.map((field) => <InputField {...field} key={field.label} />)
  }
  <Button {...submit} type="submit" />
</form>
)

export default Form
