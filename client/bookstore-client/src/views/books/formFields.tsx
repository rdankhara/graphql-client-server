import {FormField} from "./formField";
import {SubmitButton} from "../../components/submitButton";

export interface BookFieldsProps {
    formAction: (payload: FormData) => void;
    formState: CreateFormState;
    isPending: boolean;
}

export type CreateFormState = {
    title: string;
    author: string;
    pages: number;
    errors: string[];
}

export const initialFormState: CreateFormState = {
    title: '',
    author: '',
    pages: 0,
    errors: []
}

export const BookFields =  ({formAction, formState, isPending}:  BookFieldsProps) => {
    return (
        <form action={formAction}>
            <FormField defaultValue={formState.title} placeholder='title' name='title' type='text' label='Title' />
            <FormField defaultValue={formState.author} placeholder='book author' name='author' type='text' label='Author'/>
            <FormField defaultValue={formState.pages} type='number' placeholder='Number of pages' name='pages' label='Pages' />
            <SubmitButton isPending={isPending} />
            {formState.errors?.map(error => <p className='mt-2 p-2 text-white bg-red-400 color-white'>{error}</p>)}
        </form>
    )
}
