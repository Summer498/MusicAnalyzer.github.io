export const max = Math.max
// TODO: Math のすべての要素を一括で export する方法はないか?
    // 継承するみたいに, Math が持っているすべての関数などを export したい.

export const not = b => !b;
export const Range = (b, n, s = 1) => [...Array(n)].map((_, i) => i * s + b);
export const Zeros = n => [...Array(n)].map(e => 0);
export const vFunc = (a, b, f) => {
    console.assert(a.isTheType(Array));
    if (b.isTheType(Number)) { return a.map(e => f(e, b)); }
    if (b.isTheType(Array)) {
        console.assert(a.length == b.length);
        return a.map((_, i) => f(a[i], b[i]));
    }
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
