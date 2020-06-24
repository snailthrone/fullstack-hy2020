import React from 'react';

const NewBlog = ({ fields, submit }) => (
  <>
    <h2>Create a New Blog</h2>
    <form onSubmit={submit.handler}>
      {
        fields.map(({ handler, label, type="text", value }) => (
          <div key={label}>
            {label} <input onChange={handler} type={type} value={value} />
          </div>
        ))
      }
      <button type="submit">{submit.title}</button>
    </form>
  </>
)

export default NewBlog;