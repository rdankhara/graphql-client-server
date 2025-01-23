import React from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { LIST_BOOKS } from '../../graphql/queries';
import { Todo } from '../../types/todoTypes';

export const TodoList = () => {
  const { data, loading, error } = useQuery(LIST_BOOKS);
  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <button onClick={() => navigate('/create')}>Add Item</button>
      <ul>
        {data.items.map((item: Todo) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
