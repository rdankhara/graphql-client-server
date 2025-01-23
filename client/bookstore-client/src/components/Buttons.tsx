import React, {memo} from "react";

export interface ButtonProps {
    onClick: React.EventHandler<HTMLButtonElement>;
    label?: string;
}

export const EditButton = memo(({onClick}: ButtonProps) => {
    return (
        <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline font-light"
                onClick={onClick}
        >Edit
        </button>
    )
})

export const DeleteButton = memo(({onClick}: ButtonProps) => {

    return (
        <button className="font-medium dark:text-red-800 dark:text-blue-500 hover:underline font-light"
                onClick={onClick}
        >Delete
        </button>
    )
})

export const AddButton = memo(({onClick, label}: ButtonProps) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold ml-1 p-1 px-4 border-b-4 border-blue-700 hover:border-blue-500"
            onClick={onClick}>Add Book
        </button>
    )
});

export const ActionButton = memo(({onClick, label}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
            type="submit">
            {label}
        </button>
    )
})
