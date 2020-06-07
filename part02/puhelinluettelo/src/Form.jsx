import React from 'react';

import InputField from './InputField'
import SubmitButton from './SubmitButton';

const Form = ( { fields, submit }) => (
  <form>
  {
    fields.map((field) => <InputField {...field} key={field.label} />)
  }
  <SubmitButton {...submit} />
</form>
)

export default Form
