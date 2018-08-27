<template>
	<div class="container">
	 <div class="Twitter__card-1aw7c">
        <div style="width: 0px; height: 0px; border-style: solid; border-width: 0px 5px 6px; border-color: transparent transparent rgb(201, 204, 209); position: absolute; top: -7px; left: 36px;"></div>
        <div style="width: 0px; height: 0px; border-style: solid; border-width: 0px 5px 6px; border-color: transparent transparent rgb(255, 255, 255); position: absolute; top: -5px; left: 36px;"></div>
        <div class="Twitter__body-3csza">
            <div class="Twitter__tab-vqD8I"><span class="">基本色</span><span class="DividingLine__border-1DzBr"></span><span class="Twitter__active-3TNoY">更多颜色</span></div>
            <div class="ui-clearfix" style="padding-bottom: 16px;">
                <div>
                    <div class="saturationWrap" style="width: 140px; height: 104px; position: relative; margin-right: 12px; margin-bottom: 10px; border-radius: 2px 2px 0px 0px; float: left; overflow: hidden;">
                        <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: rgb(255, 0, 0);" :style="leftWrapStyle" ref="leftWrap">
                            <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));">
                                <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));"></div>
                                <div style="position: absolute;  cursor: default;" ref="leftPointer" :style="leftPointerStyle">
                                    <div class="Twitter__pickerChromePointerCircle-1cJlb"
                                                @mousedown="onmousedownLeft($event)"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hueWrap" style="height: 104px; width: 12px; float: left; position: relative;">
                        <div style="position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px; background: linear-gradient(to top, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);">
                            <div style="margin: 0px 2px; position: relative; height: 100%;" ref="rightPicker"
                                @click="movePointer($event)">
                                <div style="position: absolute; left: 0px; top: 100%;z-index:222" :style = "pointerStyle" ref="rightPointer">
                                    <div class="Twitter__pickerChromePointer-vCGnu" style="position:relative;z-index:222"
                                    	v-drag:rightPointer="leftmouse"
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="position: relative;">
                <input value="" placeholder="ff691f" style="width: 143px; font-size: 14px; color: rgb(154, 156, 161); border: 0px; outline: none; height: 24px; box-shadow: rgb(228, 230, 235) 0px 0px 0px 1px inset; border-radius: 0px 2px 2px 0px; float: left; padding-left: 8px;">
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
</div>
</template>

