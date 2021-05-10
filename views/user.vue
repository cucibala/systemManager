<template>
	<div class="pageContainer">
		<div class="topMarigin">
			<div  class="switchItem leftIn_1" @click="switchClick(1)" :state="activeSwitch==1">
				<span>基本信息</span>
			</div>
			<div  class="switchItem leftIn_2" @click="switchClick(2)" :state="activeSwitch==2">
				<span>进度查询</span>
			</div>
		</div>
		<hr class="aniHr">
		<!-- 进入页面的时候会显示的内容 -->
		<div class="mainContainer" v-if="activeSwitch==-1">
			<p>Hello world</p>
		</div>
		<!-- 选择第一个的时候显示的东西 -->
		<div class="mainContainer" v-if="activeSwitch==1">
			<div class="innerItem">
				<span>姓名:</span><span>{{userMsg.name}}</span>
			</div>
			<div class="innerItem">
				<span>账号:</span><span>{{userMsg.account}}</span>
			</div>
			<div class="innerItem">
				<span>权限等级:</span><span>{{userMsg.level}}</span>
			</div>
			<div class="innerItem">
				<span>创建时间:</span><span>{{userMsg.creatTime}}</span>
			</div>
		</div>
		<!-- 选择第二个的时候显示的东西 -->
		<div class="mainContainer" v-if="activeSwitch==2">
			<!-- <div class="leftWindow absoluteBox">
				<template v-for="(data,index) in progressDatas">
					<div class="innerItem" @click="progresSwitchClick(index)" :state="activeProgresSwitch==index">
						<span>{{data[0].BuildName}}</span>
						<span>{{data[0].RoomName}}</span>
					</div>
				</template>
			</div> -->
			<div class="innerContainer absoluteBox">
				<div id="progressDetailTitle">
					<span>教学楼</span>
					<span>教室</span>
					<span>开始日期</span>
					<span>结束日期</span>
					<span>时间段</span>
					<span>提交时间</span>
					<span>审核状态</span>
				</div>
					<template v-for="progressData in progressDatas">
						<template v-for="data in progressData">
							<div class="progressDetailConatiner">
								<span>{{data.BuildName}}</span>
								<span>{{data.RoomName}}</span>
								<span>{{data.state.StartDate.substr(0,10)}}</span>
								<span>{{data.state.EndDate.substr(0,10)}}</span>
								<span>{{data.state.StartTime.substr(11,5)}}-{{data.state.EndTime.substr(11,5)}}</span>
								<span>{{data.state.CreateTime.substr(0,10)}}</span>
								<span v-if="data.state.ApplyState ==='APPL'">等待审核</span>
								<span v-if="data.state.ApplyState ==='PASS'">审核通过</span>
								<span v-if="data.state.ApplyState ==='NOPASS'">审核不通过</span>
							</div>
						</template>
					</template>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import $ from "jquery";
	import webconfig from "../web.config.js";
	import md5 from "md5";
	var _this;
	export default{
		data(){
			return {
				activeSwitch:1,
				//activeProgresSwitch:-1,
				userMsg:{
					name:"",
					account:"",
					level:"",
					creatTime:"",
				},
				progressDatas:[]//RoomName":"hello","BuildName":"worle"},{"state":{"UseStateId":2021181210187789,"UserId":"2","RoomId":"56847","StartDate":"2021-04-12T00:00:00","EndDate":"2021-04-17T00:00:00","StartTime":"1999-01-01T12:18:00","EndTime":"1999-01-01T16:18:00","Monday":true,"Tuesday":false,"Wednesday":false,"Thursday":true,"Friday":true,"Saturday":true,"Sunday":true,"Reson":"","ApplyState":"APPL","room_":null,"user_":null},"RoomName":"12333","BuildName":"123"},{"state":{"UseStateId":2021061308064052,"UserId":"2","RoomId":"25930","StartDate":"2021-04-13T00:00:00","EndDate":"2021-04-13T00:00:00","StartTime":"1999-01-01T08:06:00","EndTime":"1999-01-01T08:06:00","Monday":true,"Tuesday":false,"Wednesday":false,"Thursday":false,"Friday":false,"Saturday":false,"Sunday":false,"Reson":"","ApplyState":"APPL","room_":null,"user_":null},"RoomName":"404","BuildName":"第一教学楼"}
			}
		},
		computed:{
			currentProgressData(){
				if(this.activeProgresSwitch<0){
					return undefined;
				}
				
				if(this.progressDatas.length<this.activeProgresSwitch){
					return undefined;
				}
				
				const result=this.progressDatas[this.activeProgresSwitch];
				console.log(result);
				return result;
			}
		},
		methods:{
			switchClick(e){
				if(this.activeSwitch===e){
					return;
				}
				
				this.activeSwitch=e;
				if(e=="2"){
					this.postForm(2);
				}
				
			},
			progresSwitchClick(e){
				this.activeProgresSwitch=e;
				console.log(e);
			},
			setProgressMsg(data){
				this.progressDatas=data;
				console.log(data);
				
			},
			setUserMsg(data){
				this.userMsg.creatTime=data.CreateTime.substr(0,10);
				this.userMsg.name=data.UserName;
				this.userMsg.account=data.UserId;
				this.userMsg.level=data.UserLevel;
			},
			/**
			 * 发送表单获取数据
			 * @param {Object} opreate 1.获取基本信息 2.获取进度信息
			 */
			postForm(opreate){
				let skeys=$.cookie('skeys');
				let account=$.cookie('account');
				if(!skeys||!account){
					_this.$store.commit('addPromtMessage',"登陆过期");
					return;
				}
				
				const md5Value=md5(account+opreate+skeys);
				this.axios({
					method: 'post',
					url: webconfig.address()+"api/User",
					headers: {"Content-Type": "Content-type: application/json"},
					data:{
						account,
						opreate,
						md5Value,
					}
				}).then(res=>{
					const resDate=res.data;
					console.log(resDate);
					if(resDate.code==="200"){
						var data=JSON.parse(resDate.data);
						switch(opreate){
							case 1:{
								_this.setUserMsg(data);
								break;
							}
							case 2:{
								_this.setProgressMsg(data);
								break;
							}
							default:{
								_this.$store.commit('addPromtMessage',"未知的操作类型");
								break;
							}
						}
						
					}else{
						_this.$store.commit('addPromtMessage',resDate.msg);
					}
					
				}).catch(ex=>{
					_this.$store.commit('addPromtMessage',ex.Message);
				});
				
			}
		},
		mounted(){
			_this=this;
			this.postForm(1);
		}
	}
