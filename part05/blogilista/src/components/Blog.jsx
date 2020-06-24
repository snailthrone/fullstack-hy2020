import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  return (
    <div>
      {blog.title} {blog.author}
      {' '}
      <button onClick={() => setShowInfo(info => !info)} type="button">{showInfo ? 'Hide' : 'Show'}</button>
      {
        showInfo && (
          <div>
            <p>{blog.url}</p>
            <p>likes: {blog.likes} <button type="button">Like</button></p>
            <p>{blog.user.name}</p>
          </div>
        )
      }
    </div>
  )
}

export default Blog;
