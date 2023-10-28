import React from 'react';
import Style from './overview-tab.module.scss';
import DefaultList from '../../default-list/DefaultList';
import Aside from '../components/aside/Aside';
import { overviewData } from '../../../database/tabsData';
import OverviewAside from '../components/overview-aside/OverviewAside';
import { BookIcon, PencilIcon } from '../../icons/icons';

const OverviewTab = ({ link }) => {

    return (
        <section className={`main-container tab-container ${Style.tab_container}`}>
            <div className={Style.main_tab_content}>
                <div className={Style.tab_header}>
                    <h2 className={Style.heading}>
                        <BookIcon />
                        Teachable Card
                        <span className={Style.edit_icon}>
                            <PencilIcon width={16} height={16}/>
                        </span>
                    </h2>
                </div>

                <div className={Style.tab_content}>
                    {overviewData.map((item, index) => <DefaultList data={item} key={index} />)}
                </div>

            </div>
            <Aside>
                <OverviewAside link={link} />
            </Aside>
        </section>
    )
}

export default OverviewTab