<script>
export default{
	name: 'color-picker',
	computed: {
		pointerStyle() {
			if (this.rightHeight > 0) {

				return {
					left: '0px',
					top: (Math.round(this.rightTop * 10000) / 100).toFixed(4) + '%'
				}
			}
		},
		leftWrapStyle() {
			return {
				background: `rgb(${this.RGB.r},${this.RGB.g},${this.RGB.b})`
			}
		},
		leftPointerStyle() {
			return {
				left: (Math.round(this.leftLeft * 10000) / 100).toFixed(4) + '%',
				top: (Math.round(this.leftTop * 10000) / 100).toFixed(4) + '%'

			}
		}
	},
	data() {
		return {
			deltaX: 0,
			deltaY: 0,
			moveable: false,
			rightHeight: 0,
			leftHeight: 0,
			leftWidth: 0,
			rightTop: 1,
			leftLeft: 0.5,
			leftTop: 0.5,
			clickable: true,
			HSB: {
				h: 0,
				s: 100,
				b: 100
			},
			RGB: {
				r: 255,
				g: 0,
				b: 0
			}
		}
	},
	mounted() {
		this.initialize()
	},
	methods: {
		onmousedown(ev) {
			ev = ev || window.event
			this.startX = ev.clientX - ev.target.offsetLeft
			this.startY = ev.clientY - ev.target.offsetTop
			this.startTop = this.toPoint(this.$refs.rightPointer.style.top)

			let that = this

			document.onmousemove = function(ev_move) {
				ev_move = ev_move || window.event

				that.clickable = false

				that.deltaX = that.startX - ev_move.clientX

				that.deltaY = that.startY - ev_move.clientY

				const offsetY = that.deltaY > 0 ? Math.max(0,Math.min(that.rightHeight * that.startTop,that.deltaY)) :
					-Math.max(0,Math.min(that.rightHeight * (1 - that.startTop),Math.abs(that.deltaY)))


				const rightTop = (that.rightHeight * that.startTop - offsetY) / that.rightHeight


				if ((that.deltaY > 0 && rightTop >= 0) || (that.deltaY < 0 && rightTop <= 1)) {
					that.rightTop = rightTop
					that.HSB.h = parseInt((1 - that.rightTop) * 360,10)
					that.RGB = that.HSBToRGB(that.HSB)

				}

				return false
			}

			document.onmouseup = function() {
				document.onmousemove = null
				document.onmouseup = null
			}

		},
		movePointer(ev) {
			if (ev.target === this.$refs.rightPicker) {

				ev.stopPropagation()

    			this.startTop = this.toPoint(this.$refs.rightPointer.style.top)

    			this.clickY = this.$refs.rightPicker.getBoundingClientRect().top + document.documentElement.scrollTop

				const offsetY = ev.clientY - this.clickY

				this.rightTop = offsetY / this.rightHeight

				this.HSB.h = parseInt((1 - this.rightTop) * 360,10)

				this.RGB = this.HSBToRGB(this.HSB)

			}

		},
		onmousedownLeft(ev) {
			ev = ev || window.event

			this.leftstartX = ev.clientX - ev.target.offsetLeft
			this.leftstartY = ev.clientY - ev.target.offsetTop

			this.leftstartTop = this.toPoint(this.$refs.leftPointer.style.top)
			this.leftstartLeft = this.toPoint(this.$refs.leftPointer.style.left)

			let that = this

			document.onmousemove = function(ev_move) {
				ev = ev || window.event

				that.leftdeltaX = that.leftstartX - ev_move.clientX

				that.leftdeltaY = that.leftstartY - ev_move.clientY


				const offsetX = that.leftdeltaX > 0 ? Math.max(0,Math.min(that.leftWidth * that.leftstartLeft,that.leftdeltaX)) :
					-Math.max(0,Math.min(that.leftWidth * (1 - that.leftstartLeft),Math.abs(that.leftdeltaX)))

				const offsetY = that.leftdeltaY > 0 ? Math.max(0,Math.min(that.leftHeight * that.leftstartTop,that.leftdeltaY)) :
					-Math.max(0,Math.min(that.leftHeight * (1 - that.leftstartTop),Math.abs(that.leftdeltaY)))


				const leftTop = (that.leftHeight * that.leftstartTop - offsetY) / that.leftHeight

				const leftLeft = (that.leftWidth * that.leftstartLeft - offsetX) / that.leftWidth

				that.leftTop = leftTop

				that.leftLeft = leftLeft

				return false
			}

			document.onmouseup = function() {
				document.onmousemove = null
				document.onmouseup = null
				that.clickable = true
			}

		},
		initialize() {
			const rect = this.$refs.rightPicker.getBoundingClientRect()

			const rectleft = this.$refs.leftWrap.getBoundingClientRect()

			this.rightHeight = rect.height

			this.leftHeight = rectleft.height

			this.leftWidth = rectleft.width
		},
		toPoint(percent) {
			var str = percent.replace('%','')

			str = str / 100
			return str
		},
		HSBToRGB(hsb) {
			var rgb = {}
			var h = Math.round(hsb.h)
			var s = Math.round(hsb.s * 255 / 100)
			var v = Math.round(hsb.b * 255 / 100)

			if (s == 0) {
				rgb.r = rgb.g = rgb.b = v
			} else {
				var t1 = v
				var t2 = (255 - s) * v / 255
				var t3 = (t1 - t2) * (h % 60) / 60

				if (h == 360) {
					h = 0
				}
				if (h < 60) {
					rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3
				} else if (h < 120) {
					rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3
				} else if (h < 180) {
					rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3
				} else if (h < 240) {
					rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3
				} else if (h < 300) {
					rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3
				} else if (h < 360) {
					rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3
				} else {
					rgb.r = 0; rgb.g = 0; rgb.b = 0
				}
			}
			return {r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b)}
		},
		leftmouse(x,y,top,left) {

			const offsetY = y > 0 ? Math.max(0,Math.min(this.rightHeight * top,y)) :
				-Math.max(0,Math.min(this.rightHeight * (1 - top),Math.abs(y)))


			const rightTop = (this.rightHeight * top - offsetY) / this.rightHeight


			if ((y > 0 && rightTop >= 0) || (y < 0 && rightTop <= 1)) {
				this.rightTop = rightTop
				this.HSB.h = parseInt((1 - this.rightTop) * 360,10)
				this.RGB = this.HSBToRGB(this.HSB)

			}
		}
	},
	directives: {
		drag: {
			inserted(el,binding,vnode) {
				let valFunc = binding.value
				let modify = binding.modifiers
				let args = binding.arg

                args = vnode.context.$refs[args]

				el.onmousedown = function(ev) {
					ev = ev || window.event
					let startX = ev.clientX - ev.target.offsetLeft
					let startY = ev.clientY - ev.target.offsetTop
					let startTop = args === undefined ? toPoint(el.style.top) : toPoint(args.style.top)
					let startLeft = args === undefined ? toPoint(el.style.left) : toPoint(args.style.left)

					document.onmousemove = function(ev_move) {
						ev_move = ev_move || window.event

						let deltaX = startX - ev_move.clientX

						let deltaY = startY - ev_move.clientY

						valFunc(deltaX,deltaY,startTop,startLeft)

						return false
					}

					document.onmouseup = function() {
						document.onmousemove = null
						document.onmouseup = null
					}
				}

				function toPoint(percent) {
					var str = percent.replace('%','')

					str = str / 100
					return str
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.container{
		width: 1200px;
		margin: 0 auto;
		text-align: center;
	}
	.Twitter__card-1aw7c {
    width: 216px;
    background: #fff;
    border-radius: 2px;
    position: relative;
    border: 1px solid #c9ccd1;
    box-shadow: 0 8px 10px 0 rgba(0,0,0,.03),0 1px 2px 0 rgba(0,0,0,.06),0 3px 6px 0 rgba(0,0,0,.04);
    margin:0 auto;
}

.Twitter__body-3csza {
    padding: 20px 15px 20px 20px
}

.Twitter__tab-vqD8I {
    font-size: 13px;
    color: #9a9ca1;
    margin-bottom: 16px
}

.Twitter__tab-vqD8I span {
    cursor: pointer
}

.Twitter__tab-vqD8I span.Twitter__active-3TNoY,.Twitter__tab-vqD8I span:hover {
    color: #65676e
}

.Twitter__pickerChromePointer-vCGnu {
    width: 20px;
    height: 8px;
    border: 1px solid #e4e6eb;
    transform: translate(-6px,-1px);
    background-color: #fff;
    box-shadow: 0 0 2px 0 rgba(0,0,0,.3);
    border-radius: 1px
}

.Twitter__pickerChromePointerCircle-1cJlb {
    width: 8px;
    height: 8px;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px #fff;
    transform: translate(-4px,-4px)
}

.ColorPicker__cover-3sLc5 {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0
}

.ColorPicker__swatch-2D9-5 {
    padding: 5px;
    background: #fafbfc;
    border-radius: 2px;
    border: 1px solid #e3e4e6;
    display: inline-block;
    cursor: pointer
}

.ColorPicker__swatch-2D9-5:hover {
    background: #f4f5f7;
    border-color: #d3d4d6
}

.ColorPicker__popover-4L0jH {
    position: absolute;
    z-index: 2;
    left: -18px;
    top: 43px
}

.ColorPicker__color-o4nde {
    width: 36px;
    height: 20px;
    border: 1px solid #ebedf0;
    border-radius: 2px;
    box-sizing: border-box
}
</style>