import React, { useEffect } from 'react';
import Layout from '../../../../layout/Layout';
import TeachableTabs from '../../../../components/teachable-tabs/TeachableTabs';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from "next/dynamic";
const OverviewTab = dynamic(() => import("../../../../components/teachable-tabs-content/overview-tab/OverviewTab"));
const DeploymentTab = dynamic(() => import("../../../../components/teachable-tabs-content/deployment-tab/DeploymentTab"));
const PredictManTab = dynamic(() => import("../../../../components/teachable-tabs-content/predictman-tab/PredictManTab"));
const DocsTab = dynamic(() => import("../../../../components/teachable-tabs-content/docs-tab/DocsTab"));
import { checkActiveTab } from '../../../../services/helpers';
import { fetchTeachable, setActiveTab } from '../../../../store/teachable/teachableSlice';

const Index = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const isBrowser = typeof window !== "undefined";
    const { teachableData, activeTab } = useSelector(state => state.teachable);

    useEffect(() => {
        if (isBrowser) {
            const tabName = checkActiveTab();
            dispatch(setActiveTab(tabName));
        }
    }, []);

    useEffect(() => {
        const { asPath } = router;
        if (!asPath.includes('teachable')) dispatch(fetchTeachable(`/${router?.query?.user}/${router?.query?.teachable}`));
        const tabName = checkActiveTab();
        dispatch(setActiveTab(tabName));
    }, [router]);

    const getActiveTab = () => {
        switch (activeTab) {
            case 'overview':
                return <OverviewTab link={`/${teachableData?.owner?.handler}/${teachableData?.name}`} />;
            case 'deployments':
                return <DeploymentTab data={teachableData} />;
            case 'predictman':
                return <PredictManTab data={teachableData} />;
            case 'docs':
                return <DocsTab />;
        }
    }

    return <Layout>
        {teachableData && <TeachableTabs data={teachableData} />}

        {teachableData && getActiveTab()}
    </Layout>
}

export default Index
