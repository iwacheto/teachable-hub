export const transformStringToJson = data => {
    if (!data) return;

    let objectToString = "{ \n";
    for (const key in data) {
        objectToString += JSON.stringify(key) + ': [ \n ';

        for (const object of data[key]) {
            if (object) {
                if (object && object[0]) {
                    objectToString += '  [ \n ';
                    object[0].forEach((element, index) => {
                        objectToString += `   ${JSON.stringify(element)}${index < (object[0].length - 1) ? ', ' : ''}\n `
                    })
                    objectToString += '  ] \n ';
                } else {
                    const toArray = Object.keys(object);
                    const lastKey = toArray[toArray.length - 1];
                    objectToString += ' { \n ';
                    for (const subKey in object) {
                        const comma = subKey !== lastKey ? ', ' : '';
                        objectToString += `  ${JSON.stringify(subKey)}:${JSON.stringify(object[subKey])}${comma}\n`;
                    }
                    objectToString += '  } \n ';
                }
            }
        }
    }
    objectToString += '] \n}';

    return objectToString;
}

export const transformResponseToJson = (data) => {
    let objectToString = "{ \n";

    for (const key in data) {
        let dataType = typeof (data[key]);
        if (dataType === 'object' && data[key][0] && typeof data[key][0] !== 'object') dataType = 'array';

        switch (dataType) {
            case 'string':
                objectToString += `  ${JSON.stringify(key)}: ${JSON.stringify(data[key])}, \n`;
                break;

            case 'object':
                objectToString += `  ${JSON.stringify(key)}: [ \n ${transformObjectToString(data[key])}   ]`;
                break;
            case 'array':
                objectToString += `  ${JSON.stringify(key)}: [ \n ${transformArrayToString(data[key])}   ]`;
                break;
        }
    }

    objectToString += ' \n }';

    return objectToString;
}

const transformObjectToString = (array) => {
    let string = "";

    array.forEach(element => {
        for (const key in element) {
            string += `    ${JSON.stringify(key)}: ${JSON.stringify(element[key])}, \n`;
        }
    })

    return string;
}

const transformArrayToString = (array) => {
    let string = "";

    array.forEach(element => {
        string += `    ${JSON.stringify(element)}, \n`;
    })

    return string;
}