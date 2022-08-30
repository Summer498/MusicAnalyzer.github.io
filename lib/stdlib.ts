export type recurrentArray<T> = T | recurrentArray<T>[]

export function Arraying<T>(e: recurrentArray<T>): T[] {
    const concat = function (arr: recurrentArray<T>[]): T[] {
        let res: T[] = [];
        for (const e of arr) { res = res.concat(Arraying(e)); }
        return res;
    };
    return e instanceof Array ? concat(e) : [e];
}

// 引数には any が入る.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasSameValue = (o1: any, o2: any) => {
    if(o1===o2){return true;}  // same object
    if(o1==null){return false;}  // because the other is not null
    if(o2==null){return false;}  // because the other is not null
    if (Object.keys(o1).length != Object.keys(o2).length) {return false;}
    for (const key in o1) {
        if (!(key in o2)) {return false;}
        if ("object" === typeof o1[key]) {
            if (!hasSameValue(o1[key], o2[key])) {return false;}  // deep check
        } else if (o1[key] != o2[key]) {return false;}
    }
    return true;
};

