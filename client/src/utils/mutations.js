import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
      _id
    }
  }
}
`

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      _id
    }
  }
}
`;

export const SAVE_BOOK = gql`
 mutation saveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
    _id
    username
    email
    bookCount
    savedBooks {
      title
      image
      description
      authors
      bookId
    }
  }
}
`

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
  removeBook(bookId: $bookId) {
    username
    email
    bookCount
    _id
    savedBooks {
      title
      link
      image
      description
      bookId
      authors
    }
  }
}  
`