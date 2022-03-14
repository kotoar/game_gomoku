<template>
    <div v-show="self_show" class="side_display_left log_boarder">
        <div style="font-size: x-large">
            Com vs Com Log
        </div>
        <br>
        <div>
            <div>Black:</div>
            <div>depth: {{black_depth}}, cal: {{black_cal}}</div>
            <div>White:</div>
            <div>depth: {{white_depth}}, cal: {{white_cal}}</div>
            <div>round: {{round}}</div>
            <div>Black Winning Rate: {{black_win_crt / (black_win_crt + white_win_crt) * 100}} %</div>
        </div>
        <br>
        <div style="overflow-y: scroll;height: 600px">
            <table>
                <thead class="list_table_header">
                <tr>
                    <th class="list_item_item">index</th>
                    <th class="list_item_item">winner</th>
                </tr>
                </thead>
                <tbody>
                <tr style="width: fit-content" class="list_item_row" v-for="result in resultList" :key="result.index">
                    <th class="list_item_item">{{result.index}}</th>
                    <th class="list_item_item">{{result.winner}}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "AiTestLog.vue",
    data: () => {
        return {
            resultList: Array(0),
            black_depth: 0,
            white_depth: 0,
            black_cal: 0,
            white_cal: 0,
            round: 0,
            self_show: false,
            black_win_crt: 0,
            white_win_crt: 0
        }
    },
    methods:{
        initParameters(black_depth, white_depth, black_cal, white_cal, round){
            this.black_depth = black_depth;
            this.white_depth = white_depth;
            this.black_cal = black_cal;
            this.white_cal = white_cal;
            this.round = round;
        },
        clearResult(){
            this.resultList = Array(0);
        },
        addResult(result){
            result.index = this.resultList.length + 1;
            this.resultList.push(result);
            if(result.winner === 'b'){
                this.black_win_crt += 1;
            }
            else{
                this.white_win_crt += 1;
            }
        },
        meShow(is_show){
            this.self_show = is_show;
        }
    }
}
</script>

<style scoped>
.log_boarder{
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
}
.list_item_row{
    margin-left: 5px;
    margin-right: 5px;
    padding: 2px 5px;
    border: 1px solid black;
    white-space: nowrap;
}
.list_item_row:hover{
    background-color: bisque;
}
.list_item_item{
    padding-left: 15px;
    padding-right: 15px;
}
.list_table_header{
    position: sticky;
    top:0;
    background-color: white;
}
.side_display_left{
    position: fixed;
    top: 40px;
    left: -110%;
    width: fit-content;
}
</style>