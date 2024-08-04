import {memo} from "react";
import {ButtonProps} from "@mui/material";
import Button from "@mui/material/Button";

type ButtonWithMemoPropsType = ButtonProps & {}

export const ButtonWithMemo = memo(({...props}: ButtonWithMemoPropsType) => {
    return <Button
        variant={props.variant}
        onClick={props.onClick}
        color={props.color}
        {...props}
        >{props.title}</Button>
})