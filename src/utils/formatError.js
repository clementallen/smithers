export default ({ response, message }) => {
    let formattedMessage;
    if (response) {
        const { statusText, status } = response;
        formattedMessage = `${status} | ${statusText}`;
    } else {
        formattedMessage = message;
    }
    return new Error(formattedMessage);
};
