<template>
	<span class="sbutton" @click="onmousedown($event)" ref="tet" :clickable="currentClickAble">
		<slot></slot>
	</span>
</template>
<script>
	import $ from 'jquery';
	export default{
		props:{
			lockClick:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				colorType:0,
				currentClickAble:"able",
			}
		},
		watch:{
			lockClick(){
				if(this.lockClick){
					this.currentClickAble="unable";
				}else{
					this.currentClickAble="able";
				}
			}
		},
		methods:{
			onmousedown(e){
				if(this.lockClick){
					return;
				}
				
				let x=e.offsetX;
				let y=e.offsetY;
				let ripples=document.createElement("span");
				ripples.style.left=x+"px";
				ripples.style.top=y+"px";
				ripples.setAttribute("class","ripples");
				this.$refs.tet.appendChild(ripples);
				setTimeout(()=>{
					ripples.remove();
				},700);
				this.$emit("mdEvent");//触发鼠标点击事件
				//console.log();
			}
		}
	}
</script>
<style lang="less">
@sbuttonBgcolor1:#ffffff;//
@sbuttonBgcolor2:#727272;
.sbutton{
	display: inline-block;
	padding: 4px;
	cursor: pointer;
	user-select:none;
	transition: all 2s ease 0s;
	background-color: #008D57;
	color: white;
	position: relative;
	overflow: hidden;
	vertical-align: middle;
	border-radius: 10%;
}
.sbutton[clickable="able"]{
	background-color: #008D57;
}
.sbutton[clickable="unable"]{
	background-color: grey;
}
.ripples{
	display: inline-block;
	transform: translate(-50%,-50%);
	pointer-events: none;
	position: absolute;
	border-radius: 50%;
	animation: animate 1s linear infinite;
	background-color: white;
}
@keyframes animate{
	0%{
		width: 0px;
		height: 0px;
		opacity: 0.8;
	}
	100%{
		width: 500px;
		height: 500px;
		opacity: 0;
	}
}
</style>