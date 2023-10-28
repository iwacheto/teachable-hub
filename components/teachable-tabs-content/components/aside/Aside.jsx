import React from 'react';
import Style from './aside.module.scss';

const Aside = ({ children, isLeftAside = false }) => {
    return <aside className={`${Style.aside} ${isLeftAside ? Style.left_aside : ''}`}>{children}</aside>
}

export default Aside