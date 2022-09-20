// TODO: Math のすべての要素をもっときれいなコードで一括で する方法はないか?
// 継承するみたいに, Math が持っているすべての関数などを したい.
import { hasSameValue } from "../StdLib/stdlib.js";
//*
// all of Math
const clz32 = Math.clz32;
const imul = Math.imul;
const sign = Math.sign;
const log10 = Math.log10;
const log2 = Math.log2;
const log1p = Math.log1p;
const expm1 = Math.expm1;
const cosh = Math.cosh;
const sinh = Math.sinh;
const tanh = Math.tanh;
const acosh = Math.acosh;
const asinh = Math.asinh;
const atanh = Math.atanh;
const hypot = Math.hypot;
const trunc = Math.trunc;
const fround = Math.fround;
const cbrt = Math.cbrt;
const E = Math.E;
const LN10 = Math.LN10;
const LN2 = Math.LN2;
const LOG2E = Math.LOG2E;
const LOG10E = Math.LOG10E;
const PI = Math.PI;
const SQRT1_2 = Math.SQRT1_2;
const SQRT2 = Math.SQRT2;
const abs = Math.abs;
const acos = Math.acos;
const asin = Math.asin;
const atan = Math.atan;
const atan2 = Math.atan2;
const ceil = Math.ceil;
const cos = Math.cos;
const exp = Math.exp;
const floor = Math.floor;
const log = Math.log;
const max = Math.max;
const min = Math.min;
const pow = Math.pow;
const random = Math.random;
const round = Math.round;
const sin = Math.sin;
const sqrt = Math.sqrt;
const tan = Math.tan;
// End of "all of Math"
//*/
const not = (b) => !b;
const getRange = (begin, end, step = 1) => [...Array(Math.abs(end - begin))].map((_, i) => i * step + begin);
const getZeros = (length) => [...Array(length)].map(e => 0); // eslint-disable-line @typescript-eslint/no-unused-vars
const vFunc = (a, b, f) => {
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
const genArr = (n, f) => [...Array(n)].map((_, i) => f(i));
const matTrans = (matrix) => getRange(0, matrix[0].length).map(i => getRange(0, matrix.length).map(j => matrix[j][i]));
const forAll = (set, condition) => {
    for (const e of set) {
        if (condition(e) == false) {
            return false;
        }
    }
    return true;
};
const forSome = (set, condition) => {
    for (const e of set) {
        if (condition(e)) {
            return true;
        }
    }
    return false;
};
const isSubSet = (set, superset) => {
    return forAll(set, (e) => superset.includes(e));
};
const isSuperSet = (set, subset) => {
    return isSubSet(subset, set);
};
const sameArray = (arr1, arr2) => hasSameValue(arr1, arr2);
/** @brief avoid bug from negative value */
const mod = (n, m) => (Number(n) % m + m) % m;
const bool2number = (b) => b ? 1 : 0;
const removeFromArray = (array, rmv) => array.filter(e => not(rmv.includes(e)));
const ringShift = (array, b) => {
    const N = array.length;
    const bm = mod(b, N);
    return array.concat(array).slice(N - bm, 2 * N - bm);
};
const vAdd = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a + b);
const vSub = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a - b);
const vMul = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a * b);
const vDiv = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => a / b);
const vMod = (vector1, vector2) => vFunc(vector1, vector2, (a, b) => mod(a, b));
const vGet = (array, indexes) => indexes.map(e => array[e]);
const getOnehot = (positionOfOnes, n = 0) => [...Array(Math.max(Math.max(...positionOfOnes) + 1, n))].map((_, i) => bool2number(positionOfOnes.includes(i)));
const getOnehotInMod = (positionOfOnes, m = 1) => {
    if (typeof positionOfOnes === "number") {
        return getOnehot(vMod([positionOfOnes], m), m);
    }
    return getOnehot(vMod(positionOfOnes, m), m);
};
const vSum = (...arrays) => {
    let s = getZeros(arrays[0].length);
    arrays.forEach(arr => { s = vAdd(s, arr); });
    return s;
};
const totalSum = (array) => {
    let s = 0;
    array.forEach(e => s += e);
    return s;
};
const totalProd = (array) => {
    let s = 0;
    array.forEach(e => s *= e);
    return s;
};
const CMath = {
    not,
    getRange,
    getZeros,
    vFunc,
    genArr,
    matTrans,
    forAll,
    forSome,
    isSubSet,
    isSuperSet,
    sameArray,
    mod,
    bool2number,
    removeFromArray,
    ringShift,
    vAdd,
    vSub,
    vMul,
    vDiv,
    vMod,
    vGet,
    getOnehot,
    getOnehotInMod,
    vSum,
    totalSum,
    totalProd,
    clz32: Math.clz32,
    imul: Math.imul,
    sign: Math.sign,
    log10: Math.log10,
    log2: Math.log2,
    log1p: Math.log1p,
    expm1: Math.expm1,
    cosh: Math.cosh,
    sinh: Math.sinh,
    tanh: Math.tanh,
    acosh: Math.acosh,
    asinh: Math.asinh,
    atanh: Math.atanh,
    hypot: Math.hypot,
    trunc: Math.trunc,
    fround: Math.fround,
    cbrt: Math.cbrt,
    E: Math.E,
    LN10: Math.LN10,
    LN2: Math.LN2,
    LOG2E: Math.LOG2E,
    LOG10E: Math.LOG10E,
    PI: Math.PI,
    SQRT1_2: Math.SQRT1_2,
    SQRT2: Math.SQRT2,
    abs: Math.abs,
    acos: Math.acos,
    asin: Math.asin,
    atan: Math.atan,
    atan2: Math.atan2,
    ceil: Math.ceil,
    cos: Math.cos,
    exp: Math.exp,
    floor: Math.floor,
    log: Math.log,
    max: Math.max,
    min: Math.min,
    pow: Math.pow,
    random: Math.random,
    round: Math.round,
    sin: Math.sin,
    sqrt: Math.sqrt,
    tan: Math.tan,
    [Symbol.toStringTag]: "Math"
};
export { CMath as Math };
//# sourceMappingURL=Math.js.map