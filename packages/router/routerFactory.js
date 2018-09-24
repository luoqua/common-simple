import SuperAdmin from '../components/SuperAdmin.vue'
import NormalAdmin from '../components/Admin.vue'
import User from '../components/User.vue'
import NotFound404 from '../components/404.vue'

let AllRoute = [
	// 超级管理员页面
	{
		path: '/super-admin',
		name: 'SuperAdmin',
		component: SuperAdmin
	},
	// 普通管理员页面
	{
		path: '/normal-admin',
		name: 'NormalAdmin',
		component: NormalAdmin
	},
	// 普通用户页面
	{
		path: '/user',
		name: 'User',
		component: User
	},
	// 404页面
	{
		path: '*',
		name: 'NotFound404',
		component: NotFound404
	}
]

const routerFactory = (role) => {
	switch (role) {
		case 'suberAdmin':
			return {
				name: 'SuperAdmin',
				route: AllRoute
			}
		case 'normalAdmin':
			return {
				name: 'NormalAdmin',
				route: AllRoute.splice(1)
			}
		case 'user':
			return {
				name: 'User',
				route: AllRoute.splice(2)
			}
		default:
			throw new Error('参数错误！可选参数：superAdmin, normalAdmin,user')

	}
}

export default routerFactory