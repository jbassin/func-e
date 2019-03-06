const optionTypeEnum = {
    None: false,
    Some: true,
};

const createOption = (item) => {
    const func_e_option = true;
    const optionType = (typeof item === 'undefined') || (item === null) ? optionTypeEnum.None : optionTypeEnum.Some;
    const optionValue = item;
    const getOrElse = (orElse) => optionType === optionTypeEnum.None ? orElse : optionValue;
    return {
        func_e_option,
        optionType,
        optionValue,
        getOrElse,
    }
};

const isOption = (item) => {
    if ((typeof item === 'undefined') || (item === null)) return false;
    if (item.func_e_option == null) return false;
    return item.func_e_option;
};

const isSome = (item) => {
    if (!isOption(item)) return false;
    return item.optionType;
};

module.exports = {
    createOption,
    isOption,
    isSome,
};
