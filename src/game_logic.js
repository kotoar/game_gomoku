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
        1: 1000,
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
    let ret = 0;
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
    return ret;
}

//evaluation function
export let get_score = (board, host) => {
    console.log('host=', host)
    let kb = (host === 'b' ? 1.5: 1);
    let kw = (host === 'w' ? 1.5: 1);
    console.log('kb ', kb);
    console.log('kw ', kw);

    return kb * detect(board, 'b') - kw * detect(board, 'w');
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
    let scores = next_score(board, type, cal);
    console.log('depth', depth);
    console.log(scores);
    if(depth===1){
        return scores[0]["index"];
    }
    for(let i=0;i<scores.length;i++){
        let index = scores[i]["index"];
        let cpboard = [...board];
        cpboard[index] = type;
        scores[i]["score"] = next_step(cpboard, reverse_type(type), depth-1, cal);
    }
    let sortFn = (a, b)=>{
        if(type==='b'){
            return b.score - a.score;
        }
        return a.score - b.score;
    }
    scores.sort(sortFn);
    return scores[0]["index"];
}

let inverse_type = (type) => {
    if(type==='w') return 'b';
    return 'w';
}

let next_score = (board, type, cal) => {
    let scores = [];
    for(let i=0;i<225;i++){
        if(board[i]!==undefined) continue;
        board[i] = type;
        let s = get_score(board, inverse_type(type));
        board[i] = undefined;
        scores.push({"index":i, "score":s});
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