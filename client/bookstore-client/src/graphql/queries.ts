import { gql } from '@apollo/client';
// npm run codegen will generate hooks from these queries and add it to generated folder
export const LIST_BOOKS = gql`
    query AllBooks {
        allBooks {
            id
            title
            author
            pages
            reviews {
                comment
                rating
            }
        }
    }
`
const delete_book = gql`
    mutation DeleteBook ($id: Int!){
        deleteBook (id: $id)
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
