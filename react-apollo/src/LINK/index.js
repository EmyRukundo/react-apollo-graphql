import React from 'react';

const Link = ({ childreen, ...props }) => (
    <a {...props} target="_blank" rel="noopener noreferrer">
        {childreen}
    </a>
);
export default Link;
