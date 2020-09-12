import React, { useState } from 'react';
import { useApolloClient, useSubscription } from '@apollo/client';

import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import Recommendations from './components/Recommendations';

import { BOOK_ADDED } from './subscriptions';
import { ALL_BOOKS } from './queries';

const isLoggedIn = () => JSON.parse(window.localStorage.getItem('token'));

const App = () => {
  const [page, setPage] = useState('recommendations');
  const [token, setToken] = useState(isLoggedIn());
  const client = useApolloClient();

  const updateCache = async addedBook => {
    const included = (set, object) => set.map(p => p.id).includes(object.id);
    const cache = await client.readQuery({ query: ALL_BOOKS });
    console.log(included(cache.allBooks, addedBook));
    if (!included(cache.allBooks, addedBook)) {
      console.log('Update cache');
      client.writeQuery({
        query: 'ALL_BOOKS',
        data: { allBooks: cache.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const {
        data: {
          bookAdded: {
            title,
            author: { name },
          },
        },
      } = subscriptionData;
      window.alert(`Added ${title} by ${name}`);
      // updateCache(subscriptionData.data.bookAdded);
    },
  });

  return (
    <div>
      {token ? (
        <>
          <div>
            <button type="button" onClick={() => setPage('authors')}>
              authors
            </button>
            <button type="button" onClick={() => setPage('books')}>
              books
            </button>
            <button type="button" onClick={() => setPage('add')}>
              add book
            </button>
            <button type="button" onClick={() => setPage('recommendations')}>
              recommendations
            </button>
          </div>
          {page === 'authors' && <Authors show={page === 'authors'} />}
          {page === 'books' && <Books show={page === 'books'} />}
          {page === 'add' && <NewBook show={page === 'add'} redirect={() => setPage('books')} />}
          {page === 'recommendations' && <Recommendations />}
        </>
      ) : (
        <Login setToken={setToken} />
      )}
    </div>
  );
};

export default App;
