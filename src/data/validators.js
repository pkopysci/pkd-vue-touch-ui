export const checkString = (data, argName, methodName, minLength = 1) => {
    if (typeof data != 'string') {
        console.error(`${methodName}() - ${argName} must be of type string.`)
        return false
    }

    if (data.length < minLength) {
        console.error(`${methodName}() - ${argName} must be at least ${minLength} characters.`)
        return false
    }

    return true
}

export const checkBoolean = (data, argName, methodName) => {
    if (typeof data != 'boolean') {
        console.error(`${methodName}() - ${argName} must be of type boolean.`)
        return false
    }

    return true
}

export const checkNumber = (data, argName, methodName) => {
    if (typeof data != 'number') {
        console.error(`${methodName}() - ${argName} must be of type number.`)
        return false
    }

    return true
}

export const checkDefined = (data, argName, methodName) => {
    if (!data) {
        console.error(`${methodName}() - ${argName} cannot be null or undefined.`)
        return false
    }

    return true
}