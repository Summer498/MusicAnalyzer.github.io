/**
 * @brief dynamic changeable viterbi algorithm
 * @param initial_log_probabilities
 * @param transitionLogProbabilities can change dynamically but independent to any past transition
 * @param emissionLogProbabilities can change dynamically but independent to any past transition
 * @param observation_sequence
 * @returns Probability of the most likely transition trace and the trace
 */
export declare function dynamicLogViterbi(initial_log_probabilities: number[], transitionLogProbabilities: (prev_observation?: number, observation?: number, initial_log_probabilities?: number[]) => number[][], emissionLogProbabilities: (observation?: number, initial_log_probabilities?: number[]) => number[][], observation_sequence: number[]): {
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
