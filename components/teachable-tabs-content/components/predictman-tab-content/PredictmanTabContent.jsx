import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Style from './predictman-tab-content.module.scss';
import Button from '../../../../components/form-elements/button/Button';
import PredictmanCard from '../predictman-card/PredictmanCard';
import { getTimestampInSeconds } from '../../../../services/dateTimeService';
import { setPredictTime, clearPredictTime, setSampleResult } from '../../../../store/predictman/predictmanSlice';
import { setLoader } from '../../../../store/default/defaultSlice';
import CodeSnippet from '../code-snippet/CodeSnippet';
import axios from 'axios';


const PredictmanTabContent = ({ selected, teachable }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [startPredict, setStartPredict] = useState(false);
    const { selectedDeployment, selectedSample, selectedSampleData } = useSelector(state => state.predictman);

    const predictHandler = () => {
        const formData = {};
        const timestamp = getTimestampInSeconds();
        dispatch(clearPredictTime());
        formData[selectedSample] = selectedSampleData[selectedSample];
        formData.handler = router.query.user;
        formData.teachable = router.query.teachable;
        formData.environment = router.query.environment;
        formData.version = router.query.version;

        dispatch(setPredictTime({ type: 'start', value: timestamp }));

        setStartPredict(true);
        fetchPredict(formData);
    }

    const fetchPredict = async (data) => {
        try {
            const response = await axios.post("/api/predictman", {
                data,
                url: {
                    owner: teachable?.owner?.handler,
                    name: teachable?.name,
                }
            })
            setStartPredict(false);
            if (response.status === 200 || response.status === 201) {
                const timestampEnd = getTimestampInSeconds();
                dispatch(setSampleResult(response.data.data));
                dispatch(setPredictTime({ type: 'end', value: timestampEnd }));
            } else {
                dispatch(setLoader({ show: true, message: response?.data?.error }));
            }
        } catch (error) {
            setStartPredict(false);
        }
    }

    return <div className={Style.wrapper}>
        <div className={Style.header}>
            <h2 className={Style.heading}>
                Make a prediction in
                {selected && <span> {selected.selecedEnvironment}
                    /v{selected.selecedDeployment}
                </span>}
            </h2>
            <div>
                <Button
                    styleClass="primary-button"
                    disabled={startPredict}
                    onClick={predictHandler}
                >
                    Predict
                </Button>
            </div>
        </div>

        <div className={Style.container}>
            {selectedDeployment && <PredictmanCard data={selectedDeployment} startPredict={startPredict} />}
            {selectedDeployment && <CodeSnippet data={selectedDeployment} />}
        </div>
    </div>
}

export default PredictmanTabContent



