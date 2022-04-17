<template>
    <div class="side_display log_boarder">
        <div style="font-size: x-large">
            Play Log
        </div>
        <br>
        <div style="overflow-y: auto;height: 300px">
            <table>
                <thead class="list_table_header">
                <tr>
                    <th class="list_item_item">index</th>
                    <th class="list_item_item" colspan="2">prev. step</th>
                    <th class="list_item_item">score</th>
                </tr>
                </thead>
                <tbody>
                <tr style="width: fit-content" class="list_item_row" v-for="record in recordList" :key="record.index" v-on:click="set_back(record.index)">
                    <th class="list_item_item">{{record.index}}</th>
                    <th class="list_item_item"><div :class="{black_stone: record.step.color==='b', white_stone: record.step.color==='w'}"></div></th>
                    <th class="list_item_item">({{record.step.row}}, {{record.step.col}})</th>
                    <th class="list_item_item">{{record.score}}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: "BackTrackingLog.vue",
    data: () => {
        return {
            recordList: Array(0)
        }
    },
    mount(){

    },
    methods: {
        set_back(index){
            console.log('set back to', index)
        },
        self_add_record(record){
            record.index = this.recordList.length + 1
            this.recordList.push(record)
            console.log(record.score)
        },
        self_clear_data(){
            this.recordList = Array(0)
        }
    }
}
</script>

<style scoped>
.side_display{
    position: fixed;
    top: 40px;
    left: 110%;
    width: fit-content;
}
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
.black_stone{
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: black;
}
.black_stone{
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background-color: black;
}
.white_stone{
    width: 10px;
    height: 10px;
    border-radius: 6px;
    border: 1px solid black;
    background-color: white;
}
</style>