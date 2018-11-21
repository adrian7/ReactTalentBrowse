/**
 * Form input component
 * @author adrian7
 * @version 1.0
 */

import './styles.css';
import * as React from 'react';
import { FormEvent, KeyboardEvent } from 'react';
import { Alignment } from '../../lib/util';

interface Props {
    align?:         Alignment;
    label?:         string;
    type?:          string;
    value?:         string;
    placeholder?:   string;
    error?:         string;
    onChange?:      ( ( e: FormEvent<HTMLInputElement> ) => void );
    onKeyUp?:       ( ( e: KeyboardEvent<HTMLInputElement> ) => void );
}

/**
 * Default input onchange action
 * @param {React.FormEvent<HTMLInputElement>} e
 */
function defaultOnChangeAction(e: FormEvent<HTMLInputElement>) {

    // Prevent default
    e.preventDefault();

    alert( 'Value: ' + e.currentTarget.value );

}

/**
 * Input component generator
 * @param {Props} props
 * @returns {any}
 * @constructor
 */
export function Input(props: Props) {

    // Set defaults
    let align       = props.align === undefined ? 'left' : props.align;
    let label       = props.label === undefined ? 'Label' : props.label;
    let type        = props.type === undefined ? 'text' : props.type;
    let value       = props.value === undefined ? '' : props.value;
    let placeholder = props.placeholder === undefined ? 'enter field value... ' : props.placeholder;
    let onChange    = props.onChange === undefined ? defaultOnChangeAction : props.onChange;
    let onKeyUp     = props.onKeyUp === undefined ? ( () => false ) : props.onKeyUp;

    // Compute className
    let className = ( 'form-control align-' + align );

    // Retrieve error message
    let error     = ( props.error !== undefined && props.error.length > 0 ) ?
        props.error :
        null;

    // Compute validation state
    let validationState = ( props.error === undefined ) ?
        '' :
        ( error === null ? 'valid' : 'invalid' );

    return (

        <div className={className}>
            <label>{label}</label>
            <input
                className={validationState}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onKeyUp={onKeyUp}
                value={value}
            />
            <p className="validation-error">{error}</p>
        </div>

    );
}

export function PasswordInput(props: Props) {

    return (
        <Input
            type="password"
            label={props.label}
            placeholder={props.placeholder}
            onChange={props.onChange}
            error={props.error}
            value={props.value}
        />
    );

}

export function TextInput(props: Props) {

    return (
        <Input
            type="text"
            label={props.label}
            placeholder={props.placeholder}
            onChange={props.onChange}
            error={props.error}
            value={props.value}
        />
    );

}

export function SearchInput(props: Props) {

    return (
        <div className="search-input-container">
            <Input
                type="text"
                label={props.label}
                placeholder={props.placeholder}
                onChange={props.onChange}
                error={props.error}
                value={props.value}
            />
        </div>
    );

}