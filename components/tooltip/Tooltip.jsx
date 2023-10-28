import React from 'react';
import Style from './tooltip.module.scss';

const Tooltip = ({ children, tooltiPosition }) => {
    return <div className={`${Style.tooltip} ${tooltiPosition && Style[tooltiPosition]}`}>
        <div className={Style.tooltip_arrow}></div>
        {children}
    </div>
}

export default Tooltip