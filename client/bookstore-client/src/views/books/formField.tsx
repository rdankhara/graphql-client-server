import {HTMLInputTypeAttribute} from "react";

const labelClass = 'block text-gray-700 text-sm font-bold m-2';
const inputClass = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline';

export interface FormFieldProps<T> {
    label: string;
    defaultValue: T;
    placeholder?: string;
    name?: string;
    type: HTMLInputTypeAttribute;
}
export const FormField = <T extends number | string>(props: FormFieldProps<T>) => {
    const {defaultValue, name, label} = props;
    return (
        <p>
            <label className={labelClass} htmlFor={name}>{label}</label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                className={inputClass}
                data-testid={`test-${name}`}
                id={name}
                name={name}
                defaultValue={defaultValue}
            />
        </p>
    )
}
