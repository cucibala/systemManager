<template>
	<div class="pageContainer">
		<div id="fileUpLoad" class="inline-block">
			<p class="promtTitle" v-show="isShowFileUpLoadTitle">文件放到这里上传</p>
			<div class="backgroundPanel" :state="fileUpLoadBgState">
				<span>释放上传</span>
			</div>
			<div id="fileContainer"></div>
		</div>
		<br>
		<div id="toolbar-container" class="toolbar"></div>
		<div id="text-container" class="text"></div>
		<br>
		<sbutton @mdEvent="upLoadFile">上传到服务器</sbutton>
		<!-- 这个是文件上传的模版html -->
		<div id="preview-template" style="display: none;">
			<div class="dz-preview">
				<div class="dz-details">
					<div class="dz-size" data-dz-size></div> 
					<div class="dz-filename"><span data-dz-name></span></div>
					<div class="dz-error-mark"><span data-dz-remove>✘</span></div>
				</div>
				<div class="dz-img">
					<img data-dz-thumbnail/>
				</div>
				<div dz-max-files-reached></div>
				<div class="dz-progress">
					<span class="dz-upload" data-dz-uploadprogress="" isShowProgress="hide"></span>
				</div>
				<!--
				 <div class="dz-success-mark"><span>✔</span></div>
				 
					<div class="dz-error-message"><span data-dz-errormessage></span></div> 
				-->
			</div>
		</div>
	</div>
</template>
<script>
	var myDropzone;
	var editor;
	var _this;
	import dropzone from "dropzone";
	import $ from "jquery";
	import wangeditor from "wangeditor";
	import sbutton from "../vue-component/sbutton.vue";
	import webconfig from "../web.config.js";
	export default{
		components:{
			sbutton,
		},
		data(){
			return {
				fileUpLoadBgState:false,
				isShowProgress:"hide",
				currentFileCount:0,
			}
		},
		computed:{
			isShowFileUpLoadTitle(){
				if(this.currentFileCount>0){
					return false;
				}
				return true;
			}
		},
		methods:{
			upLoadFile(){
				myDropzone.processQueue();
			}
		},
		mounted(){
			_this=this;
			//TODO:每一次生成一个唯一的id 代表当前的操作，因为上传只能一个一个上传
			const allowFileTypeRegex=/(jpeg)|(x-msdownload)|(zip)/ig;
			var privewTemplateEle=document.getElementById("preview-template");
			editor = new wangeditor("#toolbar-container", "#text-container");
			editor.create();
			myDropzone= new dropzone("#fileContainer", {
				url: webconfig.address()+"api/Contact",
				paramName: "file",
				acceptedFiles: ".jpg,.jpeg,.doc,.docx,.ppt,.pptx,.txt,.avi,.pdf,.mp3,.zip,.exe",
				method: 'post',
				//最大的上传文件大小
				maxFilesize:1000,
				dictDefaultMessage:"asdasd",
				previewTemplate:privewTemplateEle.innerHTML,
				// dictRemoveFile:document.querySelector("button"),
				dictCancelUpload:"上传中...",
				dictRemoveFileConfirmation:"是否删除这个文件",
				dictDefaultMessage:"拖拽上传",
				//是否自动上传的开关
				autoProcessQueue:false,
				accept: function(file, done) {
				    if (file.name == "justinbieber.jpg") {
				      done("Naha, you don't.");
				    }
				    else { 
						done();
					    _this.currentFileCount++; 
					}
				},
				error:e=>{
					_this.$store.commit('addPromtMessage',"添加发生错误");
					console.log(e);
				},
				maxfilesreached:e=>{
					_this.$store.commit('addPromtMessage',"超过最大长传文件数量，当前文件不会被上传");
				},
				totaluploadprogress:e=>{
					$(".dz-upload").attr("isShowProgress","show");
					if(e==100){
						setTimeout(()=>{
							$(".dz-upload").attr("isShowProgress","hide");
						},5000);
					}else{
						$(".dz-upload").attr("isShowProgress","show");
					}
				},
				//发送前的钩子函数
				sending: function(file, xhr, formData) {
					//上传时绑定唯一id 新建一张表用来管理留言 唯一id也用  这次的id
					console.log(file);
					const contactMsg=document.getElementById("text-container").innerHTML;
					formData.append("contactMsg",contactMsg);
				},
				//当拖拽经过框框时
				dragover:e=>{
					//显示上面的提示
					_this.fileUpLoadBgState=true;
				},
				//拖拽离开框框时
				dragleave:e=>{
					//隐藏放下的提示
					_this.fileUpLoadBgState=false;
				},
				//当文件被放下时
				drop:e=>{
					//隐藏放下的提示
					_this.fileUpLoadBgState=false;
					
				},
				success: function (file, response, e) {
					var res = JSON.parse(response);
					console.log(response);
					if (res.error) {
						$(file.previewTemplate).children('.dz-error-mark').css('opacity', '1')
					}
				},
				
			});
		}
	}
