export default (asyncClass) => {
    const newClass = asyncClass;
    Object.getOwnPropertyNames(asyncClass.prototype)
        .filter(name => name !== 'constructor')
        .forEach((name) => {
            const method = newClass.prototype[name];

            // Needs to be function() call so that 'this' is defined
            // eslint-disable-next-line func-names
            const asyncMethod = function () {
                // eslint-disable-next-line prefer-rest-params
                return this.init.then(() => method.apply(this, arguments));
            };

            newClass.prototype[name] = asyncMethod;
        });

    return newClass;
};
