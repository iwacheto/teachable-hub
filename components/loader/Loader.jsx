import React from 'react';
import Style from "./loader.module.scss"

const Loader = ({ children }) => {
    return <div className={Style.loader_container}>
        <div className={`${Style.lds_ring}`}>
            <div></div><div></div><div></div><div></div>
            {children}
        </div>
    </div>
}

export default Loader