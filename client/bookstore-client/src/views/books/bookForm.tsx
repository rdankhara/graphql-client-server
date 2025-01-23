import {memo, useState} from "react";
import {useCreateBookMutation} from "../../generated/graphql";

const labelClass = 'block text-gray-700 text-sm font-bold mb-2';
const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

const Input = memo((<T extends number | string>(props: { name: string, value: T }) => {
    return (<div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                   htmlFor="inline-full-name">
                Full Name
            </label>
        </div>
        <div className="md:w-2/3">
            <input
                type={typeof T}
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                id="inline-full-name" type="text" value="Jane Doe"/>
        </div>
    </div>)
}));

export const BookForm = () => {
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(0);
    const [author, setAuthor] = useState('');

    const [createBookMutation, {data, loading, error}] = useCreateBookMutation();

    console.log('title', title, 'author', author, 'pages', pages);
    return (
        <div className="w-full max-w-sm">
            <h3>Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createBook ? <p>Saved!</p> : null}
            <form onSubmit={(e) => {
                e.preventDefault();
                createBookMutation({variables: {title, author, pages}})
            }}>
                <p>
                    <label className={labelClass} htmlFor='title'>Title</label>
                    <input
                        id='title'
                        name='title'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </p>
                <p>
                    <label>Author</label>
                    <input
                        name="author"
                        onChange={e => setAuthor(e.target.value)}
                    />
                </p>
                <p>
                    <label>Pages</label>
                    <input
                        type="number"
                        name="pages"
                        value={pages}
                        onChange={e => setPages(+e.target.value)}
                    />
                </p>
                <button onClick={() => title && pages && author && createBookMutation()}>
                    Add
                </button>
            </form>
        </div>
    );
}
