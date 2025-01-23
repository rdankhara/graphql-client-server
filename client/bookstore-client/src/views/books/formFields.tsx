import {FormField} from "./formField";
import {SubmitButton} from "../../components/submitButton";
import {ActionButton} from "../../components/Buttons";

export interface BookFieldsProps {
    formAction: (payload: FormData) => void;
    formState: CreateFormState;
    isPending: boolean;
    onCancel: () => void;
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

export const BookFields = ({formAction, formState, onCancel}: BookFieldsProps) => {

    return (
        <form action={formAction}>
            <FormField defaultValue={formState.title} placeholder='title' name='title' type='text' label='Title'/>
            <FormField defaultValue={formState.author} placeholder='book author' name='author' type='text'
                       label='Author'/>
            <FormField defaultValue={formState.pages} type='number' placeholder='Number of pages' name='pages'
                       label='Pages'/>
            <div className="flex justify-between">
                <SubmitButton />
                <ActionButton label='Cancel' onClick={onCancel}/>
            </div>
            {formState.errors?.map(error => <p className='mt-2 p-2 text-white bg-red-400 color-white'>{error}</p>)}
        </form>
    )
}
