export default (error) => {
    if (error.response) {
        const { statusText, status } = error.response;
        return `${status} | ${statusText}`;
    } else {
        return error.message;
    }
}
