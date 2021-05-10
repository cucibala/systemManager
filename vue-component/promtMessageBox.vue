<template>
	<div id="promtMessageBox" :state="state">
		<p v-for="value in currentPromtMessageSplit">{{value}}</p>
	</div>
</template>
<script>
	//休眠指定的毫秒数然后返回
	const sleepTime=time=>{
		return new Promise(resolve=>{
			setTimeout(()=>{
				resolve();
			},time);
		});
	}
	export default{
		data(){
			return {
				state:"hide",
				promtList:[],
				currentPromtMessageSplit:[],
				lastPromtMessage:"",
				promtBoxActive:false,
			}
		},
		computed:{
			promtMessageSign(){
				return this.$store.state.promtMessageSign;
			}
		},
		watch:{
			promtMessageSign(){
				let message=this.$store.state.currentPromtMessage;
				if(message&&message.length!=0){
					this.promtList.push(message);
					this.reActive();
				}
			}
		},
		methods:{
			async reActive(){
				let _this=this;
				//如果当前正在执行动画就返回
				if(this.promtBoxActive){
					return;
				}
				
				const asyncPromtAnimation=msg=>{
					_this.currentPromtMessageSplit=msg.split("\n");
					return new Promise(resolve=>{
						setTimeout(()=>{
							resolve();
						},1500);
					});
				}
				this.promtBoxActive=true;
				while(this.promtList.length>0){
					const promtMsg=this.promtList.shift();
					//如果当前信息和上一条信息不一致则更新信息
					if(this.lastPromtMessage!=promtMsg){
						await sleepTime(200);
						_this.state="show";
						await asyncPromtAnimation(promtMsg);
					}
					_this.state="hide";
					this.lastPromtMessage=promtMsg;
				}
				this.lastPromtMessage="";
				this.promtBoxActive=false;
			}
		}
	}
</script>
<style lang="less">
@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";
#promtMessageBox{
	position: fixed;
	width: 100%;
	background-color: #000000;
	text-align: center;
	z-index: 10;
	left: 0px;
	transition: all 0.5s ease 0s;
	color: white;
	line-height: 0px;
	word-wrap: break-word;
	word-break: break-all;
	font-size: 18px;
	@media @min624{
		height: 100px;
		top: -100px;
	}
	@media @phoneSize{
		height: 80px;
		top: -80px;
	}
}
#promtMessageBox[state="show"]{
	opacity: 0.8;
	transform: translateY(150px);
	@media @min624{
		transform: translateY(300px);
	}
}
#promtMessageBox[state="hide"]{
	transform: translateY(0);
	opacity: 0;
}
</style>