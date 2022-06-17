function sgn(x) {
    console.assert(isNaN(x)==false)
    return (x>0)-(x<0);
}

function abs(x) {
    console.assert(isNaN(x)==false)
    return (x<0)?-x:x;
}

function mod(x,m) {
    console.assert(isNaN(x)==false);
    console.assert(isNaN(m)==false);
    return ((x%m)+m)%m;
}

const major = [0,2,4,5,7,9,11]
const minor = [0,2,3,5,7,8,10]

function accidental_num(accidental_symbol){
    console.assert(typeof(accidental_symbol) == "string");
    const accidental_index = "b♮#".indexOf(accidental_symbol);
    console.assert(accidental_index >= 0);
    return accidental_index-1;
}

function chroma(note){
    console.assert(typeof(note) == "string");
    const len = note.length;
    console.assert( (1 <= len) && (len < 3));
    const char_num = "C1D3EF6G8A0B".indexOf(note[0]);
    console.assert(char_num >= 0);

    return (len != 2) ? char_num : mod(char_num + accidental_num(note[1]), 12);
}

function key_signature(key){
    console.assert(typeof(key) == "string" || isNaN(key)==false)
    const len = key.length
    console.assert( (1 <= len) && (len < 3) )
    if(isNaN(key)==false){ return mod(key*7 + 5, 12) - 5; }
    else{
        const capital_key = key[0].toUpperCase() + ((len >= 2) ? key[1] : "")  // 先頭を大文字に変換

        // minor なら 3 半音下げる
        const base = ("abcdefg".indexOf(key[0]) >= 0) ? -3 : 0;
        const accidental_cnt = mod((chroma(capital_key)) * 7 + base + 5, 12) - 5
        const input_accidental = (len == 2) ? accidental_num(key[1]) : 0;

        // 調号が 5 つより多い場合, 入力されたキーの調号に合わせて#,bを付ける. e.g.)#5 -> b7
        if(abs(accidental_cnt) >= 5){
            if(input_accidental != sgn(accidental_cnt)){ return accidental_cnt + input_accidental * 12; }
        }
        return accidental_cnt;
    }
}

function str_key_signature(key_signature){
    console.assert(isNaN(key_signature) == false)
    return "b♮#"[sgn(key_signature)+1] + String(abs(key_signature));
}

// ノートナンバーとキーからシンボルを得る
function note_symbol(note, key_signature=0){
    console.assert(isNaN(note) == false)
    console.assert(isNaN(key_signature) == false)
    const symbol = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"][mod(note,12)];

    if (key_signature < 0){
        const translate = {
            "C#": "Db",
            "D#": "Eb",
            "F#": "Gb",
            "G#": "Ab",
            "A#": "Bb"
        }
        if (symbol in translate){ return translate[symbol]; }
    }

    if (key_signature >= 6){
        if (symbol == "F"){ return "E#"; }
        if (symbol == "C"){ return "B#"; }
    }
    if (key_signature <= -6){
        if (symbol == "E"){ return "Fb"; }
        if (symbol == "B"){ return "Cb"; }
    }

    return symbol;
}

// シンボルから音程を取る
function interval(note_symbol0, note_symbol1){
    console.assert(typeof(note_symbol0) == "string")
    console.assert(typeof(note_symbol1) == "string")
    const deg = [
        "ABCDEFG".indexOf(note_symbol0[0]),
        "ABCDEFG".indexOf(note_symbol1[0])
    ]
    console.assert((deg[0]>=0) && (deg[1]>=0));

    const deg_diff = mod(deg[1] - deg[0],7);
    const acc_symbol = mod(chroma(note_symbol1) - chroma(note_symbol0) - [0,1,3,5,7,8,10][deg_diff] + 6,12) - 6;
//    console.log(note_symbol0,note_symbol1,chroma(note_symbol1))

    if ((deg_diff == 0) && (acc_symbol < 0)){ return [acc_symbol, 8]; }
    return [acc_symbol, deg_diff + 1];
}

function inv_interval(interval){
    console.assert(typeof(interval) == "object")
    console.assert(isNaN(interval[0]) == false);
    console.assert(isNaN(interval[1]) == false);
    if (interval[1] in [2,3,6,7]){ return [1-interval[0], 9-interval[1]] };
    return [-interval[0], 9-interval[1]];
}

function str_interval(interval){
    console.assert(isNaN(interval[0]) == false);
    // UF: Under Flow, OF: Over Flow
    const table = ([1,4,5,8].indexOf(interval[1])>=0) ? 
        ["ddd", "dd", "d", "P", "A", "AA", "AAA"] :
        ["ddd", "dd", "d", "m", "M", "A", "AA", "AAA"];
    return table[interval[0]+3] + String(interval[1]);
}





// TEST
for (const abc1 of "cdefgab"){
    for(const accidental1 of ["b","","#"]){
        const note1 =  abc1.toUpperCase() + accidental1;

        var msg = note1 + ": ";
        for(const abc2 of "cdefgab"){
            for(const accidental2 of ["b","","#"]){
                const note2 = abc2.toUpperCase()  + accidental2;
                msg += note2 + str_interval(interval(note1, note2)) + " ";
            }
        }
        console.log(msg);
    }
}

// TEST
function key_signature_test(){
    const correct = {
        'F':-1, 'C': 0, 'G': 1, 'Fb':4, 'Cb':-7, 'B': 5, 'F#': 6, 'Gb':-6, 'Db':-5, 'C#':7, 'G#':-4, 'E': 4,
        'd':-1, 'a': 0, 'e': 1, 'db':4, 'ab':-7, 'g#':5, 'd#': 6, 'eb':-6, 'bb':-5, 'a#':7, 'e#':-4, 'f': -4,
    }
    const correct_numver = {5:-1, 0:0, 7:1, 1:-5, 2:2, 11:5, 10:-2, 6:6}

    for (const key in correct) {
        if(key_signature(key)!=correct[key]){ console.log(key, str_key_signature(correct[key]), str_key_signature(key_signature(key)), String(false)); }
    }
    for (const key in correct_numver) {
        if(key_signature(key)!=correct_numver[key]){ console.log(key, str_key_signature(correct_numver[key]), str_key_signature(key_signature(key)), String(false)); }
    }
}

key_signature_test();

// TEST
for (abc of "abcdefg"){
    for (accidental of ["b","","#"]){
        const key = abc.toUpperCase() + accidental
        var msg = String(key_signature(key)) + " "
        for (note of major){
            msg += note_symbol(mod(note + chroma(key[0].toUpperCase() + ((key.length==2)?key[1]:"")), 12), key_signature(key)) + " "
        }

        for (c of "ABCDEFG"){
            if (msg.indexOf(c)<0){
                msg += " " + String(false);
                break;
            }
        }
        
        if ((msg.indexOf('#')>=0) && (msg.indexOf('b')>=0)){ msg += " " + String(false); }

        console.log(msg)
    }
}

console.log([-2,-1,0,1,2].map(e=>sgn(e)));
console.log([-2,-1,0,1,2].map(e=>abs(e)));
console.log([-3,-2,-1,0,1,2,3].map(e=>mod(e,3)));

console.log(major)
console.log(major[2]) // E: M3
console.log(minor)
console.log(minor[[4]])  // P5