</script>
<style type="text/css" scoped lang="Less">

@phoneSize:~"(max-width: 624px)";
.pageContainer{
	overflow: auto;
}
#fileContainer{
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0px;
	left: 0px;
	flex-flow: wrap;
}
#fileUpLoad{
	width: 80%;
	height: 233px;
	border: 2px dashed #0087F7;
	border-radius: 5px;
	background: white;
	position: relative;
	padding: 10px;
	overflow: auto;
	>.promtTitle{

	}
	>.backgroundPanel{
		position: absolute;
		width: 100%;
		height: 10%;
		background-color: #e7e8e9;
		opacity: 0.8;
		top: 0;
		left: 0;
		display: none;
	}
	>.backgroundPanel[state=true]{
		display:inherit;
	}
}
.textareaContainer{
	width: 600px;
	height: 300px;
	display: inline-block;
	font-size: 1.5rem;
	@media @phoneSize{
		width: 300px;
		height: 150px;
		min-width: 300px;
	}
	>textarea{
		width: 100%;
		height: 100%;
		resize: none;
	}
}
#preview-template{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
}
.dz-preview{
	width: 120px;
	height: 120px;
	margin: 10px;
	padding: 10px;
	position: relative;
	.dz-img{
		position: absolute;
		left:0;
		top:0;
		content: "";
		width:100%;
		height: 100%;
		z-index: 1;
		>img{
			border-radius: 15px;
		}
	}
	.dz-progress{
		position: absolute;
		width: 80%;
		height: 30px;
		top:45px;
		left: 10%;
		z-index: 1;
		border-radius: 10px;
		display: block;
		overflow: hidden;
		.dz-upload{
			height: 100%;
			width: 0%;
			background-color: #FF5500;
			display: block;
			opacity: 0;
			
		}
		.dz-upload[isShowProgress="show"]{
			transition: width 2s;
			opacity: 0.9;
		}
		.dz-upload[isShowProgress="hide"]{
			transition: all 2s;
			opacity: 0;
		}
	}
}
.dz-preview:hover{
	.dz-img{
		filter: blur(2px);
	}
	.dz-details{
		opacity: 1;
	}
}
.dz-details{
	opacity: 0;
	width: 100px;
	height: 80px;
	padding: 20px 10px;
	position:absolute;
	font-size: 1rem;
	z-index: 2;
	transition: all 0.5s;
	top: 0px;
	background-color: antiquewhite;
	.dz-size{
		width: 90px;
		height: 20px;
		border-radius:5px;
		background-color:#d6d6d6;
		margin-bottom: 5px;
		padding: 5px;
	}
	.dz-filename{
		span{
			background-color: rgba(255, 255, 255, 0.4);
			padding: 0 0.4em;
			border-radius: 3px;
			white-space:nowrap; 
		}
		span:hover{
			background-color: rgba(214, 214, 214, 1);
		}
	}
	.dz-error-mark{
		font-size: 1.6rem;
		color: red;
	}
	.dz-filename:not(:hover){
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
.toolbar {
	display: inline-block;
	width: 80%;
	border: 1px solid #ccc;
	z-index: 3;
	position: relative;
	font-size: 1.2rem;
}
.text {
	display: inline-block;
	position: relative;
	width: 80%;
	text-align: left;
	border: 1px solid #ccc;
	min-height: 300px;
	height: 300px;
	overflow: auto;
	z-index: 2;
	font-size: 1.2rem;
}

</style>