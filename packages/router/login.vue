<template>
	
</template>



<script type="text/javascript">
import create from '@/utils/create'

import {routerFactory} from '../router/routerFactory.js'

export default create({
	name: '',
	props: [],
	data() {
		return {
		}
	},
	methods: {
		userLogin() {
			// 请求登录接口 获取用户权限，根据权限调用getRoute方法
		},
		getRoute(role) {
			// 根据权限调用routerFactory方法
			let routerObj = routerFactory(role)

			// 给vue-router添加该权限所拥有的路由页面
			this.$router.addRoutes(routerObj.route)

			// 跳转到相应页面
			this.$router.push({name: routerObj.name})

		}
	}
})
</script>


<style type="text/css" lang="scss" scoped>

</style>