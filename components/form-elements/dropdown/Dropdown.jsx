import React, { useState, useEffect } from 'react';
import Style from './dropdown.module.scss';
import { ChevronDownIcon } from '../../icons/icons';
import { splitText } from '../../../services/helpers';

const Dropdown = ({ data, onSelect, selected, label, noResultLabel }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        const selectedObject = data.find(i => i.id === selected);
        setSelectedValue(selectedObject);
    }, [selected]);

    return <div className={Style.dropdown_container} onClick={() => setShowResults(!showResults)}>
        {label && <p className={Style.label}>{label}</p>}
        <div className={`${Style.dropdown}`}>
            {selectedValue ? <p>
                {selectedValue?.value}
                {selectedValue?.subValue && <span className={Style.sub_value}>({splitText(selectedValue?.subValue, 20)})</span>}
            </p> :
                <span className={Style.no_data_label}>{noResultLabel || 'There is no data'}</span>}
            {selectedValue && <div>
                <ChevronDownIcon color="#778CA2" isRotate={showResults} />
            </div>}
            <div className={`${Style.dropdown_results} ${showResults ? Style.active : ''}`}>
                {data.map((item, index) => {
                    return <div key={index} className={Style.dropdown_result_item} onClick={() => onSelect(item)}>
                        {item.value}
                        {item?.subValue && <span className={Style.sub_value}>({splitText(item?.subValue, 20)})</span>}
                    </div>
                })}
            </div>
        </div>
    </div>
}

export default Dropdown