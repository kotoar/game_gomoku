<template>
    <div id="app" class="div_center">
        <div style="font-size: 30px">Gomoku Game</div>
        <br>
        <div id="ind_box">
            <span id="ind_now" class="ind_item" >Now: </span>
            <span :class="{ind_highlight: now_player==='b'}" class="ind_item">Black</span>
            <span :class="{ind_highlight: now_player==='w'}" class="ind_item">White</span>
        </div>
        <div>
            <span :class="{ind_static_highlight: player_mode!==undefined}">
                Game Mode: {{game_mode_show[player_mode]}}
            </span>
        </div>
        <canvas id = "mainCanvas" width="340" height="340"></canvas>
        <div id="win_info">{{game_result===undefined ? score.toString() : game_result_show[game_result]}}</div>
        <div class = "control">
            <span id="btn_start_player" class="btn_item" :class="{btn_disable: game_start}" v-on:click="start_game_player">vs Player</span>
            <span id="btn_start_ai" class="btn_item" :class="{btn_disable: game_start}" v-on:click="show_ai_config">vs Com</span>
            <span id="btn_restart" class="btn_item"  v-on:click="restart_game">Reset</span>
        </div>
        <div v-show="ai_config_show" class="config_box" width="340px">
            <div class="list_line">
                <span>Tree Depth: </span>
                <span class="ind_item" v-on:click="tree_depth_decrease">-</span>
                <span class="ind_item">{{tree_depth}}</span>
                <span class="ind_item" v-on:click="tree_depth_increase">+</span>
            </div>
            <div class="list_line">
                <span class="ind_item">Calculate: </span>
                <span class="ind_item" v-on:click="cal_num_decrease">-</span>
                <span class="ind_item">{{cal_num}}</span>
                <span class="ind_item" v-on:click="cal_num_increase">+</span>
            </div>
            <div class="list_line">
                <span>Play as: </span>
                <span :class="{btn_item: com_player_as!=='b', btn_selected:com_player_as==='b'}" v-on:click="com_player_2b">Black</span>
                <span :class="{btn_item: com_player_as!=='w', btn_selected:com_player_as==='w'}" v-on:click="com_player_2w">White</span>
            </div>
            <div class="list_line">
                <span class="btn_item" :class="{btn_disable: game_start}" style="padding-left: 20px;padding-right: 20px" v-on:click="start_game_ai">
                    Start
                </span>
            </div>
        </div>
        <br>
        <small class="small_info">UCSD 22WIN CSE202 project</small>
    </div>
</template>


<script>
import {get_score, get_result, next_step} from "./game_logic.js"

