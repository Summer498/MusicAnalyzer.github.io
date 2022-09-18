export declare const clz32: (x: number) => number;
export declare const imul: (x: number, y: number) => number;
export declare const sign: (x: number) => number;
export declare const log10: (x: number) => number;
export declare const log2: (x: number) => number;
export declare const log1p: (x: number) => number;
export declare const expm1: (x: number) => number;
export declare const cosh: (x: number) => number;
export declare const sinh: (x: number) => number;
export declare const tanh: (x: number) => number;
export declare const acosh: (x: number) => number;
export declare const asinh: (x: number) => number;
export declare const atanh: (x: number) => number;
export declare const hypot: (...values: number[]) => number;
export declare const trunc: (x: number) => number;
export declare const fround: (x: number) => number;
export declare const cbrt: (x: number) => number;
export declare const E: number;
export declare const LN10: number;
export declare const LN2: number;
export declare const LOG2E: number;
export declare const LOG10E: number;
export declare const PI: number;
export declare const SQRT1_2: number;
export declare const SQRT2: number;
export declare const abs: (x: number) => number;
export declare const acos: (x: number) => number;
export declare const asin: (x: number) => number;
export declare const atan: (x: number) => number;
export declare const atan2: (y: number, x: number) => number;
export declare const ceil: (x: number) => number;
export declare const cos: (x: number) => number;
export declare const exp: (x: number) => number;
export declare const floor: (x: number) => number;
export declare const log: (x: number) => number;
export declare const max: (...values: number[]) => number;
export declare const min: (...values: number[]) => number;
export declare const pow: (x: number, y: number) => number;
export declare const random: () => number;
export declare const round: (x: number) => number;
export declare const sin: (x: number) => number;
export declare const sqrt: (x: number) => number;
export declare const tan: (x: number) => number;
export declare const not: (b: boolean) => boolean;
export declare const Range: (begin: number, end: number, step?: number) => number[];
export declare const Zeros: (length: number) => number[];
export declare const vFunc: (a: number[], b: number | number[], f: (a: number, b: number) => number) => number[];
/**
 * @brief generate array
 * @param n count of elements
 * @param f generate function like (i => i*2)
 * @return generated array
 * @detail Given n = 5, f = i=>10*i, genArr generates [0,10,20,30,40]
 */
export declare const genArr: (n: number, f: (i: number) => number) => number[];
export declare const matTrans: (matrix: number[][]) => number[][];
export declare const forAll: <T>(set: T[], condition: (element: T) => boolean) => boolean;
export declare const forSome: <T>(set: T[], condition: (element: T) => boolean) => boolean;
export declare const isSubSet: <T>(set: T[], superset: T[]) => boolean;
export declare const isSuperSet: <T>(set: T[], subset: T[]) => boolean;
export declare const sameArray: <T>(arr1: T[], arr2: T[]) => boolean;
/** @brief avoid bug from negative value */
export declare const mod: (n: number, m: number) => number;
export declare const bool2number: (b: boolean) => 1 | 0;
export declare const removeFromArray: <T>(array: T[], rmv: T[]) => T[];
export declare const ringShift: <T>(array: T[], b: number) => T[];
export declare const sum: (numbers: number[]) => number;
export declare const v_add: (vector1: number[], vector2: number | number[]) => number[];
export declare const v_sub: (vector1: number[], vector2: number | number[]) => number[];
export declare const v_mul: (vector1: number[], vector2: number | number[]) => number[];
export declare const v_div: (vector1: number[], vector2: number | number[]) => number[];
export declare const v_mod: (vector1: number[], vector2: number | number[]) => number[];
export declare const v_get: <T>(array: T[], indexes: number[]) => T[];
export declare const getOnehot: (positionOfOnes: number[], n?: number) => (1 | 0)[];
export declare const getOnehotInMod: (positionOfOnes: number[] | number, m?: number) => (1 | 0)[];
export declare const v_sum: (...arrays: number[][]) => number[];
