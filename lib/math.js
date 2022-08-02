import { typeOf } from "./type.js";
export const max = Math.max;

// TODO: Math のすべての要素をもっときれいなコードで一括で export する方法はないか?
// 継承するみたいに, Math が持っているすべての関数などを export したい.
// export all of Math
//clz32(x: number): number; 
export const clz32 = Math.clz32;
//imul(x: number, y: number): number; 
export const imul = Math.imul;
//sign(x: number): number; 
export const sign = Math.sign;
//log10(x: number): number; 
export const log10 = Math.log10;
//log2(x: number): number; 
export const log2 = Math.log2;
//log1p(x: number): number; 
export const log1p = Math.log1p;
//expm1(x: number): number; 
export const expm1 = Math.expm1;
//cosh(x: number): number; 
export const cosh = Math.cosh;
//sinh(x: number): number; 
export const sinh = Math.sinh;
//tanh(x: number): number; 
export const tanh = Math.tanh;
//acosh(x: number): number; 
export const acosh = Math.acosh;
//asinh(x: number): number; 
export const asinh = Math.asinh;
//atanh(x: number): number; 
export const atanh = Math.atanh;
//hypot(...values: number[]): number; 
export const hypot = Math.hypot;
//trunc(x: number): number; 
export const trunc = Math.trunc;
//fround(x: number): number; 
export const fround = Math.fround;
//cbrt(x: number): number; 
export const cbrt = Math.cbrt;
// End of "export all of Math"

export const not = b => !b;
export const Range = (b, n, s = 1) => [...Array(n)].map((_, i) => i * s + b);
export const Zeros = n => [...Array(n)].map(e => 0);
export const vFunc = (a, b, f) => {
    const is_n = typeOf(b) == typeOf(Number());
    const is_a = (typeOf(b) == typeOf(Array())) && (a.length == b.length);
    console.assert(is_n || is_a);
    if (is_n) { return a.map(e => f(e, b)); }
    if (is_a) { return a.map((_, i) => f(a[i], b[i])); }
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
Number.prototype.mod = function (m) { return (this % m + m) % m; };
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
