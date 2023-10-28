import React, { useState, useEffect } from 'react';
import Style from './pagination.module.scss';

const Pagination = ({ pages, curentPage, changePage }) => {

    const transformPages = (pages) => {
        const pagesArray = []
        for (let i = 1; i <= pages; i++) {
            pagesArray.push(i);
        }
        return pagesArray
    }

    return <div className={Style.pagination}>
        {pages && transformPages(pages).map(item => {
            return <div
                key={item}
                className={`${Style.page_item} ${curentPage === item ? Style.active : ''}`}
                onClick={()=>changePage(item)}>
                {item}
            </div>
        })}
    </div>
}

export default Pagination