</script>
<style type="text/css" lang="less" scoped>
@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";
@keyframes myfirst
{
	from {width: 0px;}
	to {width: 90%;}
}
@keyframes leftIn
{
	from {transform:translate(-1000px,-200px)}
	to {transform:translate(0,0)}
}
@hrWidth:90%;
@leftWindowSize:30%;
@containerPadding:20px;
.pageContainer{
	//color: white;
	color: #455664;
}
.fullScreenBg{
	position: fixed;
	width:100%;
	height: 100%;
	z-index: -100;
	top: 0px;
	left: 0px;
	background-color:#060506;
}
.aniHr{
	width: @hrWidth;
	height: 1px;
	background-color: #ff7600;
	animation: myfirst 1s;
	-webkit-animation: myfirst 1s; /* Safari 与 Chrome */
}
.mainContainer{
	width: @hrWidth;
	height: 50%;
	padding: @containerPadding;
	display: inline-block;
	font-size: 1rem;
	position:relative;
	text-align:left;
	.innerItem{
		width: 100%;
		height: 24px;
		margin-top: 5px;
		>span:nth-child(1){
			width: 100px;
			text-align: right;
			display: inline-block;
			margin-right: 10px;
		}
	}
	.leftWindow{
		width:calc(@leftWindowSize - @containerPadding  - 8px);
		height: calc(100% - (@containerPadding*2));
		left: @containerPadding;
		background-color:#008d57;
		padding: 4px;
		z-index: 2;
		.innerItem{
			display: flex;
			flex-direction: row;
			span{
				display: inline-block;
				cursor: pointer;
				white-space: nowrap;
				color:white;
				text-align:left;
			}
			span:not(:hover){
				overflow:hidden;
				text-overflow:ellipsis;
				background-color:#008d57;
			}
		}
		.innerItem[state="true"]{
			background-color:#008d57;
			border:2px dashed #ffffff;
			width:calc(100% - 4px);
			color:white;
		}
	}
	.innerContainer{
		left: @containerPadding;
		width:calc(100% - (@containerPadding*2) - 8px);
		height: calc(100% - (@containerPadding*2));
		padding: 4px;
		display: flex;
		flex-direction: column;
		z-index: 1;
		overflow: auto;
		#progressDetailTitle{
			display: inherit;
			flex-direction: row;
			margin: 4px 0px;
			justify-content : space-between;
			span{
				white-space: nowrap;
				text-align:left;
				margin: 0px 1px;
			}
			@media @min624{
				span{
					width: 100%;
					flex-wrap: nowrap;
				}
			}
			@media @phoneSize{
				span:not(:hover){
					overflow:hidden;
					text-overflow:ellipsis;
				}
				span:hover{
					background-color: #008d57;
					color:white;
				}
			}
		}
		.progressDetailConatiner{
			display: inherit;
			flex-direction: row;
			margin: 4px 0px;
			justify-content : space-between;
			border: solid 2px #123321;
			padding: 3px 0px;
			span{
				white-space: nowrap;
				text-align:left;
				margin: 0px 1px;
				
			}
			@media @min624{
				span{
					width: 100%;
					flex-wrap: nowrap;
				}
			}
			@media @phoneSize{
				span:not(:hover){
					width: 200px;
					overflow:hidden;
					text-overflow:ellipsis;
				}
				span:hover{
					background-color: #008d57;
					color:white;
					border: 2px solid #4422ff;
				}
			}
		}
	}
}
.topMarigin{
	margin-top: 100px;
	text-align: left;
	padding: 10px;
	width: 90%;
	height: 42px;
	display: inline-block;
	cursor: pointer;
	
	.switchItem{
		display: inline-block;
		position: relative;
		margin: 0px 20px 0px 20px;
		font-size: 1.7rem;
	}
	.switchItem>span{
		width: 110px;
		height: 40px;
		overflow: hidden;
	}
	.switchItem[state="true"]{
		border-bottom: 2px solid;
	}
	.switchItem:hover{
		border-bottom: 2px solid;
	}
	.leftIn_1{
		animation: leftIn 1s;
		-webkit-animation: leftIn 1s; /* Safari 与 Chrome */
	}
	.leftIn_2{
		animation: leftIn 1.2s;
		-webkit-animation: leftIn 1.2s; /* Safari 与 Chrome */
	}
}
.absoluteBox{
	position: absolute;
}
</style>