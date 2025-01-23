import React, {useCallback, Suspense} from 'react';
import {useNavigate} from 'react-router-dom';
import {Book, useAllBooksQuery} from "../../generated/graphql";
import {Header} from "./header";
import {AddButton, EditButton} from "../../components/Buttons";
import {DeleteBookButton} from "./deleteBookButton";
import {ErrorBoundary} from "react-error-boundary";
import {AppError} from "../../components/errors/appError";

const BookListRender = () => {
    const {data} = useAllBooksQuery({});
    const navigate = useNavigate();
    const addBookHandler = useCallback(() => navigate('/create'), []);
    return (
        <div className="p-1">
            <AddButton onClick={addBookHandler} label='Add Button'/>
            <div className="p-1 grid grid-cols-[2fr_1fr_100px_100px_100Px] gap-1">
                <Header title='Book Title'/>
                <Header title='Author'/>
                <Header title='Pages' classes='flex justify-end'/>
                <Header title='Edit' classes='justify-center flex'/>
                <Header title='Remove' classes='justify-center flex'/>
                {data?.allBooks?.map((book: Book) => (
                    <React.Fragment key={book.id}>
                        <div className='font-light p2'>{book.title}</div>
                        <div className='font-light p2'>{book.author}</div>
                        <div className='flex justify-end font-light p2'>{book.pages}</div>
                        <EditButton onClick={() => navigate(`/edit/${book.id}`, {state: book})}></EditButton>
                        <DeleteBookButton id={book.id}/>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export const BookList = () => {
    return (
        <ErrorBoundary fallback={<AppError/>}>
            <Suspense falllback={<p>Loading...</p>}>
                <BookListRender/>
            </Suspense>
        </ErrorBoundary>
    )
}
