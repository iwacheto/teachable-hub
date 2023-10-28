import React from 'react';
import Style from './teachable-item.module.scss';
import Link from 'next/link';
import { getDiffDays } from '../../services/dateTimeService';
import { CalendarIcon, LogoIcon } from '../icons/icons';

const TeachableItem = ({ data }) => {

    return <div className={Style.item}>
        <div className={Style.item_information}>
            {data?.name && <h3>
                <Link href={`/${data?.owner?.handler}/${data?.name}`}>
                    <a className={Style.heading}>{data.name}</a>
                </Link>
            </h3>}
            <div className={Style.item_information_text}>
                <CalendarIcon width={16} height={16} color="rgb(100, 119, 135)" />
                <div className={Style.subheading}>
                    Updated {getDiffDays(data.updated_at)} by
                    <Link href={`/${data?.name}`}>
                        <a className={Style.subheading_link}> @{data?.owner?.handler}</a>
                    </Link>
                </div>
            </div>
        </div>
        <div className={Style.item_image}>
            <LogoIcon width={96} height={96} />
        </div>
    </div>
}

export default TeachableItem