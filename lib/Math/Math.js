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
export const not = (b) => !b;
export const getRange = (begin, end, step = 1) => [...Array(Math.abs(end - begin))].map((_, i) => i * step + begin);
export const getZeros = (length) => [...Array(length)].map(e => 0); // eslint-disable-line @typescript-eslint/no-unused-vars
export const vFunc = (a, b, f) => {
    if (typeof b == "number") {
        return a.map(e => f(e, Number(b)));
    }
    if (b instanceof Array) {
        return a.map((_, i) => f(a[i], b[i]));
    }
    throw TypeError("arguments of vFunc must be (a:number[], b:number, f:(a:number,b:number)=>number");
};
/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
export const genArr = (n, f) => [...Array(n)].map((_, i) => f(i));
export const matTrans = (matrix) => getRange(0, matrix[0].length).map(i => getRange(0, matrix.length).map(j => matrix[j][i]));
export const forAll = (set, condition) => {
    for (const e of set) {
        if (condition(e) == false) {
            return false;
        }
    }
    return true;
};
export const forSome = (set, condition) => {
    for (const e of set) {
        if (condition(e)) {
            return true;
        }
    }
    return false;
};
export const isSubSet = (set, superset) => {
    return forAll(set, (e) => superset.includes(e));
};
export const isSuperSet = (set, subset) => {
    return isSubSet(subset, set);
};
export const sameArray = (arr1, arr2) => hasSameValue(arr1, arr2);
/** @brief avoid bug from negative value */
export const mod = (n, m) => (Number(n) % m + m) % m;
export const bool2number = (b) => b ? 1 : 0;
export const removeFromArray = (array, rmv) => array.filter(e => not(rmv.includes(e)));
export const ringShift = (array, b) => {
    const N = array.length;
    const bm = mod(b, N);
    return array.concat(array).slice(N - bm, 2 * N - bm);
};
export const sum = (numbers) => {
    let s = 0;
    for (const e of numbers) {
        s += e;
    }
    return s;
};
export const v_add = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a + b);
export const v_sub = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a - b);
export const v_mul = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a * b);
export const v_div = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a / b);
export const v_mod = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => mod(a, b));
export const v_get = (array, indexes) => indexes.map(e => array[e]);
export const getOnehot = (positionOfOnes, n = 0) => [...Array(Math.max(Math.max(...positionOfOnes) + 1, n))].map((_, i) => bool2number(positionOfOnes.includes(i)));
export const getOnehotInMod = (positionOfOnes, m = 1) => {
    if (typeof positionOfOnes === "number") {
        return getOnehot(v_mod([positionOfOnes], m), m);
    }
    return getOnehot(v_mod(positionOfOnes, m), m);
};
export const v_sum = (...arrays) => {
    let s = getZeros(arrays[0].length);
    arrays.forEach(arr => { s = v_add(s, arr); });
    return s;
};
//# sourceMappingURL=Math.js.map