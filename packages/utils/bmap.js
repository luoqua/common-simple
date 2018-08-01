import BMap from 'BaiduMap'

// 复杂的自定义覆盖物
function ComplexCustomOverlay(point, text, mouseoverText) {
	this._point = point
	this._text = text
	this._overText = mouseoverText
}

ComplexCustomOverlay.prototype = new BMap.Overlay()
ComplexCustomOverlay.prototype.initialize = function(map) {
	this._map = map
	let div = this._div = document.createElement('div')

	div.style.position = 'absolute'
	div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat)
	div.style.backgroundColor = '#EE5D5B'
	div.style.border = '1px solid #BC3B3A'
	div.style.color = 'white'
	div.style.height = '18px'
	div.style.padding = '2px'
	div.style.lineHeight = '18px'
	div.style.whiteSpace = 'nowrap'
	div.style.MozUserSelect = 'none'
	div.style.fontSize = '12px'
	let span = this._span = document.createElement('span')

	div.appendChild(span)
	span.appendChild(document.createTextNode(this._text))
	let that = this

	let arrow = this._arrow = document.createElement('div')

	arrow.className = 'arrow'

	div.appendChild(arrow)


	mp.getPanes().labelPane.appendChild(div)

	return div
}
ComplexCustomOverlay.prototype.draw = function() {
	let map = this._map
	let pixel = map.pointToOverlayPixel(this._point)

	this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + 'px'
	this._div.style.top = pixel.y - 30 + 'px'
}

export default ComplexCustomOverlay