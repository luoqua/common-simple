
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


/**
 * 
 * 生成随机字符串，主要用于静态文件命名
 *
 * @return {[String]} [description]
 */
export function getRandom() {
	return (new Date % 9e6).toString(36) + Math.random().toString(36).substring(2,7)
}

/**
 * 生成指定长度随机密钥
 * @param  {[String]} len [description]
 * @return {[String]}     [description]
 */
export function getlenRandom(len) {
	len = len || 32
	let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 去掉了容易混淆的字符
	let maxPos = chars.length

	let pwd = ''

	for(let i = 0; i < len; i++) {
		pwd += chars.charAt(Math.floor(Math.random()*maxPos))
	}

	return pwd
}	

/**
 * 生成指定范围内的随机数
 * @param  {[Number]} min [description]
 * @param  {[Number]} max [description]
 * @return {[Number]}     [description]
 */
export function getrangeRandom(min, max) {
	let range  = max - min
	let random = Math.random()

	return (min + Math.round(range * random))
}

/**
 * 读取上传图片的属性
 * @param  {[Object]} file [description]
 * @return {[Promise]}      [description]
 */
export function readImgData(file){
	let reader = new FileReader()
	
	return new Promise((resolve,reject) => {
		
		reader.onload = evt => {
			let image = new Image()
			image.src = evt.target.result
			image.onload = function () {
				resolve(this)
			}
		}
		reader.readAsDataURL(file)
	})
}

/**
 * 去除字符串左边空白
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
export function ltrim(str) {
	return str.replace(/(^\s*)/g,'')
}

/**
 * 去除字符串右边空白
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function rtrim(str) {
	return str.replace(/(\s*$)/g,'')
}

/**
 * 去除所有空格
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
export function trim(str) {
	return str.replace(/\s*/g,"")
}

/**
 * 去除左右两侧的空格
 * @param  {[String]} str [description]
 * @return {[String]}     [description]
 */
export function lrtrim(str) {
	return str.replace(/^\s*|\s*$/g,'')
}

/**
 * 上下移动数组元素
 * @param  {[Array]} arr   [需要改变元素位置的数组]
 * @param  {[Number]} start [需要下移的元素]
 * @param  {[Number]} end   [需要上移的元素]
 * @return {[Array]}       [已经改变位置的数组]
 */
export function move2downUp(arr,start,end){
	let moveArr =  [...arr]
	if(Array.isArray(moveArr)){
		let endstr = moveArr.splice(end,1)
		moveArr.splice(start,0,...endstr)
	}
	return moveArr
}