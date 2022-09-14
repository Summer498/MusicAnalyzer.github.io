import { forSome, matTrans, Range, Zeros } from "../Math/Math.js";
//TODO: 未実装
class Tree {
    constructor(value) {
        this.value = value;
    }
    set left(node) { this._left = node; }
    set right(node) { this._right = node; }
}
//TODO: 未実装
class Heap {
    constructor(value, priorityFunction = (a, b) => a < b) {
        this.value = value;
        this._priorityFunction = priorityFunction;
    }
    appendMostLeft(value) {
        if (this._left == undefined) {
            this._left = new Heap(value, this._priorityFunction);
            this._left._parent = this;
            return this._left;
        }
        return this._left.appendMostLeft(value);
    }
    swapTo(dst) { }
    append(value) {
        if (this._left == undefined) {
            this._left = new Heap(value);
            while (this._parent !== undefined && !this._priorityFunction(this._parent.value, this.value)) {
                this.swapTo(this._parent);
            }
        }
        const left = this._left;
        const result = left.append(value);
        return result;
    }
}
class Node {
    constructor() {
        this._id = 0;
    }
    get id() { return this._id; }
    get neighbors() { return [Node.TORIAEZU]; }
    static get TORIAEZU() { return new Node(); }
}
//TODO: 未実装
class Graph {
    constructor() {
        this.vertices = [];
    }
    cost(u, v) {
        const result = 0;
        if (result < 0) {
            throw new RangeError("cost must be nonnegative number");
        }
        return result;
    }
}
//TODO: 未実装
class PriorityQueue {
    get is_empty() { return true; }
    add_with_priority(v, priority) { }
    decrease_priority(v, priority) { }
    extract_min() { return Node.TORIAEZU; }
}
//TODO: 未実装
/* dijkstra 法 */
function dijkstra(graph, source) {
    // Initialization
    const Q = new PriorityQueue(); // create vertex priority queue
    const prev = {}; // Predecessor of v
    const dist = {};
    graph.vertices.forEach(v => {
        if (v === source) {
            dist[v.id] = 0;
        }
        else {
            dist[v.id] = Infinity;
        }
    });
    graph.vertices.forEach(v => Q.add_with_priority(v, dist[v.id])); // priority: dist[v]
    /** @type {PriorityQueue} */
    for (let min; (min = Q.extract_min()) != undefined;) { // Remove and return best vertex
        const u = min;
        u.neighbors.forEach(v => {
            const alt = dist[u.id] + graph.cost(u, v); // cost from start to node v
            if (dist[u.id] == Infinity) {
                return;
            }
            if (alt >= dist[v.id]) {
                return;
            }
            dist[v.id] = alt;
            prev[v.id] = u;
            Q.decrease_priority(v, alt);
        });
    }
    return [dist, prev];
}
class MaxCalculableArray {
    constructor(arr) {
        this.arg_max = 0;
        this.val_max = -Infinity;
        this.arr = arr;
    }
    renewMax(f) {
        this.arg_max = this.arr[0];
        this.val_max = f(this.arg_max);
        for (const i of this.arr) {
            const val = f(i);
            if (val < this.val_max) {
                continue;
            }
            this.arg_max = i;
            this.val_max = val;
        }
    }
    get length() { return this.arr.length; }
    max(f) {
        if (this.memo_func !== f) {
            this.renewMax(f);
            this.memo_func = f;
        }
        return this.val_max;
    }
    argMax(f) {
        if (this.memo_func !== f) {
            this.renewMax(f);
            this.memo_func = f;
        }
        return this.arg_max;
    }
    forEach(callbackfn, 
    // eslint-disable-next-line
    thisArg) { return this.arr.forEach(callbackfn, thisArg); }
    *[Symbol.iterator]() { for (const e of this.arr) {
        yield e;
    } }
}
/*  c.f. Viterbi algorithm - Wikipedia
 *  https://en.wikipedia.org/wiki/Viterbi_algorithm#Pseudocode
 */
