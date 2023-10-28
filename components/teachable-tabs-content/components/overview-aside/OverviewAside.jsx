import React from 'react';
import Style from './overview-aside.module.scss';
import { SettingsIcon, BookIcon } from '../../../icons/icons';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../../../store/teachable/teachableSlice';

const OverviewAside = ({ link }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(setActiveTab('Settings'))
    }

    return (
        <div>
            <p className={Style.description}>
                No description, topics, homepage url, source code url, dataset url or license url provided.
            </p>
            <h3 className={Style.heading}>
                About
                <SettingsIcon width={16} height={16} onClick={onClickHandler} />
            </h3>
            <div className={Style.aside_link_container}>
                {link && <Link href={link}>
                    <a className={Style.aside_link}>
                        <BookIcon width={16} height={16} />
                        Teachable Card</a>
                </Link>}
            </div>
        </div>
    )
}

export default OverviewAside