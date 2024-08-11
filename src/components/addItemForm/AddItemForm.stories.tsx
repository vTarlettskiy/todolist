import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {AddItemForm, AddItemFormPropsType} from "./AddItemForm";
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            action: 'clicked',
        },
    },
    args: {
        addItem: fn()
    }
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

};

export default meta;
type Story = StoryObj<typeof meta>;

export const AddItemFormStory: Story = {
    args: {
        addItem: fn(),
    },
}

 const AddItemFormError = memo(({addItem}: AddItemFormPropsType) => {

    console.log('AddItemForm')

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>('Title is required')

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

export const AddItemFormErrorStory: Story = {
    render: (args) => <AddItemFormError addItem={args.addItem}/>
}