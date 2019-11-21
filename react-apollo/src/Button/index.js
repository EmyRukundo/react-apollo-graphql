import React from 'react';
import './style.css';

const Button = ({
    childreen,
    className,
    color = 'black',
    type= 'button',
    ...props
}) => (
    <button 
    className={`${className} Button Button_${color}`}
    type={type}
    {...props}
    >
        {childreen}
    </button>
);

export default Button;