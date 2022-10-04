import { Math } from "../Math/Math.js";

//TODO: 未実装
class Tree {
    private _left: Tree | undefined;
    private _right: Tree | undefined;
    public readonly value: number;
    constructor(value: number) {
        this.value = value;
    }
    set left(node: Tree) { this._left = node; }
    set right(node: Tree) { this._right = node; }
}

//TODO: 未実装
class Heap {
    private _parent: Heap | undefined;
    private _left: Heap | undefined;
    private _right: Heap | undefined;
    readonly value: number;
    private _priorityFunction: (a: number, b: number) => boolean;
    constructor(value: number, priorityFunction: (a: number, b: number) => boolean = (a, b) => a < b) {
        this.value = value;
        this._priorityFunction = priorityFunction;
    }
    private appendMostLeft(value: number): Heap {
        if (this._left == undefined) {
            this._left = new Heap(value, this._priorityFunction);
            this._left._parent = this;
            return this._left;
        }
        return this._left.appendMostLeft(value);
    }
    swapTo(dst: Heap) { }
    append(value: number): Heap {
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

//TODO: 未実装
type NodeId = number | string | symbol
class Node {
    private _id: NodeId;
    constructor() {
        this._id = 0;
    }
    get id(): NodeId { return this._id; }
    get neighbors(): Node[] { return [Node.TORIAEZU]; }
    static get TORIAEZU(): Node { return new Node(); }
}

//TODO: 未実装
class Graph<T> {
    vertices: T[];
    constructor() {
        this.vertices = [];
    }
    cost(u: Node, v: Node): number {
        const result = 0;
        if (result < 0) { throw new RangeError("cost must be nonnegative number"); }
        return result;
    }
}

//TODO: 未実装
class PriorityQueue {
    get is_empty(): boolean { return true; }
    add_with_priority(v: Node, priority: number): void { }
    decrease_priority(v: Node, priority: number): void { }
    extract_min(): Node | undefined { return Node.TORIAEZU; }
}

//TODO: 未実装
/* dijkstra 法 */
function dijkstra(graph: Graph<Node>, source: Node): [{ [key: NodeId]: number }, { [key: NodeId]: Node }] {
    // Initialization
    const Q: PriorityQueue = new PriorityQueue();                     // create vertex priority queue
    const prev: { [key: NodeId]: Node } = {}; // Predecessor of v
    const dist: { [key: NodeId]: number } = {};
    graph.vertices.forEach(v => {
        if (v === source) { dist[v.id] = 0; }
        else { dist[v.id] = Infinity; }
    });
    graph.vertices.forEach(v => Q.add_with_priority(v, dist[v.id]));  // priority: dist[v]

    /** @type {PriorityQueue} */
    for (let min: Node | undefined; (min = Q.extract_min()) != undefined;) {  // Remove and return best vertex
        const u = min;
        u.neighbors.forEach(v => {          // only v that are still in Q
            const alt = dist[u.id] + graph.cost(u, v);  // cost from start to node v
            if (dist[u.id] == Infinity) { return; }
            if (alt >= dist[v.id]) { return; }
            dist[v.id] = alt;
            prev[v.id] = u;
            Q.decrease_priority(v, alt);
        });
    }
    return [dist, prev];
}



export class MaxCalculableArray<T> extends Array<T> {
    arg_max = this[0];
    val_max = -Infinity;
    memo_func: ((i: T) => number) | undefined;


    private renewMax(f: (i: T) => number) {
        this.arg_max = this[0];
        this.val_max = f(this.arg_max);
        for (const i of this) {
            const val = f(i);
            if (val < this.val_max) { continue; }
            this.arg_max = i;
            this.val_max = val;
        }
    }
    max(f: (i: T) => number) {
        if (this.memo_func !== f) { this.renewMax(f); this.memo_func = f; }
        return this.val_max;
    }
    argMax(f: (i: T) => number) {
        if (this.memo_func !== f) { this.renewMax(f); this.memo_func = f; }
        return this.arg_max;
    }
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
export function dynamicLogViterbi(
    initial_log_probabilities: number[],
    getStatesOnTheTime: (time: number) => MaxCalculableArray<number>,
    transitionLogProbabilities: (prev_state: number, state: number) => number,
    emissionLogProbabilities: (state: number, observation: number) => number,
    observation_sequence: number[],
) {
    const pi = initial_log_probabilities;
    const Y = observation_sequence;
    const S = pi.length;
    const T = Y.length;
    // TODO: T1T2 は可変長.
    // 最大長に合わせると大きすぎる. 1次元にできそうなので, 1次元にする
    const T1 = Math.getZeros(T).map(_ => Math.getZeros(S));  // eslint-disable-line @typescript-eslint/no-unused-vars
    const T2 = Math.getZeros(T).map(_ => Math.getZeros(S));  // eslint-disable-line @typescript-eslint/no-unused-vars
    let states = getStatesOnTheTime(0);
    let p_states = states;

    // initialize
    states.forEach(s => { T1[0][s] = pi[s] + emissionLogProbabilities(Y[0], s); });
    states.forEach(s => { T2[0][s] = 0; });
    // 帰納
    Math.getRange(1, T).forEach(t => {
        p_states = states;
        states = getStatesOnTheTime(t);

        states.forEach(i => {
            const f = (k: number) => T1[t - 1][k] + transitionLogProbabilities(k, i);
            T1[t][i] = p_states.max(f) + emissionLogProbabilities(i, Y[t]);
            T2[t][i] = p_states.argMax(f);
        });
    });
    // 終了
    const state_trace = Math.getZeros(T);
    // trace back
    state_trace[T - 1] = states.argMax(k => T1[T - 1][k]);
    Math.getRange(T - 1, 0, -1).forEach(j => { state_trace[j - 1] = T2[j][state_trace[j]]; });
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
export const logViterbi = (
    initial_log_probabilities: number[],
    transition_log_probabilities: number[][],
    emission_log_probabilities: number[][],
    observation_sequence: number[],
) => {
    const states = new MaxCalculableArray(...Math.getRange(0, initial_log_probabilities.length));
    return dynamicLogViterbi(
        initial_log_probabilities,
        t => states,
        (prev_state: number, state: number) => transition_log_probabilities[prev_state][state],
        (state: number, observation: number,) => emission_log_probabilities[state][observation],
        observation_sequence
    );
};

export const viterbi = (
    initial_probabilities: number[],
    transition_probabilities: number[][],
    emission_probabilities: number[][],
    observation_sequence: number[],
) => {
    const log_viterbi = logViterbi(
        initial_probabilities.map(e => Math.log(e)),
        transition_probabilities.map(e => e.map(e => Math.log(e))),
        emission_probabilities.map(e => e.map(e => Math.log(e))),
        observation_sequence
    );
    return {
        probability: Math.exp(log_viterbi.log_probability),
        trace: log_viterbi.trace
    };
};
