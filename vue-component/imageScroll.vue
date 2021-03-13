<template>
	<div id="imageScrollWindow">
		<img :src="currentImage"/>
		<div class="pointScroll">
			<template v-for="n in maxNumber">
				<span class="bpscircle" state="notActive" v-if="n!=index" @click="clickCircle(n)">
				</span>
				<span class="bpscircle" state="active" v-else @click="clickCircle(n)">
				</span>
			</template>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{
			maxNumber:{
				type:Number,
				default:3
			},
			index:{
				type:Number,
				default:1
			},
			imagePath:{
				type:Array
			}
		},
		computed:{
			currentImage(){
				return this.imagePath[this.index-1];
			}
		},
		mounted(){

		},
		methods:{
			clickCircle(index){
				if(index!=this.index){
					this.$emit("circleClick",index);
				}
			}
		}
	}
</script>
<style type="text/css" scoped lang="less">
	@phoneSize:~"(max-width:1024px)";//手机显示图片的尺寸
	@smallSize:~"(max-width:800px)";//比手机屏幕还小的尺寸
	@bigSize:~"(min-width:1024px)";//大于手机屏幕
	#imageScrollWindow{
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		img{
			height: 100%;
		}
		.pointScroll{
			position: absolute;
			bottom: 0px;
			opacity: 0.6;
			width: 100%;
			left: 0px;
		}
	}
	.bpscircle{
		border-radius: 50%;
		display: inline-block;
		margin: 0px 20px;
		border: 1px solid green;
		@media @phoneSize{
			width: 30px;
			height:30px;
		}
		@media @bigSize{
			width: 10px;
			height:10px;
		}
	}
	.bpscircle[state="active"]{
		background-color:gray;
	}
	.bpscircle[state="notActive"]{
		background-color: white;
	}
	.bpscircle:hover{
		background-color:gray;
	}
</style>
