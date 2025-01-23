import React, {useCallback} from "react";
import {useDeleteBookMutation} from "../../generated/graphql";
import {LIST_BOOKS} from "../../graphql/queries";
import {DeleteButton} from "../../components/Buttons";

export interface DeleteBookButtonProps {
    id: number
}

export const DeleteBookButton = ({id}: DeleteBookButtonProps) => {
    const [deleteBookMutation, deleteResult] = useDeleteBookMutation({
        refetchQueries: [LIST_BOOKS],
        awaitRefetchQueries: true
    });

    const deleteHandlerFactory = useCallback((id: number) => async () => {
        // ideally ask for confirmation
        const result = await deleteBookMutation({variables: {id}});
        if (result.errors) {
            // todo display delete error
        }
    }, []);

    return (
        <DeleteButton onClick={deleteHandlerFactory(+id)}/>
    )

}
