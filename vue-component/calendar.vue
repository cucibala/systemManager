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
                <!--
                div>div.dateCellList[:monthType=dateCellMonthType[$@0] :weekType="dateCellWeek[$@1]"]*7>div.DateDay>span{{{dateCellList[$@0]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[$@0]-1].occupy"]>div[v-if=index<2]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[dateCellWeek[$@0]-1].remain!=0]{+{{currentDateCellWeekDay[dateCellWeek[$@0]-1].remain}}}
                div>div.dateCellList[:monthType=dateCellMonthType[$@7] :weekType="dateCellWeek[$@1]"]*7>div.DateDay>span{{{dateCellList[$@7]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[$@7]-1].occupy"]>div[v-if=index<2]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[dateCellWeek[$@7]-1].remain!=0]{+{{currentDateCellWeekDay[dateCellWeek[$@7]-1].remain}}}
                div>div.dateCellList[:monthType=dateCellMonthType[$@14] :weekType="dateCellWeek[$@1]"]*7>div.DateDay>span{{{dateCellList[$@14]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[$@14]-1].occupy"]>div[v-if=index<2]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[dateCellWeek[$@14]-1].remain!=0]{+{{currentDateCellWeekDay[dateCellWeek[$@14]-1].remain}}}
                div>div.dateCellList[:monthType=dateCellMonthType[$@21] :weekType="dateCellWeek[$@1]"]*7>div.DateDay>span{{{dateCellList[$@21]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[$@21]-1].occupy"]>div[v-if=index<2]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[dateCellWeek[$@21]-1].remain!=0]{+{{currentDateCellWeekDay[dateCellWeek[$@21]-1].remain}}}
                div>div.dateCellList[:monthType=dateCellMonthType[$@28] :weekType="dateCellWeek[$@1]"]*7>div.DateDay>span{{{dateCellList[$@28]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[$@28]-1].occupy"]>div[v-if=index<2]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[dateCellWeek[$@28]-1].remain!=0]{+{{currentDateCellWeekDay[dateCellWeek[$@28]-1].remain}}}
                -->
                <div>
                    <div class="dateCellList" :monthType="dateCellMonthType[0]" :weekType="dateCellWeek[0]">
                        <div class="DateDay"><span>{{dateCellList[0]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[0]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[0]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[0]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[1]" :weekType="dateCellWeek[1]">
                        <div class="DateDay"><span>{{dateCellList[1]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[1]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[1]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[1]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[2]" :weekType="dateCellWeek[2]">
                        <div class="DateDay"><span>{{dateCellList[2]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[2]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[2]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[2]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[3]" :weekType="dateCellWeek[3]">
                        <div class="DateDay"><span>{{dateCellList[3]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[3]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[3]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[3]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[4]" :weekType="dateCellWeek[4]">
                        <div class="DateDay"><span>{{dateCellList[4]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[4]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[4]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[4]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[5]" :weekType="dateCellWeek[5]">
                        <div class="DateDay"><span>{{dateCellList[5]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[5]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[5]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[5]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[6]" :weekType="dateCellWeek[6]">
                        <div class="DateDay"><span>{{dateCellList[6]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[6]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[6]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[6]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" :monthType="dateCellMonthType[7]" :weekType="dateCellWeek[7]">
                        <div class="DateDay"><span>{{dateCellList[7]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[7]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[7]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[7]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[8]" :weekType="dateCellWeek[8]">
                        <div class="DateDay"><span>{{dateCellList[8]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[8]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[8]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[8]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[9]" :weekType="dateCellWeek[9]">
                        <div class="DateDay"><span>{{dateCellList[9]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[9]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[9]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[9]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[10]" :weekType="dateCellWeek[10]">
                        <div class="DateDay"><span>{{dateCellList[10]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[10]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[10]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[10]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[11]" :weekType="dateCellWeek[11]">
                        <div class="DateDay"><span>{{dateCellList[11]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[11]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[11]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[11]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[12]" :weekType="dateCellWeek[12]">
                        <div class="DateDay"><span>{{dateCellList[12]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[12]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[12]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[12]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[13]" :weekType="dateCellWeek[13]">
                        <div class="DateDay"><span>{{dateCellList[13]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[13]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[13]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[13]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" :monthType="dateCellMonthType[14]" :weekType="dateCellWeek[14]">
                        <div class="DateDay"><span>{{dateCellList[14]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[14]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[14]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[14]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[15]" :weekType="dateCellWeek[15]">
                        <div class="DateDay"><span>{{dateCellList[15]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[15]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[15]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[15]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[16]" :weekType="dateCellWeek[16]">
                        <div class="DateDay"><span>{{dateCellList[16]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[16]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[16]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[16]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[17]" :weekType="dateCellWeek[17]">
                        <div class="DateDay"><span>{{dateCellList[17]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[17]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[17]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[17]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[18]" :weekType="dateCellWeek[18]">
                        <div class="DateDay"><span>{{dateCellList[18]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[18]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[18]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[18]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[19]" :weekType="dateCellWeek[19]">
                        <div class="DateDay"><span>{{dateCellList[19]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[19]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[19]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[19]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[20]" :weekType="dateCellWeek[20]">
                        <div class="DateDay"><span>{{dateCellList[20]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[20]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[20]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[20]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" :monthType="dateCellMonthType[21]" :weekType="dateCellWeek[21]">
                        <div class="DateDay"><span>{{dateCellList[21]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[21]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[21]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[21]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[22]" :weekType="dateCellWeek[22]">
                        <div class="DateDay"><span>{{dateCellList[22]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[22]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[22]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[22]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[23]" :weekType="dateCellWeek[23]">
                        <div class="DateDay"><span>{{dateCellList[23]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[23]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[23]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[23]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[24]" :weekType="dateCellWeek[24]">
                        <div class="DateDay"><span>{{dateCellList[24]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[24]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[24]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[24]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[25]" :weekType="dateCellWeek[25]">
                        <div class="DateDay"><span>{{dateCellList[25]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[25]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[25]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[25]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[26]" :weekType="dateCellWeek[26]">
                        <div class="DateDay"><span>{{dateCellList[26]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[26]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[26]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[26]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[27]" :weekType="dateCellWeek[27]">
                        <div class="DateDay"><span>{{dateCellList[27]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[27]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[27]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[27]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" :monthType="dateCellMonthType[28]" :weekType="dateCellWeek[28]">
                        <div class="DateDay"><span>{{dateCellList[28]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[28]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[28]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[28]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[29]" :weekType="dateCellWeek[29]">
                        <div class="DateDay"><span>{{dateCellList[29]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[29]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[29]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[29]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[30]" :weekType="dateCellWeek[30]">
                        <div class="DateDay"><span>{{dateCellList[30]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[30]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[30]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[30]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[31]" :weekType="dateCellWeek[31]">
                        <div class="DateDay"><span>{{dateCellList[31]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[31]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[31]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[31]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[32]" :weekType="dateCellWeek[32]">
                        <div class="DateDay"><span>{{dateCellList[32]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[32]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[32]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[32]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[33]" :weekType="dateCellWeek[33]">
                        <div class="DateDay"><span>{{dateCellList[33]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[33]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[33]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[33]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" :monthType="dateCellMonthType[34]" :weekType="dateCellWeek[34]">
                        <div class="DateDay"><span>{{dateCellList[34]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[34]-1].occupy">
                                <div v-if="index<2">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[dateCellWeek[34]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[34]-1].remain}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarFoot">
        </div>
    </div>
</template>
<script>
export default{
    props:{
        dataBase:{type:Array},
    },
    data(){
        return {
            currentYear:1999,
            currentMonth:12,
            week:3,
            day:31,
            dateCellList:[],
            dateCellMonthType:[],
            dateCellWeek:[],
            isShowHideDay:false,
            dateCellWeekDay:[],
        }
    },
    computed:{
        currentDateCellWeekDay(){
            //1.重制数组
            var _this=this;
            this.dateCellWeekDay.forEach((item, i) => {
                this.dateCellWeekDay[i].occupy.splice(0);
                this.dateCellWeekDay[i].remain=0;
            });

            //2.对数组进行赋值
            this.dataBase.forEach(item1=>{
                if(item1.year == _this.currentYear&&item1.startMonth<=_this.currentMonth&&item1.endMonth>=_this.currentMonth){
                    item1.week.forEach((item2, index) => {
                        if(item2){
                            _this.dateCellWeekDay[index].occupy.push({name:item1.name,timeSpan:[{s:"1:00",e:"2:00"}]})
                        }
                    });
                }
            });

            //3.计算剩余个数
            this.dateCellWeekDay.forEach((item, i) => {
                if(item.occupy.length>2){
                    item.remain=item.occupy.length-2;
                }
            });
            return this.dateCellWeekDay;
        }
    },
    methods:{
        monthAdd(){
            this.currentMonth++;
            if( this.currentMonth>12){
                this.currentMonth=1;
                this.currentYear++;
            }

            this.initdateCellList(this.currentYear,this.currentMonth);
        },
        monthMinus(){
            this.currentMonth--;
            if( this.currentMonth<1){
                this.currentMonth=12;
                this.currentYear--;
            }

            this.initdateCellList(this.currentYear,this.currentMonth);
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
        },
        /*初始化日期数组
        *@param week 这个月的一号是星期几
        *@param currentMonthDay 这个月有多少天
        *@param lastMonthDay  上个月有多少天
        */
        initdateCellList(year,currentMonth){
            let currentDate = new Date(year);
            var week;
            var currentMonthDay;
            var lastMonthDay;
            var tempWeek;
            currentDate.setMonth(currentMonth);
            currentDate.setDate(0);
            currentMonthDay=currentDate.getDate();
            currentDate.setDate(1);
            week=currentDate.getDay();
            currentDate.setMonth(currentMonth-1);
            currentDate.setDate(0);
            lastMonthDay=currentDate.getDate();
            tempWeek=0;
            for(let i=0;i<week;i++){
                this.dateCellList[i]=lastMonthDay-week+i+1;
                this.dateCellMonthType[i]="lastMonth";
                this.dateCellWeek[i]=tempWeek+1;
                tempWeek++;
                if(tempWeek>6){
                    tempWeek=0;
                }
            }

            tempWeek=week;
            for(let i=0;i<currentMonthDay;i++){
                this.dateCellList[week+i]=i+1;
                this.dateCellMonthType[week+i]="currentMonth";
                this.dateCellWeek[week+i]=tempWeek+1;
                tempWeek++;
                if(tempWeek>6){
                    tempWeek=0;
                }
            }

            if(currentMonthDay+week>35){
                this.isShowHideDay=true;
            }else{
                this.isShowHideDay=false;
            }

            for(let i=currentMonthDay+week;i<35;i++){
                this.dateCellList[i]=i-(currentMonthDay+week)+1;
                this.dateCellMonthType[i]="nextMonth";
                this.dateCellWeek[i]=tempWeek+1;
                tempWeek++;
                if(tempWeek>6){
                    tempWeek=0;
                }
            }
        }
    },
    created(){
        var d = new Date();
        this.currentYear=d.getFullYear();
        this.currentMonth=d.getMonth()+1;
        this.week=d.getDay();
        this.day=d.getDate();
        this.initdateCellList(this.currentYear,this.currentMonth);

        for(var i=0;i<7;i++){
            this.dateCellWeekDay.push({occupy:[],remain:0});
        }

    }
}
</script>
<style type="text/css" scoped lang="less">
@headHeight:40px;
@footHeight:40px;
@calendarPdding:2px;
.calendarContainer{
    width: 100%;
    height: 100%;
}
.calendarHeader{
    width:calc(100% - 4px);
    padding: @calendarPdding;
    height: @headHeight;
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
    padding: @calendarPdding;
    // background-color: #faa;
    height: calc(100% - @headHeight - @footHeight - @calendarPdding*8);
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
        width: 100%;
        height: calc(100% - 44px);
        font-size: 1rem;
        >div{
            width:100%;
            height: 20%;
            display: flex;
            flex-flow: row;
            >.dateCellList{
                height:calc(100% - 4px);
                width: calc(14.28% - 4px);
                border: 1px solid black;
                margin: 1px;
                .DateDay{
                    text-align: right;
                    span{
                        padding: 0px 4px;
                    }
                }
                .DateMessage{
                    div{
                        cursor: pointer;
                    }
                    div:nth-child(1){
                        background-color: #1661AB;
                        border-radius: 4px;
                        margin: 2px 0px;
                        color: white;
                    }
                    div:nth-child(2){
                         background-color: #2474B5;
                         border-radius: 4px;
                         margin: 2px 0px;
                         color: white;
                    }
                    div:nth-last-child(1)[moreButton]{
                        text-align: left;
                        padding: 0px 10px;
                    }
                }
            }
            >.dateCellList[monthType="lastMonth"]{
                background-color:#b1b1b17a;
            }
            >.dateCellList[monthType="currentMonth"]{
                // background-color:#aad4ff7a;
            }
            >.dateCellList[monthType="nextMonth"]{
                background-color:#b1b1b17a;
            }
        }
    }
}
.calendarFoot{
    width:calc(100% - 4px);
    padding: @calendarPdding;
    // background-color: #faa;
    height:@footHeight;
}
.icon{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