/**
 * @brief dynamic changeable viterbi algorithm
 * @param initial_log_probabilities
 * @param transitionLogProbabilities can change dynamically but independent to any past transition
 * @param emissionLogProbabilities can change dynamically but independent to any past transition
 * @param observation_sequence
 * @returns Probability of the most likely transition trace and the trace
 */
export function dynamicLogViterbi(initial_log_probabilities, transitionLogProbabilities, emissionLogProbabilities, observation_sequence) {
    const pi = initial_log_probabilities;
    const Y = observation_sequence;
    const S = pi.length;
    const T = Y.length;
    const T1 = Zeros(T).map(_ => Zeros(S)); // eslint-disable-line @typescript-eslint/no-unused-vars
    const T2 = Zeros(T).map(_ => Zeros(S)); // eslint-disable-line @typescript-eslint/no-unused-vars
    const states = new MaxCalculableArray(Range(0, S));
    let memo_AT = [[0]];
    const memo_BT = [[0]];
    let memo_A = [[0]];
    let memo_B = [[0]];
    const getA = (t) => {
        const AT = transitionLogProbabilities(Y[t - 1], Y[t], pi); // transitionLogProbabilities が定関数の場合は, 行列が参照渡しされて O(1)
        if (AT != memo_AT) {
            memo_AT = AT;
            const A = matTrans(AT);
            if (S !== A.length || forSome(A, e => S !== e.length)) {
                throw new RangeError("log_transition_probabilities must be " + S + " X " + S + "matrix. (same as state space size X state space size)");
            }
            memo_A = A;
        }
        return memo_A;
    };
    const getB = (t) => {
        const BT = emissionLogProbabilities(Y[t], pi); // emissionLogProbabilities が定関数の場合は, 行列が参照渡しされて O(1)
        if (BT != memo_BT) {
            const B = matTrans(BT);
            if (T !== B.length || forSome(B, e => S !== e.length)) {
                throw new RangeError("log_emission_probabilities must be " + S + " x " + T + "matrix. (same as state space size X observation sequence length size)");
            }
            memo_B = B;
        }
        return memo_B;
    };
    // initialize
    // 配列に順番にアクセスできるように転置しておく
    const B = getB(0);
    states.forEach(s => { T1[0][s] = pi[s] + B[Y[0]][s]; });
    states.forEach(s => { T2[0][s] = 0; });
    // 帰納
    Range(1, T).forEach(t => {
        const A = getA(t);
        const B = getB(t);
        states.forEach(s => {
            const f = (k) => T1[t - 1][k] + A[s][k];
            T1[t][s] = states.max(f) + B[Y[t]][s];
            T2[t][s] = states.argMax(f);
        });
    });
    // 終了
    const state_trace = Zeros(T);
    // trace back
    state_trace[T - 1] = states.argMax((k) => T1[T - 1][k]);
    Range(T - 1, 0, -1).forEach(j => { state_trace[j - 1] = T2[j][state_trace[j]]; });
    return {
        log_probability: T1[T - 1][state_trace[T - 1]],
        trace: state_trace
    };
}
/**
 * @brief viterbi algorithm
 * @param initial_log_probabilities
 * @param transition_log_probabilities
 * @param emission_log_probabilities
 * @param observation_sequence
 * @returns Probability of the most likely transition trace and the trace
 */
export const logViterbi = (initial_log_probabilities, transition_log_probabilities, emission_log_probabilities, observation_sequence) => dynamicLogViterbi(initial_log_probabilities, () => transition_log_probabilities, () => emission_log_probabilities, observation_sequence);
export const viterbi = (initial_probabilities, transition_probabilities, emission_probabilities, observation_sequence) => {
    const log_viterbi = logViterbi(initial_probabilities.map(e => Math.log(e)), transition_probabilities.map(e => e.map(e => Math.log(e))), emission_probabilities.map(e => e.map(e => Math.log(e))), observation_sequence);
    return {
        probability: Math.exp(log_viterbi.log_probability),
        trace: log_viterbi.trace
    };
};
