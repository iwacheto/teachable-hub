import React, { useState } from 'react';
import Style from './input.module.scss';
import { validate } from '../../../services/validateService';

const Input = ({ id, type, label, isValidate = false, isDownLabel = false, placeholder = null, onChange, onKeyDown }) => {
    const [errors, setErrors] = useState(null);

    const onChangeHandler = (e) => {
        onChange(e);
        if (isValidate) {
            const errors = validate(isValidate, e.target.value);
            setErrors(errors);
        }
    }

    return <div className={`${Style.default_form} ${isDownLabel ? Style.down_label_form : ''}`}>
        <label htmlFor={id} className={Style.label}>{label}</label>
        <input
            type={type}
            id={id}
            className={Style.input}
            onChange={onChangeHandler}
            onKeyDown={onKeyDown}
            placeholder={placeholder ? placeholder : null}
        />
        {(isValidate && errors) && <>{errors.map((error, index) => {
            return <span className={Style.error} key={index}>{error.message}</span>
        })}</>}
    </div>
}

export default Input