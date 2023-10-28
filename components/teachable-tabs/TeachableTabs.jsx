import React from 'react';
import Style from './teachable-tabs.module.scss';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { LogoIcon } from '../icons/icons';


const TeachableTabs = ({ data }) => {
    const { activeTab } = useSelector(state => state.teachable);
    const defaultUrl = `/${data?.owner?.handler}/${data?.name}`;
    const predictManLink = `${defaultUrl}/predictman?environment=${data.default_environment}&version=${(data?.active_deployments && data.active_deployments?.production) ? data.active_deployments.production?.version : 0}`

    const tabs = [
        { title: 'Overview', link: `${defaultUrl}` },
        { title: 'Deployments', link: `${defaultUrl}/deployments` },
        { title: 'Environments', link: `${defaultUrl}/environments` },
        { title: 'PredictMan', link: predictManLink },
        { title: 'Docs', link: `${defaultUrl}/docs` },
        { title: 'Settings', link: `${defaultUrl}/settings` },
    ];

    return <section className={`${Style.tabs_container}`}>
        <div className={`main-container`}>
            <div className={Style.tabs_header}>
                {data?.owner?.handler &&
                    <div className={Style.tab_links}>
                        <Link href={`/${data?.owner?.handler}`}><span>{data?.owner?.handler}</span></Link>
                        <span className={Style.link_divider}> / </span>
                        <Link href={`${defaultUrl}`}><span className={Style.last_link}>{data?.name}</span></Link>
                    </div>}
                <p className={Style.date_created}>Created on {data?.created_at}</p>
                <div className={Style.tabs_logo}>
                    <LogoIcon width={96} height={96} />
                </div>
            </div>

            <div className={Style.tabs}>
                {tabs.map((tab, index) => {
                    return <Link href={`${tab.link}`} key={index}>
                        <a className={`${Style.tab} ${activeTab === tab.title.toLowerCase() ? Style.active : ''}`}>
                            {tab.title}
                        </a>
                    </Link>
                })}
            </div>
        </div>
    </section>
}

export default TeachableTabs