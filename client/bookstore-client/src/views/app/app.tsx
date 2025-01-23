import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import client from './apollo-client';
import { TodoList } from '../todo/todoList';
import { TodoForm } from '../todo/todoForm';
import { TodoFormWrapper } from '../todo/todoFormWrapper';
import { Demo } from './demo';
import { BookList } from '../books/bookList';

export function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/demo'} />} />
          <Route path='/books' element={<BookList />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='/list' element={<TodoList />} />
          <Route path='/create' element={<TodoForm />} />
          <Route path='/edit/:id' element={<TodoFormWrapper />} />

        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
