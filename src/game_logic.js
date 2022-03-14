const BOARDLEN = 15
let stone_val = (board, x, y) => {
    return board[x*15 + y];
}
const score_list = {
    //The first line "crt" here indicates how many stones are in the line
    //The second line "block" indicates how many rival's stones block the line
    0: {
        0: 0,
        1: 0,
        2: 0
    },
    1: {
        0: 10,
        1: 3,
        2: 0
    },
    2: {
        0: 100,
        1: 10,
        2: 0
    },
    3: {
        0: 1000,
        1: 100,
        2: 0
    },
    4: {
        0: 10000,
        1: 9900,
        2: 0
    },
    5: {
        0: 100000,
        1: 100000,
        2: 100000
    },
    6: {
        0: 100000,
        1: 100000,
        2: 100000
    },
    7: {
        0: 100000,
        1: 100000,
        2: 100000
    },
    8: {
        0: 100000,
        1: 100000,
        2: 100000
    },
    9: {
        0: 100000,
        1: 100000,
        2: 100000
    },
}

//evaluation function for single player
let detect = (board, type) => {
    let ret = Array(30);
    ret.fill(0);
    /*let detect_line = (update_method1, update_method2) => {
        for(let x=0, y=0; x<15 && y<15;[x, y] = update_method1([x, y])){
            let block = 1;
            let crt = 0;
            for(let x=0, y=0; x<15 && y<15;[x, y] = update_method2([x, y])){
                let val = stone_val(board, x, y);
                if(val === type){
                    crt += 1;
                }
                else if(val===undefined){
                    ret[crt][block] += 1;
                    crt = 0;
                    block = 0;
                }
                else {
                    block += 1;
                    ret[crt][block] += 1;
                    crt = 0;
                    block = 1;
                }
            }
        }
    }
    */
    for(let y=0;y<15;y++){
        let block = 1;
        let crt = 0;
        for(let x=0;x<15;x++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
    for(let x=0;x<15;x++){
        let block = 1;
        let crt = 0;
        for(let y=0;y<15;y++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=1,yb=0;xb<15;xb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=1,yb=14;xb<15;xb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret[crt*3+block] += 1;
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret[crt*3+block] += 1;
                crt = 0;
                block = 1;
            }
        }
    }
/*
    for(let y=0;y<15;y++){
        let block = 1;
        let crt = 0;
        for(let x=0;x<15;x++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
    for(let x=0;x<15;x++){
        let block = 1;
        let crt = 0;
        for(let y=0;y<15;y++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=1,yb=0;xb<15;xb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
    for(let xb=1,yb=14;xb<15;xb++){
        let block = 1;
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(val===undefined){
                ret += score_list[crt][block];
                crt = 0;
                block = 0;
            }
            else {
                block += 1;
                ret += score_list[crt][block];
                crt = 0;
                block = 1;
            }
        }
    }
*/
    //console.log(ret);
    return ret;
}
/*
export let is_valid = (stones, index, type) => {
    if(type !== 'b') return true;
    let stonescp = [...stones];
    stonescp[index] = 'b';
    let detect_crt = detect(stonescp, 'b');
    //todo
}
 */

let get_detect_score = (detect_list) => {
    let ret = 0;
    for(let crt = 1;crt<10;crt++){
        for(let block = 0;block<3;block++){
            ret += detect_list[crt*3+block] * score_list[crt][block];
        }
    }
    return ret;
}

//evaluation function
export let get_score = (board, host) => {
    //console.log('host=', host)
    let kb = (host === 'b' ? 1.5: 1);
    let kw = (host === 'w' ? 1.5: 1);
    //console.log('kb ', kb);
    //console.log('kw ', kw);

    return kb * get_detect_score(detect(board, 'b')) - kw * get_detect_score(detect(board, 'w'));
}

export let get_result = (board, type) => {
    for(let y=0;y<15;y++){
        let crt = 0;
        for(let x=0;x<15;x++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    for(let x=0;x<15;x++){
        let crt = 0;
        for(let y=0;y<15;y++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    for(let xb=1,yb=0;xb<15;xb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    for(let xb=1,yb=14;xb<15;xb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
                if(crt>=5){
                    return true;
                }
            }
            else {
                crt = 0;
            }
        }
    }
    return false;
}

let reverse_type = (type)=>{
    if(type==='w') return 'b';
    return 'w';
}

//min-max search
export let next_step = (board, type, depth, cal) => {
    // return [next_step location, next_step score]
    let scores = next_score(board, type, cal);
    console.log('depth', depth);
    console.log('scores', scores);
    if(depth==1){
        return [scores[0]["index"],scores[0]['score']];
    }
    for(let i=0;i<scores.length;i++){
        let index = scores[i]["index"];
        let cpboard = [...board];
        //Draw the stone on that board
        cpboard[index] = type;
        let warzone = stone_list(cpboard);
        console.log("black:", warzone['black']);
        console.log("white:", warzone['white']);
        let type_reverse = reverse_type(type);
        var opt_move=0;
        [opt_move,scores[i]["score"]] = next_step(cpboard, type_reverse, depth-1);
        console.log(opt_move)
    }
    let sortFn = (a, b)=>{
        if(type==='b'){
            return b.score - a.score;
        }
        return a.score - b.score;
    }
    scores.sort(sortFn);
    return [scores[0]["index"],scores[0]["score"]];
}

let inverse_type = (type) => {
    if(type==='w') return 'b';
    return 'w';
}

function bound_generate(board){
    let left_b = BOARDLEN,up_b = BOARDLEN;
    let right_b = 0, down_b = 0;
    for(let i=0;i<BOARDLEN**2;i++){
        if (board[i] !== undefined){
            let x = Math.floor(i/15)
            let y = i%15
            left_b = Math.min(left_b ,x)
            up_b = Math.min(up_b ,y)
            right_b = Math.max(right_b ,x)
            down_b = Math.max(down_b ,y)
        }
    }
    const span =3
    let rf_lb = Math.max(0,left_b-span)
    let rf_ub = Math.max(0,up_b-span)
    let rf_rb = Math.min(BOARDLEN-1,right_b+span)
    let rf_db = Math.min(BOARDLEN-1,down_b+span)
    return [rf_lb, rf_ub, rf_rb, rf_db]
}
function stone_list(board){
    let output = {'black':[],
        'white':[]}
    for(let x=0;x<BOARDLEN;x++){
        for(let y=0;y<BOARDLEN;y++){
            if (board[x*BOARDLEN+ y]!==undefined){
                if (board[x*BOARDLEN+y]=== 'b'){
                    output['black'].push([x+1,y+1])
                } else{
                    output['white'].push([x+1,y+1])
                }
            }
        }
    }
    return output
}
let next_score = (board, type, cal) => {
    let scores = [];
    let [rf_lb, rf_ub, rf_rb, rf_db] = bound_generate(board)
    for(let x=rf_lb;x<rf_rb+1;x++) {
        for (let y=rf_ub; y<rf_db+1;y++){
            let i = x * BOARDLEN + y
            if (board[i] !== undefined) continue;
            board[i] = type;
            let s = get_score(board, inverse_type(type));
            board[i] = undefined;
            scores.push({"index": i, "score": s});
        }

    }
    let sortFn = (a, b)=>{
        if(type==='b'){
            return b.score - a.score;
        }
        return a.score - b.score;
    }
    scores.sort(sortFn);
    scores = scores.slice(0, cal);
    return scores;
}