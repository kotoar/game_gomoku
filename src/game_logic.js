let stone_val = (board, x, y) => {
    return board[x*15 + y];
}

const score_list = {
    0: {
        0: 0,
        1: 0
    },
    1: {
        0: 10,
        1: 3
    },
    2: {
        0: 100,
        1: 10
    },
    3: {
        0: 1000,
        1: 100
    },
    4: {
        0: 10000,
        1: 1000
    },
    5: {
        0: 10000,
        1: 10000
    },
    6: {
        0: 10000,
        1: 10000
    },
    7: {
        0: 10000,
        1: 10000
    },
    8: {
        0: 10000,
        1: 10000
    },
    9: {
        0: 10000,
        1: 10000
    },
}

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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
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
                if(block!==2){
                    ret += score_list[crt][block];
                    crt = 0;
                }
                block = 1;
            }
        }
    }
    return ret;
}

export let get_score = (board) => {
    return detect(board, 'b') - detect(board, 'w');
}

export let get_result = (board, type) => {
    for(let y=0;y<15;y++){
        let crt = 0;
        for(let x=0;x<15;x++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    for(let x=0;x<15;x++){
        let crt = 0;
        for(let y=0;y<15;y++){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    for(let xb=1,yb=0;xb<15;xb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y+=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    for(let xb=0,yb=0;yb<15;yb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    for(let xb=1,yb=14;xb<15;xb++){
        let crt = 0;
        for(let x=xb, y=yb;0<=x && x<15 && 0<=y && y<15; x+=1, y-=1){
            let val = stone_val(board, x, y);
            if(val === type){
                crt += 1;
            }
            else if(crt>=5){
                return true;
            }
        }
    }
    return false;
}