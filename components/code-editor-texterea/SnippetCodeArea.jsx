import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';


const SnippetCodeArea = ({ code, lang }) => {
    const regExSample = `from teachablehub.clients import TeachableHubPredictAPI

    teachable = TeachableHubPredictAPI(
        teachable="gprusiyski/second",
        environment="production",
        serving_key="your-serving-key-here",
        version=3
    )
    
    features = {
        "petal_width": 0.2,
        "sepal_width": 3.5,
        "petal_length": 1.4,
        "sepal_length": 5.1
    }
    
    predictions = teachable.predict(features)
    print(predictions)
`;

    return (<>
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
    </>)
}

export default SnippetCodeArea