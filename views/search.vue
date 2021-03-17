<template>
	<div class="pageContainer">
		<div class="headerContainer">
			<div class="switchbox" @click="switchToTarget(-1)" :style="computedSwicth(-1)"><span>默认</span></div>
			<template v-for="targetData in targetSearchDatas">
				<div class="switchbox" @click="switchToTarget(targetData.bindID)" :style="computedSwicth(targetData.bindID)"><span>搜索{{targetData.bindID}}</span></div>
			</template>
		</div>
		<div class="headSearchBox" :state="searchBoxState" @click="headSearchBoxClick()">
			<form method="post">
				<div class="inputContainer">
					<vmy-input ctitle="软件名" ctype="1" @onFocus="focusOnSearchBox()" @lostFocus="blurOnSearchBox()" @valueChange="oninputValueChange($event,'softwareName')" :clearSign="searchData.clearSign"></vmy-input>
				</div>
				<div class="inputContainer">
					<vmy-input ctitle="教室" ctype="2" @onFocus="focusOnSearchBox()" @lostFocus="blurOnSearchBox()" @valueChange="oninputValueChange($event,'room')" :clearSign="searchData.clearSign"></vmy-input>
					<vmy-input ctitle="教学楼" ctype="2" @onFocus="focusOnSearchBox()" @lostFocus="blurOnSearchBox()" @valueChange="oninputValueChange($event,'build')" :clearSign="searchData.clearSign"></vmy-input>
				</div>
				<div class="inputContainer">
					<vmy-input ctitle="人数" ctype="3" @onFocus="focusOnSearchBox()" @lostFocus="blurOnSearchBox()" @valueChange="oninputValueChange($event,'peopleCpa')" :clearSign="searchData.clearSign"></vmy-input>
				</div>
				<div class="inputContainer1">
					<label>开始日期:</label><input  type="date" v-model="searchData.startDate"/>
				</div>
				<div class="inputContainer1">
					<label>结束日期:</label><input  type="date" v-model="searchData.endDate" :min="searchData.startDate"/>
				</div>
				<div class="inputContainer1" id="timeSpanInput">
					<div class="margin-right">
						<template v-for="(item,index) in searchData.timeSpan">
							<label >时间段:
								<input type="time" v-model="item.start" />
								-
								<input  type="time" v-model="item.end" :min="item.start"/>
							</label>
							<span v-if="index>=1" class="deleteButton" @click="sliceTimeSpan(index)">
								X
							</span>
						</template>
					</div>
					<sbutton @mdEvent="searchData.addItem()">+</sbutton>
				</div>
				<div class="inputContainer1">
					<label>周一<input name="week" type="checkbox" value="1" v-model="searchData.week.mon"/></label> 
					<label>周二<input name="week" type="checkbox" value="2" v-model="searchData.week.tue"/></label> 
					<label>周三<input name="week" type="checkbox" value="3" v-model="searchData.week.wed"/></label> 
					<label>周四<input name="week" type="checkbox" value="4" v-model="searchData.week.thur"/></label>
					<label>周五<input name="week" type="checkbox" value="5" v-model="searchData.week.fri"/></label> 
					<label>周六<input name="week" type="checkbox" value="6" v-model="searchData.week.sat"/></label>
					<label>周日<input name="week" type="checkbox" value="7" v-model="searchData.week.sun"/></label>
				</div>
				<!-- <button @click="reverseForm()">重置</button> -->
				<sbutton @mdEvent="onSearchClick()">搜索</sbutton>
				<template v-if="userLevel==2">
					<sbutton @mdEvent="toggleAddSoftWareBox('show')" class="vertical-center">
						添加
					</sbutton>
				</template>
				<input type="reset" @click="searchData.reverse()">
			</form>
			<div class="bg">
			</div>
		</div>
		<div class="resultContainer">
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
						<sbutton>申请</sbutton>
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
			<div class="exit-button" @click="closeModifyRoom()">X</div>
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
			<div class="exit-button" @click="toggleAddSoftWareBox('hide')">X</div>
		</div>
	</div>
