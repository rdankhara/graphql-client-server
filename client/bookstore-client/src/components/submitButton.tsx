import {useFormStatus} from "react-dom";

export const SubmitButton = () => {
    const {pending} = useFormStatus();

    return (
        <button
            disabled={pending}
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
            type="submit">
            {pending ? 'Saving' : 'Save'}
        </button>
    )
}
