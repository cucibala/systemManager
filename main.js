import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './app.vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import $ from "jquery";
import $cookie from "jquery.cookie";
import webconfig from "./web.config.js";
import md5 from "md5";
import myTools from './link/myTools.js'     //引入公用js

Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };

  if(/(y+)/.test(fmt)){
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
        
  for(var k in o){
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(
        RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    }       
  }

  return fmt;
}
Vue.prototype.myTools = myTools;    
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
var test=false;
function baseDull(array){
	array.forEach(item=>{
		try{
			let tempsoftwares={};
			tempsoftwares.total=item.softwares.length;
			tempsoftwares.pageSize=4;
			tempsoftwares.currentPage=1;
			tempsoftwares.maxPage=Math.ceil(tempsoftwares.total/tempsoftwares.pageSize);
			let pageCompute=1;
			let currentpage=1;
			item.softwares.forEach(item1=>{
				item1.page=currentpage;
				item1.state="normal";
				if(pageCompute!=0&&pageCompute%4==0){
					currentpage++;
				}
				pageCompute++;
			});
			tempsoftwares.datas=item.softwares;
			item.state="able";
			item.softwares=tempsoftwares;
			item.title=item.room;
		}catch(exception){
			console.log(exception);
		}

	});
	return array;
}
const store=new Vuex.Store({
	state:{
        //是否显示MenuBar
		showMenuBar:true,
        //首页的图片地址
		indexImages:"",
		user:"",
        //flag
		refreshPage:false,
        //当前提示的消息
		currentPromtMessage:"",
        //提示窗口的信号值，改变的时候提示窗口会激活
		promtMessageSign:true,
		//当前是否正在获取数据
		isGettingData:false,
        //浏览器的属性宽高 目的：避免太多的时间监听
		browserProtype:{
			width:1920,
			height:1080,
		},
        //搜索界面的数据，全局避免每次进入都请求服务器
        searchPageDatas:{
			//版本
			version:"0",
			//最大的房间数
			maxTotal:0,
			//当前的房间数
			currentTotal:0,
			//页面的大小
			pageSize:0,
			//当前的页
			currentPage:0,
			//一行能容纳的元素个数
			col:0,
			//房间列表
			datas:[],
		},
        //搜索界面发生搜索时的数据保存数组
		targetSearchDatas:[]
	},
	mutations:{
        //初始化首页的信息
		initIndexMessage(state,obj){
			obj.forEach((x,index)=>{
				if(index!=0){
					x.state="unactive";
				}else{
					x.state="active";
				}
				let contentInner="";
				console.log(x);
				x.content.forEach(y=>{
					contentInner+=y+"\n";
				});
				x.contentInner=contentInner;
			});
			state.indexImages=obj;
		},
        //初始化用户信息 name level
		initUser(state,obj){
			state.user=obj;
		},
		//刷新主页面的信息
		refreshPage(state){
			let token=$.cookie("isLogin");
			if(!token||token!="true"){
				return;
			}
			state.refreshPage=!state.refreshPage;
		},
		//悬浮窗消息添加一条悬浮窗消息
		addPromtMessage(state,message){
			state.currentPromtMessage=message;
			state.promtMessageSign=!state.promtMessageSign;//通过更新信号值来提示有消息到来
		},
		//更新浏览器的一些属性 目前拥有属性width,height
		updateBrowerPortype(state,value){
			state.browserProtype.width=value.width;
			state.browserProtype.height=value.height;


			/*5+43+90 innerContainer的高度等于 总container-pagecontainer的上边距-头部选择-resultcontainer的上边距*/

			let col;
			let row=Math.floor((value.height-138)/(306+15));
			if((value.height-138)%(306+15)>120){
				row++;
			}
			if(value.width<620){
				col=Math.floor((value.width)/(156));
			}else{
				col=Math.floor((value.width*0.9-20)/(200+8));
			}
			//每一页最多包含的页数
			state.searchPageDatas.pageSize=col*row;
			state.searchPageDatas.col=col;
		},
		//初始化房间信息
		initRoomData(state,value){
			/*let patternSoftware = /{(.*?)}/g;
			let patternName = /'name':'(.*?)'/g;//匹配名字
            let patternSystem = /'system':'(.*?)'/g;//匹配系统
            let patternID = /'id':'(.*?)'/g;//匹配结果中的id
            let softwaresArray=value.softwareMsgListStr.match(patternSoftware);
            console.log(softwaresArray);
			//JSON.parse(result);
			softwaresArray.forEach(item=>{
				console.log(item);
			});
			state.searchPageDatas.version=value.version;*/
			state.searchPageDatas.version=value.version;
			state.searchPageDatas.maxTotal=value.maxTotal;
			state.searchPageDatas.currentTotal=Number(state.searchPageDatas.currentTotal)+Number(value.newCount);
			let array=baseDull(value.data);
			array.forEach(item=>{
				state.searchPageDatas.datas.push(item);
			});
		},
        //设置搜索界面每一个小卡片的大小
		setCurrentSize(state,value){
			state.searchPageDatas.currentPage=value;
		},
		//操作一个房间
		opreateRoom(state,value){
			console.log(value);
			let softwareList;
			let tempsoftwares={};
			let roomObj={};
			let pageCompute=1;
			let currentpage=1;
			let roomItem;//=value.data;
			switch(value.opreate){
				case "newSoftware":
				state.searchPageDatas.version=value.version;
				state.searchPageDatas.maxTotal++;
				state.searchPageDatas.currentTotal++;
				roomItem=value.data;
				softwareList=roomItem.softwares;
				tempsoftwares.total=softwareList.length;
				tempsoftwares.pageSize=4;
				tempsoftwares.currentPage=1;
				tempsoftwares.maxPage=Math.ceil(tempsoftwares.total/tempsoftwares.pageSize);
				softwareList.forEach(item=>{
					item.page=currentpage;
					item.state="normal";
					if(pageCompute!=0&&pageCompute%4==0){
						currentpage++;
					}
					pageCompute++;
				});
				tempsoftwares.datas=softwareList;
				roomObj.state="able";
				roomObj.softwares=tempsoftwares;
				roomObj.build=roomItem.build;
				roomObj.room=roomItem.room;
				roomObj.title=roomItem.room;
				roomObj.peopleCpa=roomItem.peopleCpa;
				roomObj.appendMsg=roomItem.appendMsg;
				state.searchPageDatas.datas.push(roomObj);
				break;
				case "modifySoftware":
				state.searchPageDatas.version=value.version;
				roomItem=value.data;
				try{
					state.searchPageDatas.datas.forEach(item=>{
						//找到对应的房间 然后删除软件列表 再重新插入
						if(item.build==roomItem.build&&item.room==roomItem.room){
							//删除软件列表
							item.softwares.datas.splice(0,item.softwares.datas.length);
							//插入数据
							roomItem.softwares.forEach(item1=>{
								item.softwares.datas.push(item1);
							});
							item.softwares.total=item.softwares.datas.length;
							item.softwares.pageSize=4;
							item.softwares.currentPage=1;
							let pageCompute=1;
							let currentpage=1;
							item.softwares.maxPage=Math.ceil(item.softwares.total/item.softwares.pageSize);
							item.softwares.datas.forEach(item2=>{
								item2.page=currentpage;
								item2.state="normal";
								if(pageCompute!=0&&pageCompute%4==0){
									currentpage++;
								}
								pageCompute++;
							});
							item.appendMsg=roomItem.appendMsg;
							item.useable=roomItem.useable;
							item.peopleCpa=roomItem.peopleCpa;
							throw new Error("退出循环");
						}
					});
				}catch(exception){
					console.log("更改成功");
				}
				break;
				case "delete":
				let deleteIndex;
				try{
					state.searchPageDatas.datas.forEach((item,index)=>{
						if(item.build==value.build&&item.room==value.room){
							deleteIndex=index;
							throw new Error("退出循环");
						}
					});
				}catch(exception){
					state.searchPageDatas.datas.splice(deleteIndex,1);
					console.log("退出循环");
				}
				break;
			}
		},
        //获取数据 可以带有ts没有ts则返回所有数据  ts搜索目标
		getData(state,value){
			if(state.isGettingData){
				console.log("等待当前结果");
				console.log(webconfig.address()+"api/Search");
				return;
			}
			let _this=this;
			state.isGettingData=true;
			let skeys=$.cookie('skeys');
			let account=$.cookie('account');

			let ts;
			if(value.opreate=="search"){
				ts=value.ts;
			}else{
				ts='null';
			}
			let md5Skeys=md5(account+state.searchPageDatas.version+state.searchPageDatas.currentTotal+state.searchPageDatas.pageSize+"getData"+skeys);
			axios({
				method: 'get',
				url: webconfig.address()+"api/Search",
				params:{
					"account":account,
					"version":state.searchPageDatas.version,
					ts,//是否有目标搜索
					"currentTotal":state.searchPageDatas.currentTotal,
					"pageSize":state.searchPageDatas.pageSize,
					"md5value":md5Skeys,
					"opreate":"getData",
				}
			}).then(response=>{
				let result=response.data;
				let data=result.data;
				console.log(result);
				if(result.code=="200"){
					if(value.opreate=="init"){
						_this.commit("initRoomData",data);
						state.isGettingData=false;
					}else if(value.opreate=="addNew"){
						_this.commit("initRoomData",data);
						setTimeout(()=>{
							state.isGettingData=false;
						},500);
					}else if(value.opreate=="search"){
						if(data.findCount==0)
						{
							state.isGettingData=false;
							_this.commit("addPromtMessage","没有找到匹配项");
							return;
						}
						let arraylegnth=state.targetSearchDatas.length;
						let datas=[];
						let array=baseDull(data.data);
						array.forEach(item=>{
							datas.push(item);
						});
						state.targetSearchDatas.push({bindID:arraylegnth,datas,ts});
						state.isGettingData=false;
					}
				}else{
					state.isGettingData=false;
					_this.commit("addPromtMessage",result.msg);
				}
			}).catch(x=>{
				setTimeout(()=>{
					state.isGettingData=false;
				},500);
				_this.commit("addPromtMessage","获取信息发生异常"+x.message);
			});
		}
	},
});

