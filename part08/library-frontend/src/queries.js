import { gql } from '@apollo/client';

import { AUTHOR_DETAILS, BOOK_DETAILS } from './fragments';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
      bookCount
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const FIND_BOOK = gql`
  query findBookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
