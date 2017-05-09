export default (error) => {
    let formattedError;
    if (error.response) {
        const { statusText, status } = error.response;
        formattedError = `${status} | ${statusText}`;
    } else {
        formattedError = error.message;
    }

    return formattedError;
};
