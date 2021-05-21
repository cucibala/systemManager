<template>
	<div id="introduce-window">
		<template v-for="(image,index) in images">
			<div class="itemBox" :state="image.state">
				<div class="img-area" v-if="userLevel==2">
					<img :src="image.imgPath">
					<input type='file' :bindid="image.imgID" accept=".jpg,.png,.jpeg">
					<sbutton @mdEvent="modifyMessage(image.imgID,'image')">修改</sbutton>
				</div>
				<div class="img-area" v-else>
					<img :src="image.imgPath">
				</div>
				<div class="content-area" v-if="userLevel==2">
					<div class="previous switch-button" @click="previous()">
						<img src="../images/LeftArrow.png">
					</div>
					<div class="next switch-button" @click="next()">
						<img src="../images/RightArrow.png">
					</div>
					<textarea :bindid="image.imgID">{{image.contentInner}}</textarea>
					<br>
					<sbutton @mdEvent="modifyMessage(image.imgID,'content')">修改</sbutton>
				</div>
				<div class="content-area" v-else>
					<div class="previous switch-button" @click="previous()">
						<img src="../images/LeftArrow.png">
					</div>
					<div class="next switch-button" @click="next()">
						<img src="../images/RightArrow.png">
					</div>
					<p v-for="describe in image.content">{{describe}}</p>
				</div>
			</div>
		</template>
	</div>
</template>
<script>
	import $ from "jquery";
	import sbutton from "./sbutton.vue";
	export default{
		components:{
			sbutton,
		},
		props:{
			images:"",
			userLevel:"",
		},
		data(){
			return {
				currentIndex:1,
				isTransActive:false,
			}
		},
		computed:{

		},
		mounted(){

		},
		methods:{
			next(){
				this.images[this.currentIndex-1].state="unactive";
				this.currentIndex++;
				if(this.currentIndex>this.images.length){
					this.currentIndex=1;
				}
				this.images[this.currentIndex-1].state="active";
			},
			previous(){
				this.images[this.currentIndex-1].state="unactive";
				this.currentIndex--;
				if(this.currentIndex<1){
					this.currentIndex=this.images.length;
				}
				this.images[this.currentIndex-1].state="active";
			},
			modifyMessage(id,type){
				switch(type){
					case "content":
					let modifyValue=$("#introduce-window textarea[bindid="+id+"]")[0].value;
					this.$emit("modifyClick",{id,type:"content",modifyValue});
					break;
					case "image":
					//console.log("asdasd");
					let files = $(".img-area>input[bindid="+id+"]")[0].files;
					/*var data = new FormData();
					data.append('csv_file', files[0]);*/
					this.$emit("modifyClick",{id,type:"image",files});
					break;
				}
			}
		}
	}
</script>
<style type="text/css" scoped lang="less">
@min624:~"(min-width: 624px)";
@pcSize:~"(min-width: 1024px)";
@middleSize:~"(min-width: 624px) and (max-width: 1024px)";
@phoneSize:~"(max-width: 624px)";
#introduce-window{
	position: relative;
	width: 100%;
	height: 100%;
	@media @min624{
		position: fixed;
	}
	.itemBox{
		width: 100%;
		transition: all 0.8s ease 0s;
		position: absolute;
		top:0px;
		right: 0px;
		@media @min624{
			height: 100%;
		}
		.img-area{
			overflow: hidden;
			width: 100%;
			@media @phoneSize{
				height: 344px;
			}
			@media @min624{
				height: 821px;
				position: absolute;
			}
			input{
				position: absolute;
				top: 0px;
				z-index: 2;
				height: 30px;
				left: 100px;
				transform: translateX(-50px);
			}
			span{
				position: absolute;
				top:30px;
				left: 100px;
				transform: translateX(-50%
					);
			}
			img{
				@media @pcSize{

					position: absolute;
					height: 821px;
					right: 0px;
				}
				@media @middleSize{
					height: 821px;
					transform: translateX(-20%);
				}
				@media @phoneSize{
					width:200%;
					transform: translateX(-30%);
				}
			}
		}
		.content-area{
			//linear-gradient(135deg, rgb(255 231 231) 26%, rgb(200 225 255) 80%)
			background: linear-gradient(135deg, rgba(255,231,231,0.7) 26%, rgba(200,225,255, 0.7) 80%);
			z-index: 4;
			position: absolute;
			padding: 20px;
			overflow: hidden;
			@media @pcSize{
				left: 0px;
				bottom: 10px;
				width: 46%;
				height: 400px;
			}
			@media @middleSize {
				width:  calc(100% - 140px);
				height: 350px;
				margin: 0px 100px 0px 40px;
				bottom: 0px;
			}
			@media @phoneSize{
				@contentSize:250px;
				width:  calc(100% - 80px);
				margin: 0 20px;
				bottom: -@contentSize/2;
				height: @contentSize;
				font-size: 16px;
			}
			.switch-button{
				position: absolute;
				height: 100%;
				width: 20px;
				top: 0px;
				transition: all 0.5s ease 0s;
				img{
					width: 100%;
					height: 100%;
				}
			}
			@media @min624{
				.switch-button:hover{
					transition: all 0.5s ease 0s;
					width: 40px;
				}
			}
			.previous{
				left: 0px;

			}
			.next{
				right: 0px;
			}
			textarea{
				resize: none;
				width: 80%;
				height: 60%;
			}
		}
	}
	.itemBox[state="unactive"]{
		opacity: 0;
		z-index: -1;
	}
	.itemBox[state="active"]{
		opacity: 1;
		z-index: 2;
	}
}
</style>
