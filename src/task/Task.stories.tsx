import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {Task} from "./Task";
import {TaskType} from "../AppWithRedux";
import {action} from "@storybook/addon-actions"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    // argTypes: {
    //     addItem: {
    //         description: 'Button clicked inside form',
    //         action: 'clicked',
    //     },
    // },
    args: {
        removeTask: fn(),
        updateTask: fn(),
        changeTaskStatus: fn(),
        task: {
            id: '1',
            title: 'HTML',
            isDone: false
        },
    }
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

};

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskIsNotDoneStory: Story = {}

export const TaskIsDoneStory: Story = {
    args: {
        task: {
            id: '2',
            title: 'CSS',
            isDone: true
        },
    }
}

export const ToggleTaskStory: Story = {
    render: () => <ToggleTask/>
}

const ToggleTask = () => {

    const [task, setTask] = useState({id: '123e21irehj23n', isDone: false, title: 'JS'})

    function changeTaskStatus () {
        setTask({...task, isDone: !task.isDone})
    }

    function changeTaskTitle (newTitle: string) {
        setTask({...task, title: newTitle})
    }

    return <Task changeTaskStatus={changeTaskStatus} updateTask={changeTaskTitle} removeTask={action('removeTask')} task={task}/>
}