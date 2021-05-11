<template>
    <div class="pageContainer">
        <div class="headerContainer">
            <div class="switchbox" @click="switchToTarget(-1)" :style="computedSwicth(-1)"><span>默认</span></div>
            <template v-for="targetData in targetSearchDatas">
                <div class="switchbox" @click="switchToTarget(targetData.bindID)" :style="computedSwicth(targetData.bindID)"><span>搜索{{targetData.bindID}}</span></div>
            </template>
        </div>
        <div class="resultContainer">
            <div class="innerContainer">
                <template v-for="data in searchPageDatas.datas">
                    <div class="resultContainerShow" :state="data.state">
                        <div>
                            <!-- 房间的标题 -->
                            <span class="title" @click="toggleRoomTitle(data)" v-if="data.title==data.room" active>
                                {{data.room}}
                            </span>
                            <span class="title" @click="toggleRoomTitle(data)" v-else disactive>
                                {{data.build}}
                            </span>
                            <!-- 小教室的标题 -->
                            <span class="smallTitle">教室软件:</span>
                            <!-- 包含所有软件的一个div -->
                            <div class="smallContainer">
                                <template v-for="software in data.softwares.datas">
                                    <span class="ele" :type="software.type" v-if="software.page==data.softwares.currentPage">{{software.name}}->[{{software.system}}]</span>
                                </template>
                                <div class="bottomContainer">
                                    <span @click="resultItemPagePrevious(data.softwares)"><</span>
                                    <div>
                                        <span>{{data.softwares.currentPage}}</span>
                                        <span>/</span>
                                        <span>{{data.softwares.maxPage}}</span>
                                    </div>
                                    <span @click="resultItemPageNext(data.softwares)">></span>
                                </div>
                            </div>
                        </div>
                        <!-- 存在于房间信息底部的区域 -->
                        <div>
                            <sbutton @mdEvent="applyManager.initData(data.build,data.room)">申请</sbutton>
                            <template v-if="userLevel==2">
                                <sbutton @mdEvent="modifyRoom(data)" class="vertical-center">
                                    修改
                                </sbutton>
                                <sbutton @mdEvent="deleteRoom(data)" class="vertical-center">
                                    删除
                                </sbutton>
                            </template>
                        </div>
                    </div>
                </template>
                <p v-if="searchPageDatas.maxTotal==searchPageDatas.currentTotal">已经到底了。。。</p>
            </div>
        </div>
        <div class="operateBox" :state="modifyBoxState">
            <div>
                <label class="boxLabel">教室名称:</label><span>{{modifyData.room}}</span>
                <br>
                <label class="boxLabel">所属教学楼:</label><span>{{modifyData.build}}</span>
                <br>
                <label class="boxLabel">附加信息:</label>
                <input type="text" v-model="modifyData.appendMsg">
                <span>*非必填项</span>
                <br>
                <label class="boxLabel">正常使用:</label>
                <input type="checkbox" v-model="modifyData.useable">
                <br>
                <label class="boxLabel">人数:</label>
                <input type="text" v-model="modifyData.peopleCpa">
                <br>
                <label class="boxLabel">软件名称:</label>
                <input type="text" v-model="modifyData.tname">
                <label>保持:</label>
                <input type="checkbox" v-model="modifyData.savename">
                <br>
                <label class="boxLabel">系统:</label>
                <input type="text" v-model="modifyData.tsystem">
                <label>保持:</label>
                <input type="checkbox" v-model="modifyData.savesystem">
                <br>
                <div class="textRightBox">
                    <sbutton @mdEvent="addSoftwareMsg('modifySoftware')">添加软件</sbutton>
                </div>
                <div class="softwareListShowWindow">
                    <div class="widthBox" style="z-index: 2;width: 100%">
                        <span>
                            软件名称
                        </span>
                        <span>
                            所属系统
                        </span>
                    </div>
                    <div>
                        <template v-for="sortwareMsg in modifyData.softwares">
                            <div class="widthBox" :state="sortwareMsg.state">
                                <span>
                                    {{sortwareMsg.name}}
                                </span>
                                <span>
                                    {{sortwareMsg.system}}
                                    <span @click="delteFromtsoftwares({'id':sortwareMsg.id,'target':'modifySoftware'})">
                                        X
                                    </span>
                                </span>
                            </div>
                        </template>
                    </div>
                </div>
                <div>
                    <sbutton @mdEvent="postSoftWareMsg('modifySoftware')" style="margin: 0px 40px 0px 40px">提交更新</sbutton>
                </div>
            </div>
            <div class="bgcolor" style="background-color:rgb(251 255 222);opacity: 0.95;"></div>
            <div class="exit-button" @click="setFlowBoxWindowState('modifyBox','hide')">X</div>
        </div>
        <div id="addSoftWareBox" class="operateBox" :state="softWareBoxState" v-show="userLevel==2">
            <div>
                <label class="boxLabel">教室名称:</label>
                <input type="text" v-model="tData.room">
                <br>
                <label class="boxLabel">所属教学楼:</label>
                <input type="text" v-model="tData.build">
                <br>
                <label class="boxLabel">附加信息:</label>
                <input type="text" v-model="tData.appendMsg">
                <span>*非必填项</span>
                <br>
                <label class="boxLabel">正常使用:</label>
                <input type="checkbox" v-model="tData.useable">
                <br>
                <label class="boxLabel">人数:</label>
                <input type="text" v-model="tData.peopleCpa">
                <br>
                <label class="boxLabel">软件名称:</label>
                <input type="text" v-model="tData.tname">
                <label>保持:</label>
                <input type="checkbox" v-model="tData.savename">
                <br>
                <label class="boxLabel">系统:</label>
                <input type="text" v-model="tData.tsystem">
                <label>保持:</label>
                <input type="checkbox" v-model="tData.savesystem">
                <br>
                <div class="textRightBox">
                    <sbutton @mdEvent="addSoftwareMsg('newSoftware')">添加软件</sbutton>
                </div>
                <div class="softwareListShowWindow">
                    <div class="widthBox" style="z-index: 2;width: 100%">
                        <span>
                            软件名称
                        </span>
                        <span>
                            所属系统
                        </span>
                    </div>
                    <div>
                        <template v-for="sortwareMsg in tData.softwares">
                            <div class="widthBox" :state="sortwareMsg.state">
                                <span>
                                    {{sortwareMsg.name}}
                                </span>
                                <span>
                                    {{sortwareMsg.system}}
                                    <span @click="delteFromtsoftwares({'id':sortwareMsg.id,'target':'newSoftware'})">
                                        X
                                    </span>
                                </span>
                            </div>
                        </template>
                    </div>
                </div>
                <div>
                    <sbutton @mdEvent="postSoftWareMsg('newSoftware')" style="margin: 0px 40px 0px 40px">上传</sbutton>

                    <sbutton @mdEvent="resetSoftwareMsgWindow(true)" style="margin: 0px 40px 0px 40px">重置</sbutton>
                </div>
            </div>
            <div class="bgcolor" style="background-color:rgb(251 255 222);opacity: 0.95;"></div>
            <div class="exit-button" @click="setFlowBoxWindowState('addSoftWareBox','hide')">X</div>
        </div>
        <div id="applyBox" class="operateBox" :state="applyManager.containerWindowState" >
            <span class="title" @click="toggleRoomTitle(applyManager.data)" v-if="applyManager.data.title==applyManager.data.room" active>
                {{applyManager.data.room}}
            </span>
            <span class="title" @click="toggleRoomTitle(applyManager.data)" v-else disactive>
                {{applyManager.data.build}}
            </span>
            <br>
            <div id="fullcalendarContainer">
                <calendar :dataBase="applyManager.data.useStateList" :calendarMiddleAbsoluteWindowState="applyManager.applyWindowState=='show'">
					<template v-slot:calendarFoot><sbutton @mdEvent="applyManager.setApplyRoomWindow('show')">使用申请</sbutton></template>
					<template v-slot:calendarMiddleAbsoluteWindow>
						<div v-if="applyManager.applyWindowState=='show'" id="applyRoomWindow">
							<div>
								<div><label>开始日期: </label><input type="date" v-model="applyManager.applyForm.startDate"  @change="applyManager.dateChange('startDate')"/></div>
								<div><label>结束日期: </label><input type="date" v-model="applyManager.applyForm.endDate"  @change="applyManager.dateChange('endDate')"/></div>
								<div><label>时间段: </label><input type="time" v-model="applyManager.applyForm.startTime"/> -> <input type="time" v-model="applyManager.applyForm.endTime"/></div>
								<div>
								    <span>周一<input name="week" type="checkbox" value="1" v-model="applyManager.applyForm.week.mon"/></span>
								    <span>周二<input name="week" type="checkbox" value="2" v-model="applyManager.applyForm.week.tue"/></span>
								    <span>周三<input name="week" type="checkbox" value="3" v-model="applyManager.applyForm.week.wed"/></span>
								    <span>周四<input name="week" type="checkbox" value="4" v-model="applyManager.applyForm.week.thur"/></span>
								    <span>周五<input name="week" type="checkbox" value="5" v-model="applyManager.applyForm.week.fri"/></span>
								    <span>周六<input name="week" type="checkbox" value="6" v-model="applyManager.applyForm.week.sat"/></span>
								    <span>周日<input name="week" type="checkbox" value="7" v-model="applyManager.applyForm.week.sun"/></span>
								</div>
								<div>申请理由:</div>
								<textarea v-model="applyManager.applyForm.reason"></textarea>
							</div>
							<div>
								<sbutton @mdEvent="applyManager.postForm()">提交</sbutton>
								<sbutton @mdEvent="applyManager.setApplyRoomWindow('hide')">取消</sbutton>
								<sbutton @mdEvent="applyManager.resetApplyForm()">重置</sbutton>
							</div>
						</div>
					</template>
				</calendar>
            </div>
            <div class="bgcolor" style="background-color:rgb(255 255 255);opacity: 0.95;"></div>
            <div class="exit-button" @click="applyManager.setApplyContainer('hide')">X</div>
        </div>
        <div class="flowSearchBox" :state="searchManager.windowState" @click="searchManager.setWindowState('show')">
            <form method="post">
                <div class="inputContainer">
                    <vmy-input ctitle="软件名" ctype="1" @onFocus="searchManager.setFocus(true)" @lostFocus="searchManager.setFocus(false)" @valueChange="searchManager.setData($event,'softwareName')" :clearSign="searchManager.clearSign"></vmy-input>
                </div>
                <div class="inputContainer">
                    <vmy-input ctitle="教室" ctype="2" @onFocus="searchManager.setFocus(true)" @lostFocus="searchManager.setFocus(false)" @valueChange="searchManager.setData($event,'room')" :clearSign="searchManager.clearSign"></vmy-input>
                    <vmy-input ctitle="教学楼" ctype="2" @onFocus="searchManager.setFocus(true)" @lostFocus="searchManager.setFocus(false)" @valueChange="searchManager.setData($event,'build')" :clearSign="searchManager.clearSign"></vmy-input>
                </div>
                <div class="inputContainer">
                    <vmy-input ctitle="人数" ctype="3" @onFocus="searchManager.setFocus(true)" @lostFocus="searchManager.setFocus(false)" @valueChange="searchManager.setData($event,'peopleCpa')" :clearSign="searchManager.clearSign"></vmy-input>
                </div>
                <div class="inputContainer1">
                    <label>开始日期:</label><input  type="date" v-model="searchManager.data.startDate"/>
                </div>
                <div class="inputContainer1">
                    <label>结束日期:</label><input  type="date" v-model="searchManager.data.endDate" :min="searchManager.data.startDate"/>
                </div>
                <div class="inputContainer1" id="timeSpanInput">
                    <div class="margin-right">
                        <template v-for="(item,index) in searchManager.data.timeSpan">
                            <label >时间段:
                                <input type="time" v-model="item.start" />
                                -
                                <input  type="time" v-model="item.end" :min="item.start"/>
                            </label>
                            <span v-if="index>=1" class="deleteButton" @click="searchManager.removeTimeSpan(index)">
                                X
                            </span>
                        </template>
                    </div>
                    <sbutton @mdEvent="searchManager.addTimeSpan()">+</sbutton>
                </div>
                <div class="inputContainer1">
                    <label>周一<input name="week" type="checkbox" value="1" v-model="searchManager.data.week.mon"/></label>
                    <label>周二<input name="week" type="checkbox" value="2" v-model="searchManager.data.week.tue"/></label>
                    <label>周三<input name="week" type="checkbox" value="3" v-model="searchManager.data.week.wed"/></label>
                    <label>周四<input name="week" type="checkbox" value="4" v-model="searchManager.data.week.thur"/></label>
                    <label>周五<input name="week" type="checkbox" value="5" v-model="searchManager.data.week.fri"/></label>
                    <label>周六<input name="week" type="checkbox" value="6" v-model="searchManager.data.week.sat"/></label>
                    <label>周日<input name="week" type="checkbox" value="7" v-model="searchManager.data.week.sun"/></label>
                </div>
                <!-- <button @click="reverseForm()">重置</button> -->
                <sbutton @mdEvent="searchManager.postForm()">搜索</sbutton>
                <template v-if="userLevel==2">
                    <sbutton @mdEvent="setFlowBoxWindowState('addSoftWareBox','show')" class="vertical-center">
                        添加
                    </sbutton>
                </template>
                <input type="reset" @click="searchManager.reverseData()">
            </form>
            <div class="bg">
            </div>
        </div>
    </div>
