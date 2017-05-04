export default (template, values = {}) => {
    for (var key in values) {
        if (!values.hasOwnProperty(key)) continue;
        template = template.replace(`{${key}}`, values[key]);
    }
    return template;
}
