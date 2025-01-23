import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LIST_BOOKS } from '../../graphql/queries';
import { Book, Todo } from '../../types/todoTypes';


export const BookList = () => {
  const { data, loading, error } = useQuery(LIST_BOOKS);
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log('data', data);
  return (
    <div>
      <button className="" onClick={() => navigate('/create')}>Add Item</button>
      <div className="grid grid-cols-4">
          <div>Book Title</div>
          <div>Author</div>
          <div>Pages</div>
          <div>Edit</div>
        {data.allBooks.map((item: Book) => (
          <React.Fragment key={item.id}>
            <div>{item.title}</div>
            <div>{item.author}</div>
            <div>{item.pages}</div>
            <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
