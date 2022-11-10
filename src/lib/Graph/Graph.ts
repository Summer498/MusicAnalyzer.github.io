import { Math } from "../Math/Math.js";

//TODO: 未実装
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class Tree {
    private _left: Tree | undefined;  // eslint-disable-line no-use-before-define
    private _right: Tree | undefined;  // eslint-disable-line no-use-before-define
    public readonly value: number;
    constructor(value: number) {
        this.value = value;
    }
    set left(node: Tree) { this._left = node; }
    set right(node: Tree) { this._right = node; }
}

//TODO: 未実装
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
class Heap {
    private _parent: Heap | undefined;  // eslint-disable-line no-use-before-define
    private _left: Heap | undefined;  // eslint-disable-line no-use-before-define
    private _right: Heap | undefined;  // eslint-disable-line no-use-before-define
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
    swapTo(dst: Heap) {    // eslint-disable-line @typescript-eslint/no-unused-vars
        //TODO:
    }
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
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    cost(u: Node, v: Node): number {
        const result = 0;
        if (result < 0) { throw new RangeError("cost must be nonnegative number"); }
        return result;
    }
}

//TODO: 未実装
class PriorityQueue {
    get is_empty(): boolean { return true; }
    add_with_priority(v: Node, priority: number): void { // eslint-disable-line @typescript-eslint/no-unused-vars
        //TODO:
    }
    decrease_priority(v: Node, priority: number): void { // eslint-disable-line @typescript-eslint/no-unused-vars

    }
    extract_min(): Node | undefined { return Node.TORIAEZU; }
}

//TODO: 未実装
/* dijkstra 法 */
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
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



class MaxCalculableArray<T> extends Array<T> {
    #arg_min = this[0];
    #arg_max = this[0];
    #val_min = Infinity;
    #val_max = -Infinity;
    #memo_func_min: ((i: T) => number) | undefined;
    #memo_func_max: ((i: T) => number) | undefined;

    constructor(...items: T[]) {
        super(items.length);
        items.forEach((_, i) => { this[i] = items[i]; });
    }
    private renewMin(f: (i: T) => number) {
        this.#arg_min = this[0];
        this.#val_min = f(this.#arg_min);
        for (const i of this) {
            const val = f(i);
            if (this.#val_min < val) { continue; }
            this.#arg_min = i;
            this.#val_min = val;
        }
    }
    private renewMax(f: (i: T) => number) {
        this.#arg_max = this[0];
        this.#val_max = f(this.#arg_max);
        for (const i of this) {
            const val = f(i);
            if (val < this.#val_max) { continue; }
            this.#arg_max = i;
            this.#val_max = val;
        }
    }
    min(f: (i: T) => number) {
        if (this.#memo_func_min !== f) { this.renewMin(f); this.#memo_func_min = f; }
        return this.#val_min;
    }
    max(f: (i: T) => number) {
        if (this.#memo_func_max !== f) { this.renewMax(f); this.#memo_func_max = f; }
        return this.#val_max;
    }
    argMin(f: (i: T) => number) {
        if (this.#memo_func_min !== f) { this.renewMin(f); this.#memo_func_min = f; }
        return this.#arg_min;
    }
    argMax(f: (i: T) => number) {
        if (this.#memo_func_max !== f) { this.renewMax(f); this.#memo_func_max = f; }
        return this.#arg_max;
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
    getStatesOnTheTime: (time: number) => number[],
    transitionLogProbabilities: (prev_state: number, state: number) => number,
    emissionLogProbabilities: (state: number, observation: number) => number,
    observation_sequence: number[],
    will_find_min = false
) {
    const pi = initial_log_probabilities;
    const Y = observation_sequence;
    const S = pi.length;
    const T = Y.length;
    // TODO: T2 は可変長.
    // 最大長に合わせると大きすぎる. 1次元にできそうなので, 1次元にする
    const t1 = Math.getZeros(S);
    const T2 = Math.getZeros(T).map(_ => Math.getZeros(S));  // eslint-disable-line @typescript-eslint/no-unused-vars
    let states = new MaxCalculableArray(...getStatesOnTheTime(0));

    // initialize
    // TODO: s は state なので, t1 のサイズが大きくなってしまう. 
    // state を小さくするか, 小さい s が得られるようにするか.
    // -> array が内部で未登録の値はキーすら持たないようにしていれば心配無用になる.
    // -> -> それなら Object を使っているのと同じではないか?
    states.forEach(s => { t1[s] = (pi[s] || 0) + emissionLogProbabilities(s, Y[0]); });  // pi[s] が undefined の場合, 0 にする.
    states.forEach(s => { T2[0][s] = 0; });
    // 帰納
    Math.getRange(1, T).forEach(t => {
        const p_states = states;
        states = new MaxCalculableArray(...getStatesOnTheTime(t));  // TODO: ここで 空配列が帰ってくる

        const p_t1 = [...t1];
        states.forEach(i => {
            // TODO: 同じ値が minimum として現れる.
            // 両方を保持しておくと最悪計算量は O(2^T)?
            // 同じ値が現れることそのものがバグかもしれない??? (可能性薄)
            // C-dur と A-mor の区別ができないので, 同じ値の minimum はあり得る
            const f = (k: number) => p_t1[k] + transitionLogProbabilities(k, i);
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
export const logViterbi = (
    initial_log_probabilities: number[],
    transition_log_probabilities: number[][],
    emission_log_probabilities: number[][],
    observation_sequence: number[],
) => {
    const states = new MaxCalculableArray(...Math.getRange(0, initial_log_probabilities.length));
    return dynamicLogViterbi(
        initial_log_probabilities,
        () => states,
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
