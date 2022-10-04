var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _MaxCalculableArray_arg_min, _MaxCalculableArray_arg_max, _MaxCalculableArray_val_min, _MaxCalculableArray_val_max, _MaxCalculableArray_memo_func_min, _MaxCalculableArray_memo_func_max;
import { Math } from "../Math/Math.js";
//TODO: 未実装
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class Tree {
    constructor(value) {
        this.value = value;
    }
    set left(node) { this._left = node; }
    set right(node) { this._right = node; }
}
//TODO: 未実装
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
    swapTo(dst) {
        //TODO:
    }
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
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
    add_with_priority(v, priority) {
        //TODO:
    }
    decrease_priority(v, priority) {
    }
    extract_min() { return Node.TORIAEZU; }
}
//TODO: 未実装
/* dijkstra 法 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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
export class MaxCalculableArray extends Array {
    constructor() {
        super(...arguments);
        _MaxCalculableArray_arg_min.set(this, this[0]);
        _MaxCalculableArray_arg_max.set(this, this[0]);
        _MaxCalculableArray_val_min.set(this, Infinity);
        _MaxCalculableArray_val_max.set(this, -Infinity);
        _MaxCalculableArray_memo_func_min.set(this, void 0);
        _MaxCalculableArray_memo_func_max.set(this, void 0);
    }
    renewMin(f) {
        __classPrivateFieldSet(this, _MaxCalculableArray_arg_min, this[0], "f");
        __classPrivateFieldSet(this, _MaxCalculableArray_val_min, f(__classPrivateFieldGet(this, _MaxCalculableArray_arg_min, "f")), "f");
        for (const i of this) {
            const val = f(i);
            if (__classPrivateFieldGet(this, _MaxCalculableArray_val_min, "f") < val) {
                continue;
            }
            __classPrivateFieldSet(this, _MaxCalculableArray_arg_min, i, "f");
            __classPrivateFieldSet(this, _MaxCalculableArray_val_min, val, "f");
        }
    }
    renewMax(f) {
        __classPrivateFieldSet(this, _MaxCalculableArray_arg_max, this[0], "f");
        __classPrivateFieldSet(this, _MaxCalculableArray_val_max, f(__classPrivateFieldGet(this, _MaxCalculableArray_arg_max, "f")), "f");
        for (const i of this) {
            const val = f(i);
            if (val < __classPrivateFieldGet(this, _MaxCalculableArray_val_max, "f")) {
                continue;
            }
            __classPrivateFieldSet(this, _MaxCalculableArray_arg_max, i, "f");
            __classPrivateFieldSet(this, _MaxCalculableArray_val_max, val, "f");
        }
    }
    min(f) {
        if (__classPrivateFieldGet(this, _MaxCalculableArray_memo_func_min, "f") !== f) {
            this.renewMin(f);
            __classPrivateFieldSet(this, _MaxCalculableArray_memo_func_min, f, "f");
        }
        return __classPrivateFieldGet(this, _MaxCalculableArray_val_min, "f");
    }
    max(f) {
        if (__classPrivateFieldGet(this, _MaxCalculableArray_memo_func_max, "f") !== f) {
            this.renewMax(f);
            __classPrivateFieldSet(this, _MaxCalculableArray_memo_func_max, f, "f");
        }
        return __classPrivateFieldGet(this, _MaxCalculableArray_val_max, "f");
    }
    argMin(f) {
        if (__classPrivateFieldGet(this, _MaxCalculableArray_memo_func_min, "f") !== f) {
            this.renewMin(f);
            __classPrivateFieldSet(this, _MaxCalculableArray_memo_func_min, f, "f");
        }
        return __classPrivateFieldGet(this, _MaxCalculableArray_arg_min, "f");
    }
    argMax(f) {
        if (__classPrivateFieldGet(this, _MaxCalculableArray_memo_func_max, "f") !== f) {
            this.renewMax(f);
            __classPrivateFieldSet(this, _MaxCalculableArray_memo_func_max, f, "f");
        }
        return __classPrivateFieldGet(this, _MaxCalculableArray_arg_max, "f");
    }
}
_MaxCalculableArray_arg_min = new WeakMap(), _MaxCalculableArray_arg_max = new WeakMap(), _MaxCalculableArray_val_min = new WeakMap(), _MaxCalculableArray_val_max = new WeakMap(), _MaxCalculableArray_memo_func_min = new WeakMap(), _MaxCalculableArray_memo_func_max = new WeakMap();
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
export function dynamicLogViterbi(initial_log_probabilities, getStatesOnTheTime, transitionLogProbabilities, emissionLogProbabilities, observation_sequence, will_find_min = false) {
    const pi = initial_log_probabilities;
    const Y = observation_sequence;
    const S = pi.length;
    const T = Y.length;
    // TODO: T1T2 は可変長.
    // 最大長に合わせると大きすぎる. 1次元にできそうなので, 1次元にする
    const t1 = Math.getZeros(S);
    const T2 = Math.getZeros(T).map(_ => Math.getZeros(S)); // eslint-disable-line @typescript-eslint/no-unused-vars
    let states = getStatesOnTheTime(0);
    // initialize
    states.forEach(s => { t1[s] = pi[s] + emissionLogProbabilities(Y[0], s); });
    states.forEach(s => { T2[0][s] = 0; });
    // 帰納
    Math.getRange(1, T).forEach(t => {
        const p_states = new MaxCalculableArray(...states); // TODO: Array constructor 起因バグを修正
        states = getStatesOnTheTime(t);
        const p_t1 = [...t1];
        states.forEach(i => {
            const f = (k) => p_t1[k] + transitionLogProbabilities(k, i);
            if (will_find_min) {
                t1[i] = p_states.min(f) + emissionLogProbabilities(i, Y[t]);
                T2[t][i] = p_states.argMin(f);
            }
            else {
                t1[i] = p_states.max(f) + emissionLogProbabilities(i, Y[t]);
                T2[t][i] = p_states.argMax(f);
            }
        });
    });
    // 終了
    const state_trace = Math.getZeros(T);
    // trace back
    if (will_find_min) {
        state_trace[T - 1] = states.argMin(k => t1[k]);
    }
    else {
        state_trace[T - 1] = states.argMax(k => t1[k]);
    }
    Math.getRange(T - 1, 0, -1).forEach(j => { state_trace[j - 1] = T2[j][state_trace[j]]; });
    return {
        log_probability: t1[state_trace[T - 1]],
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
export const logViterbi = (initial_log_probabilities, transition_log_probabilities, emission_log_probabilities, observation_sequence) => {
    const states = new MaxCalculableArray(...Math.getRange(0, initial_log_probabilities.length));
    return dynamicLogViterbi(initial_log_probabilities, () => states, (prev_state, state) => transition_log_probabilities[prev_state][state], (state, observation) => emission_log_probabilities[state][observation], observation_sequence);
};
export const viterbi = (initial_probabilities, transition_probabilities, emission_probabilities, observation_sequence) => {
    const log_viterbi = logViterbi(initial_probabilities.map(e => Math.log(e)), transition_probabilities.map(e => e.map(e => Math.log(e))), emission_probabilities.map(e => e.map(e => Math.log(e))), observation_sequence);
    return {
        probability: Math.exp(log_viterbi.log_probability),
        trace: log_viterbi.trace
    };
};
//# sourceMappingURL=Graph.js.map