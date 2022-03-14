<template>
    <div>
        <div class="list_line">
            <span>Tree Depth: </span>
            <span class="ind_item" v-on:click="tree_depth_decrease">-</span>
            <span class="ind_item">{{sub_tree_depth}}</span>
            <span class="ind_item" v-on:click="tree_depth_increase">+</span>
        </div>
        <div class="list_line">
            <span class="ind_item">Calculate: </span>
            <span class="ind_item" v-on:click="cal_num_decrease">-</span>
            <span class="ind_item">{{sub_cal_num}}</span>
            <span class="ind_item" v-on:click="cal_num_increase">+</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "AIConfigView.vue",
    props: ['sub_tree_depth', 'sub_cal_num'],
    methods: {
        tree_depth_increase(){
            if(this.sub_tree_depth < 7){
                this.sub_tree_depth += 1;
            }
            this.change_tree_depth_to(this.sub_tree_depth);
        },
        tree_depth_decrease(){
            if(this.sub_tree_depth > 1){
                this.sub_tree_depth -= 1;
            }
            this.change_tree_depth_to(this.sub_tree_depth);
        },
        cal_num_increase(){
            if(this.sub_cal_num < 20){
                this.sub_cal_num += 1;
            }
            this.change_cal_num_to(this.sub_cal_num);
        },
        cal_num_decrease(){
            if(this.sub_cal_num > 1){
                this.sub_cal_num -= 1;
            }
            this.change_cal_num_to(this.sub_cal_num);
        },
        change_tree_depth_to(depth){
            this.$emit('tree_depth_change', depth);
        },
        change_cal_num_to(cal){
            this.$emit('cal_num_change', cal);
        }
    }
}
</script>

<style scoped>
.ind_item{
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 5px;
    margin-right: 5px;
    border-radius: 3px;
    cursor: default;
}
.list_line{
    margin-top: 10px;
    margin-bottom: 10px;
}
</style>