export default (error) => {
    const { name, statusCode } = error;
    return `${name} | ${statusCode}`;
}
