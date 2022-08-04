export type recurrentArray<T> = T | recurrentArray<T>[]

export function Arraying<T>(e: recurrentArray<T>): T[] {
    const concat = function (arr: recurrentArray<T>[]): T[] {
        let res: T[] = []
        for (let e of arr) { res = res.concat(Arraying(e)) }
        return res
    }
    return (e instanceof Array) ? concat(e) : [e]
}

