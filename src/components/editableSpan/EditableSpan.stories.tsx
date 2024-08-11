import type {Meta, StoryObj} from '@storybook/react';
import {fn} from '@storybook/test';
import {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
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
        updateItem: fn(),
        oldTitle: 'HTML'
    }
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args

};

export default meta;
type Story = StoryObj<typeof meta>;



export const EditableSpanStory1: Story = {
}

