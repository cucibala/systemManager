<template>
	<div>
		<div id="lb_mainbox">
			<div>
				<label>账号:</label>
				<input type="text" v-model="account">
			</div>
			<div>
				<label>密码:</label>
				<input type="password" v-model="password">
			</div>
			<div style="text-align: center;margin: 100px">
				<button @click="buttonClick">
					登陆
				</button>
			</div>
		</div>
	</div>
</template>