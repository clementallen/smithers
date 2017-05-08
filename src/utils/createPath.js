export default (template, values = {}) => {
    let newTemplate = template;
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            newTemplate = newTemplate.replace(`{${key}}`, values[key]);
        }
    }
    return newTemplate;
};
