<template>
	<div :class="menuClass" v-show="showMenuBar">
		<div class="menu-box">
			<div class="menu-content">
				<ul>
					<li @click="menuClick">
						<router-link  to="/index"  >首页</router-link>
					</li>
					<li @click="menuClick">
						<router-link  to="/search" >搜索</router-link>
					</li>
					<li @click="menuClick">
						<router-link  to="/user" >用户</router-link>
					</li>
					<li @click="menuClick">
						<router-link  to="/error" >留言</router-link>
					</li>
				</ul>
				<div class="bottom-box">
					<span @click="exitLogin">退出登陆</span>
				</div>
			</div>
			<div class="menu-bg"></div>
		</div>
		<div id="menubutton" @click="menuClick">
			<span class="humBoxInner">
				<span></span>
				<span></span>
				<span></span>
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
	import $ from 'jquery';
	export default{
		props:{
			showMenuBar:{
				type:Boolean,
				default:true,
			}
		},
		data(){
			return{
				menuOn:false,
			}
		},
		computed:{
			menuClass(){
				if(this.menuOn){
					return "menuon";
				}else{
					return "";
				}

			}
		},
		methods:{
			menuClick(){
				this.menuOn=!this.menuOn;
			},
			exitLogin(){
				$.removeCookie("account");
				$.removeCookie("skeys");
				this.menuOn=!this.menuOn;
				this.$router.push('/login');
			}
		},
		mounted(){

		}
	}
</script>
<style type="text/css" scoped lang="less">
@phoneSize:~"(min-width:300px) and (max-width:600px)";//手机显示图片的尺寸
.menuon{
	#menubutton{
		.humBoxInner{
			span:nth-of-type(1){
				top: 9px;
				transform:rotate(-315deg);
			}
			span:nth-of-type(2){
				width: 0px;
				left: 50%;
			}
			span:nth-of-type(3){
				top: 9px;
				transform: rotate(315deg);
			}
		}
		.humBoxInner::after{
			content: "CLOSE";
		}
	}
	.menu-content{
		transform: translateX(0);
	}
	.menu-bg{
		transform: translateX(0);
	}
}
//背景的z轴在第5 其他应该小于5
.menu-content{
	width: 980px;
	height: 100%;
	position: fixed;
	right: 0px;
	top: 0px;
	transform:translateX(100%);
	transition: all 0.65s ease 0s;
	z-index: 6;
	background: rgba(11, 116, 73, 0.85);
	text-align: left;
	color: white;
	.span{
		display: inline-block;
	}
	@media (min-width:300px)and(max-width:1024px){
		width: calc(100%);
		min-width: initial;
	}
	li{
		a{
			display: block;
			padding: 17px 45px 17px 65px;
			border-bottom: 1px solid #199867;
			position: relative;
			color: #ffffff;
			text-decoration: none;
		}
	}
}
.menu-bg{
	position: fixed;
	right: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	transform:translateX(100%);
	transition: all 0.65s ease 0s;
	opacity: 0.8;
	z-index: 5;
}
#menubutton{
	z-index: 7;
	color: #ffffff;
	cursor: pointer;
	position: fixed;
	text-align: left;
	background-color: #008D57;
	right: 0px;
	top:0px;
	width: 76px;
	height: 76px;
	.humBoxInner{
		position: relative;
		display:inline-block;
		width: 28px;
		height: 24px;
		margin-top: 18px;
		margin-left: 24px;
		span{
			position: absolute;
			left:0px;
			width: 100%;
			height: 4px;
			background-color: #ffffff;
			transition: all 0.4s ease 0s;
		}
		span:nth-of-type(1){
			top: 0px;
			transform:rotate(0);
		}
		span:nth-of-type(2){
			top: 50%;
			transform: translateY(-50%);
		}
		span:nth-of-type(3){
			bottom: 0%;
			transform: rotate(0);
		}
	}
	.humBoxInner::after{
		content: "MENU";
		display: block;
		position: absolute;
		left: 50%;
		bottom: -20px;
		font-size: 10px;
		letter-spacing: 0.1em;
		transform: translateX(-50%);
	}
	@media @phoneSize{
		width: 60px;
		height: 60px;
		padding: 0px;
		.humBoxInner{
			margin-top: 12px;
			margin-left: 18px;
			width: 24px;
			height: 21px;
			span{
				width: 100%;
				height: 3px;
			}
		}
	}
}
</style>