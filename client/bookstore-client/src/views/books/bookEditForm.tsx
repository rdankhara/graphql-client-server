import {useActionState, useCallback} from "react";
import {useUpdateBookMutation} from "../../generated/graphql";
import {useLocation, useNavigate} from "react-router-dom";
import client from "../app/apollo-client";
import {BookFields, CreateFormState} from "./formFields";

export const BookEditForm = () => {
    const {state} = useLocation();
    const [updateBookMutation, {data, loading, error}] = useUpdateBookMutation();
    const navigate = useNavigate();
    const id = state.id;
    const updateBookAction = useCallback(async (prevData: CreateFormState, formData: FormData) => {
        const title = formData.get('title').toString() ?? '';
        const author: string = formData.get('author')?.toString() ?? '';
        const pages = +formData.get('pages');
        const errors = [];
        const book: CreateFormState = {
            title, author, pages, errors
        }
        if (!title || !author || !pages) {
            book.errors.push('All fields title, author and pages are required to update a book');
            return book;
        }
        const bookInput = { id, title, author, pages };
        const result = await updateBookMutation({variables: {bookInput}});

        if (!result.errors) {
            await client.refetchQueries({include: 'all'});
            navigate("/books", {viewTransition: true});
        } else {
            //display error somehow
        }

        return book;
    }, []);

    const [formState, formAction, isPending] = useActionState(updateBookAction, state);

    return (
        <div className="w-full max-w-sm p-2 bg-blue-100">
            <h3 className="bg-blue-600 text-white p-2 mb-4 rounded">Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.updateBook ? <p>Saved!</p> : null}
            <BookFields formAction={formAction} formState={formState} isPending={isPending} />
        </div>
    );
}
