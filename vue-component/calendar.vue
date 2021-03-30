<template>
    <div class="calendarContainer">
        <div class="calendarHeader">
            <div @click="monthMinus">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow-left-bold"></use>
                </svg>
            </div>
            <div>
                <span>{{currentYear}}年{{currentMonth}}月</span>
            </div>
            <div @click="monthAdd">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow-right"></use>
                </svg>
            </div>
        </div>
        <div class="calendarBody">
            <div class="weekContainer">
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==1"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                    <span>一</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==2"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>二</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==3"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>三</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==4"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>四</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==5"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>五</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==6"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>六</span>
                </div>
                <div>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-erjidaohang-xuanzhong" v-if="week==0"></use>
                        <use xlink:href="#icon-erjicaidan-shubiaohuadong" v-else></use>
                    </svg>
                     <span>日</span>
                </div>
            </div>
            <div class="dateContainer">
                <div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return {
            currentYear:1999,
            currentMonth:12,
            week:3,
        }
    },
    methods:{
        monthAdd(){
            this.currentMonth++;
            if( this.currentMonth>12){
                this.currentMonth=1;
                this.currentYear++;
            }

        },
        monthMinus(){
            this.currentMonth--;
            if( this.currentMonth<1){
                this.currentMonth=12;
                this.currentYear--;
            }
        },
        getCountDays() {
            var curDate = new Date();
            /* 获取当前月份 */
            var curMonth = curDate.getMonth();
            /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
            /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
            curDate.setDate(0);
            /* 返回当月的天数 */
            return curDate.getDate();
        }
    },
    mounted(){
        var d = new Date();
        this.currentYear=d.getFullYear();
        this.currentMonth=d.getMonth();
        this.week=d.getDay();
    }
}
</script>
<style type="text/css" scoped lang="less">
.calendarContainer{
    width: 100%;
    height: 100%;
}
.calendarHeader{
    width:calc(100% - 4px);
    padding: 2px;
    height: 40px;
    position: relative;
    display:flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    >div:nth-child(1){
        width: 40px;
        height: 40px;
    }
    >div:nth-child(2){
        width: calc(100% - 80px);
        height: 30px;
    }
    >div:nth-child(3){
        width: 40px;
        height: 40px;
    }
}
.calendarBody{
    width:calc(100% - 4px);
    padding: 2px;
    background-color: #faa;
    height: calc(100% - 200px);
    .weekContainer{
        width:calc(100% - 4px);
        padding: 2px;
        height: 40px;
        display:flex;
        flex-flow: row;
        >div{
            width:14.28%;
            text-align: left;
            display:flex;
            justify-content: left;
            align-items: center;
            >span{
                margin-left: 4px;
            }
        }
    }
    .dateContainer{

    }
}
.icon{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
