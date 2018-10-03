<template>
	<section>
		<div class="van-swipe" @touchstart.passive="touchstart($event)"
					@touchmove="touchmove($event)"
					@touchend.passive="touchend($event)"
					@transitionend="transitionend()">
			<div class="van-swipe__track" style="width: 1500px; transition-duration: 500ms;"
				:style="{ transform: 'translateX( '+transform_distance+'px)',transitionDuration: duration+'ms' }"
				>
				<div class="van-swipe-item"
				v-for="(item,index) in swipeItems"
				style="width: 375px; height: 100%;text-align:center"
				:style="{ transform: 'translateX( '+item.translate_dis+'px)'}">{{item.content}}</div>

			</div>
			<div class="van-swipe__indicators">
				<i class="van-swipe__indicator"
				v-for="(i,index) in swipeItems.length"
				:class="{ 'van-swipe__indicator--active':currentIndex === index}"
				 ></i>
			</div>
		</div>

	</section>
</template>

<script>
export default{
	data() {
		return {
			transform_distance: 0,
			startX: 0,
			endX: 0,
			startY: 0,
			endY: 0,
			duration: 0,
			currentIndex: 0,
			specIndex: '',
			clientwidth: 0,
			swipeItems: [
				{
					content: 1,
					translate_dis: 0
				},
				{
					content: 2,
					translate_dis: 0
				},
				{
					content: 3,
					translate_dis: 0
				},
				{
					content: 4,
					translate_dis: 0
				}
			],
			differ_x: 0,
			differ_y: 0,
			timer: '',
			touchClock: true,
			autoClock: true,
			prevIndex: 4,
			flag: false,
			direction: '',
			vertical: false
		}
	},
	created() {
		this.clientwidth = document.documentElement.clientWidth
	},
	mounted() {

	},
	methods: {
		touchstart(e) {
			if (!this.touchClock) {
				return false
			}
			clearTimeout(this.timer)
			this.duration = 0
			this.startX = e.targetTouches[0].clientX
			this.startY = e.targetTouches[0].clientY
			this.specIndex = ''
			let that = this



			this.direction = ''
			this.offsetX = 0
			this.offsetY = 0
			this.differ_x = 0

			this.differ_y = 0
		},
		touchmove(e) {
			if (!this.touchClock) {
				return false
			}

			clearTimeout(this.timer)
			this.autoClock = false
			this.endX = e.targetTouches[0].clientX
			this.endY = e.targetTouches[0].clientY
			this.differ_x = this.endX - this.startX
			this.differ_y = this.endY - this.startY
			this.offsetX = Math.abs(this.differ_x)
	     	this.offsetY = Math.abs(this.differ_y)
			this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''
			let length = this.swipeItems.length

			if (
				(this.vertical && this.direction === 'vertical') || 
				this.direction === 'horizontal'
			) {
				e.preventDefault()
				e.stopPropagation()
			}


				this.duration = 500
				let offset = this.vertical ? this.differ_x : this.offsetX
				
				offset = Math.min(Math.max(this.differ_x,-this.clientwidth),this.clientwidth)

				const atFirst = this.currentIndex === 0
				const atLast  = this.currentIndex === length - 1

				if(atFirst) {
					this.swipeItems[length -1].offset = this.differ_x > 0 ? -length * this.clientwidth : 0
				}else {
					this.swipeItems[0].offset = this.differ_x < 0 ? length * this.clientwidth : 0
				}
				this.transform_distance = offset - (this.currentIndex * this.clientwidth)

				

		},
		touchend() {
			if (!this.touchClock) {
				return false
			}

			clearTimeout(this.timer)

			if (this.offsetX > 50) {
				this.duration = 500
				const atFirst = this.currentIndex === 0
				const atLast  = this.currentIndex === length - 1
				let length = this.swipeItems.length


				if( this.currentIndex === -1){
					 this.swipeItems[length - 1].offset = 0
				}
				this.swipeItems[0].offset = atLast && this.differ_x > 0 ? length * this.clientwidth : 0
				this.currentIndex += this.differ_x > 0 ? -1 : 1



				this.transform_distance =  - (this.currentIndex * this.clientwidth)

				
			}
			
		},
		autoSwipe() {
			if (!this.autoClock) {
				return false
			}
			let that = this
			let swipelength = this.swipeItems.length

			this.timer = setTimeout(function() {
				that.touchClock = false
				that.currentIndex === swipelength - 1 && (that.specIndex = 0)
				that.duration = 500
				that.swipeNext()
			},3000)
		},
		swipeNext() {
			let swipelength = this.swipeItems.length

			this.differ_x = 0
			this.prevIndex = this.currentIndex
			this.currentIndex++
			this.transform_distance = -(this.clientwidth * this.currentIndex)
			this.currentIndex = this.currentIndex > (swipelength - 1) ? this.currentIndex % swipelength : this.currentIndex

			this.flag = true
		},
		swipePrev() {
			let swipelength = this.swipeItems.length


			this.differ_x = 0
			this.prevIndex = this.currentIndex
			this.currentIndex--
			this.transform_distance = -(this.clientwidth * this.currentIndex)
			this.currentIndex = this.currentIndex < 0 ? this.currentIndex * (swipelength - 1) * -1 : this.currentIndex
			// this.autoSwipe()
		},
		specDistance(index) {
			let specDistance = this.clientwidth * this.swipeItems.length

			return this.specIndex === index ? index === 0 ? specDistance : -1 * specDistance : 0
		},
		transitionend() {
			this.autoClock = true
			this.touchClock = true
			this.duration = 0
			// this.autoSwipe()
		}
	},
	watch: {
		currentIndex() {

		}
	}
}
</script>

<style lang="scss"   >
@import '../../styles/common';

.van-swipe{
	overflow: hidden;
    position: relative;
    -webkit-user-select: none;
    user-select: none;
	.van-swipe-item{
		float: left;
		line-height: 150px;
		&:nth-child(odd) {
		    background-color: #66c6f2;
		}
		&:nth-child(even) {
		    background-color: #39a9ed;
		}
	}

	.van-swipe__indicators {
	    display: -webkit-box;
	    @include fj;
	    position: absolute;
	    left: 50%;
	    bottom: 10px;
	    @include cl;
		.van-swipe__indicator {
		    border-radius: 100%;
		    background-color: #999;
		    width: 6px;
		    height: 6px;
			&:not(:last-child) {
			    margin-right: 6px;
			}
		}
		.van-swipe__indicator--active{
			background: #f85;
		}

	}
}
</style>
