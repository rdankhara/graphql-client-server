import { gql } from '@apollo/client';

export const LIST_BOOKS = gql`
    query AllBooks {
        allBooks {
            author
            id
            pages
            reviews {
                comment
                rating
            }
        }
    }
`
// Mutation to create an item
export const CREATE_BOOK = gql`
    mutation CreateBook($title: String, $author: String, $pages: Int) {
        createBook(title: $title, author: $author, pages: $pages) {
            id
            title
            author
        }
    }
`;

// Mutation to update an item
export const UPDATE_BOOK = gql`
    mutation UpdateBOOK($bookInput: BookInput!) {
        updateBook(bookInput: $bookInput) {
            id
            title
            author
            pages
        }
    }
`;
