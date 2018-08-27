<template>
	<section class="map" id="map" :style="{ height: mapHeight + 'px' }">
  		<section id="allmap" ></section>
  		<section class="navIcon-wrap" id="GPSId" @click="getLocation()">
		  <section class="navIcon"></section>
		</section>
  		<section class="zoom-bar-wrap">
		  <section class="zoom-in zoom" id="zoom-in-btn"
		  @click="zoomIn()"></section>
		  <section class="zoom-out zoom" id="zoom-out-btn"
		  @click="zoomOut()"></section>
		</section>
  	</section>
</template>

<script>
import BaiduMap from 'BaiduMap'

export default{
	name: 'baidu-map',
	props: {
		centerPoint: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			mapHeight: ''
		}
	},
	mounted() {
		this.initMap()								// 初始化地图
		this.resizeMapHeight()						// 初始化设置地图高度
		this.map.addEventListener('zoomend',this.move_or_zoom)	// 绑定缩放事件
		this.map.addEventListener('dragend',this.move_or_zoom)	// 绑定拖拽事件
	},
	methods: {
		initMap() {
			this.map = new BaiduMap.Map('allmap')						// 创建地图实例
			let point = new BaiduMap.Point(this.centerPoint.lng,this.centerPoint.lat)				// 创建中心点坐标
			let mk = new BaiduMap.Marker(point)


			this.map.addOverlay(mk)
			this.map.panTo(this.centerPoint)

			this.map.centerAndZoom(point,16)							// 初始化地图，设置中心点坐标和地图级别
			this.$emit('initData',this.map)
			this.move_or_zoom()
		},
		move_or_zoom() {
			this.$emit('moveOrZoom')

		},
		resizeMapHeight() {
			var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
			var that = this
			let oallmap = document.getElementById('map')

			that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop

			window.addEventListener(resizeEvent, function() {

				that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop
			}, false)
		},
		zoomIn() {
			let zoom = this.map.getZoom()

			this.map.setZoom(++zoom)
		},
		zoomOut() {
			let zoom = this.map.getZoom()

			this.map.setZoom(--zoom)
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
				let mk = new BaiduMap.Marker(data.point)
				that.map.addOverlay(mk)
				that.map.panTo(data.point)
			})
		}

	}
}
</script>

<style lang="scss" scoped>
@import '../../styles/common';
.map{
	height: px2rem(1334);
	#allmap{
		width: 100%;
		height: 100%;
		.arrow{
			color: white;
		}
	}
	.zoom-bar-wrap{
		position: absolute;
	    right: 15px;
	    bottom: 75px;
	    height: 92px;
	    width: 40px;
	    border-radius: 6px;
	    background: #fff;
	    border: solid 1px #e6e6e6;
	    overflow: hidden;
	    .zoom{
	    	height: 50%;
		    width: 100%;
		    border-top: solid 1px #e6e6e6;
		    margin-top: -1px;
		    position: relative;
	    }
	    .zoom-in{
			@extend .zoom;
		    &:before{
			    	display: block;
				    content: "";
				    width: 24px;
				    height: 2px;
				    position: absolute;
				    top: 23px;
				    left: 8px;
				    background: #007aff;
		   		 }
		    &:after{
		    	display: block;
			    content: "";
			    height: 23px;
			    width: 2px;
			    position: absolute;
			    top: 12px;
			    left: 19px;
			    background: #007aff;
		    }
	   	}
		.zoom-out{
			@extend .zoom;
			&:before{
		        display: block;
			    content: "";
			    width: 24px;
			    height: 2px;
			    position: absolute;
			    top: 23px;
			    left: 8px;
			    background: #007aff;
		   	}
		}
	}
	.navIcon-wrap {
	    background: #fff;
	    position: absolute;
	    right: 15px;
	    bottom: 15px;
	    border-radius: 6px;
	    width: 40px;
	    height: 40px;
	    border: solid 1px #e6e6e6;
	    .navIcon {
		    width: 23px;
		    height: 23px;
		    background: url(../../icons/icon-gps.png) center no-repeat;
		    background-size: 23px 23px;
		    margin: 8px;
		}
	}
}
</style>