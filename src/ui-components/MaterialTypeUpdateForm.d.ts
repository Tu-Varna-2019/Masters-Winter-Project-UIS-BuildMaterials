/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MaterialTypeUpdateFormInputValues = {
    name?: string;
    Materials?: any[];
    items?: string;
};
export declare type MaterialTypeUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    Materials?: ValidationFunction<any>;
    items?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MaterialTypeUpdateFormOverridesProps = {
    MaterialTypeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    Materials?: PrimitiveOverrideProps<AutocompleteProps>;
    items?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type MaterialTypeUpdateFormProps = React.PropsWithChildren<{
    overrides?: MaterialTypeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    materialType?: any;
    onSubmit?: (fields: MaterialTypeUpdateFormInputValues) => MaterialTypeUpdateFormInputValues;
    onSuccess?: (fields: MaterialTypeUpdateFormInputValues) => void;
    onError?: (fields: MaterialTypeUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: MaterialTypeUpdateFormInputValues) => MaterialTypeUpdateFormInputValues;
    onValidate?: MaterialTypeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MaterialTypeUpdateForm(props: MaterialTypeUpdateFormProps): React.ReactElement;
