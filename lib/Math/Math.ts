
// TODO: Math のすべての要素をもっときれいなコードで一括で export する方法はないか?
// 継承するみたいに, Math が持っているすべての関数などを export したい.

import { hasSameValue } from "../StdLib/stdlib.js";

// export all of Math
export const clz32 = Math.clz32;
export const imul = Math.imul;
export const sign = Math.sign;
export const log10 = Math.log10;
export const log2 = Math.log2;
export const log1p = Math.log1p;
export const expm1 = Math.expm1;
export const cosh = Math.cosh;
export const sinh = Math.sinh;
export const tanh = Math.tanh;
export const acosh = Math.acosh;
export const asinh = Math.asinh;
export const atanh = Math.atanh;
export const hypot = Math.hypot;
export const trunc = Math.trunc;
export const fround = Math.fround;
export const cbrt = Math.cbrt;

export const E = Math.E;
export const LN10 = Math.LN10;
export const LN2 = Math.LN2;
export const LOG2E = Math.LOG2E;
export const LOG10E = Math.LOG10E;
export const PI = Math.PI;
export const SQRT1_2 = Math.SQRT1_2;
export const SQRT2 = Math.SQRT2;
export const abs = Math.abs;
export const acos = Math.acos;
export const asin = Math.asin;
export const atan = Math.atan;
export const atan2 = Math.atan2;
export const ceil = Math.ceil;
export const cos = Math.cos;
export const exp = Math.exp;
export const floor = Math.floor;
export const log = Math.log;
export const max = Math.max;
export const min = Math.min;
export const pow = Math.pow;
export const random = Math.random;
export const round = Math.round;
export const sin = Math.sin;
export const sqrt = Math.sqrt;
export const tan = Math.tan;
// End of "export all of Math"

export const not = (b: boolean): boolean => !b;
export const Range = (begin: number, end: number, step = 1): number[] => [...Array(Math.abs(end - begin))].map((_, i) => i * step + begin);
export const Zeros = (length: number): number[] => [...Array(length)].map(e => 0);  // eslint-disable-line @typescript-eslint/no-unused-vars
export const vFunc = (a: number[], b: number | number[], f: (a: number, b: number) => number) => {
    if (typeof b == "number") { return a.map(e => f(e, Number(b))); }
    if (b instanceof Array) { return a.map((_, i) => f(a[i], b[i])); }
    throw TypeError("arguments of vFunc must be (a:number[], b:number, f:(a:number,b:number)=>number");
};
export const v_sum = (...arrs: number[][]) => {
    let s: number[] = Zeros(arrs[0].length);
    arrs.forEach(arr => { s = s.v_add(arr); });
    return s;
};

/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
export const genArr = (n: number, f: (i: number) => number) => [...Array(n)].map((_, i) => f(i));
declare global {
    interface Number {
        /** @deprecated */
        mod: (m: number) => number
    }
    interface Boolean {
        /** @deprecated */
        toNumber: () => number
    }
    interface Array<T> {
        /** @deprecated */
        onehot: (n: number) => number[]
        /** @deprecated */
        onehotInMod: (n: number) => number[]
        /** @deprecated */
        remove: (rmv: number[]) => T[]
        /** @deprecated */
        ringShift: (b: number) => T[]
        /** @deprecated */
        change: (i: number, v: T) => T[]
        /** @deprecated */
        v_add: (b: number | number[]) => number[]
        /** @deprecated */
        v_sub: (b: number | number[]) => number[]
        /** @deprecated */
        v_mult: (b: number | number[]) => number[]
        /** @deprecated */
        v_div: (b: number | number[]) => number[]
        /** @deprecated */
        v_mod: (b: number | number[]) => number[]
        /** @deprecated */
        v_get: (b: number[]) => T[]
    }
}

export const matTrans = (matrix: number[][]) => Range(0, matrix[0].length).map(i => Range(0, matrix.length).map(j => matrix[j][i]));
export const forAll = <T>(set: T[], condition: (element: T) => boolean) => {
    for (const e of set) { if (condition(e) == false) { return false; } }
    return true;
};
export const forSome = <T>(set: T[], condition: (element: T) => boolean) => {
    for (const e of set) { if (condition(e)) { return true; } }
    return false;
};

export const sameArray = <T>(arr1: T[], arr2: T[]) => hasSameValue(arr1, arr2);

/** @brief avoid bug from negative value */
export const mod = (n: number, m: number): number => (Number(n) % m + m) % m;
/** @deprecated */
Number.prototype.mod = function (m: number): number { return mod(Number(this), m); };
export const bool2number = (b: boolean) => b ? 1 : 0;
/** @deprecated */
Boolean.prototype.toNumber = function (): number { return bool2number(Boolean(this)); };
export const onehot = (array: number[], n = 0) => [...Array(Math.max(Math.max(...array) + 1, n))].map((_, i) => array.includes(i).toNumber());
/** @deprecated */
Array.prototype.onehot = function (n = 0) { return onehot(this, n); };
export const onehotInMod = (array: number[], m = 1) => array.v_mod(m).onehot(m);
/** @deprecated */
Array.prototype.onehotInMod = function (m = 1) { return this.v_mod(m).onehot(m); };
export const removeFromArray = (array: unknown[], rmv: unknown[]) => array.filter(e => not(rmv.includes(e)));
/** @deprecated */
Array.prototype.remove = function (rmv) { return removeFromArray(this, rmv); };

export const ringShift = (array: unknown[], b: number) => {
    const l = array.length; const bm = b.mod(l);
    return array.concat(this).slice(l - bm, 2 * l - bm);
};
/** @deprecated */
Array.prototype.ringShift = function (b) { return ringShift(this, b); };

/** @deprecated this method is only do:  this[i] = v*/
Array.prototype.change = function (i, v) { this[i] = v; return this; };

export const v_add = (vector1: number[], vector2: number | number[]) => vFunc(vector1, vector2, (a, b) => a + b);
/** @deprecated */
Array.prototype.v_add = function (b) { return v_add(this, b); };

export const v_sub = (vector1: number[], vector2: number | number[]) => vFunc(vector1, vector2, (a, b) => a - b);
/** @deprecated */
Array.prototype.v_sub = function (b) { return v_sub(this, b); };

export const v_mult = (vector1: number[], vector2: number | number[]) => vFunc(vector1, vector2, (a, b) => a * b);
/** @deprecated */
Array.prototype.v_mult = function (b) { return v_mult(this, b); };

export const v_div = (vector1: number[], vector2: number | number[]) => vFunc(vector1, vector2, (a, b) => a / b);
/** @deprecated */
Array.prototype.v_div = function (b) { return v_div(this, b); };

export const v_mod = (vector1: number[], vector2: number | number[]) => vFunc(vector1, vector2, (a, b) => a.mod(b));
/** @deprecated */
Array.prototype.v_mod = function (b) { return v_mod(this, b); };

export const v_get = (array: unknown[], indexes: number[]) => indexes.map(e => array[e]);
/** @deprecated */
Array.prototype.v_get = function (b) { return b.map(e => this[e]); };

//TODO: プロトタイプに直接メソッドを追加しないようにする
// class Vector とか作る