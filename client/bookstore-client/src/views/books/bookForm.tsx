import {useActionState, useCallback} from "react";
import {useCreateBookMutation} from "../../generated/graphql";
import {useNavigate} from "react-router-dom";
import client from "../app/apollo-client";

const labelClass = 'block text-gray-700 text-sm font-bold m-2';
const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

type CreateFormState = {
    title: string;
    author: string;
    pages: number;
    errors: string[];
}

const initialFormState: CreateFormState = {
    title: '',
    author: '',
    pages: 0,
    errors: []
}

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

        await client.refetchQueries({include: 'all'})
        if (!result.errors) {
            navigate("/books", {viewTransition: true});
        }
        return book;
    }, []);

    const [formState, formAction] = useActionState(createBookAction, initialFormState);

    return (
        <div className="w-full max-w-sm p-2 bg-blue-100">
            <h3 className="bg-blue-600 text-white p-2 mb-4 rounded">Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createBook ? <p>Saved!</p> : null}
            <form action={formAction}>
                <p>
                    <label className={labelClass} htmlFor='title'>Title</label>
                    <input
                        type='text'
                        placeholder={'title'}
                        className={inputClass}
                        id='title'
                        name='title'
                        defaultValue={formState.title}
                    />
                </p>
                <p>
                    <label className={labelClass} htmlFor='author'>Author</label>
                    <input
                        type='text'
                        id='author'
                        className={inputClass}
                        name="author"
                        placeholder={'author'}
                        defaultValue={formState.author}
                    />
                </p>
                <p>
                    <label className={labelClass} htmlFor='pages'>Pages</label>
                    <input
                        className={inputClass}
                        type="number"
                        name="pages"
                        defaultValue={formState.pages}
                    />
                </p>
                <button
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
                    type="submit">
                    Save
                </button>
                {formState.errors?.map(error => <p className='mt-2 p-2 text-white bg-red-400 color-white'>{error}</p>)}
            </form>
        </div>
    );
}
