export default (template, values = {}) => {
    let path = template;

    Object.keys(values).forEach((key) => {
        path = path.replace(`{${key}}`, values[key]);
    });

    return path;
};
