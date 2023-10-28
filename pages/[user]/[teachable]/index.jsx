import React, { useEffect } from 'react';
import Layout from '../../../layout/Layout';
import TeachableTabs from '../../../components/teachable-tabs/TeachableTabs';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeachable, setActiveTab } from '../../../store/teachable/teachableSlice';
import { checkActiveTab } from '../../../services/helpers';
import dynamic from "next/dynamic";
const OverviewTab = dynamic(() => import("../../../components/teachable-tabs-content/overview-tab/OverviewTab"));

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { teachableData, activeTab } = useSelector(state => state.teachable);

    useEffect(() => {
        const { asPath } = router;
        if (!asPath.includes('teachable')) dispatch(fetchTeachable(asPath));
        const tabName = checkActiveTab();
        dispatch(setActiveTab(tabName));
    }, [router]);

    return <Layout>
        {teachableData && <>
            {teachableData && <TeachableTabs data={teachableData} />}
            <OverviewTab link={`/${teachableData?.owner?.handler}/${teachableData?.name}`} />
        </>}
    </Layout>
}

export default Index