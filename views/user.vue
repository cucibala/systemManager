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
			<div class="leftWindow absoluteBox">
				<span @click="progresSwitchClick(1)" :state="activeProgresSwitch==1">506教室 11.2-11.6</span>
				<span @click="progresSwitchClick(2)" :state="activeProgresSwitch==2">506教室 11.2-11.6</span>
			</div>
			<div class="rightWindow absoluteBox">
				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				activeSwitch:2,
				activeProgresSwitch:-1,
				userMsg:{
					name:"haysu",
					account:"879218254",
					level:"2",
					creatTime:"2020-5-6",
				}
			}
		},
		methods:{
			switchClick(e){
				this.activeSwitch=e;
			},
			progresSwitchClick(e){
				this.activeProgresSwitch=e;
			}
		}
	}
</script>
<style type="text/css" lang="less" scoped>

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
	height: 8px;
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
	>.innerItem{
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
	>.leftWindow{
		width:calc(@leftWindowSize - @containerPadding);
		height: 100%;
		left: @containerPadding;
		span{
			display: inline-block;
			width: 100%;
			height: 24px;
			margin-bottom: 10px;
			cursor: pointer;
			background-color: #e0e0e0;
		}
		span[state="true"]{
			background-color:#c8ffa6;
		}
	}
	>.rightWindow{
		right: @containerPadding;
		width:calc((100% - @leftWindowSize) - @containerPadding);
		height: 100%;
		//background-color: #557998;
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