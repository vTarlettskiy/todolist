import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    oldTitle: string
    updateItem: (newTitle: string) => void
    itemId?: string
}

export const EditableSpan = ({oldTitle, updateItem}: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(oldTitle)
    console.log(newTitle)

    const editModeHandler = () => {
        setEditMode(!editMode)
        if(editMode) {

        }
        addItemHandler()
    }

    const changeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        updateItem(newTitle)
    }




    return (
        editMode
            ? <input
                type={'text'}
                value={newTitle}
                onBlur={editModeHandler}
                autoFocus
                onChange={changeTitleHandler}/>
            : <span
                onDoubleClick={editModeHandler}>{oldTitle}</span>
    );
};