</template>
<script>
import '../staticCss/myfullcalendar.css';
import $ from "jquery";
import vmyInput from "../vue-component/cinput.vue";
import sbutton from "../vue-component/sbutton.vue";
import exitButton from "../vue-component/exitButton.vue";
import webconfig from "../web.config.js";
import calendar from "../vue-component/calendar.vue";
import md5 from "md5";
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import momentPlugin from '@fullcalendar/moment';
import bootstrapPlugin from '@fullcalendar/bootstrap';
var resultContainer;
var _this;
export default{
    components:{
        vmyInput,
        sbutton,
        exitButton,
        calendar
    },
    data(){
        return {
			//申请窗口对象
			applyManager:{
				//applybox的窗口状态
				containerWindowState:"hide",
				//申请房间窗口当前的状态
				applyWindowState:"hide",
				//从服务器端获取到的房间数据
				data:{
					room:"",
					build:"",
					title:"",
					useStateList:[{
					    name:"张三封",
					    startDate:"2021-01-05",
					    endData:"2021-02-06",
						startTime:"15:36",
						endTime:"17:38",
					    week:[true,false,false,true,false,true,true]
					}],
				},
				//要进行上传的表单数据
				applyForm:{
					room:"",
					build:"",
					startDate:"2021-04-10",
					endDate:"2021-04-11",
					startTime:"15:16",
					endTime:"15:18",
					week:{mon:false,tue:false,wed:false,thur:false,fri:false,sat:false,sun:false},
					reason:"",
				},
				dateChange(dateType){
					//console.log(,);
					const now=new Date();
					const startDate=this.applyForm.startDate;
					const endDate=this.applyForm.endDate;
					const dateMinus=_this.myTools.compareDate(startDate,endDate);
					if(dateMinus>=7){
						return;
					}
					
					if(dateType==="startDate"){
						let tempDate=now.createTime(startDate);
						tempDate.setMonth(tempDate.getMonth()-1);
						tempDate.setDate(tempDate.getDate()+7);
						tempDate=tempDate.format("yyyy-MM-dd");
						this.applyForm.endDate=tempDate;
						return;
					}
					
					if(dateType==="endDate"){
						let tempDate=now.createTime(endDate);
						tempDate.setMonth(tempDate.getMonth()-1);
						tempDate.setDate(tempDate.getDate()-7);
						tempDate=tempDate.format("yyyy-MM-dd");
						this.applyForm.startDate=tempDate;
						return;
					}
					
				},
				/**
				 * 初始化data的数据
				 * @param {Object} build 教学楼的名字
				 * @param {Object} room 房间的名字
				 */
				initData(build,room){
					//初始化表单信息
					this.resetApplyForm();
					//设置日期信息
					let formData=new FormData();
					let skeys=$.cookie('skeys');
					let account=$.cookie('account');
					let opreate="applySearch";
					let md5value=md5(account+room+build+opreate+skeys);
					var thisP=this;
					_this.axios({
					    method: 'get',
					    url: webconfig.address()+"api/Search",
					    params:{
					        "account":account,
					        build,
					        room,
					        md5value,
					        opreate
					    }
					}).then(res=>{
						var reqData=res.data;
					    if(reqData.code==="200"){
							console.log(reqData)
					        thisP.data.room=room;
					        thisP.data.title=room;
					        thisP.data.build=build;
					        thisP.data.useStateList.splice(0);
					        reqData.data.forEach(item=>{
					            thisP.data.useStateList.push({
									name:item.UserName,
									startDate:item.StartDate.substr(0,10),
									endData:item.EndDate.substr(0,10),
									startTime:item.StartTime.substr(11,5),
									endTime:item.EndTime.substr(11,5),
									week:[item.Monday,item.Tuesday,item.Wednesday,item.Thursday,item.Friday,item.Saturday,item.Sunday]
								});
					        });
							
					        thisP.setApplyContainer("show");
							
					    }else{
					        _this.$store.commit("addPromtMessage","获取信息发生异常 : "+res.data.msg);
					    }
						
					}).catch(ex=>{
						console.log(ex);
					    _this.$store.commit("addPromtMessage","获取信息发生异常 : "+ex.message);
					});
					
				},
				/**
				 * 设置申请窗口容器的状态
				 * @param {Object} value
				 */
				setApplyContainer(value){
					if(!value||!(value==="show"||value==="hide")){
						alert("设置格式不正确");
						return;
					}
					
					this.containerWindowState=value;
				},
				/**
				 * 打开申请房间的窗口
				 * */
				setApplyRoomWindow(value){
					if(!value||!(value==="show"||value==="hide")){
						alert("设置格式不正确");
						return;
					}
					
					this.applyWindowState=value;
				},
				/**
				 * 重置表单数据
				 */
				resetApplyForm(){
					var today=new Date();
					this.applyForm.startDate=today.format("yyyy-MM-dd");
					this.applyForm.endDate=today.format("yyyy-MM-dd");
					this.applyForm.startTime=today.format("hh:mm");
					this.applyForm.endTime=today.format("hh:mm");
					this.applyForm.reason="";
					this.applyForm.week.mon=this.applyForm.week.tue=this.applyForm.week.wed=this.applyForm.week.thur=this.applyForm.week.fri=this.applyForm.week.sat=this.applyForm.week.sun=false;
				},
				/**
				 * 上传表单数据到服务器
				 * */
				postForm(){
					if(this.applyForm.startDate.length===0||this.applyForm.endDate.length===0||this.applyForm.startTime.length===0||this.applyForm.endTime.length===0){
						_this.$store.commit('addPromtMessage',"时间输入不能为空");
						return;
					}
					
					if(_this.myTools.compareDate(this.applyForm.startDate,this.applyForm.endDate)<0){
						_this.$store.commit('addPromtMessage',"开始日期不能大于结束日期");
						return;
					}
					
					if(_this.myTools.compareTime(this.applyForm.startTime,this.applyForm.endTime)>0){
						_this.$store.commit('addPromtMessage',"开始时间不能大于结束时间");
						return;
					}
					
					if(!this.applyForm.week.mon&&!this.applyForm.week.tue&&!this.applyForm.week.wed&&!this.applyForm.week.thur&&!this.applyForm.week.fri&&!this.applyForm.week.sat&&!this.applyForm.week.sun){
						_this.$store.commit('addPromtMessage',"请至少选择一天");
						return;
					}
					
					this.applyForm.room=this.data.room;
					this.applyForm.build=this.data.build;
					let skeys=$.cookie('skeys');
					let account=$.cookie('account');
					if(!skeys||!account){
						_this.$store.commit('addPromtMessage',"登陆过期请重新登陆");
						$.cookie('isLogin',false);
						_this.$router.push('/login');
						return;
					}
					
					var applyFromData=JSON.stringify(this.applyForm)
					var formData=new FormData();
					var md5Value=md5(account+applyFromData+skeys);
					formData.append("account",account);
					formData.append("md5value",md5Value);
					formData.append("opreate","apply");
					formData.append("data",applyFromData);
					var thisP=this;
					_this.axios({
					    method: 'post',
					    url: webconfig.address()+"api/Search",
					    data: formData,
					    transformRequest: [
					        function(){
					            return formData;
					        }
					    ],
					    headers: {"Content-Type": "multipart/form-data"}
					}).then((response) => {
						var data=response.data;
						if(data.code==="200"){
							thisP.resetApplyForm();
							thisP.setApplyRoomWindow('hide');
							_this.$store.commit('addPromtMessage',"申请成功，请等待管理员审核，可去”我的“查看申请进度");
						}else{
							_this.$store.commit('addPromtMessage',data.msg);
						}
						
					});
				}
			},
			//搜索框对象
			searchManager:{
				//当前窗口的状态
				windowState:"hide",
				//每次发生改变都会重置data的值
				clearSign:true,
				//当前是否有光标在搜索框上
				isFocus:false,
				isScrollWatch:true,
				data:{
					softwareName:"",
					room:"",
					build:"",
					peopleCpa:0,
					startDate:"",
					endDate:"",
					timeSpan:[{start:"",end:""}],
					week:{mon:false,tue:false,wed:false,thur:false,fri:false,sat:false,sun:false},
				},
				/**
				 * 重置数据
				 */
				reverseData(){
					var now=new Date();
					this.data.week.mon=this.data.week.tue=this.data.week.wed=this.data.week.thur=this.data.week.fri=this.data.week.sat=this.data.week.sun=false;
					this.data.timeSpan.splice(1);
					this.data.timeSpan[0].start="00:00"
					this.data.timeSpan[0].end="23:59";
					this.data.startDate=now.format("yyyy-MM-dd");
					this.data.endDate="2050-11-12";
					this.clearSign=!this.clearSign;
					
				},
				/**
				 * 搜索指定的内容
				 */
				postForm(){
					if(_this.myTools.compareDate(this.data.startDate,this.data.endDate)<0){
						_this.$store.commit('addPromtMessage',"开始时间不能大于结束时间");
						return;
					}
					
					for(var i=0;i<this.data.timeSpan.length;i++){
						if(_this.myTools.compareTime(this.data.timeSpan[i].start,this.data.timeSpan[i].end)<0){
							_this.$store.commit('addPromtMessage',`第${i+1}个时间段,开始时间不能大于结束时间`);
							return;
						}
					}
					
					
					
					
					
					
					
					_this.$store.commit("getData",{opreate:"search",ts:JSON.stringify(this.data)});
				},
				/**
				 * 添加一个时间段
				 */
				addTimeSpan(){
					this.data.timeSpan.push({start:"",end:""});
				},
				/**
				 * 移除一个时间段
				 * @param {Object} index
				 */
				removeTimeSpan(index){
					this.data.timeSpan.splice(index,1);
				},
				/**
				 * 设置搜索窗口当前的状态
				 * @param {Object} value
				 */
				setWindowState(value){
					if(!value||!(value==="show"||value==="hide")){
						alert("设置格式不正确");
						return;
					}
					
					this.windowState=value;
				},
				/**
				 * 设置data的内容
				 * @param {Object} e 事件对象带值
				 * @param {Object} target 修改的目标
				 */
				setData(e,target){
					switch(target){
					    case 'softwareName':
					    this.data.softwareName=e.value;
					    break;
					    case 'room':
					    this.data.room=e.value;
					    break;
					    case 'build':
					    this.data.build=e.value;
					    break;
					    case 'peopleCpa':
					    this.data.peopleCpa=e.value;
					    break;
					}
					
				},
				setFocus(value){
					if("boolean"!==typeof(value)){
						console.log(格式不正确);
						return;
					}
					
					this.isFocus=value;
					if(!this.isFocus){
						this.isScrollWatch=false;
						setTimeout(()=>{
						    this.isScrollWatch=true;
						}, 1000);
						
					}
					
				}
			},
			softWareBoxState:"hide",
			modifyBoxState:"hide",
            /*----新增软件的数据绑定------*/
            tData:{
                room:"",
                build:"",
                peopleCpa:"",
                appendMsg:"",//附加信息
                useable:true,//是否能够使用目前
                tname:"",
                tsystem:"",
                savename:false,
                savesystem:false,
                softwares:[
                    //{name:"Hello world1",system:"13456",id:"1"},
                ],
            },
            /*----修改数据的临时容器*/
            modifyData:{
                room:"",
                build:"",
                peopleCpa:"",
                appendMsg:"",//附加信息
                useable:true,//是否能够使用目前
                tname:"",
                tsystem:"",
                savename:false,
                savesystem:false,
                softwares:[],//原始的软件列表
            },
            /*当前的显示目标*/
            target:-1,
        }
    },
    computed:{
        searchPageDatas(){
            let result;
            if(this.target==-1){
                result=this.$store.state.searchPageDatas;

            }else{
                result=this.targetSearchDatas[this.target];
            }
			
            this.searchManager.setWindowState("hide");
            return result;
        },
        userLevel(){
            return this.$store.state.user.level;
        },
        targetSearchDatas(){
            let sd=this.$store.state.targetSearchDatas;
            if(sd.length>0){
                this.switchToTarget(sd.length-1);
            }
			
            return sd;
        },
    },
    methods:{
        /**
		* 添加一个软件
		* @param {String} target 当前修改的类型 newSoftware modifySoftware
		*/
        addSoftwareMsg(target){
            //modifyData
            let _this=this;
            let data;
            switch(target){
                case "newSoftware":
                data=this.tData;
                break;
                case "modifySoftware":
                data=this.modifyData;
                break;
            }
            ///-----------------判断能否添加
            if(data.tname.length===0||data.tsystem.length==0){
                this.$store.commit('addPromtMessage',"软件名称或系统输入不能为空");
                return;
            }
            try{//判断是否存在相同的软件名称
                data.softwares.forEach(item=>{
                    if(data.tname==item.name&&data.tsystem==item.system){
                        throw new Error("无法添加相同项");
                    }
                });
            }catch(e){
                this.$store.commit('addPromtMessage',e.message);
                return;
            }
            ///---------------结束验证-----------------------
            ///---------------进行插入操作
            data.softwares.push({
                name:data.tname,
                system:data.tsystem,
                id:data.softwares.length+1,
                state:"nromal",
            });
            if(!data.savename)
            data.tname="";
            if(!data.savesystem)
            data.tsystem="";
        },
        computedSwicth(index){
            if(index==this.target){
                return "background-color:#008D57;color:white;";
            }else{
                return "";
            }
        },
		//添加元素的时候，从元素列表中删除元素
		delteFromtsoftwares(value){
		    let data;
		    switch(value.target){
		        case "newSoftware":
		        data=this.tData;
		        break;
		        case "modifySoftware":
		        data=this.modifyData;
		        break;
		    }
			
		    let removeItemIndex;
		    try{
		        data.softwares.forEach((item,index,arr)=>{
		            if(item.id == value.id){
						item.state="hide";
		                removeItemIndex=index;
		                throw new Error("找到元素");
		            }
					
		        });
		    }catch(e){
		        console.log("删除");
		    }
			
		    setTimeout(()=>{
		        data.softwares.splice(removeItemIndex,1);
		    },500);
		},
        switchToTarget(target){
            this.target=target;
        },
        //处理结果的页数
        resultItemPageNext(obj){
            //这里是直接操作对象
            if(obj.currentPage<obj.maxPage){
                obj.currentPage++;
            }else{
                this.$store.commit('addPromtMessage',"已经是最后一页啦！！！");
            }
        },
        //处理结果的页数
        resultItemPagePrevious(obj){
            if(obj.currentPage>1){
                obj.currentPage--;
            }else{
                this.$store.commit('addPromtMessage',"这里是开始的地方！！！");
            }
        },
        //重置添加窗口
        resetSoftwareMsgWindow(promt){
            let data=this.tData;
            if(promt){
                let choice=window.confirm("是否重置信息");
                if (!choice) {
                    return
                }
                this.$store.commit('addPromtMessage',"重置成功");
            }
			
            data.softwares.splice(0,data.softwares.length);
            data.room="";
            data.build="";
            data.peopleCpa="";
            data.tname="";
            data.tsystem="";
            data.appendMsg="";
            data.useable=true;
            data.savename=false;
            data.savesystem=false;
        },
        //上传消息
        postSoftWareMsg(target){
            let _this=this;
            let formData=new FormData();
            let skeys=$.cookie('skeys');
            let account=$.cookie('account');
            let data;
            let md5value;
            switch(target){
                case "modifySoftware":
                data=this.modifyData;
                formData.append('opreate',"update");//代表当前操作时更新
                break;
                case "newSoftware":
                data=this.tData;
                formData.append('opreate',"insert");//代表当前操作时插入
                break;
            }
            if(data.room.length==0||data.build.length==0||data.peopleCpa.length==0){
                this.$store.commit('addPromtMessage',"教室名称,所属教学楼或人数不能为空");
                return;
            }
            let reg=/^\d+$/g;
            if(!reg.test(data.peopleCpa)){
                this.$store.commit('addPromtMessage',"教室人数格式不正确");
                return;
            }
            let softwaresStr=JSON.stringify(data.softwares);
            let room=data.room;
            let build=data.build;
            md5value=md5(account+room+build+data.peopleCpa+data.useable+data.appendMsg+softwaresStr+skeys);
            formData.append('account',account);
            formData.append('md5value',md5value);
            formData.append('room',data.room);
            formData.append('build',data.build);
            formData.append('peopleCpa',data.peopleCpa);
            formData.append('useable',data.useable);
            formData.append('appendMsg',data.appendMsg);
            formData.append('softwareList',softwaresStr);
            this.axios({
                method: 'post',
                url: webconfig.address()+"api/Search",
                data: formData,
                params: formData,
                transformRequest: [
                    function(){
                        return formData;
                    }
                ],
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    console.log('上传 ' + complete);
                }
            }).then((response) => {
                let result=response.data;
                if(result.code=="200"){
                    switch (target){
                        case "modifySoftware":
                        _this.$store.commit('addPromtMessage',"更新成功");
                        _this.$store.commit("opreateRoom",{room,build,"opreate":"modifySoftware","version":result.data.version,"data":data});
                        break;
                        case "newSoftware":
                        _this.$store.commit('addPromtMessage',"上传成功");
                        _this.$store.commit("opreateRoom",{room,build,"opreate":"newSoftware","version":result.data.version,"data":data});
                        let choice=window.confirm("是否保留信息继续添加");
                        //如果不保存信息
                        if (!choice) {
                            _this.setFlowBoxWindowState('addSoftWareBox','hide');
                            _this.resetSoftwareMsgWindow(false);
                        }
                        break;
                    }
                }else{
                    _this.$store.commit('addPromtMessage',result.msg);
                }
            }).catch(x=>{
                _this.$store.commit('addPromtMessage',"更新发生异常");
                console.log(x);
            });
        },
        //删除房间的信息 ！！！此操作不可以撤销
        deleteRoom(data){
            let choice=window.confirm("是否删除此房间，此操作不可撤销");
            //如果不保存信息
            if (!choice) {
                return;
            }
            let formData=new FormData();
            let skeys=$.cookie('skeys');
            let account=$.cookie('account');
            let build=data.build;
            let room=data.room;
            let opreate="delete";
            let md5value=md5(account+build+room+opreate+skeys);
            formData.append('md5value',md5value);
            formData.append('room',room);
            formData.append('build',build);
            formData.append('opreate',opreate);
            formData.append('account',account);
            this.axios({
                method: 'post',
                url: webconfig.address()+"api/Search",
                data: formData,
                params: formData,
                transformRequest: [
                    function(){
                        return formData;
                    }
                ],
                headers: {"Content-Type": "multipart/form-data"},
                onUploadProgress: progressEvent => {
                    let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
                    console.log('上传 ' + complete);
                }
            }).then((response) => {
                let result=response.data;
                if(result.code=="200"){
                    _this.$store.commit("opreateRoom",{room,build,opreate,"version":result.data.version});
                }
            }).catch(x=>{
                _this.$store.commit('addPromtMessage',"更新发生异常");
                console.log(x);
            });
        },
        //修改房间的信息
        modifyRoom(roomMSG){
            console.log(roomMSG);
            let data=this.modifyData;
            data.room=roomMSG.room;
            data.build=roomMSG.build;
            data.appendMsg=roomMSG.appendMsg;
            data.peopleCpa=roomMSG.peopleCpa;
            data.softwares=[];
            roomMSG.softwares.datas.forEach(item=>{
                let temp={};
                temp.name=item.name;
                temp.id=item.id;
                temp.system=item.system;
                temp.state="normal";
                data.softwares.push(temp);
            });
            this.modifyBoxState="show";
        },
		/**
		 * 设置浮动窗口的状态
		 * @param [modifyBox,addSoftWareBox,applyBox] target 目标窗口
		 * @param ["show","hide"] value 目标窗口的状态
		 */
        setFlowBoxWindowState(target,value){
			if(!target||!value){
				alert("setFlowBoxWindowState:缺少参数");
				return;
			}
			
			if(!(target==="modifyBox"||target==="addSoftWareBox"||target==="applyBox")){
				alert("setFlowBoxWindowState:没有当前窗口"+target);
				return;
			}
			
			if(!(value==="show"||value==="hide")){
				alert("setFlowBoxWindowState:参数设置不正确"+value);
				return;
			}
			
			//修改页面的窗口
			if(target==="modifyBox"){
				this.modifyBoxState=value;
				return;
			}
			
			//添加软件页面的窗口
			if(target==="addSoftWareBox"){
				this.softWareBoxState=value;
				return;
			}
			
        },
        toggleRoomTitle(data){
            if(data.title==data.build)
            data.title=data.room;
            else
            data.title=data.build;
        },
		
		
    },
    mounted(){
        _this=this;
        this.searchManager.reverseData();
        /*滑动监听*/
        resultContainer=$(".resultContainer")[0];
        resultContainer.onscroll=()=>{
            //隐藏搜索框
            if(_this.searchManager.windowState==="show"&&!_this.searchManager.isFocus&&_this.searchManager.isScrollWatch){
              _this.searchManager.setWindowState("hide")
            }
			
            if(_this.target==-1){
                let scrollBottom=resultContainer.scrollHeight-resultContainer.scrollTop-resultContainer.clientHeight;
                if(scrollBottom<10){
                    //如果小于总数才获取新数据
                    if(Number(_this.searchPageDatas.maxTotal)>Number(_this.searchPageDatas.currentTotal)){
                        _this.$store.commit("getData",{opreate:"addNew"});
                    }
                }
            }
			
        };
		
        //用于第一次加载页面的时候获取数据
        if(_this.searchPageDatas.currentPage==0&&_this.searchPageDatas.version==0){
            _this.$store.commit("getData",{opreate:"init"});
        }
		
    },
    beforeRouteLeave(to, from, next){
        resultContainer.onscroll=null;
        next();
		
    }
}
</script>
<style type="text/css" lang="less" scoped>

