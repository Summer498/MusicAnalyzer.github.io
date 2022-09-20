import { hasSameValue } from "../StdLib/stdlib.js";
import { dynamicLogViterbi, logViterbi, viterbi } from "./Graph.js";
import { Math } from "../Math/Math.js";
/* Viterbi アルゴリズム */
const initial_probabilities = [0.6, 0.4];
const initial_log_probabilities = initial_probabilities.map(e => Math.log(e));
const transition_probabilities = [
    [0.7, 0.3],
    [0.4, 0.6],
];
const transition_log_probabilities = transition_probabilities.map(e => e.map(e => Math.log(e)));
const emission_probabilities = [
    [0.5, 0.4, 0.1],
    [0.1, 0.3, 0.6],
];
const emission_log_probabilities = emission_probabilities.map(e => e.map(e => Math.log(e)));
const observation_sequence = [0, 1, 2];
const dynamic_log_viterbi = dynamicLogViterbi(initial_log_probabilities, () => transition_log_probabilities, () => emission_log_probabilities, observation_sequence);
const log_viterbi = logViterbi(initial_log_probabilities, transition_log_probabilities, emission_log_probabilities, observation_sequence);
const viterbied = viterbi(initial_probabilities, transition_probabilities, emission_probabilities, observation_sequence);
if (!hasSameValue(dynamic_log_viterbi, log_viterbi)) {
    throw new Error("Both result of dynamicLogViterbi and logViterbi must be same value. ");
}
if (Math.exp(log_viterbi.log_probability) != viterbied.probability) {
    throw new Error("logViterbi(...).log_probability must be equal to Math.log(viterbi(...).probability) . ");
}
if (!Math.sameArray(log_viterbi.trace, viterbied.trace)) {
    throw new Error("logViterbi(...).trace and viterbi(...).trace must be same value");
}
//# sourceMappingURL=Graph.test.js.map