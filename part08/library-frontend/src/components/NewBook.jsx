import { useQuery, useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { func } from 'prop-types';
import { ALL_AUTHORS, ALL_BOOKS, FIND_BOOK, ME } from '../queries';
import { CREATE_BOOK } from '../mutations';

const NewBook = ({ redirect }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const me = useQuery(ME);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      { query: ALL_BOOKS },
      { query: FIND_BOOK, variables: { genre: me?.data?.me?.favoriteGenre } },
    ],
  });

  const submit = async event => {
    event.preventDefault();

    createBook({ variables: { title, author, published: Number(published), genres } });

    setTitle('');
    setPublished('');
    setAuhtor('');
    setGenres([]);
    setGenre('');

    redirect();
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">
            Title
            <input id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
          </label>
        </div>
        <div>
          <label htmlFor="author">
            Author
            <input id="author" value={author} onChange={({ target }) => setAuhtor(target.value)} />
          </label>
        </div>
        <div>
          <label htmlFor="published">
            Published
            <input
              id="published"
              type="number"
              value={published}
              onChange={({ target }) => setPublished(target.value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="genres">
            Genres:
            <input id="genres" value={genre} onChange={({ target }) => setGenre(target.value)} />
          </label>
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

NewBook.propTypes = {
  redirect: func.isRequired,
};

export default NewBook;
