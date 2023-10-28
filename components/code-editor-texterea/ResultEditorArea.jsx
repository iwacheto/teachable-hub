import React, { useEffect, useState } from 'react';
import Copy from '../copy/Copy';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import { transformResponseToJson } from '../../services/textEditorService';
import Style from './result-editor-texterea.module.scss';

const ResultEditorArea = ({ data }) => {
    const [code, setCode] = useState(null);

    useEffect(() => {
        //    const transformedData = transformStringToJson(data);
        const transformedCode = transformResponseToJson(data);
        // console.log(JSON.stringify(data));
        setCode(transformedCode);
        // setCode(transformedData);
    }, [data]);

    const copyHandler = () => {
        navigator.clipboard.writeText(code);
    }

    return <div className={Style.result_area}>
        <Copy onCopy={copyHandler} />
        {code && <Editor
            value={code}
            language="js"
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 13,
            }}
        />}
    </div>
}

export default ResultEditorArea