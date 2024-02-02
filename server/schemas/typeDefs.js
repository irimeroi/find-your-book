const gql = String.raw;

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        savedBooks: [bookSchema]
    }

    type Auth {
        user: User
        token: ID
    }

    type bookSchema {
        authors: [String]
        description: String!
        bookId: ID!
        image: String
        link: String
        title: String!
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String! ): Auth
        login(email: String!, password: String!): Auth
        saveBook(authors: [String], description: String!, bookId: ID!, image: String, link: String, title: String!): User
    }

    type Query {
        hello: String
    }
`

//saveBook
//deleteBook
