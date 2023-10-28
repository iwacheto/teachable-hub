import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { transformStringToJson } from '../../services/textEditorService';
import { useDispatch } from 'react-redux';
import { updateSelectedDeployment } from '../../store/predictman/predictmanSlice';
import Style from './code-editor-texterea.module.scss';
import Copy from '../copy/Copy';

const CodeEditorTexterea = ({ data, onError, dataType }) => {
    const dispatch = useDispatch();
    const [code, setCode] = useState(null);

    useEffect(() => {
        if (code) {
            try {
                const json = JSON.parse(code);
                updateSelectedDeploymentHandler(json);
                onError(false);
            } catch (e) {
                onError(true);
            }
        }
    }, [code]);

    useEffect(() => {
        const object = {
            [dataType]: []
        };

        object[dataType].push(data);
        const transformedData = transformStringToJson(object);
        setCode(transformedData);
    }, [data]);

    const updateSelectedDeploymentHandler = (data) => {
        const deployment = {};
        let deploymentKey = null;
        for (const key in data) {
            deployment[key] = data[key];
            deploymentKey = key;
        }
        dispatch(updateSelectedDeployment(deployment))
    }

    const copyHandler = () => {
        navigator.clipboard.writeText(code);
    }

    return <div className={Style.code_editor}>
        <Copy onCopy={copyHandler} />
        {code && <Editor
            value={code}
            language="js"
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
            }}
        />}
    </div>;
}

export default CodeEditorTexterea