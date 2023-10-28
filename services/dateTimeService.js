export const getDiffDays = (date) => {
    const dateUpdated = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - dateUpdated);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 1 ? `${diffDays} days` : `${diffDays} day`
}

export const getTimestampInSeconds = () => {
    return Math.floor(Date.now())
}