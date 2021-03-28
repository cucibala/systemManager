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
			
			// if (jsNode.onload) {
			// 	console.log("加载完成");
				
			// } else {
			// 	console.log("加载完成");
			// 	/*ie6, ie7不支持onload的情况*/
			// 	jsNode.onreadystatechange = function() {
			// 		if(jsNode.readyState == 'loaded' || jsNode.readyState == 'complete') {
			// 			console.log("加载完成");
			// 			reslove();
			// 		}
			// 	}
			// }
		});
	}
}