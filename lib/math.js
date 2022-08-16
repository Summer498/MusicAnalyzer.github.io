// TODO: Math のすべての要素をもっときれいなコードで一括で export する方法はないか?
// 継承するみたいに, Math が持っているすべての関数などを export したい.
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
export const Range = (begin, end, step = 1) => [...Array(end - begin)].map((_, i) => i * step + begin);
export const Zeros = (length) => [...Array(length)].map(e => 0);
export const vFunc = (a, b, f) => {
    if ("number" == typeof b) {
        return a.map(e => f(e, Number(b)));
    }
    if (b instanceof Array) {
        return a.map((_, i) => f(a[i], b[i]));
    }
    throw TypeError("arguments of vFunc must be (a:number[], b:number, f:(a:number,b:number)=>number");
};
export const v_sum = (...arrs) => {
    let s = Zeros(arrs[0].length);
    arrs.forEach(arr => s = s.v_add(arr));
    return s;
};
/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
export const genArr = (n, f) => [...Array(n)].map((_, i) => f(i));
Number.prototype.mod = function (m) { return (Number(this) % m + m) % m; };
Boolean.prototype.toNumber = function () { return this ? 1 : 0; };
Array.prototype.onehot = function (n = 0) { return [...Array(Math.max(Math.max(...this) + 1, n))].map((_, i) => this.includes(i).toNumber()); };
Array.prototype.onehotInMod = function (m = 1) { return this.v_mod(m).onehot(m); };
Array.prototype.remove = function (rmv) { return this.filter(e => not(rmv.includes(e))); };
Array.prototype.ringShift = function (b) {
    const l = this.length, bm = b.mod(l);
    return this.concat(this).slice(l - bm, 2 * l - bm);
};
Array.prototype.change = function (i, v) { return this[i] = v, this; };
Array.prototype.v_add = function (b) { return vFunc(this, b, (a, b) => a + b); };
Array.prototype.v_sub = function (b) { return vFunc(this, b, (a, b) => a - b); };
Array.prototype.v_mult = function (b) { return vFunc(this, b, (a, b) => a * b); };
Array.prototype.v_div = function (b) { return vFunc(this, b, (a, b) => a / b); };
Array.prototype.v_mod = function (b) { return vFunc(this, b, (a, b) => a.mod(b)); };
Array.prototype.v_get = function (b) { return b.map(e => this[e]); };
//TODO: プロトタイプに直接メソッドを追加しないようにする
// class Vector とか作る
