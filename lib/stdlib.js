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