export default {
    name: 'App',
    data: () => {
        return {
            board_size: 15,
            line_margin: 30,
            line_padding: 20,
            canvas_width: 0,
            canvas_height: 0,
            stones: Array(225),
            score: 0,
            now_player: 'b',
            player_show: {
                'b': 'Black',
                'w': 'White'
            },
            game_mode_show:{
                undefined: "Not Started",
                "player": "player vs. player",
                "ai": "player vs. AI"
            },
            game_start: false,
            board_able: false,
            player_mode: undefined,
            game_result: undefined,
            game_result_show: {
                undefined: "",
                'b': "Black Wins",
                'w': 'White Wins'
            },
            ai_config_show: false,
            com_player_as: 'b',
            com_play_as: 'w',
            tree_depth: 1,
            cal_num: 8
        }
    },
    mounted() {
        this.board_size = 15;
        this.canvas_width = this.line_padding * (this.board_size-1) + 2 * this.line_margin;
        this.canvas_height = this.line_padding * (this.board_size-1) + 2 * this.line_margin;
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.ctx.font = "15px Georgia";
        this.ctx.textAlign = 'center';
        this.drawLines();
        this.update_stones();
        this.canvas.addEventListener('mousedown', (event) => {
            if(!this.board_able){
                return;
            }
            const rect = this.canvas.getBoundingClientRect();
            const x_pos = event.clientX - rect.left;
            const y_pos = event.clientY - rect.top;
            const x = Math.floor((x_pos - this.line_margin + this.line_padding/2)/this.line_padding);
            const y = Math.floor((y_pos - this.line_margin + this.line_padding/2)/this.line_padding);
            if(x<0 || x>=15 || y<0 || y>=15){
                return;
            }
            let res = this.step(x, y);
            if(res){
                this.update_stones();
                this.score = get_score(this.stones, 'b');
                let result = get_result(this.stones, this.now_player);
                if(result){
                    this.board_able = false;
                    this.game_result = this.now_player;
                }
                else
                if(this.player_mode==="ai"){
                    let [next_index,next_score] = next_step(this.stones, this.com_play_as, this.tree_depth*2-1, this.cal_num);
                    this.score = next_score
                    this.stones[next_index] = this.com_play_as;
                    this.update_stones();
                    let nresult = get_result(this.stones, this.com_play_as);
                    if(nresult){
                        this.board_able = false;
                        this.game_result = this.com_play_as;
                    }
                }
                else{
                    this.exchange_player();
                }

            }
        })
    },
    methods: {
        start_game_player(){
            if(this.game_start) return;
            this.game_start = true;
            this.board_able = true;
            this.player_mode = "player";
        },
        show_ai_config(){
            this.ai_config_show = !this.ai_config_show;
        },
        start_game_ai(){
            if(this.game_start) return;
            this.game_start = true;
            this.board_able = true;
            this.player_mode = "ai";
            if(this.com_player_as==='w'){
                this.com_play_as='b';
                this.stones[7*15+7] = 'b'
                this.draw_black_stone(7,7)
                this.exchange_player()
            }
            else{
                this.com_play_as='w';
            }
        },
        restart_game(){
            this.stones.splice(undefined, this.stones.length);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.drawLines();
            this.now_player = 'b';
            this.score = 0;
            this.player_mode = undefined;
            this.game_result = undefined;
            this.game_start = false;
            this.board_able = false;
        },
        tree_depth_increase(){
            if(this.tree_depth < 7){
                this.tree_depth += 1;
            }
        },
        tree_depth_decrease(){
            if(this.tree_depth > 1){
                this.tree_depth -= 1;
            }
        },
        cal_num_increase(){
            if(this.cal_num < 20){
                this.cal_num += 1;
            }
        },
        cal_num_decrease(){
            if(this.cal_num > 1){
                this.cal_num -= 1;
            }
        },
        com_player_2b(){
            this.com_player_as = 'b';
        },
        com_player_2w(){
            this.com_player_as = 'w';
        },
        stone_index(x, y){
            return 15*x + y;
        },
        exchange_player(){
            if(this.now_player === 'w'){
                this.now_player = 'b';
            }
            else{
                this.now_player = 'w';
            }
        },
        step(x, y){
            if(this.stones[this.stone_index(x, y)] !== undefined){
                return false;
            }
            this.stones[this.stone_index(x, y)] = this.now_player;
            return true;
        },
        drawLines(){
            this.ctx.fillStyle = 'black';
            for(let i=0;i<this.board_size;i++){
                this.ctx.beginPath();
                this.ctx.moveTo(this.line_margin + this.line_padding*i, this.line_margin);
                this.ctx.lineTo(this.line_margin + this.line_padding*i, this.canvas_height-this.line_margin);
                this.ctx.moveTo(this.line_margin , this.line_margin + this.line_padding*i);
                this.ctx.lineTo(this.canvas_height - this.line_margin, this.line_padding*i + this.line_margin);
                this.ctx.fillText((i+1).toString(), this.line_margin + this.line_padding*i, this.line_margin - 15);
                this.ctx.fillText((i+1).toString(), this.line_margin - 15, this.line_margin + this.line_padding*i);
                this.ctx.stroke();
            }
        },
        update_stones(){
            for(let i=0;i<this.stones.length;i++){
                let x = Math.floor(i / 15);
                let y = i % 15;
                if (this.stones[this.stone_index(x, y)] === 'b'){
                    this.draw_black_stone(x, y);
                }
                else if (this.stones[this.stone_index(x, y)] === 'w'){
                    this.draw_white_stone(x, y);
                }
            }
        },
        draw_white_stone(x, y){
            this.ctx.beginPath();
            this.ctx.arc(this.line_margin + this.line_padding*x, this.line_margin + this.line_padding*y, 6, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'white';
            this.ctx.fill();
            this.ctx.beginPath();
            this.ctx.arc(this.line_margin + this.line_padding*x, this.line_margin + this.line_padding*y, 6, 0, 2 * Math.PI);
            this.ctx.stroke();
        },
        draw_black_stone(x, y){
            this.ctx.beginPath();
            this.ctx.arc(this.line_margin + this.line_padding*x, this.line_margin + this.line_padding*y, 6, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'black';
            this.ctx.fill();
        },

    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
.ind_highlight{
    background-color: aquamarine;
}
.ind_static_highlight{
    background-color: bisque;
}
.ind_item{
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 3px;
}
.btn_item{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    padding: 2px 4px;
    margin-left: 5px;
    margin-right: 5px;
    cursor: default;
}
.btn_item:hover{
    background-color: coral;
}
.btn_disable{
    color: darkgrey;
}
.btn_selected{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.7);
    padding: 2px 4px;
    margin-left: 5px;
    margin-right: 5px;
    background-color: aqua;
    cursor: default;
}
.btn_selected:hover{
    background-color: coral;
}
#ind_box{
    alignment: left;
}
#win_info {
    font-size: 30px;
}
.div_center{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
}
.small_info{
    color: darkgrey;
}
.config_box{
    border: 1px solid black;
    border-radius: 4px;
    padding: 4px 4px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.list_line{
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>