</template>
<script>
	import $ from "jquery";
	import vmyInput from "../vue-component/cinput.vue";
	import sbutton from "../vue-component/sbutton.vue";
	import exitButton from "../vue-component/exitButton.vue";
	import webconfig from "../web.config.js";
	import md5 from "md5";
	var resultContainer;
	export default{
		components:{
			vmyInput,
			sbutton,
			exitButton,
		},
		data(){
			return {
				//当前搜索框的状态
				searchBoxState:"hide",
				//当前的焦点是否在搜索框上
				isFocusOnBoX:false,
				//离开输入框一秒后开启滑动监听，用来关闭搜索框
				openScrollWatch:true,
				//--用来添加时间段的元素----------start---------------------
				// timeSpanEle:null,
				// timeSpanFather:null,
				// timeSpanButton:null,
				// newTimeSpanList:[],//当前添加的时间段
				//--用来添加时间段的元素-----------end--------------------
				softWareBoxState:"hide",//---是否显示添加软件的窗口"show" 或者 "hide"
				modifyBoxState:"hide",
				//----新增软件的数据绑定
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
				//----修改数据的临时容器
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
				//搜索框数据绑定
				searchData:{
					softwareName:"",
					room:"",
					build:"",
					peopleCpa:0,
					startDate:"",
					endDate:"",
					timeSpan:[{start:"",end:""}],
					week:{mon:false,tue:false,wed:false,thur:false,fri:false,sat:false,sun:false},
					//清空数组的信号 值发生改变时会清空数组
					clearSign:true,
					reverse(){
						let now=new Date();
						let year=now.getFullYear();
						let month=now.getMonth();
						if(month<10){
							month="0"+month;
						}
						let day=now.getDate();
						if(day<10){
							day="0"+day;
						}
						this.week.mon=this.week.tue=this.week.wed=this.week.thur=this.week.fri=this.week.sat=this.week.sun=false;
						this.timeSpan.splice(1);
						this.startDate=year+"-"+month+"-"+day;
						this.endDate=year+"-"+month+"-"+day;
						this.clearSign=!this.clearSign;
					},
					addItem(){
						this.timeSpan.push({start:"",end:""});
					},
				},
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
				this.searchBoxState="hide";
				return result;
			},
			userLevel(){
				return this.$store.state.user.level;
			},
			targetSearchDatas(){
				let sd=this.$store.state.targetSearchDatas;
				//console.log(sd.length);
				if(sd.length>0){
					this.switchToTarget(sd.length-1);
				}
				return sd;
			},
		},
		methods:{
			computedSwicth(index){
				if(index==this.target){
					return "background-color:#ffc800;color:white;";
				}else{
					return "";
				}
			},
			switchToTarget(target){
				this.target=target;
			},
			sliceTimeSpan(index){
				this.searchData.timeSpan.splice(index,1);
			},
			oninputValueChange(e,bind){
				switch(bind){
					case 'softwareName':
					this.searchData.softwareName=e.value;
					break;
					case 'room':
					this.searchData.room=e.value;
					break;
					case 'build':
					this.searchData.build=e.value;
					break;
					case 'peopleCpa':
					this.searchData.peopleCpa=e.value;
					break;
				}
			},
			onSearchClick(){
				///*验证数据输入的合法性*/////
				this.$store.commit("getData",{opreate:"search",ts:JSON.stringify(this.searchData)});
			},
			//点击显示搜索盒子
			headSearchBoxClick(){
				let _this = this
				if(this.searchBoxState=="hide"){
					this.searchBoxState="show";
				}
			},
			//当焦点聚焦于搜索盒子上
			focusOnSearchBox(){
				this.isFocusOnBoX=true;
			},
			//失去搜索盒子焦点，开启滚动监听
			blurOnSearchBox(){
				let _this=this;
				_this.openScrollWatch=false;
				_this.isFocusOnBoX=false;
				setTimeout(()=>{
					_this.openScrollWatch=true;
				}, 1000);
			},
			//搜索表单里面的添加时间段
			addTimeSpan(){
				
				// let ele=this.timeSpanEle.clone();
				// let exitButton=document.createElement("span");//
				// exitButton.innerHTML="X";
				// exitButton.setAttribute("class","deleteButton");
				// exitButton.onclick = ()=> {
				// 	ele.remove();
				// };//这里是点了叉叉以后关闭
				// ele.append(exitButton);
				// this.newTimeSpanList.push(ele);
				// let button=this.timeSpanButton;
				// button.before(ele);
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
			//显示或隐藏添加元素的窗口
			toggleAddSoftWareBox(value){
				this.softWareBoxState=value;
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
				let removeItem;
				try{
					data.softwares.forEach((item,index,arr)=>{
						if(item.id == value.id){
							removeItem=item;
							throw new Error("找到元素");
						}
					});
				}catch(e){
					console.log("删除");
				}
				removeItem.state="hide";
				setTimeout(()=>{
					//removeItem.state="delete";
					data.softwares.splice(data.softwares.indexOf(removeItem),1);
				},500);
			},
			//添加一个软件的信息
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
							// try{

							// 	// _this.searchPageDatas.datas.forEach(item=>{
							// 	// 	if(item.build==data.build&&item.room==data.room){
							// 	// 		item.softwares.datas.splice(0,item.softwares.datas.length);
							// 	// 		data.softwares.forEach(item1=>{
							// 	// 			item.softwares.datas.push(item1);
							// 	// 		});
							// 	// 		item.softwares.total=item.softwares.datas.length;
							// 	// 		item.softwares.pageSize=4;
							// 	// 		item.softwares.currentPage=1;
							// 	// 		let pageCompute=1;
							// 	// 		let currentpage=1;
							// 	// 		item.softwares.maxPage=Math.ceil(item.softwares.total/item.softwares.pageSize);
							// 	// 		item.softwares.datas.forEach(item2=>{

							// 	// 			item2.page=currentpage;
							// 	// 			item2.state="normal";
							// 	// 			if(pageCompute!=0&&pageCompute%4==0){
							// 	// 				currentpage++;
							// 	// 			}
							// 	// 			pageCompute++;
							// 	// 		});
							// 	// 		item.appendMsg=data.appendMsg;
							// 	// 		item.useable=data.useable;
							// 	// 		item.peopleCpa=data.peopleCpa;
							// 	// 		throw new Error("退出循环");
							// 	// 	}
							// 	// });
							// }catch(ex){
							// 	console.log(ex);
							// }
							break;
							case "newSoftware":
							_this.$store.commit('addPromtMessage',"上传成功");
							_this.$store.commit("opreateRoom",{room,build,"opreate":"newSoftware","version":result.data.version,"data":data});
							let choice=window.confirm("是否保留信息继续添加");
							//如果不保存信息
							if (!choice) {
								_this.toggleAddSoftWareBox('hide');
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
				let _this=this;
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
			closeModifyRoom(){
				this.modifyBoxState="hide";
			},
			toggleRoomTitle(data){
				if(data.title==data.build)
					data.title=data.room;
				else
					data.title=data.build;
			},
		},
		mounted(){
			let _this=this;
			_this.searchData.reverse();
			resultContainer=$(".resultContainer")[0];
			resultContainer.onscroll=()=>{
				//隐藏搜索框
				if(_this.searchBoxState=="show"&&!_this.isFocusOnBoX&&_this.openScrollWatch){
					_this.searchBoxState="hide";
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
			/*用于第一次加载页面的时候获取数据*/
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
<style type="text/css" lang="less">
@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";
@resultItemBoxWidthPhone:150px;
@resultItemBoxWidthWindow:200px;
@keyframes rotateSingleRound
{
	from {transform:rotateX(0deg)}
	to {background:rotateX(360deg)}
}
.pageContainer{
	height: calc(100% - 90px);
	margin-top: 90px;
}
.headSearchBox{
	position: fixed;
	z-index: 2;
	min-width: 300px;
	text-align: center;
	vertical-align: top;
	padding: 10px;
	transition: all 0.5s ease 0s;
	@media @phoneSize{
		width:calc(100% - 40px);
		padding: 10px 20px;
		top: 150px;
	}
	@media @min624{
		width:440px;
		top:200px;
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
		// div:nth-child(2){
		// 	top: 0px;
		// 	right:calc(100% - calc(100% - 40px) - 11.5px);
		// }
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
.headSearchBox[state="hide"]{
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
		transform: translateY(-130%);
	}
}
.headSearchBox[state="show"]{
	transform: translateX(0);
	@media @middleSize{
		left: calc(50% - 220px);
	}
}
.resultContainer{
	z-index: 1;
	font-size: 1rem;
	position: relative;
	height: 100%;
	overflow: auto;
	padding: 10px;
	text-align: left;
	// @media @phoneSize{
	// 	top: 52px;
	// 	left: 5%;
	// 	width: 90%;
	// 	padding: 5px;
	// 	text-align: left;
	// }
	// @media @min624{
	// 	top: 52px;
	// 	left: 5%;
	// 	width: 90%;
	// 	padding: 5px;
	// 	text-align: left;
	// }
	.resultContainerShow{
		display: inline-block;
		vertical-align:top;
		margin: 10px 2.5px 0px 2.5px;
		height: 300px;
		@media @phoneSize{
			width: @resultItemBoxWidthPhone;
		}
		@media @min624{
			width: @resultItemBoxWidthWindow;
		}
		div:nth-child(1){
			width: 100%;
			height: calc(100% - 30px);
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
				.ele{
					margin-top: 2px;
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
					bottom: 0px;
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
	transition: all 0.5s;
	font-size: 20px;
	text-align: left;
	padding: 10px;
	white-space:nowrap;
	input[type="text"]{
		vertical-align: middle;
		width: 100px;
	}
	@media @phoneSize{
		width: 90%;
		left: 2%;
		
	}
	@media @min624{
		width: 600px;
		left: calc(50% - 300px);
		.operateBox[state="hide"]{
			transform: translateX(2000px);
		}
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
	@media @phoneSize {
		transform: translateX(700px);
	} 
	@media @min624{
		transform: translateX(2000px);
	}
}
.operateBox[state="show"]{
	transform: translateX(0);
}
.headerContainer{
	width: 98%;
	height: 26px;
	top: 60px;
	background-color: #e3e3e36b;
	text-align: left;
	padding-left:10px; 
	transition: all 1s;
	white-space:nowrap;
	overflow: auto;
	position: fixed;
	@media @min624{
		width: 70%;
		padding-left:30%; 
	}
	.switchbox{
		margin:0px	10px 0px 10px;
		display: inline-block;
		width: 60px;
		height: calc(100% - 6px);
		padding: 2px;
		font-size: 1rem;
		vertical-align: top;
		border: 1px solid #123456;
	}
}
</style>