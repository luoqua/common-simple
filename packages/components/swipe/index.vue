<template>
	<section>
		<div class="van-swipe" @touchstart.passive="ontouchstart($event)"
					@touchmove="ontouchmove($event)"
					@touchend.passive="ontouchend($event)"
					@transitionend="transitionend()">
			<div class="van-swipe__track"
				:style="trackStyle"
				>
				
			<slot />
			</div>
			<div class="van-swipe__indicators" v-if="showIndicators" 
				:class="{'van-swipe__indicators--vertical': vertical}">
				<i class="van-swipe__indicator"
				v-for="(i,index) in swipes.length"
				:class="{ 'van-swipe__indicator--active':active === index}"
				 ></i>
			</div>
		</div>

	</section>
</template>

<script>
import swipe_item from '../swipe-item/index.vue'
import Touch from '../mixins/touch'

export default{
	name: 'swipe',

	mixins: [Touch],

	props: {
		autoplay: Number,
		vertical: Boolean,
		loop: {
			type: Boolean,
			default: true
		},
		touchable: {
			type: Boolean,
			default: true
		},
		initialSwipe: {
			type: Number,
			default: 0
		},
		showIndicators: {
			type: Boolean,
			default: true
		},
		duration: {
			type: Number,
			default: 500
		}
	},
	data() {
		return {
			offset: 0,
			swipes: [],
			timer: '',
			active: 0,
			width: 0,
			height: 0,
			deltaX: 0,
			deltaY: 0,
			swiping: true,
			touchend: false

		}
	},
	computed: {
		count() {
			return this.swipes.length
		},
		size() {
			return this[this.vertical ? 'height' : 'width' ]
		},
		delta() {
			return this.vertical ? this.deltaY : this.deltaX
		},
		trackSize() {
			return this.count * this.size
		},
		trackStyle() {
			return {
				[this.vertical ? 'height' : 'width']: `${this.trackSize}px`,
				transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`,
				transitionDuration: `${this.swiping ? 0 : this.duration}ms`
			}
		}

	},
	watch: {
		swipes() {
			this.initialize()
		},
		initialSwipe() {
			this.initialize()
		},
		autoplay(autoplay) {
	      if (!autoplay) {
	        this.clear()
	      }
	    }
	},
	mounted() {
		this.initialize()
	},
	methods: {
		clear() {
	      clearTimeout(this.timer)
	    },
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
			this.autoSwipe()
		},
		initialTouch() {
			this.swiping = true
			this.correctPosition()
			this.direction = ''
			this.offsetX = 0
			this.offsetY = 0
			this.deltaX = 0
      		this.deltaY = 0
		},
		ontouchstart(e) {
			if (!this.touchable) {
				return false
			}
			clearTimeout(this.timer)
			this.swiping = true
			this.touchstart(e)
			this.correctPosition()

		},
		ontouchmove(e) {
			if (!this.touchable && !this.touchend) {
				return false
			}
			clearTimeout(this.timer)
			this.touchmove(e)

			if (
				(this.vertical && this.direction === 'vertical') ||
				this.direction === 'horizontal'
			) {
				e.preventDefault()
				e.stopPropagation()
			}

			this.move(0,Math.min(Math.max(this.delta, -this.size), this.size))
		},
		correctPosition() {
			if (this.active <= 0) {
		        this.move(0)
		    }
		    if (this.active >= this.count - 1) {
		        this.move(0)
		    }

		},
		ontouchend() {
			if (!this.touchable) {
				return false
			}

			clearTimeout(this.timer)
			if (this.delta) {
				this.touchend = true
				const offset = this.vertical ? this.offsetY : this.offsetX

				this.move(offset > 50 ? this.delta > 0 ? -1 : 1 : 0)
				this.swiping = false
			}

		},
		move(move = 0, offset = 0) {

			const {active,count,trackSize,size,swipes,delta} = this
			const atFirst = active === 0
			const atLast = active === count - 1
			const outOfBounds = !this.loop && (
				(atFirst && (offset > 0 || move < 0)) ||
				(atLast && (offset < 0 || move > 0))
			)

			if (outOfBounds || count <= 1) {
				return
			}

			if (!move) {
				if (atFirst) {
					swipes[count - 1].offset = this.delta > 0 ? -trackSize : 0
					swipes[0].offset = 0
				} else if (atLast) {
					swipes[0].offset = delta < 0 ? trackSize : 0
					swipes[count - 1].offset = 0
				}
			} else {

				if (active === count - 1) {
					swipes[count - 1].offset = 0
				}

				swipes[0].offset = atLast && move > 0 ? trackSize : 0

				this.active += move
			}

			this.offset = offset - (this.active * size)
			this.active = this.active >= count ? 0 : this.active <= -1 ? count - 1 : this.active

		},
		autoSwipe() {

			const { autoplay } = this
			let that = this

			if (autoplay && this.count > 1) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					that.initialTouch()
					that.touchable = false
					setTimeout(() => {
						that.move(1)
						that.swiping = false
					})
				},autoplay)
			}
		},
		transitionend() {
			this.touchend = false
			this.touchable = true
			this.autoSwipe()
			this.$emit('change',this.active)
		}

	},
	components: {
		swipe_item
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
    height: 200px;
	.van-swipe-item{
		float: left;
		line-height: 150px;
		text-align: center;
		
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
	
	.van-swipe__indicators--vertical {
	    left: 10px;
	    top: 50%;
	    bottom: auto;
	    -webkit-box-orient: vertical;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: column;
	    flex-direction: column;
	    -webkit-transform: translateY(-50%);
	    transform: translateY(-50%);

	    .van-swipe__indicator:not(:last-child) {
		    margin-bottom: 6px;
		}
	}

}
</style>
