import React from 'react';

const Login = ({ fields, submit }) => (
  <>
    <h2>Log in to Application</h2>
    <form onSubmit={submit.handler}>
      {
        fields.map(({ handler, label, type, value }) => (
          <div key={label}>
            {label}: <input onChange={handler} type={type} value={value} />
          </div>
        ))
      }
      <button type="submit">{submit.title}</button>
    </form>
  </>
)

export default Login;
