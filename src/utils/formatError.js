export default (error) => {
    let formattedMessage;
    if (error.response) {
        const { statusText, status } = error.response;
        formattedMessage = `${status} | ${statusText}`;
    } else {
        formattedMessage = error.message;
    }
    return new Error(formattedMessage);
};
