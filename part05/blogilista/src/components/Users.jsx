import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const { login: { users } } = useSelector(state => state)
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(({ blogs, id, name }) => (
          <tr key={`tr-${name}`}>
            <td><Link to={`/users/${id}`}>{name}</Link></td>
            <td>{blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Users
