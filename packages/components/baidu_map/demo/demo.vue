<template>
	<baidu-map
	:centerPoint = "centerPoint"
	:zoomScale = "zoomScale"
	@initData = "initData"
	@moveOrZoom = "moveOrZoom"
	v-if="flag" />
</template>

<script>
import { Fetch } from '@/utils/common.js'
import BaiduMap from 'BaiduMap'
import baiduMap from '../index.vue'

export default {
	data() {
		return {
			initPoint: {},
			zoomScale: 16,
			centerPoint: '',
			flag: false,
			resultLatLng: '',
			filter_options: {},
			bs: ''
		}
	},
	created() {
		this.getLocation()
	},
	watch: {
		initPoint() {
			this.centerPoint = this.initPoint
		},
		bs() {
			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			this.get_site_data_lat(bssw,bsne)
		}
	},
	components: {
		baiduMap
	},
	methods: {
		initData(map) {
			this.map = map
		},
		get_site_data_lat(bssw,bsne) {
			let that = this

			this.loading = true
			if (that.resultLatLng !== '') {
				that.filterData(that.resultLatLng,bssw,bsne)
			} else {

				let opitions = {
		            method: 'POST',
		            body: {
						status: 0
		            }
		        }

				Fetch('http://192.168.1.161:3000/get_site_now_lat', opitions)
		      	.then((data) => {
			        if (data !== null) {

				        	that.resultLatLng = data
							that.filterData(data,bssw,bsne)
						}
	    		})
    		}
		},
		filterData(data,bssw,bsne) {
			// 进行lat的过滤
			let that = this
			let resultLatLng = data

			resultLatLng = resultLatLng.filter(function(item) {
				return item.lat >= bssw.lat && item.lat <= bsne.lat
			})
			// 进行lng的排序
			resultLatLng = resultLatLng.sort(function(a,b) {
				return a.lng - b.lng
			})
			// 进行lng的过滤
			resultLatLng = resultLatLng.filter(function(item) {
				return item.lng >= bssw.lng && item.lng <= bsne.lng
			})
			// 进行面积的过滤
			let filterArea = that.filter_options['area'] || {}

			filterArea.length >= 2 && 	(resultLatLng = resultLatLng.filter(function(item) {
				return item.area >= filterArea[0] && item.area <= filterArea[1]
			}))

			this.map.clearOverlays()		// 清除覆盖物
			that.loading = false
			resultLatLng.forEach(function(item) {
				that.addMarker(item)
			})
			clearTimeout(this.timer)
		},

		addMarker(pointData) {
			var point = new BaiduMap.Point(pointData.lng, pointData.lat)
			let ComplexCustomOverlay = this.mapaddOverlay()
			var txt = pointData.address + pointData.area + '㎡'


		    var myCompOverlay = new ComplexCustomOverlay(point, txt)

		    this.map.addOverlay(myCompOverlay)
		},
		getLocation() {
			let geoLocation = new BaiduMap.Geolocation()
			let that = this
			let promise = new Promise(function(resolve,rejected) {
				geoLocation.getCurrentPosition(function(r) {
					resolve(r)
				},{enableHighAccuracy: true})
			})

			promise.then(function(data) {
				that.initPoint = data.point
				that.flag = that.initPoint !== undefined
			})

		},
		moveOrZoom() {
			this.bs = this.map.getBounds()
		},
		mapaddOverlay() {
			let that = this

			function ComplexCustomOverlay(point, text, mouseoverText) {
		      this._point = point
		      this._text = text
		      this._overText = mouseoverText
		    }
		    ComplexCustomOverlay.prototype = new BaiduMap.Overlay()
		    ComplexCustomOverlay.prototype.initialize = function(map) {
		      this._map = map
		      this._div = document.createElement('div')
		      this._span = document.createElement('span')
		      this._arrow = document.createElement('div')
		      let arrow = this._arrow
		      let div = this._div
		      let span = this._span

		      div.style.position = 'absolute'
		      div.style.zIndex = BaiduMap.Overlay.getZIndex(this._point.lat)
		      div.style.backgroundColor = '#EE5D5B'
		      div.style.border = '1px solid #BC3B3A'
		      div.style.color = 'white'

		      div.style.padding = '4px'
		      div.style.whiteSpace = 'nowrap'
		      div.style.MozUserSelect = 'none'
		      div.style.fontSize = '0.2rem'
		      div.style.borderRadius = '4px'


		      div.appendChild(span)
		      span.appendChild(document.createTextNode(this._text))
		      span.style.color = 'white'
		      span.style.lineHeight = '10px'
		      span.style.margin = '8px'

		      arrow.className = 'arrow'

		      arrow.style.position = 'absolute'
		      arrow.style.width = '6px'
		      arrow.style.height = '6px'
		      arrow.style.right = '0px'
		      arrow.style.left = '0px'
		      arrow.style.bottom = '-4px'
		      arrow.style.overflow = 'hidden'
		      arrow.style.transform = 'rotate(45deg)'
		      arrow.style.border = '1px solid  #EE5D5B'
		      arrow.style.borderTop = 'none!important'
		      arrow.style.borderLeft = 'none!important'
		      arrow.style.backgroundColor = '#EE5D5B'
		      arrow.style.margin = 'auto'
		      div.appendChild(arrow)


		      that.map.getPanes().labelPane.appendChild(div)

		      return div
		    }
		    ComplexCustomOverlay.prototype.draw = function() {
			    var map = this._map
			    var pixel = map.pointToOverlayPixel(this._point)

			    this._div.style.left = (pixel.x - parseInt(this._arrow.style.left,0)) + 'px'
	      		this._div.style.top = (pixel.y - 35) + 'px'
		    }

		    return ComplexCustomOverlay
		}
	}
}
</script>