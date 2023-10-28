import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/dist/client/router';
import Dropdown from '../../../form-elements/dropdown/Dropdown';
import Style from './predictman-aside.module.scss';
import { setSelectedDeployment } from '../../../../store/predictman/predictmanSlice';
import { transformFeatures } from '../../../../services/helpers';
import FeatureItem from '../feature-item/FeatureItem';

const PredictmanAside = ({ selected }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { environmentData, deploymentData, selectedDeployment } = useSelector(state => state.predictman);
    const [environment, setEnvironment] = useState(null);
    const [deployment, setDeployment] = useState(null);
    const [features, setFeatures] = useState(null);
    const [selecedEnvironmentId, setSelectEnvironmentId] = useState(null);
    const [selecedDeploymentId, setSelectDeploymentId] = useState(null);

    useEffect(() => {
        if (environmentData && deploymentData) setDropdownData();
        // if (environmentData && deploymentData && environmentData.length && deploymentData.length) setDropdownData();
    }, [environmentData, deploymentData]);

    useEffect(() => {
        if (selectedDeployment?.samples?.features) transformFeaturesData(selectedDeployment?.schema?.features)
    }, [selectedDeployment]);

    const setDropdownData = () => {
        const selectedEnv = environmentData.find(i => i.name === selected.selecedEnvironment);

        const envData = environmentData.map(element => {
            return {
                id: element.id,
                value: element.name,
                label: null,
                query: 'environment',
                queryValue: element.name,
            }
        });

        const selectedDep = deploymentData.find(i => i.version === +selected.selecedDeployment);

        const depData = deploymentData.map(element => {
            return {
                id: element.id,
                value: `v${element.version}`,
                subValue: element.summary,
                label: null,
                query: 'version',
                queryValue: element.version,
            }
        });

        setSelectEnvironmentId(selectedEnv?.id);
        setSelectDeploymentId(selectedDep?.id);
        dispatch(setSelectedDeployment(selectedDep));
        setEnvironment(envData);
        setDeployment(depData);
    }

    const transformFeaturesData = data => {
        setFeatures(transformFeatures(data));
    }

    const onSelectHandler = data => {
        const queryParam = data?.query;
        switch (queryParam) {
            case 'environment':
                router.replace({
                    query: { ...router.query, environment: data.queryValue },
                });
                break;
            case 'version':
                router.replace({
                    query: { ...router.query, version: data.queryValue },
                });
                break;
        }
    }

    return <section>
        {environment && <Dropdown
            label="Environment"
            noResultLabel="No environment data"
            data={environment}
            selected={selecedEnvironmentId}
            onSelect={onSelectHandler}
        />}
        {deployment && <Dropdown
            label="Deployment version"
            noResultLabel="No verified deployments"
            data={deployment}
            selected={selecedDeploymentId}
            onSelect={onSelectHandler}
        />}
        <div>
            <h3 className={Style.feature_heading}>Features Help Section</h3>
            {(selectedDeployment && features) &&
                <div className={Style.feature_content}>
                    {features.map((item, index) => (<FeatureItem key={index} data={item} />))}
                </div>}
        </div>
    </section>
}

export default PredictmanAside