export function Arraying(e) {
    const concat = function (arr) {
        let res = [];
        for (let e of arr) {
            res = res.concat(Arraying(e));
        }
        return res;
    };
    return (e instanceof Array) ? concat(e) : [e];
}
export const hasSameValue = (o1, o2) => {
    if (Object.keys(o1).length != Object.keys(o2).length)
        return false;
    for (const key in o1) {
        if (!(key in o2))
            return false;
        if ("object" === typeof (o1[key])) {
            if (!hasSameValue(o1[key], o2[key]))
                return false; // deep check
        }
        else {
            if (o1[key] != o2[key])
                return false;
        }
    }
    return true;
};
