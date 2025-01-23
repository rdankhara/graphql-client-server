import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {Book, useAllBooksQuery, useDeleteBookMutation} from "../../generated/graphql";
import client from "../app/apollo-client";
import {Header} from "./header";


export const BookList = () => {
    const {data, loading, error} = useAllBooksQuery({});
    const [deleteBookMutation] = useDeleteBookMutation();
    const deleteHandler = useCallback(async (id: number) => {
        // ideally ask for confirmation
        const result = await deleteBookMutation({variables: {id}});
        if (!result.errors) {
            await client.refetchQueries({include: 'all'})
        }
    }, []);
    const navigate = useNavigate();
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
        <div className="p-1">
            <button
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500"
                onClick={() => navigate('/create')}>Add Item
            </button>
            <div className="p-1 grid grid-cols-5 gap-1">
                <Header title='Book Title' />
                <Header title='Author' />
                <Header title='Pages' />
                <Header title='Edit' classes='justify-center flex' />
                <Header title='Remove' classes='justify-center flex' />
                {data!.allBooks?.map((book: Book) => (
                    <React.Fragment key={book.id}>
                        <div>{book.title}</div>
                        <div>{book.author}</div>
                        <div>{book.pages}</div>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => navigate(`/edit/${book.id}`, {state: book})}>Edit
                        </button>
                        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                onClick={() => deleteHandler(+book.id)}
                        >Delete
                        </button>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}