@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";

@resultItemBoxPadding:2px;
@resultItemBoxWidthPhone:150px - @resultItemBoxPadding*2;
@resultItemBoxWidthWindow:200px - @resultItemBoxPadding*2;
@headerContainerHeight:43px;
@resultContainerPadding:5px;
@resultContainerMarginTop:5px;
@resultContainerHeight:100% - @resultContainerPadding*2 - @headerContainerHeight - @resultContainerMarginTop;
@resultContainer_innerContainerPaddingLeft:15px;
//申请教室的下面那个容器的高度  
@applyRoomWindowFootHeight:40px;
@keyframes rotateSingleRound
{
    from {transform:rotateX(0deg)}
    to {background:rotateX(360deg)}
}

.pageContainer{
    height: calc(100% - 90px);
    margin-top: 70px;
}
.headerContainer{
    width: 90%;
    height: @headerContainerHeight;
    top: 60px;
    background-color: #e3e3e36b;
    text-align: left;
    padding-left:10px;
    transition: all 1s;
    white-space:nowrap;
    overflow: auto;
    @media @min624{
        width: 70%;
        padding-left:43px;
    }
    .switchbox{
        margin:0px	5px 0px 5px;
        display: inline-block;
        width: 43px;
        height: calc(100% - 22px);
        padding: 10px;
        font-size: 1rem;
        vertical-align: top;
        border: 1px solid #123456;
        cursor: pointer;
    }
}
.resultContainer{
    z-index: 1;
    font-size: 1rem;
    position: relative;
    overflow: auto;
    text-align: left;
    height:calc(@resultContainerHeight);
    padding: @resultContainerPadding;
    margin-top: @resultContainerMarginTop;
    width:calc(100% -  @resultContainerPadding*2);
    .innerContainer{
        width: calc(100% - @resultContainer_innerContainerPaddingLeft);
        min-height: calc(100% + 10px);
        padding-left: @resultContainer_innerContainerPaddingLeft;
        .resultContainerShow{
            display: inline-block;
            vertical-align:top;
            margin: 10px 2.5px 0px 2.5px;
            height: 300px;
            padding: @resultItemBoxPadding;
            @media @phoneSize{
                width: @resultItemBoxWidthPhone;
            }
            @media @min624{
                width: @resultItemBoxWidthWindow;
            }
            div:nth-child(1){
                width: 100%;
                height: calc(100% - 30px);
                .smallTitle{
                    width: 100%;
                    font-size: 15px;
                    display: inline-block;
                    text-align: left;
                    font-weight: bold;
                }
                .smallContainer{
                    width: 100%;
                    height: 120px;
                    position: relative;
					display: flex;
					flex-direction: column;
                    .ele{
                        margin-top: 2px;
						margin-bottom: 4px;
                        width:calc(100% - 24px);
                        font-size: 13px;
                        padding-left:20px;
                        display: inline-block;
                        text-align: left;
                        white-space:nowrap;
                        overflow-x: hidden;
                        border: solid 2px green;
                    }
                    .ele[type="target"]{
                        background-color: #4d9667;
                        color: white;
                    }
                    .ele[type="other"]{

                    }
                    .bottomContainer{
                        position: absolute;
                        width: 100%;
                        height: 20px;
                        bottom: -20px;
                        background-color: #aaaaaa;
                        >span{
                            cursor:pointer;
                            display: inline-block;
                            height: 100%;
                            width: 20%;
                            background-color: #aa4444;
                            text-align: center;
                        }
                        >span:nth-child(1){
                            position: absolute;
                            left: 0px;
                        }
                        >div:nth-child(2){
                            width: 60%;
                            height: 100%;
                            display: inline-block;
                            text-align: center;
                            position: absolute;
                            left: 20%;
                        }
                        >span:nth-child(3){
                            position: absolute;
                            right: 0px;
                        }

                    }
                }
            }
            div:nth-child(2){
                height: 30px;
                width: 100%;
                text-align: center;
            }
        }
        .resultContainerShow[state="able"]{
            border: solid 3px green;
        }
        .resultContainerShow[state="disable"]{
            border: solid 3px red;
        }
    }
}
.title{
    width: 100%;
    font-size: 25px;
    display: inline-block;
    font-weight: bold;
    text-align: center;
    background-color: #1aaaaf;
    transition: all 0.5s;
}
.title[active]{
    transform: rotateX(360deg);
}
.flowSearchBox{
    position: fixed;
    z-index: 2;
    min-width: 300px;
    text-align: center;
    vertical-align: top;
    padding: 10px;
    transition: all 0.5s ease 0s;
    @media @phoneSize{
        width:calc(100% - 40px);
        padding: 10px;
        top: 150px;
    }
    @media @min624{
        width:440px;
        top:70px;
        left: calc(50% - 220px);
    }
    .bg{
        width:calc(100%);
        height: 100%;
        background-color: #114544;
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
        opacity: 0.8;
        @media @min624{
            width:460px;
        }
    }
    .inputContainer{
        position: relative;
        height: 60px;
        margin: 10px 0px;
        text-align: left;
    }
    .inputContainer1{
        position: relative;
        white-space:nowrap;
        overflow: scroll visible;
        text-align: left;
        margin: 10px 0px;
        label{
            color:white;
            margin-right: 10px;
            position: relative;
            overflow: show;
        }
        input{
            vertical-align:middle;
        }
        div{
            display: inline-block;
        }
    }
}
.flowSearchBox[state="hide"]{
    @media @phoneSize{
        opacity: 0.2;
        transform: translateX(-95%);
    }
    @media @middleSize{
        opacity: 0.2;
        left: calc(-400px);
    }
    @media @pcSize{
        opacity: 0.2;
        transform: translateY(-105%);
    }
}
.flowSearchBox[state="show"]{
    transform: translateX(0);
    @media @middleSize{
        left: calc(50% - 220px);
    }
}
.deleteButton{
    content: "X";
    display: inline-block;
    color: red;
    font-size: 30px;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 10px;
}
.operateBox{
    position: fixed;
    z-index: 3;
    height: calc(100% - 150px);
    top: 100px;
    font-size: 20px;
    text-align: left;
    padding: 10px;
    white-space:nowrap;
    width: 600px;
    left: calc(50% - 300px);
    .operateBox[state="hide"]{
        transform: translateX(2000px);
    }
    input[type="text"]{
        vertical-align: middle;
        width: 100px;
    }
    @media @phoneSize{
        width: 90%;
        left: 2%;

    }

    // 按钮哪里设置成居中
    >div>div:last-child{
        text-align: center;
    }
    //软件列表那里的样式
    .softwareListShowWindow{
        width: calc(100% - 10px);
        height: 200px;
        padding: 5px;
        position: relative;
        white-space:normal;
        //列表里面的样式
        >div:nth-child(2){
            overflow: auto;
            height: calc(100% - 30px);
        }
        .widthBox{
            margin-top: 5px;
            transition: all 0.5s;
            >span{
                text-align: center;
                border: 2px solid;
                white-space:nowrap;
                overflow: hidden;
            }
            >span:nth-child(1){
                width: calc(50% - 5px);
                height: 100%;
                display: inline-block;
                position: absolute;
                left: 0px;
            }
            >span:nth-child(2){
                width:  calc(50% - 5px);
                height: 100%;
                display: inline-block;
                position: absolute;
                right: 0px;
                >span{
                    position: absolute;
                    z-index: 2;
                    right: 10px;
                    cursor: pointer;
                    color: red;
                    font-size: 1.7rem;
                }
            }
        }
        .widthBox[state="hide"]{
            transform: translateX(-10%);
            opacity: 0;
        }
    }
    .boxLabel{
        display: inline-block;
        width: 120px;
        text-align: right;
    }
    #addSoftWareBox{
        @media (max-width:370px){
            font-size: 15px;
        }
    }
}
.operateBox[state="hide"]{
    transition: all 0.5s;
    @media @phoneSize {
        transform: translateX(700px);
    }
    @media @min624{
        transform: translateX(2000px);
    }
}
.operateBox[state="show"]{
    transition: all 0.5s;
    transform: translateX(0);
}
#applyBox{
    .applyDetailContainer{
        display: flex;
        flex-direction: row;
        overflow: auto;
        width: calc(100% - 4px);
        height: 60px;
        padding: 2px;
        span{
            vertical-align: middle;
            height: 28px;
            padding:8px 0px;
            background-color: #aaffaa;
            margin:0px 5px;
        }
    }
    #fullcalendarContainer{
        width: 100%;
        height:calc(100% - 35px);
        display: block;
    }
}
#applyRoomWindow{
	width:calc(100% - 8px);
	height:calc(100% - 8px);
	background-color: #008d57;
	padding: 4px;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	color: white;
	>div:nth-child(1){
		height: calc(100% - @applyRoomWindowFootHeight);
		width: 100%;
		display: inherit;
		flex-direction: column;
		flex-wrap: nowrap;
		>div{
			text-align: left;
			width: 100%;
			height:30px;
			margin:4px 0px;
			overflow: auto;
			label{
				width: 100px;
				display: inline-block;
				text-align: right;
				margin-right: 20px;
			}
		}
		textarea{
			width: calc(100% - 8px);
			height: calc(100% - 30px * 5 - 25px);
			resize:none;
			display: inline-block;
		}
	}
	
	>div:nth-child(2){
		height: @applyRoomWindowFootHeight;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content :  space-around;
	}
}
</style>
