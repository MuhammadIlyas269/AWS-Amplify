/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TodoSchemaCreateFormInputValues = {
    title?: string;
    description?: string;
    completed?: boolean;
    createdAt?: string;
};
export declare type TodoSchemaCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    completed?: ValidationFunction<boolean>;
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TodoSchemaCreateFormOverridesProps = {
    TodoSchemaCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    completed?: PrimitiveOverrideProps<SwitchFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TodoSchemaCreateFormProps = React.PropsWithChildren<{
    overrides?: TodoSchemaCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TodoSchemaCreateFormInputValues) => TodoSchemaCreateFormInputValues;
    onSuccess?: (fields: TodoSchemaCreateFormInputValues) => void;
    onError?: (fields: TodoSchemaCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TodoSchemaCreateFormInputValues) => TodoSchemaCreateFormInputValues;
    onValidate?: TodoSchemaCreateFormValidationValues;
} & React.CSSProperties>;
export default function TodoSchemaCreateForm(props: TodoSchemaCreateFormProps): React.ReactElement;
