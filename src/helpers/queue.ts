const retryCountCalculator = (properties: any, maxRetryCountValue = 4) => {
    const countValue = properties.headers ? properties.headers.count || 0 : 0;
    let newCount = countValue + 1;

    if (newCount > maxRetryCountValue) {
        newCount = -1;
    }
    const headers = {
        count: newCount
    };
    return { headers };
};

export { retryCountCalculator };
