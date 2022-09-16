export function Arraying(e) {
    const concat = function (arr) {
        let res = [];
        for (const e of arr) {
            res = res.concat(Arraying(e));
        }
        return res;
    };
    return e instanceof Array ? concat(e) : [e];
}
// 引数には any が入る.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasSameValue = (o1, o2) => {
    if (o1 === o2) {
        return true;
    } // same object
    if (o1 == null) {
        return false;
    } // because the other is not null
    if (o2 == null) {
        return false;
    } // because the other is not null
    if (Object.keys(o1).length != Object.keys(o2).length) {
        return false;
    }
    for (const key in o1) {
        if (!(key in o2)) {
            return false;
        }
        if (typeof o1[key] === "object") {
            if (!hasSameValue(o1[key], o2[key])) {
                return false;
            } // deep check
        }
        else if (o1[key] != o2[key]) {
            return false;
        }
    }
    return true;
};
// エラーを期待するテストのための, 予想外のエラーを受け取った時のエラー
export class UnexpectedErrorThrownError extends Error {
    constructor(message) {
        super(message);
    }
}
export const assertNotNull = (value) => {
    if (value === null) {
        throw new TypeError("null value received");
    }
    return value;
};
export const assertNotUndefined = (value) => {
    if (value === undefined) {
        throw new TypeError("undefined value received");
    }
    return value;
};
export const assertNonNullable = (value) => {
    return assertNotNull(assertNotUndefined(value));
};
export const assertNotNaN = (value) => {
    if (isNaN(value)) {
        throw new TypeError("NaN value received");
    }
    return value;
};
export const castToNumber = (value) => {
    return assertNotNaN(Number(value));
};
