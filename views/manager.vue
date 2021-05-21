<template>
	<div class="pageContainer">
		<div class="navigatorBar">
			<div class="navigatorCell" :choice="indexPath[0].index==currentActiveIndex" @click="switchToPage(indexPath[0].index)">
				<div class="navigatorCellIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-schedule"></use></svg></div>
				<div class="navigatorCellTitle">{{indexPath[0].title}}</div>
			</div>
			<div class="navigatorCell" :choice="indexPath[1].index==currentActiveIndex" @click="switchToPage(indexPath[1].index)">
				<div class="navigatorCellIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-yonghu"></use></svg></div>
				<div class="navigatorCellTitle">{{indexPath[1].title}}</div>
			</div>
			<div class="navigatorCell" :choice="indexPath[2].index==currentActiveIndex" @click="switchToPage(indexPath[2].index)">
				<div class="navigatorCellIcon"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-liuyan"></use></svg></div>
				<div class="navigatorCellTitle">{{indexPath[2].title}}</div>
			</div>
        </div>
		<div class="viewContainer">
			<div class="subViewContainer" :choice="indexPath[0].index==currentActiveIndex">
				<div class="topBar">
					<div>
						<sbutton @mdEvent="applyManager.refresh()" :lockClick="applyManager.refreshBtnLock">刷新</sbutton>
					</div>
					<div>
						<sbutton @mdEvent="applyManager.postOpreate('pass')" style="margin: 0px 4px;" :lockClick="applyManager.passApplyBtnLock">通过选中</sbutton>
						<sbutton @mdEvent="applyManager.postOpreate('nopass')" style="margin: 0px 4px;" :lockClick="applyManager.noPassApplyBtnLock">拒绝选中</sbutton>
						<p>{{applyManager.applyList.length}} / {{applyManager.data.length}}</p>
					</div>
					<div>
						<sbutton v-if="applyManager.applyList.length==applyManager.data.length" @mdEvent="applyManager.toggleCheckAll(false)">取消全选</sbutton>
						<sbutton v-else @mdEvent="applyManager.toggleCheckAll(true)">全选</sbutton>
					</div>
				</div>
				<div class="bottomContainer">
					<template v-for="data in applyManager.data">
						<div class="progressApplyItem" :checked="applyManager.applyList.indexOf(data.UseStateId)!=-1" @click="applyManager.onApplyCheck(data.UseStateId,true)">
							<div>
								<div>-{{data.UserName}}</div>
							</div>
							<div>
								<div>{{data.BuildName}} {{data.RoomName}}</div>
								<div>{{data.StartDate}} {{data.EndDate}}</div>
								<div>{{data.StartTime}} {{data.EndTime}}</div>
								<div>
									<span v-if="data.Monday">一</span>
									<span v-if="data.Tuesday">二</span>
									<span v-if="data.Thursday">三</span>
									<span v-if="data.Wednesday">四</span>
									<span v-if="data.Friday">五</span>
									<span v-if="data.Saturday">六</span>
									<span v-if="data.Sunday">日</span>
								</div>
							</div>
							<div>
								<div>申请日期</div>
								<div>{{data.CreateTime}}</div>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div class="subViewContainer" :choice="indexPath[1].index==currentActiveIndex">
				<div class="topBar">
					<div>
						<!-- 上方的toolbar -->
						<sbutton @mdEvent="userManager.refresh()" :lockClick="userManager.refreshBtnLock">刷新</sbutton>
					</div>
					<div>
					</div>
					<div>
					</div>
				</div>
				<div class="bottomContainer">
					<div class="userItem">
						<div class="itemCell">
							<span>账号:</span>
							<input type="text"  v-model="userManager.tempUserMsg.UserId" class="smallInput"/>
						</div>
						<div class="itemCell">
							<span>姓名:</span>
							<input type="text" v-model="userManager.tempUserMsg.UserName" class="smallInput"/>
						</div>
						<div class="itemCell">
							<span>密码:</span>
							<input type="text" v-model="userManager.tempUserMsg.password" class="smallInput"/>
						</div>
						<div class="itemCell">
							<span>等级:</span>
							<select v-model="userManager.tempUserMsg.UserLevel">
								<option value="0">学生</option>
								<option value="1">老师</option>
								<option value="2">管理员</option>
							</select>
						</div>
						<sbutton @mdEvent="userManager.modify(userManager.tempUserMsg,1)">新增</sbutton>
					</div>
					<template v-for="data in userManager.data">
						<div class="userItem">
							<div class="itemCell">
								<span>账号:</span>
								<input type="text" readonly="readonly" :value="data.UserId" class="smallInput"/>
							</div>
							<div class="itemCell">
								<span>姓名:</span>
								<input type="text" v-model="data.UserName" class="smallInput"/>
							</div>
							<div class="itemCell">
								<span>密码:</span>
								<input type="text" v-model="data.password" class="smallInput"/>
							</div>
							<div class="itemCell">
								<span>等级:</span>
								<select v-model="data.UserLevel">
									<option value="0">学生</option>
									<option value="1">老师</option>
									<option value="2">管理员</option>
								</select>
							</div>
							<sbutton @mdEvent="userManager.modify(data,0)">修改</sbutton>
							<sbutton @mdEvent="userManager.modify(data,2)">删除</sbutton>
						</div>
					</template>
				</div>
			</div>
			<div class="subViewContainer" :choice="indexPath[2].index==currentActiveIndex">
				<div class="topBar">
					<div>
						<!-- 上方的toolbar -->
						<sbutton @mdEvent="contactManager.refresh()" :lockClick="contactManager.refreshBtnLock">刷新</sbutton>
					</div>
					<div>
					</div>
					<div>
					</div>
				</div>
				<div class="bottomContainer">
					<template v-for="cmDataItem in contactManager.data">
						<div class="contactItem">
							<div class="contacTopBox">
								<div class="detailMsg">
									<div>留言人:{{cmDataItem.Name}}</div>
									<div>上传时间:{{cmDataItem.UploadTime.substr(0,10)}}</div>
									<div><input type="text" v-model="cmDataItem.tempReceiveMsg"><sbutton @mdEvent="contactManager.receiveContact(cmDataItem.UploadUUID,cmDataItem.tempReceiveMsg)" :lockClick="contactManager.receiveContactBtnLock">回复</sbutton></div>
									<div><sbutton @mdEvent="contactManager.removeContact(cmDataItem.UploadUUID)" :lockClick="contactManager.removeContactBtnLock">删除</sbutton></div>
								</div>
								<div class="fileMsg">
									<template v-for="file in cmDataItem.files">
										<a class="filelink" @click="contactManager.downloadFile(file.FileUUID)">
											{{file.FileName}}
										</a>
										&nbsp;&nbsp;&nbsp;
									</template>
								</div>
							</div>
							<div class="contactBottomBox" v-html="cmDataItem.ContactMsg">

							</div>
						</div>
						<div class="receiveContainer">
							<template v-for="receiveMsg in cmDataItem.receiveMsgs">
								<div class="contactReceive">
									<span>
										{{receiveMsg.name}}:
									</span>
									<span>
										{{receiveMsg.receiveContent}}
									</span>
									<span>
										{{receiveMsg.receiveTime.substr(0,10)}}
									</span>
								</div>
							</template>
						</div>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var _this;
	import sbutton from "../vue-component/sbutton.vue";
	import md5 from "md5";
	import $ from "jquery";
	import webconfig from "../web.config.js";
	export default{
		components:{
		    sbutton,
		},
		data(){
			return {
				currentActiveIndex:2,
				indexPath:[
					{index:0,title:"申请审核"},
					{index:1,title:"用户管理"},
					{index:2,title:"留言管理"},
				],
				applyManager:{
					data:[],
					applyList:[],
					refreshBtnLock:false,
					passApplyBtnLock:false,
					noPassApplyBtnLock:false,
					/**
					 * 取消或者全选
					 */
					toggleCheckAll(check){
						if(check){
							this.data.forEach(item=>{
								this.onApplyCheck(item.UseStateId,false);
							});
						}else{
							this.applyList.splice(0);
						}
						
					},
					/**
					 * 添加选中
					 * @param applyID 申请id
					 * @param toogle 是否删除
					 */
					onApplyCheck(applyID,toogle){
						const index=this.applyList.indexOf(applyID);
						if(index!=-1){
							if(toogle){
								this.applyList.splice(index,1);
							}
							
						}else{
							this.applyList.push(applyID);
						}
					},
					/**
					 * 刷新数据
					 */
					refresh(){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						const action="apply";
						this.refreshBtnLock=true;
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							this.refreshBtnLock=false;
							return;
						}
						
						const md5Value=md5(`${account}${action}${skeys}`);
						_this.axios({
							methods:"get",
							url: webconfig.address()+"api/Manager",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							params:{
								account,
								md5Value,
								action,
							}
						}).then(res=>{
							const resData=res.data;
							console.log(resData);
							if(resData.code=="200"){
								const applyData=JSON.parse(resData.data);
								this.data.splice(0);
								applyData.forEach(item=>{
									item.StartDate=item.StartDate.substr(0,10);
									item.EndDate=item.EndDate.substr(0,10);
									item.StartTime=item.StartTime.substr(11,5);
									item.EndTime=item.EndTime.substr(11,5);
									item.CreateTime=item.CreateTime.substr(0,10);
									this.data.push(item);
									console.log(item);
								});
							}else{
								_this.$store.commit('addPromtMessage',resData.msg);
							}
							this.refreshBtnLock=false;
						}).catch(ex=>{
							 _this.$store.commit('addPromtMessage',ex.message);
							this.refreshBtnLock=false;
						});
					},
					/**
					 * 推送操作
					 */
					postOpreate(opreate){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						const action="apply";
						const applyList=this.applyList;
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							return;
						}
						
						if(this.applyList.length===0){
							_this.$store.commit('addPromtMessage',"当前没有选中申请项");
							return;
						}
						
						this.passApplyBtnLock=true;
						this.noPassApplyBtnLock=true;
						const md5Value=md5(`${account}${action}${opreate}${JSON.stringify(applyList)}${skeys}`);
						var that=this;
						//POST:
						_this.axios({
							method:"post",
							url: webconfig.address()+"api/Manager",
							headers:{
								"Content-Type":"application/json"
							},
							data:{
								account,
								action,
								opreate,
								applyList,
								md5Value,
							}
						}).then(res=>{
							const resData=res.data;
							if(resData.code=="200"){
								that.applyList.forEach(item=>{
									for(var i=0;i<that.data.length;i++){
										if(that.data[i].UseStateId==item){
											that.data.splice(i,1);
											break;
										}
									}
								});
								that.applyList.splice(0);
							}else{
								_this.$store.commit('addPromtMessage',`操作失败${resData.msg}`);
							}
							this.passApplyBtnLock=false;
							this.noPassApplyBtnLock=false;
						}).catch(ex=>{
							this.passApplyBtnLock=false;
							this.noPassApplyBtnLock=false;
							_this.$store.commit('addPromtMessage',`操作失败${ex.message}`);
						});
					}
				},
				userManager:{
					data:[],
					tempUserMsg:{
						UserId:"",
						UserName:"",
						UserLevel:0
					},
					refreshBtnLock:false,
					/*
					* 刷新页面数据
					*/
					refresh(){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						const action="user";
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							this.refreshBtnLock=false;
							return;
						}
						
						const that=this;
						const md5Value=md5(`${account}${action}${skeys}`);
						_this.axios({
							methods:"get",
							url: webconfig.address()+"api/Manager",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							params:{
								account,
								md5Value,
								action,
							}
						}).then(res=>{
							const resData=res.data;
							if(resData.code=="200"){
								that.data.splice(0);
								that.data=JSON.parse(resData.data);
								console.log(res.data);
							}else{
								_this.$store.commit('addPromtMessage',resData.msg);
							}
							
							this.refreshBtnLock=false;
						}).catch(ex=>{
							_this.$store.commit('addPromtMessage',ex.message);
							this.refreshBtnLock=false;
						});
					},
					/*
					* 修改当前用户的数据
					* @param data 被操作的数据
					* @param opreate 当前的操作类型 0 修改 1 新增 2 删除
					*/
					modify(userMsg,opreate){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						const action="user";
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							this.refreshBtnLock=false;
							return;
						}
						//验证更新操作是否合法
						if(opreate==0){
							const password=userMsg.password;
							if(!password){
								userMsg.password="";
							}else if(password.length<6){
								_this.$store.commit('addPromtMessage',"密码长度太短");
								return;
							}else{
								//如果密码存在且符合要求进行md5加密
								userMsg.password=md5(password);
							}
							
						}
						//如果是新增操作，验证参数是否合法
						else if(opreate==1){
							//验证密码是否合法
							const password=userMsg.password;
							if(!password||password.length<6){
								_this.$store.commit('addPromtMessage',"密码不存在或密码长度太短");
								return;
							}
							
							userMsg.password=md5(password);
							if(userMsg.UserId.length==0){
								_this.$store.commit('addPromtMessage',"用户id不能为空");
								return;
							}
							
							if(userMsg.UserName.length==0){
								_this.$store.commit('addPromtMessage',"用户名字不能为空");
								return;
							}
						}
						else if(opreate==2){
							userMsg.password="";
						}
						
						//因为原始UserLevel是数字性，所以进行md5加密会出问题。统一变成数字型
						userMsg.UserLevel=Number(userMsg.UserLevel);
						const that=this;
						const md5Value=md5(`${account}${action}${opreate}${JSON.stringify(userMsg)}${skeys}`);
						_this.axios({
							method:"post",
							url: webconfig.address()+"api/Manager",
							headers:{
								"Content-Type":"Content-type: application/json"
							},
							data:{
								account,
								action,
								opreate,
								userMsg,
								md5Value,
							}
						}).then(res=>{
							const resData=res.data;
							if(resData.code=="200"){
								_this.$store.commit('addPromtMessage',"操作成功");
							}else{
								_this.$store.commit('addPromtMessage',resData.msg);
							}
							that.refresh();
						}).catch(ex=>{
							_this.$store.commit('addPromtMessage',ex.message);
						});
						
						
					}
				},
				contactManager:{
					refreshBtnLock:false,
					removeContactBtnLock:false,
					receiveContactBtnLock:false,
					data:[],
					refresh(){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						const type="manager";
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							this.refreshBtnLock=false;
							return;
						}
						
						const that=this;
						const md5Value=md5(`${account}${type}${skeys}`);
						_this.axios({
							methods:"get",
							url: webconfig.address()+"api/Contact",
							headers:{
								"Content-Type":"application/x-www-form-urlencoded"
							},
							params:{
								account,
								md5Value,
								type,
							}
						}).then(res=>{
							const resData=res.data;
							console.log(resData);
							if(resData.code=="200"){
								that.data.splice(0);
								that.data=JSON.parse(resData.data);
								that.data.forEach(item=>{
									item.tempReceiveMsg="";
								});
								console.log(that.data);
							}else{
								_this.$store.commit('addPromtMessage',resData.msg);
							}
							
							this.refreshBtnLock=false;
						}).catch(ex=>{
							_this.$store.commit('addPromtMessage',ex.message);
							this.refreshBtnLock=false;
						});
					},
					downloadFile(fileUUID){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							this.refreshBtnLock=false;
							return;
						}
						
						const fileHref=`fileUUID=${fileUUID}&account=${account}&md5Value=${md5(fileUUID+account+skeys)}`;
						window.open(`${webconfig.address()}api/contact/downLoadFile?${fileHref}`);
					},
					/**
					 * 删除一条留言信息
					 */
					removeContact(uploadUUID){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							return;
						}

						const action="contact";
						const opreate="delete";
						var md5Value=md5(account+uploadUUID+skeys);
						let that=this;
						_this.axios({
							method:"post",
							url: webconfig.address()+"api/contact/delete",
							headers:{
								"Content-Type":"application/json"
							},
							data:{
								account,
								uploadUUID,
								md5Value,
							}
						}).then(res=>{
							let resData=res.data;
							if(resData.code=="200"){
								_this.$store.commit('addPromtMessage',"删除成功");
							}else{
								_this.$store.commit('addPromtMessage',"删除失败发生异常"+resData.msg);
							}
							that.refresh();
						}).catch(ex=>{
							_this.$store.commit('addPromtMessage',ex.message);
							this.refreshBtnLock=false;
						});
					},
					receiveContact(uploadUUID,receiveMsg){
						const skeys=$.cookie('skeys');
						const account=$.cookie('account');
						if(!account){
							_this.$store.commit('addPromtMessage',"获取发生异常，当前登陆信息丢失");
							return;
						}

						if(receiveMsg.length==0){
							_this.$store.commit('addPromtMessage',"回复内容不能为空");
							return;
						}

						var md5Value=md5(account+uploadUUID+receiveMsg+skeys);
						let that=this;
						_this.axios({
							method:"post",
							url: webconfig.address()+"api/contact/receive",
							headers:{
								"Content-Type":"application/json"
							},
							data:{
								account,
								uploadUUID,
								receiveMsg,
								md5Value,
							}
						}).then(res=>{
							let resData=res.data;
							if(resData.code=="200"){
								_this.$store.commit('addPromtMessage',"回复成功");
							}else{
								_this.$store.commit('addPromtMessage',"回复失败发生异常"+resData.msg);
							}
							that.refresh();
						}).catch(ex=>{
							_this.$store.commit('addPromtMessage',ex.message);
							this.refreshBtnLock=false;
						});
					}
				}
			}
		},
		methods:{
			/**
			 * 刷新数据
			 */
			refreshData(){
				if(this.currentActiveIndex==0){
					this.applyManager.refresh();
				}
				
				if(this.currentActiveIndex==1){
					this.userManager.refresh();
				}
				
				if(this.currentActiveIndex==2){
					this.contactManager.refresh();
				}
			},
			/**
			 * 切换到指定页面
			 * @param {Object} index
			 */
			switchToPage(index){
				if(this.currentActiveIndex==index){
					return;
				}
				
				const findItem=this.indexPath.find(item=>{
					if(item.index==index){
						return true;
					}
					
					return false;
				});
				
				if(!findItem){
					console.error("切换失败,没有改页面");
					return;
				}
				
				this.currentActiveIndex=index;
				this.refreshData();
			}
		},
		computed:{

		},
		mounted(){
			_this=this;
			this.refreshData();
		}
	}
