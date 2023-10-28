export const getPaginationData = (text) => {
    let pages = 1;
    if (window !== 'indefined' && text) {
        const paginationData = text.split(',');
        const count = paginationData.length - 1;

        if (paginationData[count].includes('rel="last"')) {
            const sanitizedString = paginationData[count].split('?page=');
            pages = sanitizedString[1].split('>')[0];
        } else {
            const params = new URLSearchParams(window.location.search);
            if (params && params.has("page")) {
                pages = params.get('page');
            }
        }
    }
    return pages;
}

export const checkActiveTab = () => {
    const pathname = window.location.pathname;
    const pathArray = pathname.split('/');
    return pathArray.length && pathArray.length > 3 ? pathArray[pathArray.length - 1] : 'overview';
}

export const splitText = (text, length = 20) => {
    return text.split('').splice(0, length).join('') + '...';
}

export const transformFeatures = data => {
    const array = [];
    for (const key in data) {
        const featureObject = data[key];
        const options = [];
        for (const subKey in featureObject) {
            options.push({ key, value: featureObject[subKey] });
        }
        array.push({ key, type: data[key].type, options, });
    }
    return array;
}
