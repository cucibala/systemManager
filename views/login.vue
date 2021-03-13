<template>
	<div id="loginPage">
		<div  class="marginTop">
			<span>
				实验室管理系统
			</span>
		</div>
		<v-login-box @login="handleLogin($event)"></v-login-box>
	</div>
</template>
<script type="text/javascript">
	import vLoginBox from "../vue-component/loginBox.vue";
	import $ from "jquery";
	import $cookie from "jquery.cookie";
	import webconfig from "../web.config.js";
	import md5 from "md5";
	export default{
		components:{
			vLoginBox,
		},
		data(){
			return {
				
			}
		},
		methods:{
			handleLogin(info){
				let _this=this;
				if(info.account.length==0||info.password.length==0){
					_this.$store.commit('addPromtMessage',"输入不能为空");
					return;
				}
				let passwordMD5=md5(info.password);
				let formData=new FormData();
				formData.append("account",info.account);
				formData.append("rgtoken",info.rgToken);
				formData.append("password",passwordMD5);
				formData.append("ip",returnCitySN['cip']);
				formData.append("cip",returnCitySN['cid']);
				formData.append("cname",returnCitySN['cname']);
				this.axios({
					method: 'post',
					url: webconfig.address()+"api/login",
					headers: {"Content-Type": "multipart/form-data"},
					data:formData,
				}).then((response) => {
					let result=response.data;
					console.log(result);
					if(result.code=="200"){
						let skeys=result.data.user.skeys;
						let account=result.data.user.account;
						$.cookie('account', account, { expires: 1 });
						$.cookie('skeys', skeys, { expires: 1 });
						$.cookie('isLogin', true);
						_this.$router.push('/index');
						_this.$store.commit('addPromtMessage',"Hello     "+result.data.user.name);
						_this.$store.commit('initUser',result.data.user);
						_this.$store.commit('initIndexMessage',result.data.indexMessge);
						//_this.$store.commit('initUser',result.data);
					}else{
						$.removeCookie("account");
						$.removeCookie("skeys");
						_this.$store.commit('addPromtMessage',result.msg);
						//_this.$router.push('/login');
						//_this.$store.commit('addPromtMessage',result.error);
					}
				}).catch(error=>{
					_this.$store.commit('addPromtMessage',"ERROR");
					console.log(error);
				});
				/*this.axios.post(config.address()+"api/login",{
					params: {
						account:info.account,
						rgtoken:info.rgToken,
						password:passwordMD5,
					}
				}).then((response) => {
					let result=response.data;
					if(result.code=="200"){
						let skeys=result.data.skeys;
						let account=result.data.account;
						$.cookie('account', account, { expires: 1 });
						$.cookie('skeys', skeys, { expires: 1 });
						$.cookie('isLogin', true);
						_this.$store.commit('refreshPage');
						_this.$router.push('/index');
						_this.$store.commit('initIndexMessage',result.result);
						_this.$store.commit('initUser',result.data);
					}else{
						console.log(result);
						$.removeCookie("account");
						$.removeCookie("skeys");
						_this.$store.commit('addPromtMessage',result.msg);
						//_this.$router.push('/login');
						//_this.$store.commit('addPromtMessage',result.error);
					}
				}).catch(error=>{
					_this.$store.commit('addPromtMessage',"ERROR");
					console.log(error);
				});*/
			}
		},
		mounted(){
			/*添加新浪的ip地址查询  {"cip": "116.22.135.37", "cid": "440106", "cname": "广东省广州市天河区"}->>>使用方法returnCitySN[cip]*/
			const s = document.createElement('script');
			s.type = 'text/javascript';
			s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
			document.body.append(s);
			/*************************/



			/*进行登陆判断*/
			let skeys=$.cookie('skeys');
			let account=$.cookie('account');
			let _this=this;
			if(skeys&&account){
				let md5Skeys=md5(account+skeys);
				this.axios({
					method: 'get',
					url: webconfig.address()+"api/login",
					params:{
						"account":account,
						"md5value":md5Skeys,
					}
				}).then(response=>{
					let result=response.data;
					if(result.code==="200"){
						$.cookie('isLogin', true);//登陆成功
						_this.$router.push('/index');
						_this.$store.commit('initUser',result.data.user);
						_this.$store.commit('initIndexMessage',result.data.indexMessge);
					}else{
						$.removeCookie("account");
						$.removeCookie("skeys");
						_this.$store.commit('addPromtMessage',"登陆过期");
						_this.$router.push('/login');
					}
				});
			}///注释内容
		}
	}
</script>
<style type="text/css" lang="less">
#loginPage{
	background-color: #1f8fa8;
	width:98%;
	height: 100%;
	top: 0px;
	min-width: 300px;
	display: inline-block;
	@media (min-width:614px)  {
		position: absolute;
		left: 1%;
	}
}
.marginTop{
	margin: 50px 0px 0px 0px;
	font-size:40px;
	font-weight: bold;
	text-align: center;
	background-color: #aaaaaa;
	width: 100%;
	color: white;
	min-width: 300px;
}
</style>