</script>

<style scoped lang="less">
	@min624:~"(min-width: 624px)";
	@pcSize:~"(min-width: 1024px)";
	@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
	@phoneSize:~"(max-width: 624px)";
	//导航容器的内边距
	@navigatorBarPadding:5px;
	//导航条的高度
	@navigatorBarHeight:80px;
	//导航标题的字体大小
	@navigatorCellTitleFontSize:17px;
	//进度管理顶部容器的高度
	@progressTopBarHeight:50px;
	.pageContainer{
		background-color: #FF5500;
	}
    .navigatorBar{
        height: @navigatorBarHeight - @navigatorBarPadding*2;
        width: calc(100% - @navigatorBarPadding*2);
		padding: @navigatorBarPadding;
		display: flex;
		flex-direction: row;
		align-items: center;
    }
	.navigatorCell{
		height: calc(100% - @navigatorBarPadding*2 - 2px);
		width: @navigatorBarHeight;
		margin: 0px 5px;
		cursor: pointer;
		padding: 1px;
		border: white solid 2px;
	}
	.navigatorCell[choice]{
		border: #008D57 solid 2px;
	}
	.navigatorCellIcon{
		width: 100%;
		height: 60%;
	}
	.navigatorCellTitle{
		display: flex;
		height: 40%;
		font-size:17px;
		color: white;
		align-items: center;
		justify-content:center;
	}
	.viewContainer{
		height: calc(100% - @navigatorBarHeight);
		width: 100%;
		background-color: aqua;
		position:relative;
		background-color: white;
	}
	.subViewContainer{
		width: 100%;
		height: 100%;
		z-index: 1;
		top: 0px;
		left: 0px;
		position: absolute;
		opacity: 0;
		.topBar{
			height: @progressTopBarHeight;
			width: 100%;
			font-size: 17px;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			>div{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			>div:nth-child(1){
				width: 20%;
				text-align: center;
			}
			>div:nth-child(2){
				width: 60%;
			}
			>div:nth-child(3){
				width: 20%;
				text-align: center;
			}
		}
		.bottomContainer{
			height: calc(100% - @progressTopBarHeight - 8px);
			width:  calc(100% - 8px);
			padding: 4px;
			position: relative;
			overflow: auto;
			.progressApplyItem{
				width: 100%;
				height: 100px;
				margin: 5px 0px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: @navigatorCellTitleFontSize;
				>div:nth-child(1){
					width: 20%;
					height: 100%;
					display: flex;
					align-items:flex-start;
					flex-direction: column;
					>div{
						text-align:left;
						width: 100%;
						text-overflow:ellipsis;
						overflow:hidden;
					}
				}
				>div:nth-child(2){
					width: 80%;
					height: 100%;
					>div{
						text-align:left;
						width: 100%;
						overflow:hidden;
					}
				}
				>div:nth-child(3){
					text-align: left;
					width: 20%;
					height: 100%;
				}
			}
			.progressApplyItem[checked]{
				background-color: #008D57;
				color: white;
			}
			.progressApplyItem:not([checked]):nth-child(odd){
				background-color: #ffbc9a;
			}
			.progressApplyItem:not([checked]):nth-child(even){
				background-color: #6fd0ff;
			}
			.userItem{
				width: 100%;
				height: 50px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				font-size: @navigatorCellTitleFontSize;
				margin: 5px 0px;
				.itemCell{
					margin: 0px 1px;
				}
				.smallInput{
					width: 5em;
				}
			}
			.contactItem{
				width: 100%;
				height: 300px;
				margin: 10px 0px;
				border: 1px solid black;
				.contacTopBox{
					width: 100%;
					height: 30%;
					display: flex;
					flex-direction: column;
					font-size: 15px;
					.detailMsg{
						height: 50%;
						text-align: left;
						display: flex;
						flex-direction: row;
						justify-content:space-around;
						align-content: center;
						align-items: center;
						background-color:#dcffbfc4 ;
						color: black;
					}
					.fileMsg{
						height: 50%;
						display: flex;
						justify-content:left;
						overflow: hidden;
						.filelink{
							text-decoration: underline;
							cursor: pointer;
						}
					}
				}
				.contactBottomBox{
					width: 100%;
					height: 70%;
					overflow: auto;
					border-top: black 1px solid;
					text-align: left;
				}
			}
			.receiveContainer{
				width: 100%;
				height: 100px;
				overflow: auto;
			}
			.contactReceive{
				margin: 1px 0px;
				width: 100%;
				height: 20px;
				text-align: left;
				background-color: #ffbc9a;
				display: flex;
				flex-direction: row;
				span{
					display: inline-block;
					height: 100%;
					font-size: 15px;
					
				}
				span:nth-child(1){
					width: 20%;
				}
				span:nth-child(2){
					width: 60%;
				}
				span:nth-child(3){
					width: 20%;
				}
			}
		}
	}
	.subViewContainer[choice]{
		z-index: 2;
		opacity: 1;
	}
	.subViewContainer:nth-child(1){
		// background-color: aqua;
	}
	.subViewContainer:nth-child(2){
		// background-color: #CCCCCC;
	}
	.subViewContainer:nth-child(3){
		// background-color: #FF0000;
	}
	
	.icon{
		color: white;
		fill: white;
	}
	
</style>
