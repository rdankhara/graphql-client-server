import { use, useEffect, useState } from 'react';
import { Todo } from '../../types/todoTypes';
import { GraphQLServiceUrl } from './apollo-client';


const query = `
query AllBooks {
  allBooks {
    author
    id
    pages
  }
}
`
export const Demo = () => {
  const [data, setData] = useState<Todo>(null);
  const [books, setBooks] = useState(null);
  // const data = use(() => fetch('http://localhost:8080/api/v1/todos/1'))
  useEffect(() => {
    (async () => {
      const response = await fetch('http://localhost:8080/api/books');
      const result = await response.json();
      setData(result);
    })();
  }, []);


  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({query})
    }
    fetch(GraphQLServiceUrl, options)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setBooks(data.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
      })
  }, []);
  if (!data){
    return <p>...Loading</p>
  }
  return (
    <div>
       <p></p>
      <p>{data.id}</p>
      <p>{data.title}</p>
      <p>{data.description}</p>
    </div>
  )
}
