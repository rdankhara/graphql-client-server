import {memo, useCallback, useMemo, useState} from "react";
import {useCreateBookMutation} from "../../generated/graphql";

const labelClass = 'block text-gray-700 text-sm font-bold m-2';
const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

// const Input = memo((<T extends number | string>(props: { name: string, value: T }) => {
//     return (<div className="md:flex md:items-center mb-6">
//         <div className="md:w-1/3">
//             <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
//                    htmlFor="inline-full-name">
//                 Full Name
//             </label>
//         </div>
//         <div className="md:w-2/3">
//             <input
//                 type={typeof T}
//                 className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
//                 id="inline-full-name" type="text" value="Jane Doe"/>
//         </div>
//     </div>)
// }));

export const BookForm = () => {

    const [createBookMutation, {data, loading, error}] = useCreateBookMutation();

    const createBookAction = useCallback( (formData: FormData) => {
        const title = formData.get('title');
        const author = formData.get('author');
        const pages = formData.get('pages');
        console.log('title in aciton', title, author, pages);
        // (e) => {
        //     e.preventDefault();
        //     createBookMutation({variables: {title, author, pages}})
        // }
    },[]);
    return (
        <div className="w-full max-w-sm p-2">
            <h3>Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.createBook ? <p>Saved!</p> : null}
            <form action={createBookAction}>
                <p>
                    <label className={labelClass} htmlFor='title'>Title</label>
                    <input
                        placeholder={'title'}
                        className={inputClass}
                        id='title'
                        name='title'
                    />
                </p>
                <p>
                    <label className={labelClass} htmlFor='author'>Author</label>
                    <input
                        id='author'
                        className={inputClass}
                        name="author"
                        placeholder={'author'}
                    />
                </p>
                <p>
                    <label className={labelClass} htmlFor='pages'>Pages</label>
                    <input
                        className={inputClass}
                        type="number"
                        name="pages"
                    />
                </p>
                <button
                    className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
                    type="submit">
                    Save
                </button>
            </form>
        </div>
    );
}
