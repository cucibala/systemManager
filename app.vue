<template>
	<div id="mainContainer">
		<router-view></router-view>
		<v-menubar :showMenuBar="showMenuBar"></v-menubar>
		<v-promtbox></v-promtbox>
	</div>
</template>
<script>
	import vMenubar from './vue-component/menubar.vue';
	import vPromtbox from './vue-component/promtMessageBox.vue'
	import $ from 'jquery';
	import webconfig from "./web.config.js";
	import md5 from "md5";
	export default{
		components:{
			vMenubar,
			vPromtbox,
		},
		methods:{
			handleClick(e){
				console.log(e);
			},
		},
		computed:{
			showMenuBar(){
				return this.$store.state.showMenuBar;
			},
			refreshPage(){
				return this.$store.state.refreshPage;
			}
		},
		watch:{
			refreshPage(){
				/*获取首页信息*/
				/*let skeys=$.cookie('skeys');
				let account=$.cookie('account');
				if(skeys&&account){
					let _this=this;
					let md5value=md5(account+"index"+skeys);
					let data={
						account,
						module:"index",
						md5:md5value,
					}
					this.axios.get(config.address()+"api/webget",{
						params: {
							account,
							module:"index",
							md5:md5value,
						}
					}).then((response) => {
						let result=response.data;
						if(result.status=="200"){
							_this.$store.commit('initIndexMessage',result.result);
							_this.$store.commit('initUser',result.user);
						}else{
							$.removeCookie("account");
							$.removeCookie("skeys");
							_this.$router.push('/login');
							_this.$store.commit('addPromtMessage',result.error);
						}
					}).catch(error=>{
						console.log(error);
					});*/

					/*$.ajax({
						url:config.address()+"api/webget",
						type:"GET",
						data:data,
						error:function(jqXHR,textStatus,errorThrown){
							_this.$store.commit('addPromtMessage',"与服务器无法通信");
							console.error("无法与服务器通信");
						},
						success:function(result){
							let resultP=JSON.parse(result);
							if(resultP.status=="200"){
								_this.$store.commit('initIndexMessage',resultP.result);
								_this.$store.commit('initUser',resultP.user);
							}else{
								$.removeCookie("account");
								$.removeCookie("skeys");
								_this.$router.push('/login');
								alert(resultP.error);
							}
						}
					});
				}*/
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
							_this.$store.commit('initUser',result.data.user);
							_this.$store.commit('initIndexMessage',result.data.indexMessge);
						}else{
							$.removeCookie("account");
							$.removeCookie("skeys");
							_this.$store.commit('addPromtMessage',"登陆过期");
							_this.$router.push('/login');
						}
					}).catch(e=>{
						console.log("error");
					});
				}else{
					_this.$store.commit('addPromtMessage',"登陆过期");
					_this.$router.push('/login');
				}
			}
		},
		data(){
			return {

			}
		},
		mounted(){
			let _this=this;
			//$("#mainContainer").height($(window).height());
			this.$store.commit('refreshPage');
			/*http://pv.sohu.com/cityjson?ie=utf-8查询ip地址接口*/

			let width=$(window).width()-20;
			let height=$(window).height()-20;
			if(width<360){
				width=360;
			}
			$("#mainContainer").height(height);
			$("#mainContainer").width(width);

			_this.$store.commit('updateBrowerPortype',{width,height});
			window.onresize=()=>{
				width=$(window).width()-20;
				height=$(window).height()-40;
				if(width<360){
					width=360;
				}
				$("#mainContainer").height(height);
				$("#mainContainer").width(width);
				_this.$store.commit('updateBrowerPortype',{width,height});
			}
		}
	}
</script>
<style lang="less">
body{
	background: #e8e9ec;
}
.inline-block{
	display: inline-block;
}
.bottom-box{
	position: absolute;
	bottom: 0px;
	width:calc(100% - 40px);
	padding: 20px;
	text-align: center;
	span{
		color: #affeee;
		cursor: pointer;
	}
}
a{
	cursor: pointer;
}
ul,dl,ol, li{
	list-style-position: outside;
	list-style-type: none;
}
#mainContainer{
	text-align: center;
	font-size: 1.7rem;
	overflow: hide;
	position: absolute;
	left: 10px;
	top: 10px;
}
//---每一个页面都是一个pageContainer
.pageContainer{
	width: 100%;
	height: 100%;
	text-align: center;
	position: relative;
	min-width: 360px;
}
.marigin-top{
	margin-top: 10px;
}
.label-button{
	color: #68a5d5;
	cursor: pointer;
}
.bottomBarItem{
	font-size: 40px;
}
.no-padding{
	padding: 0px;
}
.align-right{
	text-align: right;
}
button{
	font-size: 23px;
}
input[type="reset"]{
	background: none;
	position: absolute;
	right: 10px;
	bottom: 2px;
	font-size: 25px;
	border: none;
	border-bottom: 1px solid;
	color: #ff6868;
	font-weight: 100;
	padding: 0px;
	cursor: pointer;
}
.bgcolor{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0px;
	top: 0px;
	z-index: -1;
}
.exit-button{
	z-index: 2;
	font-size: 40px;
	position: absolute;
	right: -10px;
	top: -25px;
	color: #fd6f6f;
	cursor: pointer;
}
//*100%宽度的盒子*/
.widthBox{
	width: 100%;
	display: inline-block;
	height: 30px;
	position: relative;
}
.overflowBox{
	width: 100%;
	height: 100%;
	overflow: scroll;
}
.textRightBox{
	text-align: left;
	margin-top: 10px;
	padding-left: 61.8%;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
