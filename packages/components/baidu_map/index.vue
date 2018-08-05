<template>
	<section class="map">
  		<section id="allmap" :style="{ height: mapHeight + 'px' }"></section>
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
	data() {
		return {
			mapHeight: '',
			map: '',
			bs: ''
		}
	},
	mounted() {
		this.initMap()								// 初始化地图
		this.resizeMapHeight()						// 初始化设置地图高度
		this.initMapData()
		this.map.addEventListener('zoomend',this.move_or_zoom)	// 绑定缩放事件
		this.map.addEventListener('dragend',this.move_or_zoom)	// 绑定拖拽事件
		this.getLocation()
	},
	methods: {
		initMap() {
			this.map = new BaiduMap.Map('allmap')						// 创建地图实例
			let point = new BaiduMap.Point(120.343373,31.540212)		// 创建中心点坐标

			this.map.centerAndZoom(point,16)							// 初始化地图，设置中心点坐标和地图级别


		},
		initMapData() {
			this.bs = this.map.getBounds() // 获取可视区域

			let bssw = this.bs.getSouthWest() // 可视区域左下角
			let bsne = this.bs.getNorthEast() // 可视区域右上角

			// this.get_site_data_lat(bssw,bsne)

		},
		addMarker(pointData) {
			var point = new BaiduMap.Point(pointData.lng, pointData.lat)
			let ComplexCustomOverlay = this.mapaddOverlay()
			var txt = pointData.address + pointData.area + '㎡'


		    var myCompOverlay = new ComplexCustomOverlay(point, txt)

		    this.map.addOverlay(myCompOverlay)
		},
		move_or_zoom() {
			this.bs = this.map.getBounds()

		},
		resizeMapHeight() {
			var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize'
			var that = this
			let oallmap = document.getElementById('allmap')

			that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop

			window.addEventListener(resizeEvent, function() {

				that.mapHeight = document.documentElement.clientHeight - oallmap.offsetTop

			}, false)
		},
		getLocation() {
			let geoLocation = new BaiduMap.Geolocation()
			let that = this

			geoLocation.getCurrentPosition(function(r) {
				var mk = new BaiduMap.Marker(r.point)
				that.map.addOverlay(mk)
				that.map.panTo(r.point)
			})

		},
		zoomIn() {
			let zoom = this.map.getZoom()

			this.map.setZoom(++zoom)
		},
		zoomOut() {
			let zoom = this.map.getZoom()

			this.map.setZoom(--zoom)
		}

	}
}
</script>

<style lang="scss" scoped>
.map{
	#allmap{
		width: 100%;
		height: px2rem(1000);
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