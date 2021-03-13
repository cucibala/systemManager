<template>
	<div class="exit_button" :style="style">
		<span></span>
		<span></span>
	</div>
</template>
<script>
	export default{
		props:{
			bSize:{
				type:Number,
				default:10,
			}
		},
		computed:{
			style(){
				let value=this.bSize;
				return "width:"+value+"px;height:"+value+"px;top:"+(-value/2)+"px";
			}
		}
	}
</script>
<style lang="less" scoped>
	.exit_button{
		position: absolute;
		right: 0px;
		span{
			border-bottom: 4px solid red;
			width: 100%;
			height: 10px;
			display: inline-block;
			opacity: 0.6;
			left: 0px;
			position: absolute;
		}
		span:nth-child(1){
			transform: rotate(315deg);
			//border-bottom: 4px solid red;
		}
		span:nth-child(2){
			transform: rotate(-315deg);
			//border-bottom: 4px solid red;
		}

	}
</style>