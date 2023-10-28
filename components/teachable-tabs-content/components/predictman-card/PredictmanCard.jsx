import React, { useState, useEffect } from 'react';
import Style from './predictman-card.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import CodeEditorTexterea from '../../../code-editor-texterea/CodeEditorTexterea';
import { setSelectedSample } from '../../../../store/predictman/predictmanSlice';
import ResultEditorArea from '../../../code-editor-texterea/ResultEditorArea';
import { ClockIcon } from '../../../icons/icons';
import Loader from '../../../loader/Loader';

const PredictmanCard = ({ data, startPredict }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [jsonError, setJsonError] = useState(false);
  const [samples, setSamples] = useState(null);
  const { time, showTime, selectedSample, sampleResult } = useSelector(state => state.predictman);


  useEffect(() => {
    const samples = Object.keys(data.samples);
    const defaultSort = Array.from(samples).sort();
    setSamples(defaultSort);
    dispatch(setSelectedSample(defaultSort[0]))
  }, [data]);

  const activeTabHanlder = (index) => {
    setActiveTab(index);
    dispatch(setSelectedSample(samples[index]));
  }

  return <section className={Style.container}>
    {jsonError && <div className={Style.error}>Invalid JSON input</div>}
    <header className={Style.header}>
      <div className={`${Style.header_content} ${Style.header_content_tabs}`}>
        {samples && samples.map((tab, index) => {
          // {data?.samples && Object.keys(data.samples).sort().map((tab, index) => {
          return <p key={tab} className={`${Style.header_tab} ${activeTab === index ? Style.active : ''}`}
            onClick={() => activeTabHanlder(index)}>
            {tab}
          </p>
        })}
      </div>

      <div className={Style.header_content}>
        <p className={Style.header_content_heading}>
          Prediction result
          {showTime && <span>
            <ClockIcon width={14} height={14} />
            {time.end - time.start}ms
          </span>}
        </p>

      </div>
    </header>

    <div className={Style.card_body}>
      <div className={`${Style.card_body_item} ${Style.card_body_item_left}`}>
        {samples && samples.map((tab, index) => {
          // {data?.samples && Object.keys(data.samples).sort().map((tab, index) => {
          return <div key={index}>{index === activeTab &&
            <CodeEditorTexterea
              data={data?.samples[tab]}
              onError={(error) => setJsonError(error)}
              dataType={selectedSample}
            />}</div>
        })}
      </div>
      <div className={`${Style.card_body_item}`}>
        { }
        {sampleResult ? <ResultEditorArea data={sampleResult} /> :
          <>
            {startPredict ? <Loader /> : ''}
          </>}
      </div>
    </div>
  </section>
}

export default PredictmanCard