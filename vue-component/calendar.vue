<template>
    <div class="calendarContainer">
        <div class="calendarHeader">
            <div @click="monthMinus">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-arrow-left-bold"></use>
                </svg>
            </div>
            <div>
                <div class="datesScrollYearContainer">
                    <div class="dateScrollBoxYear" :yearNumber1="currentYearArray[0]">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                    </div>
                    <div class="dateScrollBoxYear" :yearNumber2="currentYearArray[1]">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                    </div>
                    <div class="dateScrollBoxYear" :yearNumber3="currentYearArray[2]">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                    </div>
                    <div class="dateScrollBoxYear" :yearNumber4="currentYearArray[3]">
                        <span>0</span>
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                    </div>
                </div>
                <div class="dateWidthBoxContainer"><span>年</span></div>
                <div class="dateWidthBoxContainer">
                    <div class="dateScrollBoxMonth" :currentMonth="currentMonth">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                        <span>6</span>
                        <span>7</span>
                        <span>8</span>
                        <span>9</span>
                        <span>10</span>
                        <span>11</span>
                        <span>12</span>
                    </div>
                </div>
                <div class="dateWidthBoxContainer"><span>月</span></div>
                <!-- <span>{{currentYear}}年{{currentMonth}}月</span> -->
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
                <!-- div>div.dateCellList[@click="dayClick(currentDateCellWeekDay[$@28])" :monthType="dateCellMonthType[$]" :weekType="dateCellWeekType[$]" :currentDay="dateCellList[$]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth"]*7>div.DateDay>span{{{dateCellList[$@28]}}}+^div.DateMessage>template[v-for="(data,index) in currentDateCellWeekDay[$@28].occupy"]>div[v-if=index<2 :style=data.bindColor]{{{data.name}}}+^div[moreButton v-if=currentDateCellWeekDay[$@28].remain!=0]{+{{currentDateCellWeekDay[$@28].remain}}} -->
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[0])" :monthType="dateCellMonthType[0]" :weekType="dateCellWeekType[0]" :currentDay="dateCellList[0]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[0]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[0].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[0].remain!=0">+{{currentDateCellWeekDay[0].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[1])" :monthType="dateCellMonthType[1]" :weekType="dateCellWeekType[1]" :currentDay="dateCellList[1]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[1]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[1].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[1].remain!=0">+{{currentDateCellWeekDay[1].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[2])" :monthType="dateCellMonthType[2]" :weekType="dateCellWeekType[2]" :currentDay="dateCellList[2]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[2]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[2].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[2].remain!=0">+{{currentDateCellWeekDay[2].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[3])" :monthType="dateCellMonthType[3]" :weekType="dateCellWeekType[3]" :currentDay="dateCellList[3]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[3]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[3].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[3].remain!=0">+{{currentDateCellWeekDay[3].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[4])" :monthType="dateCellMonthType[4]" :weekType="dateCellWeekType[4]" :currentDay="dateCellList[4]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[4]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[4].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[4].remain!=0">+{{currentDateCellWeekDay[4].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[5])" :monthType="dateCellMonthType[5]" :weekType="dateCellWeekType[5]" :currentDay="dateCellList[5]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[5]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[5].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[5].remain!=0">+{{currentDateCellWeekDay[5].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[6])" :monthType="dateCellMonthType[6]" :weekType="dateCellWeekType[6]" :currentDay="dateCellList[6]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[6]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[6].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[6].remain!=0">+{{currentDateCellWeekDay[6].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[7])" :monthType="dateCellMonthType[7]" :weekType="dateCellWeekType[7]" :currentDay="dateCellList[7]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[7]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[7].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[7].remain!=0">+{{currentDateCellWeekDay[7].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[8])" :monthType="dateCellMonthType[8]" :weekType="dateCellWeekType[8]" :currentDay="dateCellList[8]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[8]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[8].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[8].remain!=0">+{{currentDateCellWeekDay[8].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[9])" :monthType="dateCellMonthType[9]" :weekType="dateCellWeekType[9]" :currentDay="dateCellList[9]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[9]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[9].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[9].remain!=0">+{{currentDateCellWeekDay[9].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[10])" :monthType="dateCellMonthType[10]" :weekType="dateCellWeekType[10]" :currentDay="dateCellList[10]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[10]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[10].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[10].remain!=0">+{{currentDateCellWeekDay[10].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[11])" :monthType="dateCellMonthType[11]" :weekType="dateCellWeekType[11]" :currentDay="dateCellList[11]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[11]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[11].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[11].remain!=0">+{{currentDateCellWeekDay[11].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[12])" :monthType="dateCellMonthType[12]" :weekType="dateCellWeekType[12]" :currentDay="dateCellList[12]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[12]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[12].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[12].remain!=0">+{{currentDateCellWeekDay[12].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[13])" :monthType="dateCellMonthType[13]" :weekType="dateCellWeekType[13]" :currentDay="dateCellList[13]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[13]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[13].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[13].remain!=0">+{{currentDateCellWeekDay[13].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[14])" :monthType="dateCellMonthType[14]" :weekType="dateCellWeekType[14]" :currentDay="dateCellList[14]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[14]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[14].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[14].remain!=0">+{{currentDateCellWeekDay[14].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[15])" :monthType="dateCellMonthType[15]" :weekType="dateCellWeekType[15]" :currentDay="dateCellList[15]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[15]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[15].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[15].remain!=0">+{{currentDateCellWeekDay[15].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[16])" :monthType="dateCellMonthType[16]" :weekType="dateCellWeekType[16]" :currentDay="dateCellList[16]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[16]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[16].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[16].remain!=0">+{{currentDateCellWeekDay[16].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[17])" :monthType="dateCellMonthType[17]" :weekType="dateCellWeekType[17]" :currentDay="dateCellList[17]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[17]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[17].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[17].remain!=0">+{{currentDateCellWeekDay[17].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[18])" :monthType="dateCellMonthType[18]" :weekType="dateCellWeekType[18]" :currentDay="dateCellList[18]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[18]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[18].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[18].remain!=0">+{{currentDateCellWeekDay[18].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[19])" :monthType="dateCellMonthType[19]" :weekType="dateCellWeekType[19]" :currentDay="dateCellList[19]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[19]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[19].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[19].remain!=0">+{{currentDateCellWeekDay[19].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[20])" :monthType="dateCellMonthType[20]" :weekType="dateCellWeekType[20]" :currentDay="dateCellList[20]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[20]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[20].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[20].remain!=0">+{{currentDateCellWeekDay[20].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[21])" :monthType="dateCellMonthType[21]" :weekType="dateCellWeekType[21]" :currentDay="dateCellList[21]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[21]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[21].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[21].remain!=0">+{{currentDateCellWeekDay[21].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[22])" :monthType="dateCellMonthType[22]" :weekType="dateCellWeekType[22]" :currentDay="dateCellList[22]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[22]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[22].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[22].remain!=0">+{{currentDateCellWeekDay[22].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[23])" :monthType="dateCellMonthType[23]" :weekType="dateCellWeekType[23]" :currentDay="dateCellList[23]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[23]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[23].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[23].remain!=0">+{{currentDateCellWeekDay[23].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[24])" :monthType="dateCellMonthType[24]" :weekType="dateCellWeekType[24]" :currentDay="dateCellList[24]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[24]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[24].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[24].remain!=0">+{{currentDateCellWeekDay[24].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[25])" :monthType="dateCellMonthType[25]" :weekType="dateCellWeekType[25]" :currentDay="dateCellList[25]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[25]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[25].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[25].remain!=0">+{{currentDateCellWeekDay[25].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[26])" :monthType="dateCellMonthType[26]" :weekType="dateCellWeekType[26]" :currentDay="dateCellList[26]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[26]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[26].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[26].remain!=0">+{{currentDateCellWeekDay[26].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[27])" :monthType="dateCellMonthType[27]" :weekType="dateCellWeekType[27]" :currentDay="dateCellList[27]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[27]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[27].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[27].remain!=0">+{{currentDateCellWeekDay[27].remain}}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[28])" :monthType="dateCellMonthType[28]" :weekType="dateCellWeekType[28]" :currentDay="dateCellList[28]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[28]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[28].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[28].remain!=0">+{{currentDateCellWeekDay[28].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[29])" :monthType="dateCellMonthType[29]" :weekType="dateCellWeekType[29]" :currentDay="dateCellList[29]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[29]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[29].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[29].remain!=0">+{{currentDateCellWeekDay[29].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[30])" :monthType="dateCellMonthType[30]" :weekType="dateCellWeekType[30]" :currentDay="dateCellList[30]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[30]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[30].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[30].remain!=0">+{{currentDateCellWeekDay[30].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[31])" :monthType="dateCellMonthType[31]" :weekType="dateCellWeekType[31]" :currentDay="dateCellList[31]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[31]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[31].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[31].remain!=0">+{{currentDateCellWeekDay[31].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[32])" :monthType="dateCellMonthType[32]" :weekType="dateCellWeekType[32]" :currentDay="dateCellList[32]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[32]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[32].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[32].remain!=0">+{{currentDateCellWeekDay[32].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[33])" :monthType="dateCellMonthType[33]" :weekType="dateCellWeekType[33]" :currentDay="dateCellList[33]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[33]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[33].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[33].remain!=0">+{{currentDateCellWeekDay[33].remain}}</div>
                        </div>
                    </div>
                    <div class="dateCellList" @click="dayClick(currentDateCellWeekDay[34])" :monthType="dateCellMonthType[34]" :weekType="dateCellWeekType[34]" :currentDay="dateCellList[34]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[34]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[34].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[34].remain!=0">+{{currentDateCellWeekDay[34].remain}}</div>
                        </div>
                    </div>
                    <div v-if="isShowHideDay1" class="dateCellList" @click="dayClick(currentDateCellWeekDay[35])" :monthType="dateCellMonthType[35]" :weekType="dateCellWeekType[35]" :currentDay="dateCellList[34]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[35]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[35].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[35].remain!=0">+{{currentDateCellWeekDay[35].remain}}</div>
                        </div>
                    </div>
                    <div v-if="isShowHideDay2" class="dateCellList" @click="dayClick(currentDateCellWeekDay[36])" :monthType="dateCellMonthType[36]" :weekType="dateCellWeekType[36]" :currentDay="dateCellList[36]==this.startDay" :yearMinus="currentYear-startYear" :monthMinus="currentMonth-startMonth">
                        <div class="DateDay"><span>{{dateCellList[36]}}</span></div>
                        <div class="DateMessage">
                            <template v-for="(data,index) in currentDateCellWeekDay[36].occupy">
                                <div v-if="index<2" :style="data.bindColor">{{data.name}}</div>
                            </template>
                            <div moreButton="" v-if="currentDateCellWeekDay[36].remain!=0">+{{currentDateCellWeekDay[36].remain}}</div>
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
            //日期类型:值类型[lastMonth,currentMonth,nextMonth]
            dateCellMonthType:[],
            //星期类型:值类型[1,2,3,4,5,6,7]
            dateCellWeekType:[],
            //占用情况的列表
            dateCellWeekDay:[],
            isShowHideDay1:false,
            isShowHideDay2:false,
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
            this.dateCellWeekDay.forEach((item, i) => {
                item.occupy.splice(0);
                item.remain=0;
            });

            //2.对数组进行赋值
            this.currentDataBase.forEach(item1=>{
                //判断是否是当前的年份
                if(item1.year == this.currentYear){
                    var lastMonthAble=false;
                    var currentMonthAble=false;
                    var nextMonthAble=false;
                    if(item1.startMonth<=this.currentMonth-1&&item1.endMonth>=this.currentMonth){
                        lastMonthAble=true;
                    }

                    if(item1.startMonth<=this.currentMonth&&item1.endMonth>=this.currentMonth){
                        currentMonthAble=true;
                    }

                    if(item1.startMonth<=this.currentMonth&&item1.endMonth>=this.currentMonth+1){
                        nextMonthAble=true;
                    }

                    this.dateCellMonthType.forEach((item2, i) => {
                        if(item1.week[this.dateCellWeekType[i]]){
                            if(item2==="lastMonth"){
                                if(lastMonthAble){
                                    this.dateCellWeekDay[i].occupy.push({name:item1.name,bindColor:`background-color:${item1.bindColor}`,timeSpan:[{s:"1:00",e:"2:00"}]});
                                }
                            }else if(item2==="currentMonth"){
                                if(currentMonthAble){
                                    this.dateCellWeekDay[i].occupy.push({name:item1.name,bindColor:`background-color:${item1.bindColor}`,timeSpan:[{s:"1:00",e:"2:00"}]});
                                }
                            }else{
                                if(nextMonthAble){
                                    this.dateCellWeekDay[i].occupy.push({name:item1.name,bindColor:`background-color:${item1.bindColor}`,timeSpan:[{s:"1:00",e:"2:00"}]});
                                }
                            }
                        }

                    });
                }

            });

            //3.计算无法显示出来的个数
            this.dateCellWeekDay.forEach((item, i) => {
                if(item.occupy.length>2){
                    item.remain=item.occupy.length-2;
                }
            });
            return this.dateCellWeekDay;
        },
        currentYearArray(){
            var array=[];
            var year=this.currentYear.toString();
            array.push(year.slice(0,1));
            array.push(year.slice(1,2));
            array.push(year.slice(2,3));
            array.push(year.slice(3,4));
            return array;
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
            this.dateCellMonthType.splice(0);
            let currentDate = new Date(year);
            //今天是星期几
            var week;
            //这个月有多少天
            var currentMonthDay;
            //上个月有多少天
            var lastMonthDay;
            //用来记录当前到星期几了
            var tempWeek;
            //总共的日期是与35天的差值
            var dayMinus;
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
                this.dateCellWeekType[i]=tempWeek+1;
                tempWeek++;
                if(tempWeek>6){
                    tempWeek=0;
                }
            }

            tempWeek=week;
            for(let i=0;i<currentMonthDay;i++){
                this.dateCellList[week+i]=i+1;
                this.dateCellMonthType[week+i]="currentMonth";
                this.dateCellWeekType[week+i]=tempWeek+1;
                tempWeek++;
                if(tempWeek>6){
                    tempWeek=0;
                }
            }

            dayMinus=currentMonthDay+week-35;
            if(dayMinus==1){
                this.isShowHideDay1=true;
            }else if(dayMinus==2){
                this.isShowHideDay1=true;
                this.isShowHideDay2=true;
            }else{
                this.isShowHideDay1=false;
                this.isShowHideDay2=false;
            }

            for(let i=currentMonthDay+week;i<35;i++){
                this.dateCellList[i]=i-(currentMonthDay+week)+1;
                this.dateCellMonthType[i]="nextMonth";
                this.dateCellWeekType[i]=tempWeek+1;
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

        for(var i=0;i<37;i++){
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
@headDivChild_2Height:30px;
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
        height: @headDivChild_2Height;
        display:flex;
        justify-content: center;
        align-items: center;

        .datesScrollYearContainer{
            width: 50px;
            height: 100%;
            overflow: hidden;
            display: flex;
            flex-flow: row;
            justify-content: content;
            align-items: flex-start;
            .dateScrollBoxYear{
                width: 25%;
                display:flex;
                flex-flow:column;
                overflow: hidden;
                justify-content: center;
                align-items: center;
                transition-property: all;
                transition-duration: 1s;
                transition-timing-function:cubic-bezier(0.06, 0.49, 0.47, 1.21);
                transition-delay: 0s;
                >span{
                    width: 100%;
                    height:@headDivChild_2Height;
                }
            }
            .dateScrollBoxYear[yearNumber1="0"]{
                transform: translateY(0);
            }
            .dateScrollBoxYear[yearNumber1="1"]{
                transform: translateY(-@headDivChild_2Height);
            }
            .dateScrollBoxYear[yearNumber1="2"]{
                transform: translateY(-@headDivChild_2Height*2);
            }
            .dateScrollBoxYear[yearNumber1="3"]{
                transform: translateY(-@headDivChild_2Height*3);
            }
            .dateScrollBoxYear[yearNumber1="4"]{
                transform: translateY(-@headDivChild_2Height*4);
            }
            .dateScrollBoxYear[yearNumber1="5"]{
                transform: translateY(-@headDivChild_2Height*5);
            }
            .dateScrollBoxYear[yearNumber1="6"]{
                transform: translateY(-@headDivChild_2Height*6);
            }
            .dateScrollBoxYear[yearNumber1="7"]{
                transform: translateY(-@headDivChild_2Height*7);
            }
            .dateScrollBoxYear[yearNumber1="8"]{
                transform: translateY(-@headDivChild_2Height*8);
            }
            .dateScrollBoxYear[yearNumber1="9"]{
                transform: translateY(-@headDivChild_2Height*9);
            }
            .dateScrollBoxYear[yearNumber2="0"]{
                transform: translateY(0);
            }
            .dateScrollBoxYear[yearNumber2="1"]{
                transform: translateY(-@headDivChild_2Height);
            }
            .dateScrollBoxYear[yearNumber2="2"]{
                transform: translateY(-@headDivChild_2Height*2);
            }
            .dateScrollBoxYear[yearNumber2="3"]{
                transform: translateY(-@headDivChild_2Height*3);
            }
            .dateScrollBoxYear[yearNumber2="4"]{
                transform: translateY(-@headDivChild_2Height*4);
            }
            .dateScrollBoxYear[yearNumber2="5"]{
                transform: translateY(-@headDivChild_2Height*5);
            }
            .dateScrollBoxYear[yearNumber2="6"]{
                transform: translateY(-@headDivChild_2Height*6);
            }
            .dateScrollBoxYear[yearNumber2="7"]{
                transform: translateY(-@headDivChild_2Height*7);
            }
            .dateScrollBoxYear[yearNumber2="8"]{
                transform: translateY(-@headDivChild_2Height*8);
            }
            .dateScrollBoxYear[yearNumber2="9"]{
                transform: translateY(-@headDivChild_2Height*9);
            }
            .dateScrollBoxYear[yearNumber3="0"]{
                transform: translateY(0);
            }
            .dateScrollBoxYear[yearNumber3="1"]{
                transform: translateY(-@headDivChild_2Height);
            }
            .dateScrollBoxYear[yearNumber3="2"]{
                transform: translateY(-@headDivChild_2Height*2);
            }
            .dateScrollBoxYear[yearNumber3="3"]{
                transform: translateY(-@headDivChild_2Height*3);
            }
            .dateScrollBoxYear[yearNumber3="4"]{
                transform: translateY(-@headDivChild_2Height*4);
            }
            .dateScrollBoxYear[yearNumber3="5"]{
                transform: translateY(-@headDivChild_2Height*5);
            }
            .dateScrollBoxYear[yearNumber3="6"]{
                transform: translateY(-@headDivChild_2Height*6);
            }
            .dateScrollBoxYear[yearNumber3="7"]{
                transform: translateY(-@headDivChild_2Height*7);
            }
            .dateScrollBoxYear[yearNumber3="8"]{
                transform: translateY(-@headDivChild_2Height*8);
            }
            .dateScrollBoxYear[yearNumber3="9"]{
                transform: translateY(-@headDivChild_2Height*9);
            }
            .dateScrollBoxYear[yearNumber4="0"]{
                transform: translateY(0);
            }
            .dateScrollBoxYear[yearNumber4="1"]{
                transform: translateY(-@headDivChild_2Height);
            }
            .dateScrollBoxYear[yearNumber4="2"]{
                transform: translateY(-@headDivChild_2Height*2);
            }
            .dateScrollBoxYear[yearNumber4="3"]{
                transform: translateY(-@headDivChild_2Height*3);
            }
            .dateScrollBoxYear[yearNumber4="4"]{
                transform: translateY(-@headDivChild_2Height*4);
            }
            .dateScrollBoxYear[yearNumber4="5"]{
                transform: translateY(-@headDivChild_2Height*5);
            }
            .dateScrollBoxYear[yearNumber4="6"]{
                transform: translateY(-@headDivChild_2Height*6);
            }
            .dateScrollBoxYear[yearNumber4="7"]{
                transform: translateY(-@headDivChild_2Height*7);
            }
            .dateScrollBoxYear[yearNumber4="8"]{
                transform: translateY(-@headDivChild_2Height*8);
            }
            .dateScrollBoxYear[yearNumber4="9"]{
                transform: translateY(-@headDivChild_2Height*9);
            }
        }
        .dateWidthBoxContainer{
            width: 50px;
            height: 100%;
            overflow: hidden;
            .dateScrollBoxMonth{
                width: 100%;
                display:flex;
                flex-flow:column;
                overflow: hidden;
                transition-property: all;
                transition-duration: 1s;
                transition-timing-function:cubic-bezier(0.06, 0.49, 0.47, 1.21);
                transition-delay: 0s;
                >span{
                    width: 100%;
                    height:@headDivChild_2Height;
                }
            }
            .dateScrollBoxMonth[currentMonth="1"]{
                transform: translateY(0);
            }
            .dateScrollBoxMonth[currentMonth="2"]{
                transform: translateY(-@headDivChild_2Height);
            }
            .dateScrollBoxMonth[currentMonth="3"]{
                transform: translateY(-@headDivChild_2Height*2);
            }
            .dateScrollBoxMonth[currentMonth="4"]{
                transform: translateY(-@headDivChild_2Height*3);
            }
            .dateScrollBoxMonth[currentMonth="5"]{
                transform: translateY(-@headDivChild_2Height*4);
            }
            .dateScrollBoxMonth[currentMonth="6"]{
                transform: translateY(-@headDivChild_2Height*5);
            }
            .dateScrollBoxMonth[currentMonth="7"]{
                transform: translateY(-@headDivChild_2Height*6);
            }
            .dateScrollBoxMonth[currentMonth="8"]{
                transform: translateY(-@headDivChild_2Height*7);
            }
            .dateScrollBoxMonth[currentMonth="9"]{
                transform: translateY(-@headDivChild_2Height*8);
            }
            .dateScrollBoxMonth[currentMonth="10"]{
                transform: translateY(-@headDivChild_2Height*9);
            }
            .dateScrollBoxMonth[currentMonth="11"]{
                transform: translateY(-@headDivChild_2Height*10);
            }
            .dateScrollBoxMonth[currentMonth="12"]{
                transform: translateY(-@headDivChild_2Height*11);
            }
        }

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
                border-color:green;
            }
            >.dateCellList[monthType="currentMonth"][monthMinus="0"][yearMinus="0"][currentDay]{
                background-color:#aad4ff7a;
                border-color:green;
            }
            >.dateCellList[monthType="nextMonth"][monthMinus="-1"][yearMinus="0"][currentDay]{
                background-color:#aad4ff7a;
                opacity: 0.8;
                border-color:green;
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
