export interface SubmitButtonProps {
    isPending: boolean;
}
export const SubmitButton = ({isPending}: SubmitButtonProps) => {
    return (
        <button
            disabled={isPending}
            className="shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-2"
            type="submit">
            {isPending ? 'Saving' : 'Save'}
        </button>
    )
}
