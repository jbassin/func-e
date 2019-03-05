const curry2 = (f) => {
    return (a) => {
        return (b) => {
            return f(a, b);
        }
    }
};

const curry3 = (f) => {
    return (a) => {
        return (b) => {
            return (c) => {
                return f(a, b, c);
            }
        }
    }
};

module.exports = {
    curry2,
    curry3,
};
