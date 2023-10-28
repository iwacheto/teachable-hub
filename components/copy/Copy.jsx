import React, { useState } from 'react';
import Style from './copy.module.scss';
import Tooltip from '../tooltip/Tooltip';
import { CopyIcon, CheckIcon } from '../icons/icons';

const Copy = ({ onCopy }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const [isCopied, setIsCopied] = useState(false);

    const onCopyHandler = () => {
        onCopy();
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000)
    }

    return <div
        className={Style.copy}
        onClick={() => onCopyHandler()}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
    >
        {showTooltip && <Tooltip tooltiPosition="center">
            <p className={Style.copy_tooltip}>Copy to clipboard</p>
        </Tooltip>}
        {!isCopied ? <CopyIcon width={16} height={16} color="rgb(100, 119, 135)" />
            : <CheckIcon width={16} height={16} color="rgb(91, 193, 70)" />}
    </div>
}

export default Copy