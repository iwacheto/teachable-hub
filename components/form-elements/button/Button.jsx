import React from 'react';
import Style from './button.module.scss';

const Button = ({ children, styleClass, disabled, onClick }) => {
    return <button
        disabled={disabled ? 'disabled' : false}
        className={`${Style.button} ${styleClass ? styleClass : ''}`}
        onClick={onClick}
    >
        {children}
    </button>
}

export default Button;