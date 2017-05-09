export default (template, values = {}) => {
    let path = template;

    Object.keys(values).forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(values, key)) {
            path = path.replace(`{${key}}`, values[key]);
        }
    });

    return path;
};
