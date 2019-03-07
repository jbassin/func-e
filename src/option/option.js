const optionTypeEnum = {
    None: false,
    Some: true,
};

class Option {
    constructor(item) {
        if (item instanceof Option) this._value = item.value;
        else this._value = item;
    };

    get value() {
        return this._value;
    };

    get type() {
        return typeof this._value;
    };

    get isSome() {
        return !((typeof this._value === 'undefined') || (this._value === null));
    }

    get isNone() {
        return !this.isSome;
    }

    getOrElse(orElse) {
        return this.isSome ? this._value : orElse;
    };
}

const isOption = (item) => {
    if ((typeof item === 'undefined') || (item === null)) return false;
    return (item instanceof Option);
};

module.exports = {
    Option,
    isOption,
};
