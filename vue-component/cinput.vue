<template>
	<div class="smallWidth" :ctype="ctype">
		<span :state="state">{{ctitle}}</span>
		<input type="text" :state="state" v-model="value" @focus="onFocus()" @blur="lostFocus()">
	</div>
</template>
<script type="text/javascript">
	import $ from "jquery";
	export default{
		methods:{
			onFocus(){
				this.$emit('onFocus');
			},
			lostFocus(){
				this.$emit('lostFocus');
			}
		},
		props:{
			ctitle:{
				type:String,
				default:"默认",
			},
			ctype:{
				type:String,
				default:"1",
			},
			clearSign:{
				type:Boolean,
				default:true,
			}
		},
		data(){
			return{
				value:"",
				changeFontSize:true,
				state:"bigfont",
			}
		},
		watch:{
			value(){
				if(this.value.length>0){
					if(this.changeFontSize){
						this.changeFontSize=false;
						this.state="smallfont";
					}
				}else{
					this.changeFontSize=true;
					this.state="bigfont";
				}
				this.$emit('valueChange',{value:this.value});
			},
			clearSign(){
				this.value="";
			}
		},
		mounted(){
			//$(".smallWidth>span").hide();
		}
	}
</script>
<style scoped lang="less">
@boxBgcolor:#445566;
@containerWidth:80%;
.smallWidth{
	background-color: #FAFAFA;
	border: 2px solid black;
	text-align: left;
	position: relative;
	overflow: hidden;
	display: inline-block;
	margin: 5px;
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
	input[state="bigfont"]{
		font-size: 40px;
	}
	input[state="smallfont"]{
		font-size: 20px;
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
.smallWidth[ctype="1"]{
	@media (max-width:614px){
		width:calc(100% - 40px);
		height: 50px;
	}
	/*手机的尺寸*/
	@media (min-width:614px){
		width: 360px;
		height: 50px;
	}
}
.smallWidth[ctype="2"]{

	/*手机的尺寸*/
	@media (max-width:614px){
		width:calc(40%);
		height: 50px;
	}
	/*电脑的尺寸*/
	@media (min-width:614px){
		width: 200px;
		height: 50px;
	}
}
.smallWidth[ctype="3"]{

	/*手机的尺寸*/
	@media (max-width:614px){
		width:calc(30%);
		height: 50px;
	}
	/*电脑的尺寸*/
	@media (min-width:614px){
		width: 100px;
		height: 50px;
	}
}
</style>