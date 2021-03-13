export default{
	environment:"debug1",
	address(){
		if(this.environment=="debug1"){
			return "https://localhost:44337/";
		}
		return "http://192.168.31.141:8001/";
	}
}