/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { TodoSchema } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoSchemaUpdateFormInputValues = {
    title?: string;
    description?: string;
    completed?: boolean;
    createdAt?: string;
};
export declare type TodoSchemaUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    completed?: ValidationFunction<boolean>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoSchemaUpdateFormOverridesProps = {
    TodoSchemaUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    completed?: PrimitiveOverrideProps<SwitchFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoSchemaUpdateFormProps = React.PropsWithChildren<{
    overrides?: TodoSchemaUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    todoSchema?: TodoSchema;
    onSubmit?: (fields: TodoSchemaUpdateFormInputValues) => TodoSchemaUpdateFormInputValues;
    onSuccess?: (fields: TodoSchemaUpdateFormInputValues) => void;
    onError?: (fields: TodoSchemaUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoSchemaUpdateFormInputValues) => TodoSchemaUpdateFormInputValues;
    onValidate?: TodoSchemaUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TodoSchemaUpdateForm(props: TodoSchemaUpdateFormProps): React.ReactElement;
