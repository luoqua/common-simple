<template>
	<section>
		<div class="van-swipe" @touchstart.passive="touchstart($event)"
					@touchmove="touchmove($event)"
					@touchend.passive="touchend($event)"
					@transitionend="transitionend()">
			<div class="van-swipe__track" style="width: 1500px; transition-duration: 500ms;"
				:style="{ transform: 'translateX( '+offset+'px)',transitionDuration: duration+'ms' }"
				>
				<div class="van-swipe-item"
				v-for="(item,index) in swipes"
				style="width: 375px; height: 100%;text-align:center"
				:style="{ transform: 'translateX( '+item.offset+'px)'}">{{item.content}}</div>

			</div>
			<div class="van-swipe__indicators">
				<i class="van-swipe__indicator"
				v-for="(i,index) in swipes.length"

				 ></i>
			</div>
		</div>
		{{direction}}
		<div data-v-e5b63fca="" class="van-swipe"><div data-v-e5b63fca="" class="van-swipe__track" style="width: 1500px; transition-duration: 500ms; transform: translateX(0px);"><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">1</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">2</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">3</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">4</div></div> <div data-v-e5b63fca="" class="van-swipe__indicators"><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i></div></div>
	<div data-v-e5b63fca="" class="van-swipe"><div data-v-e5b63fca="" class="van-swipe__track" style="width: 1500px; transition-duration: 500ms; transform: translateX(0px);"><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">1</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">2</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">3</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">4</div></div> <div data-v-e5b63fca="" class="van-swipe__indicators"><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i></div></div>
	<div data-v-e5b63fca="" class="van-swipe"><div data-v-e5b63fca="" class="van-swipe__track" style="width: 1500px; transition-duration: 500ms; transform: translateX(0px);"><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">1</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">2</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">3</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">4</div></div> <div data-v-e5b63fca="" class="van-swipe__indicators"><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i></div></div>
	<div data-v-e5b63fca="" class="van-swipe"><div data-v-e5b63fca="" class="van-swipe__track" style="width: 1500px; transition-duration: 500ms; transform: translateX(0px);"><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">1</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">2</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">3</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">4</div></div> <div data-v-e5b63fca="" class="van-swipe__indicators"><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i></div></div>
	<div data-v-e5b63fca="" class="van-swipe"><div data-v-e5b63fca="" class="van-swipe__track" style="width: 1500px; transition-duration: 500ms; transform: translateX(0px);"><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">1</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">2</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">3</div><div data-v-e5b63fca="" class="van-swipe-item" style="width: 375px; height: 100%; text-align: center; transform: translateX(0px);">4</div></div> <div data-v-e5b63fca="" class="van-swipe__indicators"><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i><i data-v-e5b63fca="" class="van-swipe__indicator"></i></div></div>

	</section>


</template>

<script>
export default{
	data() {
		return {
			offset: 0,
			swipes: [
				{
					content: 1,
					offset: 0
				},
				{
					content: 2,
					offset: 0
				},
				{
					content: 3,
					offset: 0
				},
				{
					content: 4,
					offset: 0
				}
			],
			width: 0,
			height: 0,
			offset: 0,
			active: 0,
			deltaX: 0,
			deltaY: 0,
			swiping: false,
			vertical: false,
			initialSwipe: 0,
			duration: 500,
			touchable: true,
			direction: 'horizontal'
		}
	},
	created() {
	},
	mounted() {

	},
	computed: {
		count() {
			return this.swipes.length
		},

		delta() {
			return this.vertical ? this.deltaY : this.deltaX
		},

		size() {
			return this[this.vertical ? 'height' : 'width']
		},

		trackSize() {
			return this.count * this.size
		},

		activeIndicator() {
			return (this.active + this.count) % this.count
		},

		trackStyle() {
			return {
				[this.vertical ? 'height' : 'width']: `${this.trackSize}px`,
				transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
				transform: `translate${this.vertical ? 'Y' : 'x'}(${this.offset}px)`
			}
		}
	},
	methods: {
		initialize() {

			if (this.$el) {
				const rect = this.$el.getBoundingClientRect()

				this.width = rect.width
				this.height = rect.height

			}
			this.swiping = true
			this.active = this.initialSwipe
			this.offset = this.count > 1 ? -this.size * this.active : 0
			this.swipes.forEach(swipe => {
				swipe.offset = 0
			})

		},
		touchstart(event) {
			if (!this.touchable) {
				return
			}

			/* this.clear() */
			this.swiping = true
			this.touchSt(event)
			this.correctPosition()

		},
		touchmove(event) {
			if (!this.touchable) {
				return
			}

			this.touchMe(event)

			if (
				(this.vertical && this.direction === 'vertical') ||
				this.direction === 'horizontal'
			) {
				event.preventDefault()
				event.stopPropagation()
			}

			this.move(0, Math.min(Math.max(this.delta, -this.size), this.size))


		},
		touchend() {
			if (!this.touchable) {
				return
			}
			if (this.delta) {
				const offset = this.vertical ? this.offsetY : this.offsetX

				this.move(offset > 50 ? this.delta > 0 ? -1 : 1 : 0)
				this.swiping = false
			}
		},
		move(move = 0, offset = 0) {
			const { delta, active, count, swipes, trackSize} = this
			const atFirst = active === 0
			const atLast = active === count - 1
			const outOfBounds = !this.loop && (
				(atFirst && (offset > 0 || move < 0)) ||
				(atLast && (offset < 0 || move > 0))
			)

			if (outOfBounds || count <= 1) {
				return
			}

			if (move) {
				if (active === -1) {
					swipes[count - 1].offset = 0
				}

				swipes[0].offset = atLast && move > 0 ? trackSize : 0
				this.active += move
			} else if (atFirst) {
				swipes[count - 1].offset = delta > 0 ? -trackSize : 0
			} else if (atLast) {
				swipes[0].offset = delta < 0 ? trackSize : 0
			}
			this.offset = offset - (this.active * this.size)
		},
		correctPosition() {
			if (this.active <= -1) {
				this.move(this.count)
			}
			if (this.active >= this.count) {
				this.move(-this.count)
			}
		},
		touchSt(event) {
	      this.direction = ''
	      this.deltaX = 0
	      this.deltaY = 0
	      this.offsetX = 0
	      this.offsetY = 0
	      this.startX = event.touches[0].clientX
	      this.startY = event.touches[0].clientY
	    },
	    touchMe(event) {

	      const touch = event.touches[0]

	      this.deltaX = touch.clientX - this.startX
	      this.deltaY = touch.clientY - this.startY
	      this.offsetX = Math.abs(this.deltaX)
	      this.offsetY = Math.abs(this.deltaY)
	      this.direction = this.offsetX > this.offsetY ? 'horizontal' : this.offsetX < this.offsetY ? 'vertical' : ''

	      console.log(this.direction)
	    },
		transitionend() {}

	},
	watch: {
		swipes() {
			this.initialize()
		},

		initialSwipe() {
			this.initialize()
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