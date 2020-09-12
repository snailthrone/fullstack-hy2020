import React from 'react';
import { useQuery } from '@apollo/client';

import { ALL_AUTHORS } from '../queries';
import EditAuthor from './EditAuthor';

const Authors = () => {
  const authors = useQuery(ALL_AUTHORS);

  if (authors.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditAuthor />
    </div>
  );
};

export default Authors;
