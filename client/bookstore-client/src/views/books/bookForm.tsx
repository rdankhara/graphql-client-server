import {useActionState, useCallback} from "react";
import {useCreateBookMutation} from "../../generated/graphql";
import {useNavigate} from "react-router-dom";

import {BookFields, CreateFormState, initialFormState} from "./formFields";
import {LIST_BOOKS} from "../../graphql/queries";
import {submitActionFactory} from "./bookSubmitUtil";

export const BookForm = () => {
    const [createBookMutation, {data, loading, error}] = useCreateBookMutation({
        refetchQueries: [LIST_BOOKS],
        awaitRefetchQueries: true
    });
    const navigate = useNavigate();
    const onCancelClickHandler = useCallback(() => navigate("/books", {viewTransition: true}), []);
    const createBookAction = useCallback(submitActionFactory(async (bookState: CreateFormState) => {
        const result = await createBookMutation({variables: {title: bookState.title, author: bookState.author, pages: bookState.pages}});
        if (!result.errors) {
            navigate("/books", {viewTransition: true});
        }
    }),[]);

    const [formState, formAction] = useActionState(createBookAction, initialFormState);

    return (
        <div className="w-full max-w-sm m-2 p-2 bg-blue-100 flex-cols place-self-center">
            <h3 className="bg-blue-600 text-white p-2 mb-4 rounded">Add a Book</h3>
            {error ? <p>Oh no! {error.message}</p> : null}
            {data?.createBook ? <p>Saved!</p> : null}
            <BookFields formAction={formAction} formState={formState}
                        onCancel={onCancelClickHandler}/>

        </div>
    );
}
