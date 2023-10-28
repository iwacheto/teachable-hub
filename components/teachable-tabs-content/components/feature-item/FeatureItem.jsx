import React, { useState } from 'react';
import Style from './feature-item.module.scss';
import { InfoIcon } from '../../../icons/icons';
import Tooltip from '../../../tooltip/Tooltip';

const FeatureItem = ({ data }) => {
    const [showTooltip, setShowTooltip] = useState(false);

    return <div className={Style.item} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
        {showTooltip && <Tooltip>{data.options.map((item, index) => {
            return <div key={index} className={`feature-item feature-item-${index}`}>
                <div>{item.key}</div>
                <div className={`feature-item-span`}>({item.value})</div>
            </div>
        })}</Tooltip>}
        <InfoIcon width={14} height={14} />
        {data.key}
        <span>({data.type})</span>
    </div>
}

export default FeatureItem