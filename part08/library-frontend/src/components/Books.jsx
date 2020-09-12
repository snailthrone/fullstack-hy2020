import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { ALL_BOOKS, FIND_BOOK } from '../queries';

const Books = () => {
  const [getBook, result] = useLazyQuery(FIND_BOOK);
  const books = useQuery(ALL_BOOKS);
  const [genre, setGenre] = useState('all');
  const [visibleBooks, setVisibleBooks] = useState([]);

  useEffect(() => {
    if (result.data) {
      setVisibleBooks(result.data.allBooks);
    }
  }, [result]);

  if (books.loading) {
    return <div>Loading...</div>;
  }

  const genres = [...new Set(books.data.allBooks.flatMap(book => book.genres.map(g => g)))];

  const handler = event => {
    const { value } = event.target;
    if (value !== 'all') {
      getBook({ variables: { genre: value } });
    }
    setGenre(value);
  };

  const data = visibleBooks.length === 0 ? books.data.allBooks : visibleBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {data.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(value => (
        <label
          key={value}
          style={{
            backgroundColor: genre === value ? 'grey' : 'white',
            border: '1px solid grey',
            margin: '5px',
            padding: '5px',
          }}
          htmlFor={value}
        >
          {value}
          <input
            id={value}
            name="genre"
            onChange={handler}
            style={{ display: 'none' }}
            type="checkbox"
            value={value}
          />
        </label>
      ))}
      <label
        style={{
          backgroundColor: genre === 'all' ? 'grey' : 'white',
          border: '1px solid grey',
          margin: '5px',
          padding: '5px',
        }}
        htmlFor="all"
      >
        all
        <input
          id="all"
          name="genre"
          onChange={handler}
          style={{ display: 'none' }}
          type="checkbox"
          value=""
        />
      </label>
    </div>
  );
};

export default Books;
