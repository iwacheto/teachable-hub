import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Aside from '../components/aside/Aside';
import PredictmanAside from '../components/predictman-aside/PredictmanAside';
import Style from './predictman-tab.module.scss';
import { fetchEnvironment } from '../../../store/predictman/predictmanSlice';
import Loader from '../../../components/loader/Loader';
import PredictmanTabContent from '../components/predictman-tab-content/PredictmanTabContent';
import PredictmanNoResult from '../components/predictman-tab-content/PredictmanNoResult';

const PredictManTab = ({ data }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoading, showNoResult } = useSelector(state => state.predictman);
    const [selecedEnvironment, setSelectEnvironment] = useState(null);
    const [selecedDeployment, setSelectDeployment] = useState(null);
    
    useEffect(() => {
        const url = `teachables/${data.owner.handler}/${data?.name}/environments/?ordering=-id`;

        if (!router.asPath.includes('teachable')) {
            const urlData = {
                user: router.query.user,
                teachable: router.query.teachable,
                environment: router.query.environment,
                page: router.query.page || 1,
                usable: true,
                dropdown: true,
            }
            setSelectEnvironment(router.query.environment);
            setSelectDeployment(router.query.version);
            getData(url, urlData);
        }
    }, [router]);

    const getData = (url, data) => {
        dispatch(fetchEnvironment({ url, data }));
    }

    return <section className={`main-container tab-container`}>
        <Aside isLeftAside={true}>
            <PredictmanAside selected={{ selecedEnvironment, selecedDeployment }} />
        </Aside>

        <div className={Style.tab_content}>
            {isLoading ? <Loader /> : <>
                {showNoResult ? <PredictmanNoResult data={data} />
                    : <PredictmanTabContent selected={{ selecedEnvironment, selecedDeployment }} teachable={data} />}
            </>}

        </div>
    </section>
}

export default PredictManTab