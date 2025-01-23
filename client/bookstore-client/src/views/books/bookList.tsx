import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Book, useAllBooksQuery} from "../../generated/graphql";


export const BookList = () => {
  const {data, loading, error} = useAllBooksQuery({});

  const navigate = useNavigate();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-1">
      <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500" onClick={() => navigate('/create')}>Add Item</button>
      <div className="p-1 grid grid-cols-4 gap-1">
          <div className="bg-gray-100">Book Title</div>
          <div className="bg-gray-100">Author</div>
          <div className="bg-gray-100">Pages</div>
          <div className="bg-gray-100 justify-center flex">Edit</div>
        {data!.allBooks?.map((item: Book) => (
          <React.Fragment key={item.id}>
            <div>{item.title}</div>
            <div>{item.author}</div>
            <div>{item.pages}</div>
            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
