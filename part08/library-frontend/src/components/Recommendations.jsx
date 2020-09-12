import React, { useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';

import { FIND_BOOK, ME } from '../queries';

const Recommendations = () => {
  const [getRecommendation, result] = useLazyQuery(FIND_BOOK);
  const me = useQuery(ME);
  const [visibleBooks, setVisibleBooks] = useState([]);

  useEffect(() => {
    if (me.data) {
      getRecommendation({ variables: { genre: me.data.me.favoriteGenre } });
    }
  }, [getRecommendation, me]);

  useEffect(() => {
    if (result.data) {
      setVisibleBooks(result.data.allBooks);
    }
  }, [result]);

  if (getRecommendation.loading || me.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Books in your favourite genre {me.data.me.favoriteGenre}</p>
      <table>
        <tbody>
          <tr>
            <th />
            <th>author</th>
            <th>published</th>
          </tr>
          {visibleBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
