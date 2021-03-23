<template>
	<div class="pageContainer">
		<div id="fileUpLoad" class="inline-block">
			<p class="promtTitle">文件放到这里上传</p>
			<div class="backgroundPanel" :state="fileUpLoadBgState">
				<span>释放上传</span>
			</div>
		</div>
		<br>
		<div id="toolbar-container" class="toolbar"></div>
		<div id="text-container" class="text"></div>
		<br>
		<sbutton @mdEvent="test">上传到服务器</sbutton>
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
				<div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
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
	import dropzone from "dropzone";
	import $ from "jquery";
	import wangeditor from "wangeditor";
	import sbutton from "../vue-component/sbutton.vue";
	export default{
		components:{
			sbutton,
		},
		data(){
			return {
				fileUpLoadBgState:false,
			}
		},
		methods:{
			test(){
				console.log("|asd");
				console.log(myDropzone.getQueuedFiles());
			}
		},
		mounted(){
			let _this=this;
			var token="asdasd";
			var privewTemplateEle=document.getElementById("preview-template");
			console.log(privewTemplateEle);
			editor = new wangeditor("#toolbar-container", "#text-container");
			editor.create();

			myDropzone= new dropzone("#fileUpLoad", {
				url: "/file/upload",
				// addRemoveLinks: true,
				maxFiles:1,
				method: 'post',
				filesizeBase: 1024,
				maxFilesize:1,
				addRemoveLinks:"dictCancelUpload",
				headers:token,
				dictDefaultMessage:"asdasd",
				previewTemplate:privewTemplateEle.innerHTML,
				// dictRemoveFile:document.querySelector("button"),
				dictCancelUpload:"上传中...",
				dictRemoveFileConfirmation:"是否删除这个文件",
				autoProcessQueue:false,
				renameFile:e=>{
					console.log(e);
				},
				error:e=>{
					console.log(e);
				},
				sending: function(file, xhr, formData) {
					formData.append("filesize", file.size);
				},
				dragover:e=>{
					_this.fileUpLoadBgState=true;
				},
				dragleave:e=>{
					_this.fileUpLoadBgState=false;
				},
				drop:e=>{
					_this.fileUpLoadBgState=false;
				},
				success: function (file, response, e) {
					var res = JSON.parse(response);
					if (res.error) {
						$(file.previewTemplate).children('.dz-error-mark').css('opacity', '1')
					}
				}
			});
		}
	}
</script>
<style type="text/css" scoped lang="Less">

@phoneSize:~"(max-width: 624px)";
.pageContainer{
	overflow: auto;
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

.dz-preview{
	width: 120px;
	height: 120px;
	margin: 10px;
	padding: 10px;
	position: relative;
	display: inline-block;
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