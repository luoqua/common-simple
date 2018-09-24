const store = {
	debug: true,
	state: {
		permissionList: []
	},
	setPermissionAction(newValue) {
		this.permissionList = newValue
	}
}


export function recursionRouter(userRouter = [], allRouter = []) {
	var realRoutes = []

	userRouter.forEach((v) => {
		allRouter.forEach((item) => {
			if (item.meta.name === v.name) {
				if (v.children && v.children.length > 0) {
					item.children = recursionRouter(v.children,item.children)
				}
				realRoutes.push(item)
			}
		})
	})
	return realRoutes
}

export default {
	get UserToken() {
		return localStorage.getItem('token')
	},
	set UserToken(value) {
		localStorage.setItem('token',value)
	}
}

export {store}
