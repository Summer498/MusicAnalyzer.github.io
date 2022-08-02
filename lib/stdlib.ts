export function Arraying<T>(e: T | T[]): T[] { return (e instanceof Array) ? e : [e] }
