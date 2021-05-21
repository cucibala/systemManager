export default {
	/**
	 *  生成一个uuid
	 */
	uuid() {
	    var s = [];
	    var hexDigits = "0123456789abcdef";
	    for (var i = 0; i < 36; i++) {
	        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	    }
	    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	    s[8] = s[13] = s[18] = s[23] = "-";
	 
	    var uuid = s.join("");
	    return uuid;
	},
	loadScript(url) {
		return new Promise((reslove, reject) => {
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
	compareTime(time1, time2) {
		if (!time1 || !time1) {
			console.log("输入不能为空");
			return -1;
		}

		//TODO: 比较时间算法有问题。记得修改
		var time1Splite = time1.split(":");
		var time2Splite = time2.split(":");
		console.log("输入格式不正确", time1Splite, time2Splite);
		var result = 0;
		if (time1Splite.length !== 2 || time2Splite.length !== 2) {
			console.log("输入格式不正确", time1Splite, time2Splite)
			return -1;
		}

		const hour=(time2Splite[0]-time1Splite[0])*60;
		const minute=time2Splite[1]-time1Splite[1];
		return hour+minute;
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
	compareDate(date1, date2) {
		if (!date1 || !date2) {
			console.log("输入不能为空");
			return -1;
		}

		var date1Splite = date1.split("-");
		var date2Splite = date2.split("-");
		if (date1Splite.length !== 3 || date2Splite.length !== 3) {
			console.log("输入格式不正确", date1Splite, date2Splite);
			return -1;
		}

		const _date1=new Date().createTime(date1);
		const _date2=new Date().createTime(date2);
		const sceond=Number(_date2-_date1)/1000;
		const minute=sceond/60;
		const hour=minute/60;
		const day=hour/24;
		return day;
	},
	/**
	 * 导入扩展函数
	 * @param {Object} fmt
	 */
	importExtend() {
		//时间的扩展，转换为指定格式
		Date.prototype.format = function(fmt) {
			var o = {
				"M+": this.getMonth() + 1, //月份
				"d+": this.getDate(), //日
				"h+": this.getHours(), //小时
				"m+": this.getMinutes(), //分
				"s+": this.getSeconds(), //秒
				"q+": Math.floor((this.getMonth() + 3) / 3), //季度
				"S": this.getMilliseconds() //毫秒
			};
			if (/(y+)/.test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			}

			for (var k in o) {
				if (new RegExp("(" + k + ")").test(fmt)) {
					fmt = fmt.replace(
						RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))
						);
				}
			}
			return fmt;
		}
		
		/**
		 * 设置一个时间，返回一个时间对象
		 * @param {String}  formatStr
		 */
		Date.prototype.createTime=formatStr=>{
			var dateSplite = formatStr.split("-");
			var result = 0;
			if (dateSplite.length !== 3) {
				console.log("输入格式不正确", dateSplite);
				return -1;
			}
			
			var result=new Date();
			try{
				result.setFullYear(Number(dateSplite[0]));
				result.setMonth(Number(dateSplite[1]));
				result.setDate(Number(dateSplite[2]));
			}catch(exception){
				console.log("输入格式不正确", dateSplite);
				return -1;
			}
			
			return result;
		};
	}
}
