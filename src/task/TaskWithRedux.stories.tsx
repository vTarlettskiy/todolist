import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {TaskType} from "../AppWithRedux";
import {action} from "@storybook/addon-actions"
import {TaskWithRedux} from "./TaskWithRedux";
import {ReduxStoreProviderDecorator} from "../reducers/ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../reducers/store";
import {v1} from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TaskWithRedux> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: TaskWithRedux,
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
    decorators: [ReduxStoreProviderDecorator]
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

};

export default meta;
type Story = StoryObj<typeof TaskWithRedux>;

const Task = () => {

    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])

    if (!task) task = {id: v1(), title: "DEFAULT TASK", isDone: false}

    return <TaskWithRedux task={task} todolistId={'todolistId1'} />
}

export const Task1Story: Story = {
    render: () => <Task />
};

