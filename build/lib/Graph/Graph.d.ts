export declare class MaxCalculableArray<T> extends Array<T> {
    arg_max: T;
    val_max: number;
    memo_func: ((i: T) => number) | undefined;
    private renewMax;
    max(f: (i: T) => number): number;
    argMax(f: (i: T) => number): T;
}
/**
 * @brief dynamic changeable viterbi algorithm
 * @param initial_log_probabilities
 * @param transitionLogProbabilities can change dynamically but independent to any past transition
 * @param emissionLogProbabilities can change dynamically but independent to any past transition
 * @param observation_sequence
 * @returns Probability of the most likely transition trace and the trace
 */
export declare function dynamicLogViterbi(initial_log_probabilities: number[], getStatesOnTheTime: (time: number) => MaxCalculableArray<number>, transitionLogProbabilities: (prev_state: number, state: number) => number, emissionLogProbabilities: (state: number, observation: number) => number, observation_sequence: number[]): {
    log_probability: number;
    trace: number[];
};
/**
 * @brief viterbi algorithm
 * @param initial_log_probabilities
 * @param transition_log_probabilities
 * @param emission_log_probabilities
 * @param observation_sequence
 * @returns Probability of the most likely transition trace and the trace
 */
export declare const logViterbi: (initial_log_probabilities: number[], transition_log_probabilities: number[][], emission_log_probabilities: number[][], observation_sequence: number[]) => {
    log_probability: number;
    trace: number[];
};
export declare const viterbi: (initial_probabilities: number[], transition_probabilities: number[][], emission_probabilities: number[][], observation_sequence: number[]) => {
    probability: number;
    trace: number[];
};
