const defaultGenerator = (componentName) => componentName;

const createClassNameGenerator = () => {
    let generate = defaultGenerator;
    return {
        configure(generator) {
            generate = generator;
        },
        generate(componentName) {
            return generate(componentName);
        },
        reset() {
            generate = defaultGenerator;
        },
    };
};

const ClassNameGenerator = createClassNameGenerator();

export { ClassNameGenerator };

const globalStateClassesMapping = {
    active: 'active',
    checked: 'checked',
    completed: 'completed',
    disabled: 'disabled',
    error: 'error',
    expanded: 'expanded',
    focused: 'focused',
    focusVisible: 'focusVisible',
    open: 'open',
    readOnly: 'readOnly',
    required: 'required',
    selected: 'selected',
};

export function generateUtilityClass(
    componentName,
    slot,
    globalStatePrefix = 'Mui',
) {
    const globalStateClass = globalStateClassesMapping[slot];
    return globalStateClass
        ? `${globalStatePrefix}-${globalStateClass}`
        : `${ClassNameGenerator.generate(componentName)}-${slot}`;
}

export function generateUtilityClasses(
    componentName,
    slots,
    globalStatePrefix = 'Mui',
) {
    const result = {};

    slots.forEach((slot) => {
        result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
    });

    return result;
}

export function composeClasses(
    slots,
    getUtilityClass,
    classes,
) {
    const output = {};

    Object.keys(slots).forEach(
        (slot) => {
            output[slot] = slots[slot]
                .reduce((acc, key) => {
                    if (key) {
                        const utilityClass = getUtilityClass(key);
                        if (utilityClass !== '') {
                            acc.push(utilityClass);
                        }
                        if (classes && classes[key]) {
                            acc.push(classes[key]);
                        }
                    }
                    return acc;
                }, [])
                .join(' ');
        },
    );

    return output;
}

export function isPlainObject(item) {
    if (typeof item !== 'object' || item === null) {
        return false;
    }

    const prototype = Object.getPrototypeOf(item);
    return (
        (prototype === null ||
            prototype === Object.prototype ||
            Object.getPrototypeOf(prototype) === null) &&
        !(Symbol.toStringTag in item) &&
        !(Symbol.iterator in item)
    );
}

export function capitalize(string) {
    if (typeof string !== 'string') {
        return 'Err'
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
}
