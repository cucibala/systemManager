<template>
	<div>
		<div id="lb_mainbox">
			<div class="smallWidth">
				<span :state="accountState">账号</span>
				<input type="text"  v-model="account">
			</div>
			<br>
			<div class="smallWidth">
				<span :state="passwordState">密码</span>
				<input type="password" v-model="password">
			</div>
			<div class="fullWidth">
				<div id="vaptchaContainer" style="width: 300px;height: 36px;">
					<!--vaptcha-container是用来引入VAPTCHA的容器，下面代码为预加载动画，仅供参考-->
					<div class="vaptcha-init-main">
						<div class="vaptcha-init-loading">
							<a href="/" target="_blank">
								<img src="https://r.vaptcha.net/public/img/vaptcha-loading.gif"/>
							</a>
							<span class="vaptcha-text">Vaptcha启动中...</span>
						</div>
					</div>
				</div>
			</div>
			<div class="no-padding align-right label-button">
				忘记了密码?
			</div>
			<div class="no-padding align-right marigin-top">
				<button @click="buttonClick">
					登陆
				</button>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import $ from "jquery";
	require('../link/vaptcha.js');
	export default{
		props:{
			reSet:{type:Boolean,default:false},
		},
		methods:{
			buttonClick(){
				if(this.rgToken=="unset"){
					this.$store.commit('addPromtMessage',"请完成验证码操作");
					return;
				}

				this.$emit('login',{account:this.account,password:this.password,rgToken:this.rgToken});
			}
		},
		data(){
			return{
				account:"",
				password:"",
				rgToken:"unset",
				vaptcha:"",
				accountState:"bigfont",
				passwordState:"bigfont",
				changeFontSize1:true,
				changeFontSize2:true,
			}
		},
		watch:{
			account(){
				if(this.account.length>0){
					if(this.changeFontSize1){
						this.changeFontSize1=false;
						this.accountState="smallfont";
						$(".smallWidth:nth-child(1)>input").css("font-size","20px");
					}
				}else{
					this.changeFontSize1=true;
					this.accountState="bigfont";
					$(".smallWidth:nth-child(1)>input").css("font-size","40px");
				}
			},
			password(){
				if(this.password.length>0){
					if(this.changeFontSize2){
						this.changeFontSize2=false;
						this.passwordState="smallfont";
						$(".smallWidth:nth-child(3)>input").css("font-size","20px");
					}
				}else{
					this.changeFontSize2=true;
					this.passwordState="bigfont";
					$(".smallWidth:nth-child(3)>input").css("font-size","40px");
				}
			},
			reSet(){
				this.rgToken="";
				if(this.vaptcha){
					this.vaptcha.reset();
				}
			}
		},
		mounted(){
			let _this=this;
            //TODO 正式发布时可以打开这里这里是验证码
			vaptcha({
      			vid: '5f8aafec7308a5b75b44ce01', // 验证单元id
      			type: 'click', // 展现类型 点击式
				scene: 0,//验证场景
      			container: '#vaptchaContainer', // 按钮容器，可为Element 或者 selector
      		}).then(function (vaptchaObj) {
     			vaptchaObj.render()// 调用验证实例 vaptchaObj 的 render 方法加载验证按钮
     			_this.vaptcha=vaptchaObj;
     			vaptchaObj.listen("pass",function(){
     				_this.rgToken=vaptchaObj.getToken();
     			});
     		});
		}
	}
</script>
<style scoped lang="less">
@boxBgcolor:#445566;
@containerWidth:80%;
#lb_mainbox{
	min-width: 290px;
	margin-top: 38px;
	padding: 24px;
	text-align: left;
	display: inline-block;
	background-color: white;
	button{
		width: 108px;
		height: 32px;
		background-color: #0067b8;
		color: white;
	}
	.smallWidth{
		background-color: #FAFAFA;
		border: 2px solid black;
		text-align: left;
		margin: 20px 0px;
		position: relative;
		overflow: hidden;
		display: inline-block;
		span{
			color: gray;
			padding: 0px 0px 0px 10px;
			top: -5px;
		}
		input{
			font-size:40px;
			width: 90%;
			border: none;
			outline: none;
			background-color: rgba(0, 0, 0, 0);
			position: absolute;
			bottom: 0px;
			left: 0px;
			padding: 0px 0px 0px 10px;
		}
		span[state="bigfont"]{
			transition: font-size 2s;
			-webkit-transition: font-size 0.5s; /* Safari */
			font-size: 40px;
			position: absolute;
		}
		span[state="smallfont"]{
			transition: font-size 2s;
			-webkit-transition: font-size 0.5s; /* Safari */
			font-size: 20px;
			position: relative;
		}
	}
	@media (max-width:614px) {
		width: @containerWidth;
		margin-top: 50px 0px;
		.smallWidth{
			width:100%;
			height: 50px;
		}
	}
	/*手机的尺寸*/
	@media (min-width:614px){
		width:360px;
		.smallWidth{
			width: 360px;
			height: 50px;
		}
	}
.vaptcha-init-main {
		display: table;
		width: 100%;
		height: 100%;
		background-color: #eeeeee;
	}
	.vaptcha-init-loading {
		display: table-cell;
		vertical-align: middle;
		text-align: center;
	}
	.vaptcha-init-loading > a {
		display: inline-block;
		width: 18px;
		height: 18px;
		border: none;
	}
	.vaptcha-init-loading > a img {
		vertical-align: middle;
	}
	.vaptcha-init-loading .vaptcha-text {
		font-family: sans-serif;
		font-size: 25px;
		color: #cccccc;
		vertical-align: middle;
	}
	#vaptchaContainer{
		display: inline-block;
		width: 1000px;
	}
	.fullWidth{
		width: 100%;
	}
}
</style>
