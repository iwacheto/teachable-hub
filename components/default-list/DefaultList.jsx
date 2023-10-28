import React from 'react';
import Style from './default-list.module.scss';

const DefaultList = ({ data }) => {
    return (
        <div>
            {data?.heading && <h3 className={Style.main_heading}>{data?.heading}</h3>}
            {data?.description && <p className={Style.description}>{data?.description}</p>}
            {data?.list && <ul className={Style.ul}>
                {data.list.map((item, index) => <li key={index} className={Style.list}>{item}</li>)}
            </ul>}
        </div>
    )
}

export default DefaultList