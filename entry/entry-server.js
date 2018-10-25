import createApp from '../packages/main2.js'

export default context => {
	return new Promise((resolve,reject) => {
		const app = createApp()

		// 更改路由
		app.$router.push(context.url)

		// 获取相应路由下的组件
		const matchedComponents = app.$router.getMatchedComponents()

		// 如果没有组件，说明该路由不存在，报错404
		if (!matchedComponents.length) {
			return reject({code: 404})
		}

		console.log(matchedComponents.serverRequest)
		/*// 遍历路由下所有的组件，如果有需要服务端渲染的请求，则进行请求
		matchedComponents.serverRequest(app.$store)
			.then(() => {
				try {
					console.log(app.$store.state)
					// context.state = app.$store.state
					resolve(app)
				} catch (err) {
					console.log(err)
				}

			}).catch(reject)*/

	})
}