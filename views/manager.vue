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
						<sbutton @mdEvent="applyManager.refresh()">刷新</sbutton>
					</div>
					<div>
						<sbutton @mdEvent="applyManager.postOpreate('pass')" style="margin: 0px 4px;">通过选中</sbutton>
						<sbutton @mdEvent="applyManager.postOpreate('nopass')" style="margin: 0px 4px;">拒绝选中</sbutton>
						<p>{{applyManager.checkList.length}} / {{applyManager.data.length}}</p>
					</div>
					<div>
						<sbutton v-if="applyManager.checkList.length==applyManager.data.length" @mdEvent="applyManager.toggleCheckAll(false)">取消全选</sbutton>
						<sbutton v-else @mdEvent="applyManager.toggleCheckAll(true)">全选</sbutton>
					</div>
				</div>
				<div id="progressListContainer">
					<template v-for="data in applyManager.data">
						<div class="progressApplyItem" :checked="applyManager.checkList.indexOf(data.applyID)!=-1" @click="applyManager.onApplyCheck(data.applyID,true)">
							<div>
								<div>-{{data.name}}</div>
							</div>
							<div>
								<div>{{data.build}}{{data.room}}</div>
								<div>{{data.startDate}} ～ {{data.endDate}}</div>
								<div>{{data.startTime}}-{{data.endTime}}</div>
								<div>
									<span v-if="data.week[0]">一</span>
									<span v-if="data.week[1]">二</span>
									<span v-if="data.week[2]">三</span>
									<span v-if="data.week[3]">四</span>
									<span v-if="data.week[4]">五</span>
									<span v-if="data.week[5]">六</span>
									<span v-if="data.week[6]">日</span>
								</div>
							</div>
							<div>
								<div>申请日期</div>
								<div>三天前</div>
							</div>
						</div>
					</template>
				</div>
			</div>
			<div class="subViewContainer" :choice="indexPath[1].index==currentActiveIndex">
				2
			</div>
			<div class="subViewContainer" :choice="indexPath[2].index==currentActiveIndex">
				3
			</div>
		</div>
	</div>
</template>

<script>
	import sbutton from "../vue-component/sbutton.vue";
	export default{
		components:{
		    sbutton,
		},
		data(){
			return {
				currentActiveIndex:0,
				indexPath:[
					{index:0,title:"申请审核"},
					{index:1,title:"用户管理"},
					{index:2,title:"留言管理"},
				],
				applyManager:{
					data:[
						{room:"405",build:"第一教学楼",name:"张三封",startDate:"2021-01-05",endDate:"2021-02-06",
						startTime:"15:36",
						endTime:"17:38",
						week:[true,false,false,true,false,true,true],
						applyID:"12123156",
						},
					],
					checkList:[],
					/**
					 * 取消或者全选
					 */
					toggleCheckAll(check){
						if(check){
							this.data.forEach(item=>{
								this.onApplyCheck(item.applyID,false);
							});
						}else{
							this.checkList.splice(0);
						}
						
					},
					/**
					 * 添加选中
					 * @param applyID 申请id
					 * @param toogle 是否删除
					 */
					onApplyCheck(applyID,toogle){
						const index=this.checkList.indexOf(applyID);
						if(index!=-1){
							if(toogle){
								this.checkList.splice(index,1);
							}
							
						}else{
							this.checkList.push(applyID);
						}
					},
					/**
					 * 刷新数据
					 */
					refresh(){
						
					},
					/**
					 * 推送操作
					 */
					postOpreate(opreate){
						console.log(opreate);
					}
				}
			}
		},
		methods:{
			/**
			 * 切换到指定页面
			 * @param {Object} index
			 */
			switchToPage(index){
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
			}
		},
		computed:{

		},
		mounted(){
			console.log(this.userMsg);
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
		#progressListContainer{
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
