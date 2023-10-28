import React, { useState } from 'react';
import Style from './code-snippet.module.scss';
import SnippetCodeArea from '../../../code-editor-texterea/SnippetCodeArea';
import Copy from '../../../copy/Copy';

const codes = ['cURL', 'Python', 'Ruby', 'JavaScript', 'Java', 'Go'];

const CodeSnippet = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [code, setCode] = useState(`curl -X 'POST' \n
    'https://serve.teachablehub.com/v1/gprusiyski/second/predict/?environment=production&version=3' \n
    -H 'Content-Type: application/json' \n
    -H 'X-Serving-Key: your-serving-key' \n
    -d '{"features": [{"petal_width":0.2,"sepal_width":3.5,"petal_length":1.4,"sepal_length":5.1}]}'`);

    const copyHandler = () => {
        navigator.clipboard.writeText(code);
    }

    const handleTab = (index, item) => {
        setActiveTab(index, item)
    }

    return <div className={Style.container}>
        <h3 className={Style.heading}>Code snippets</h3>
        <div className={Style.card}>
            <div className={Style.tabs_container}>
                {codes.map((item, index) => {
                    return <div
                        key={index}
                        className={`${Style.tab_item} ${activeTab === index ? Style.active : ''}`}
                        onClick={() => handleTab(index, item)}>
                        {item}
                    </div>
                })}
            </div>
            <div className={Style.tab_content}>
                <SnippetCodeArea code={code} />
                <div className={Style.copy_icon}>
                    <Copy onCopy={copyHandler} />
                </div>
            </div>
        </div>
    </div>
}

export default CodeSnippet