import {useActionState, useCallback} from "react";
import {useUpdateBookMutation} from "../../generated/graphql";
import {useLocation, useNavigate} from "react-router-dom";
import {BookFields, CreateFormState} from "./formFields";
import {LIST_BOOKS} from "../../graphql/queries";
import {submitActionFactory} from "./bookSubmitUtil";

export const BookEditForm = () => {
    const {state} = useLocation();
    const [updateBookMutation, {data, loading, error}] = useUpdateBookMutation({
        refetchQueries: [LIST_BOOKS]
    });
    const navigate = useNavigate();
    const id = state.id;
    const onCancelClickHandler = useCallback(() => navigate("/books", {viewTransition: true}), []);

    const updateBookAction = useCallback(submitActionFactory( async (bookState: CreateFormState) => {

        const bookInput = { id, title: bookState.title, author: bookState.author, pages: bookState.pages };
        const result = await updateBookMutation({variables: {bookInput}});

        if (!result.errors) {
            navigate("/books", {viewTransition: true});
        }

    }), []);

    const [formState, formAction] = useActionState(updateBookAction, state);

    return (
        <div className="w-full max-w-sm m-2 p-2 bg-blue-100 flex-cols place-self-center">
            <h3 className="bg-blue-600 text-white p-2 mb-4 rounded">Edit a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data && data.updateBook ? <p>Saved!</p> : null}
            <BookFields formAction={formAction} formState={formState} onCancel={onCancelClickHandler}/>
        </div>
    );
}
