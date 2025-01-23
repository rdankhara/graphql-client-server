import {useActionState, useCallback} from "react";
import {useCreateBookMutation} from "../../generated/graphql";
import {useNavigate} from "react-router-dom";
import client from "../app/apollo-client";
import {FormField} from "./formField";
import {SubmitButton} from "../../components/submitButton";
import {CreateFormState, initialFormState} from "./formFields";

export const BookForm = () => {
    const [createBookMutation, {data, loading, error}] = useCreateBookMutation();
    const navigate = useNavigate();
    const createBookAction = useCallback(async (prevData: CreateFormState, formData: FormData) => {
        const title = formData.get('title').toString() ?? '';
        const author: string = formData.get('author')?.toString() ?? '';
        const pages = +formData.get('pages');
        const errors = [];
        const book: CreateFormState = {
            title, author, pages, errors
        }
        if (!title || !author || !pages) {
            book.errors.push('All fields title, author and pages are required to create a book');
            return book;
        }
        const result = await createBookMutation({variables: {title, author, pages}});

        if (!result.errors) {
            navigate("/books", {viewTransition: true});
            await client.refetchQueries({include: 'all'})
        }
        return book;
    }, []);

    const [formState, formAction, isPending] = useActionState(createBookAction, initialFormState);

    return (
        <div className="w-full max-w-sm p-2 bg-blue-100">
            <h3 className="bg-blue-600 text-white p-2 mb-4 rounded">Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createBook ? <p>Saved!</p> : null}
            <form action={formAction}>
                <FormField defaultValue={formState.title} placeholder='title' name='title' type='text' label='Title'/>
                <FormField defaultValue={formState.author} placeholder='book author' name='author' type='text'
                           label='Author'/>
                <FormField defaultValue={formState.pages} type='number' placeholder='Number of pages' name='pages'
                           label='Pages'/>
                <SubmitButton isPending={isPending}/>
                {formState.errors?.map(error => <p className='mt-2 p-2 text-white bg-red-400 color-white'>{error}</p>)}
            </form>
        </div>
    );
}
