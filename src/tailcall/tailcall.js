class Tailcall {
    constructor(func) {
        this._func = func;
        this._func.tailcall = this;
        this._done = false;
        this._retVal = null;
        this._args = [];
    }

    done(retVal) {
        this._done = true;
        this._retVal = retVal;
    }

    next(...args) {
        this._args = args;
    }

    run(...args) {
        this._args = args;
        while (!this._done) {
            this._func(...this._args);
        }
        return this._retVal;
    }
}

module.exports = {
    Tailcall,
};
