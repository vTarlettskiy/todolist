// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo(({addItem}: AddItemFormPropsType) => {

    console.log('AddItemForm')

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (taskTitle.trim() !== '') {
            addItem(taskTitle.trim())
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const buttonStyles= {
        maxWidth: '40px',
        maxHeight: '40px',
        minHeight: '40px',
        minWidth: '40px'
    }

    return (
        <div>
            <TextField
                id={'outlined-basic'}
                helperText={error}
                error={!!error}
                size={'small'}
                label={'Enter a title'}
                variant={'outlined'}
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}/>
            <Button variant="contained" onClick={addItemHandler} size='small' style={buttonStyles}>+</Button>
        </div>
    );
});