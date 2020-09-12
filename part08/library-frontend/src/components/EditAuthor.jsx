import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import { ALL_AUTHORS } from '../queries';
import { EDIT_AUTHOR } from '../mutations';

const EditAuthor = () => {
  const authors = useQuery(ALL_AUTHORS);
  const [author, setAuthor] = useState(authors.data.allAuthors[0].name);
  const [year, setYear] = useState('');

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async event => {
    event.preventDefault();

    editAuthor({ variables: { name: author, setBornTo: Number(year) } });

    setYear('');
  };

  if (authors.loading) {
    return null;
  }

  return (
    <>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <select onChange={({ target: { value } }) => setAuthor(value)}>
          {authors.data.allAuthors.map(a => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          <label>
            Born: <input onChange={({ target: { value } }) => setYear(value)} value={year} />
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
    </>
  );
};

export default EditAuthor;
