export default{
	loadScript(url){
		return new Promise((reslove,reject)=>{
			const jsNode = document.createElement('script');
			jsNode.type = 'text/javascript';
			jsNode.src = url;
			document.body.append(jsNode);
			jsNode.onload = function() {
				reslove();
			}
		});
	},
	/**
	 * 比较两个时间
	 * @param {Object} time1 hh:mm
	 * @param {Object} time2 hh:mm
	 * return 
	 * 		-1 date1小于date2
	 * 		0  两个时间相等
	 * 		1  date1大于date2
	 */
	compareTime(time1,time2){
		if(!time1||!time1){
			console.log("输入不能为空");
			return -1;
		}
		
		var time1Splite=time1.split(":");
		var time2Splite=time2.split(":");
		var result=0;
		if(time1Splite.length!==2||time2Splite.length!==2){
			console.log("输入格式不正确",time1Splite,time2Splite)
			return -1;
		}
		
		do{
			if(time1Splite.length===0){
				break;
			}
			
			var t1=Number(time1Splite.shift());
			var t2=Number(time2Splite.shift());
			if((t1!=0&&!t1)||(t2!=0&&!t2)){
				console.log("输入格式不正确",t1,t2)
				return -1;
			}
			
			if(t1>t2){
				result=1;
				break;
			}
			
			if(t1<t2){
				result=-1;
				break;
			}
			
		}while(true);
		
		return result;
	},
	/**
	 * 比较两个时间
	 * @param {Object} date1 时间格式 yyyy-mm-dd
	 * @param {Object} date2 时间格式 yyyy-mm-dd
	 * return 
	 * 		-1 date1小于date2
	 * 		0  两个时间相等
	 * 		1  date1大于date2
	 */
	compareDate(date1,date2){
		if(!date1||!date2){
			console.log("输入不能为空");
			return -1;
		}
		
		var date1Splite=date1.split("-");
		var date2Splite=date2.split("-");
		var result=0;
		if(date1Splite.length!==3||date2Splite.length!==3){
			console.log("输入格式不正确",date1Splite,date2Splite);
			return -1;
		}
		
		do{
			if(date1Splite.length===0){
				break;
			}
			
			var t1=Number(date1Splite.shift());
			var t2=Number(date2Splite.shift());
			if((t1!=0&&!t1)||(t2!=0&&!t2)){
				console.log("输入格式不正确",t1,t2);
				return -1;
			}
			
			if(t1>t2){
				result=1;
				break;
			}
			
			if(t1<t2){
				result=-1;
				break;
			}
			
		}while(true);
		
		return result;
	}
}