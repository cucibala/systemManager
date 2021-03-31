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
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[0]-1])" :monthType="dateCellMonthType[0]" :weekType="dateCellWeek[0]" :currentDay="dateCellList[0]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[0]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[0]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[0]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[0]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[1]-1])" :monthType="dateCellMonthType[1]" :weekType="dateCellWeek[1]" :currentDay="dateCellList[1]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[1]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[1]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[1]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[1]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[2]-1])" :monthType="dateCellMonthType[2]" :weekType="dateCellWeek[2]" :currentDay="dateCellList[2]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[2]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[2]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[2]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[2]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[3]-1])" :monthType="dateCellMonthType[3]" :weekType="dateCellWeek[3]" :currentDay="dateCellList[3]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[3]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[3]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[3]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[3]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[4]-1])" :monthType="dateCellMonthType[4]" :weekType="dateCellWeek[4]" :currentDay="dateCellList[4]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[4]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[4]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[4]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[4]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[5]-1])" :monthType="dateCellMonthType[5]" :weekType="dateCellWeek[5]" :currentDay="dateCellList[5]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[5]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[5]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[5]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[5]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[6]-1])" :monthType="dateCellMonthType[6]" :weekType="dateCellWeek[6]" :currentDay="dateCellList[6]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[6]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[6]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[6]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[6]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[7]-1])" :monthType="dateCellMonthType[7]" :weekType="dateCellWeek[7]" :currentDay="dateCellList[7]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[7]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[7]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[7]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[7]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[8]-1])" :monthType="dateCellMonthType[8]" :weekType="dateCellWeek[8]" :currentDay="dateCellList[8]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[8]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[8]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[8]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[8]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[9]-1])" :monthType="dateCellMonthType[9]" :weekType="dateCellWeek[9]" :currentDay="dateCellList[9]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[9]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[9]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[9]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[9]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[10]-1])" :monthType="dateCellMonthType[10]" :weekType="dateCellWeek[10]" :currentDay="dateCellList[10]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[10]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[10]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[10]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[10]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[11]-1])" :monthType="dateCellMonthType[11]" :weekType="dateCellWeek[11]" :currentDay="dateCellList[11]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[11]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[11]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[11]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[11]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[12]-1])" :monthType="dateCellMonthType[12]" :weekType="dateCellWeek[12]" :currentDay="dateCellList[12]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[12]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[12]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[12]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[12]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[13]-1])" :monthType="dateCellMonthType[13]" :weekType="dateCellWeek[13]" :currentDay="dateCellList[13]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[13]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[13]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[13]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[13]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[14]-1])" :monthType="dateCellMonthType[14]" :weekType="dateCellWeek[14]" :currentDay="dateCellList[14]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[14]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[14]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[14]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[14]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[15]-1])" :monthType="dateCellMonthType[15]" :weekType="dateCellWeek[15]" :currentDay="dateCellList[15]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[15]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[15]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[15]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[15]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[16]-1])" :monthType="dateCellMonthType[16]" :weekType="dateCellWeek[16]" :currentDay="dateCellList[16]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[16]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[16]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[16]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[16]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[17]-1])" :monthType="dateCellMonthType[17]" :weekType="dateCellWeek[17]" :currentDay="dateCellList[17]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[17]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[17]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[17]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[17]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[18]-1])" :monthType="dateCellMonthType[18]" :weekType="dateCellWeek[18]" :currentDay="dateCellList[18]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[18]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[18]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[18]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[18]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[19]-1])" :monthType="dateCellMonthType[19]" :weekType="dateCellWeek[19]" :currentDay="dateCellList[19]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[19]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[19]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[19]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[19]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[20]-1])" :monthType="dateCellMonthType[20]" :weekType="dateCellWeek[20]" :currentDay="dateCellList[20]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[20]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[20]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[20]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[20]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[21]-1])" :monthType="dateCellMonthType[21]" :weekType="dateCellWeek[21]" :currentDay="dateCellList[21]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[21]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[21]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[21]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[21]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[22]-1])" :monthType="dateCellMonthType[22]" :weekType="dateCellWeek[22]" :currentDay="dateCellList[22]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[22]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[22]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[22]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[22]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[23]-1])" :monthType="dateCellMonthType[23]" :weekType="dateCellWeek[23]" :currentDay="dateCellList[23]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[23]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[23]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[23]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[23]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[24]-1])" :monthType="dateCellMonthType[24]" :weekType="dateCellWeek[24]" :currentDay="dateCellList[24]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[24]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[24]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[24]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[24]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[25]-1])" :monthType="dateCellMonthType[25]" :weekType="dateCellWeek[25]" :currentDay="dateCellList[25]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[25]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[25]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[25]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[25]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[26]-1])" :monthType="dateCellMonthType[26]" :weekType="dateCellWeek[26]" :currentDay="dateCellList[26]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[26]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[26]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[26]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[26]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[27]-1])" :monthType="dateCellMonthType[27]" :weekType="dateCellWeek[27]" :currentDay="dateCellList[27]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[27]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[27]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[27]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[27]-1].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[28]-1])" :monthType="dateCellMonthType[28]" :weekType="dateCellWeek[28]" :currentDay="dateCellList[28]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[28]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[28]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[28]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[28]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[29]-1])" :monthType="dateCellMonthType[29]" :weekType="dateCellWeek[29]" :currentDay="dateCellList[29]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[29]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[29]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[29]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[29]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[30]-1])" :monthType="dateCellMonthType[30]" :weekType="dateCellWeek[30]" :currentDay="dateCellList[30]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[30]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[30]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[30]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[30]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[31]-1])" :monthType="dateCellMonthType[31]" :weekType="dateCellWeek[31]" :currentDay="dateCellList[31]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[31]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[31]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[31]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[31]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[32]-1])" :monthType="dateCellMonthType[32]" :weekType="dateCellWeek[32]" :currentDay="dateCellList[32]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[32]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[32]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[32]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[32]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[33]-1])" :monthType="dateCellMonthType[33]" :weekType="dateCellWeek[33]" :currentDay="dateCellList[33]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[33]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[33]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[33]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[33]-1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[dateCellWeek[34]-1])" :monthType="dateCellMonthType[34]" :weekType="dateCellWeek[34]" :currentDay="dateCellList[34]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[34]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[dateCellWeek[34]-1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton v-if="currentDateCellWeekDay[dateCellWeek[34]-1].remain!=0">+{{currentDateCellWeekDay[dateCellWeek[34]-1].remain}}</div>
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

import $ from "jquery";
export default{
    props:{
        dataBase:{type:Array},
    },
    data(){
        return {
            currentYear:1999,
            currentMonth:12,
            //今天的年份
            startYear:1999,
            //今天的月份
            startMonth:12,
            startDay:0,
            week:0,
            day:0,
            //日期列表
            dateCellList:[],
            //月份列表
            dateCellMonthType:[],
            //星期几的列表
            dateCellWeek:[],
            isShowHideDay:false,
            dateCellWeekDay:[],
            nameBindColor:[],
            colorList:[
                {color:"#5c2223",use:false},
                {color:"#EEA2A4",use:false},
                {color:"#ED5A65",use:false},
                {color:"#E77E8E",use:false},
                {color:"#93B5CF",use:false},
                {color:"#FF9900",use:false},
                {color:"#ECD849",use:false},
                {color:"#5E5314",use:false}
            ],
            currentDataBase:[],
        }
    },
    computed:{
        currentDateCellWeekDay(){
            //1.重制数组
            var _this=this;
            this.dateCellWeekDay.forEach((item, i) => {
                item.occupy.splice(0);
                item.remain=0;
            });

            //2.对数组进行赋值
            this.currentDataBase.forEach(item1=>{

                if(item1.year == _this.currentYear&&item1.startMonth<=_this.currentMonth&&item1.endMonth>=_this.currentMonth){
                    item1.week.forEach((item2, index) => {
                        if(item2){
                            _this.dateCellWeekDay[index].occupy.push({name:item1.name,bindColor:`background-color:${item1.bindColor}`,timeSpan:[{s:"1:00",e:"2:00"}]})
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
    watch:{
        dataBase(){
            this.bindColorWithName();
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
        /*对名字进行指定的颜色绑定*/
        bindColorWithName(){
            //1.重制颜色占用
            this.colorList.forEach((item, i) => {
                item.use=false;
            });

            //复制database
            this.dataBase.forEach(item=> {
                this.currentDataBase.push(item);
            });

            //对当前数据进行颜色绑定
            this.currentDataBase.forEach(item=> {
                var isSetSuccess=false;
                for(var i=0;i<this.colorList.length;i++){
                    if(!this.colorList[i].use){
                        this.colorList[i].use=true;
                        item.bindColor=this.colorList[i].color;
                        isSetSuccess=true;
                        break;
                    }
                }
                if(!isSetSuccess){
                    item.bindColor=this.colorList[3].color;
                }
            });

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
        },
        /*有日期被点击*/
        dayClick(value){
            console.log(value);
        }
    },
    created(){
        var d = new Date();
        this.startYear=d.getFullYear();
        this.startMonth=d.getMonth()+1;
        this.currentYear= this.startYear;
        this.currentMonth= this.startMonth;
        this.week=d.getDay();
        this.startDay=d.getDate();
        this.day=this.startDay;
        this.initdateCellList(this.currentYear,this.currentMonth);

        for(var i=0;i<7;i++){
            this.dateCellWeekDay.push({occupy:[],remain:0});
        }

        this.bindColorWithName();
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
                cursor: pointer;
                .DateDay{
                    text-align: right;
                    span{
                        padding: 0px 4px;
                    }
                }
                .DateMessage{
                    div:not([moreButton]){
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
                opacity: 0.3;
            }
            >.dateCellList[monthType="nextMonth"]{
                background-color:#b1b1b17a;
                opacity: 0.3;
            }
            >.dateCellList[monthType="lastMonth"][monthMinus="1"][yearMinus="0"][currentDay]{
                background-color:#aad4ff7a;
                opacity: 0.8;
            }
            >.dateCellList[monthType="currentMonth"][monthMinus="0"][yearMinus="0"][currentDay]{
                background-color:#aad4ff7a;
            }
        }
    }
}
.calendarFoot{
    width:calc(100% - 4px);
    padding: @calendarPdding;
    height:@footHeight;
}
.icon{
    width: 40px;
    height: 40px;
    cursor: pointer;
}
</style>
