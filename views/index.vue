<template>
	<div class="pageContainer">
		<v-introduce-window :images="images" :userLevel="userLevel" @modifyClick="dullModifyClick($event)"></v-introduce-window>
	</div>
</template>
<script>
	import vImageScroll from "../vue-component/imageScroll.vue";
	import vIntroduceWindow from "../vue-component/introduce-window.vue";
	import webconfig from "../web.config.js";
	import md5 from "md5";
	import $ from "jquery";
	export default{
		components:{
			vImageScroll,
			vIntroduceWindow,
		},
		data(){
			return {
				imageIndex:1,
				maxImageNumber:2,
			}
		},
		computed:{
			images(){
				return this.$store.state.indexImages;
			},
			userLevel(){
				return this.$store.state.user.level;
			}
		},
		methods:{
			/*当有人单击图片滚动的按钮的时候*/
			onCircleClick(index){
				this.imageIndex=index;
			},
			dullModifyClick(obj){
				let _this=this;
				let skeys=$.cookie('skeys');
				let account=$.cookie('account');
				let md5value;
				let modifyValue;
				let formData=new FormData();
				let submodule=obj.type;
				formData.append('account',account);
				formData.append('id',obj.id);
				formData.append('module',"index");
				formData.append('submodule',submodule);
				switch(obj.type){
					case "content":
					modifyValue=obj.modifyValue.replaceAll("\n","~~");
					md5value=md5(account+obj.id+modifyValue+"index"+submodule+skeys);
					formData.append('value',modifyValue);
					formData.append('md5value',md5value);
					break;
					case "image":
					let files=obj.files;
					//没有选择文件
					if(files.length==0){
						_this.$store.commit('addPromtMessage',"请选择文件");
						return;
					}
					let file=files[0];
					console.log(file);
					//判断文件类型是否符合要求
					if(file.type!="image/png"&&file.type!="image/jpg"&&file.type!="image/jpeg"){
						_this.$store.commit('addPromtMessage',"不支持的文件类型");
						return;
					}

					modifyValue=file.size+"|~|"+file.name;
					md5value=md5(account+obj.id+modifyValue+"index"+submodule+skeys);
					formData.append('value',modifyValue);
					formData.append("image",file);
					formData.append("md5value",md5value);
					break;
				}


				//*ajax请求**//
				this.axios({
					method: 'post',
					url: webconfig.address()+"api/webset",
					data: formData,
					transformRequest: [
					function(){
						return formData;
					}
					],
					headers: {"Content-Type": "multipart/form-data"},
					onUploadProgress: progressEvent => {
						let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
						console.log('上传 ' + complete);
					}
				}).then((response) => {
					let result=response.data;
					if(result.code=="200"){
						_this.$store.commit('addPromtMessage',"更新成功");
					}else{
						_this.$store.commit('addPromtMessage',result.msg);
					}
				}).catch(x=>{
					_this.$store.commit('addPromtMessage',"更新发生异常");
					console.log(x);
				});
				//const { data: res } = this.$http.post(webconfig.address()+"api/webset", formData, config);
				//console.log(res);
				/*$.ajax({
					url:
					type: 'post',
					data: formData,
					ansyc:false,
					processData: false,  // 不处理数据
					contentType: false,  // 不设置内容类型
					xhr:xhrOnProgress(function(e){
							var per=100 * e.loaded / e.total;//计算百分比
							console.log(per);
						}),
					success: function(result){
						let resultP=JSON.parse(result);
						//_this.$store.commit('addPromtMessage',resultP.status);
						if(resultP.status=="200"){
							_this.$store.commit('addPromtMessage',"更新成功");
						}else{
							_this.$store.commit('addPromtMessage',md5value+"\n"+resultP.error);
						}
					},
					error: function (dd) {
						_this.$store.commit('addPromtMessage',"异常");
					}
				});*/
			}
		}
	}
</script>
<style type="text/css" scoped lang="less">
	@phoneSize:~"(min-width:300px) and (max-width:600px)";//手机显示图片的尺寸
	@smallSize:~"(max-width:800px)";//比手机屏幕还小的尺寸
	@bigSize:~"(min-width:1024px)";//大于手机屏幕
	@messageWindowWidth:800px;
	@messageWindowHeight:@messageWindowWidth*0.618;
	#messageWindow{
		background-color: #444444;
		display: inline-block;
		@media @phoneSize{
			width: @messageWindowWidth;
			height: @messageWindowHeight;
		}
		@media @smallSize{
			width: @messageWindowWidth*0.8;
			height:@messageWindowHeight*0.8;
		}
		@media @bigSize{
			width: @messageWindowWidth*1.2;
			height:@messageWindowHeight*1.2;
		}
	}
</style>