//--------------路由配置-----------------
const Routers=[
{
	path:'/index',
	meta:{
		title:'首页'
	},
	component:(resolve)=>require(['./views/index.vue'],resolve)
},
{
	path:'/login',
	meta:{
		title:'登陆'
	},
	component:(resolve)=>require(['./views/login.vue'],resolve)
},
{
	path:'/search',
	meta:{
		title:'搜索'
	},
	component:(resolve)=>require(['./views/search.vue'],resolve)
},
{
	path:'/user',
	meta:{
		title:'用户'
	},
	component:(resolve)=>require(['./views/user.vue'],resolve)
},
{
	path:'/contact',
	meta:{
		title:'留言'
	},
	component:(resolve)=>require(['./views/contact.vue'],resolve)
},
{
	path:'/error',
	meta:{
		title:'错误'
	},
	component:(resolve)=>require(['./views/error.vue'],resolve)
},
{
	path:'*',
	redirect:'/error'
},
{
	path:'/',
	redirect:'/login'
}
];
const RouterConfig={
	base:__dirname,
	//mode:'history',
	routes:Routers
};
const router=new VueRouter(RouterConfig);
router.beforeEach((to,from,next)=>{
	if(!test){
		window.document.title=to.meta.title;
		if(to.path!="/login"){
			let token=$.cookie("isLogin");
			//首先判断是否登陆
			if(!token||token!="true"){
				next('/login');
			}else{
				store.state.showMenuBar=true;
				next();
			}
		}else{
			store.state.showMenuBar=false;
			$.cookie('isLogin', false);
			next();
		}
	}else{
		next();
	}

});
router.afterEach((to,from,next)=>{
	//window.scrollTo(0,0);
});
//--------------------------------------

new Vue({
	el:'#app',
	router:router,
	store:store,
	render:h=>{
		return h(App)
	}
});
