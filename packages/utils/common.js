/**
 * 设置页面 fontSize
 */
export function setFontSize() {

	var winW = window.innerWidth

	if (winW > 375) {
		winW = 375
	}
	document.documentElement.style.fontSize = parseInt(winW / 3.2,0) + 'px'

}


/**
 * 封装好的 fetch 请求数据
 * @param {[string]} url   请求的 url 地址
 * @param {[object]} options 请求的 参数
 */
export function Fetch(url, options) {

	var formData = new FormData()

	let myHeaders = new Headers()

	let optionsParma = options

	Object.keys(options.body).forEach(function(key) {
		formData.append(key, options.body[key])
	})

	optionsParma.body = JSON.stringify(options.body)

	myHeaders.append('Content-Type', 'application/json')
	optionsParma.headers = myHeaders

	const defer = new Promise((resolve, reject) => {
		fetch(url,optionsParma)
			.then((response) => response.json())
			.then((data) => {
				if (data.ret_code === 0) {
					resolve(data.ret_msg)	// 返回成功数据
				} else {
					reject(data) // 返回失败数据
				}
			})
			.catch(error => {
				alert(error)
			    // 捕获异常
			    console.log(error.msg)
			    reject()
			})
	})

 	return defer
}


