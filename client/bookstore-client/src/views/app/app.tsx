import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import client from '../../client/apollo-client';
import { BookList } from '../books/bookList';
import {BookForm} from "../books/bookForm";
import {BookEditForm} from "../books/bookEditForm";

export function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/books'} />} />
          <Route path='/books' element={<BookList />} />
          <Route path='/create' element={<BookForm />} />
          <Route path='/edit/:id' element={<BookEditForm />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
