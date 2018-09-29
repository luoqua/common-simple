<template>
	<div :class="b()" v-if="isOpen" @click.stop="close($event)" ref="color_picker_wrapper">
	 <div :class="b('card')">
        <div :class="b('body')">
            <div  :class="b('tab')">
            	<span :class="b('item', { active: isActive })"  @click="!isActive ? tabChange() : ''" >基本色</span>
            	<span class="DividingLine__border-1DzBr">
            	</span>
            	<span :class="b('item', { active: !isActive })" @click="isActive ? tabChange() : ''" >更多颜色</span>
            </div>
            <div class="ui-clearfix">

            <template v-if="isActive">
            	<div :title="item.color"
            		  :class="b('basecolor')"
            		  v-for="(item,index) in basic"
            		  :style="{ backgroundColor: item.color,border: index == 0 || index == 9 ? '1px solid rgb(228, 230, 235)' : 'none' }"
            		  @click="baseColorhandle(item.color)">

            		  </div>
            </template>

            <div v-if="!isActive">
                <div class="saturationWrap" >
                    <div :class="b('saturation')"
                    	:style="leftWrapStyle"
                        ref="leftWrap"
                        @click="leftClick($event)"
                        >
                        <div :class="b('wrapBg')" >
                            <div :class="b('wrapblock')"></div>
                            <div :class="b('wrapsub')"
                            	 ref="leftPointer"
                            	 :style="leftPointerStyle">
                                	<div :class="b('pointer')"
                                            v-drag:leftPointer="leftdrag"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hueWrap" >
                    <div :class="b('hueWrapbg')">
                        <div :class="b('picker')"
                        	ref="rightPicker"
                            @click="clickPointer($event)">
                            <div :class="b('pointer')"
                             	 :style = "pointerStyle"
                             	 ref="rightPointer">
                                <div :class="b('pointerItem')"
                                	v-drag:rightPointer="rightdrag"
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div :class="b('currentColor')"
                :style="currentColor"
                >#</div>
            <div :class="b('currentHex')">
                <input v-model="hexValue" :placeholder="placeholderColor">
            </div>
        </div>
    </div>
</div>
</template>

<script>
import create from '@/utils/create'
import basicColor from '../mixins/basicColor'

export default create({
	name: 'color-picker',
	mixins: [basicColor],
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
			hexValue: '',
			isActive: true,
			placeholderColor: 'ff691f',
			isOpen: true
		}
	},
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
				backgroundColor: `#${this.HSBToHex(this.rightHSB)}`
			}
		},
		leftPointerStyle() {
			return {
				left: (Math.round(this.leftLeft * 10000) / 100).toFixed(4) + '%',
				top: (Math.round(this.leftTop * 10000) / 100).toFixed(4) + '%'

			}
		},
		HSB() {
			return {
				h: parseInt((1 - this.rightTop) * 360,10),
				s: parseInt(this.leftLeft * 100,10),
				b: parseInt((1 - this.leftTop) * 100,10)
			}
		},
		RGB() {
			if (this.HSB !== undefined) {
				return this.HSBToRGB(this.HSB)
			}
		},
		rightHSB() {
			return {
				h: parseInt((1 - this.rightTop) * 360,10),
				s: 100,
				b: 100
			}
		},
		currentColor() {
			return {
				backgroundColor: `#${this.HSBToHex(this.HSB)}`,
				border: `1px solid #${this.HSBToHex(this.HSB)}`
			}
		}
	},
	watch: {
		hexValue() {
			let reg = /^[0-9a-fA-F]+$/

			if (reg.test(this.hexValue)) {
				let hsb = this.HexToHSB(this.hexValue)

				if (hsb === null) {
					return
				}

				this.rightTop = 1 - (hsb.h / 360)

				this.leftLeft = hsb.s / 100

				this.leftTop = 1 - (hsb.b / 100)

			}
		}
	},
	mounted() {
	},
	methods: {
		tabChange() {
			this.isActive = !this.isActive
			if (!this.isActive) {
				this.$nextTick(() => {
					this.initialize()
				})
			}
		},
		baseColorhandle(color) {
			let hsb = this.HexToHSB(color)

			this.rightTop = 1 - (hsb.h / 360)

			this.leftLeft = hsb.s / 100

			this.leftTop = 1 - (hsb.b / 100)
		},
		close(ev) {
			if (ev.target === this.$refs.color_picker_wrapper) {
				this.isOpen = !this.isOpen
			}
		},
		rightdrag(x,y,top) {

			const offsetY = y > 0 ? Math.max(0,Math.min(this.rightHeight * top,y)) :
				-Math.max(0,Math.min(this.rightHeight * (1 - top),Math.abs(y)))

			const rightTop = ((this.rightHeight * top) - offsetY) / this.rightHeight


			if ((y > 0 && rightTop >= 0) || (y < 0 && rightTop <= 1)) {
				this.rightTop = rightTop
			}
		},
		clickPointer(ev) {
			if (ev.target === this.$refs.rightPicker) {

				ev.stopPropagation()

    			this.startTop = this.toPoint(this.$refs.rightPointer.style.top)

    			this.clickY = this.$refs.rightPicker.getBoundingClientRect().top + document.documentElement.scrollTop

				const offsetY = ev.clientY - this.clickY

				this.rightTop = offsetY / this.rightHeight
			}

		},
		leftdrag(x,y,top,left) {
			const offsetX = x > 0 ? Math.max(0,Math.min(this.leftWidth * left,x)) :
				-Math.max(0,Math.min(this.leftWidth * (1 - left),Math.abs(x)))

			const offsetY = y > 0 ? Math.max(0,Math.min(this.leftHeight * top,y)) :
				-Math.max(0,Math.min(this.leftHeight * (1 - top),Math.abs(y)))


			const leftTop = ((this.leftHeight * top) - offsetY) / this.leftHeight

			const leftLeft = ((this.leftWidth * left) - offsetX) / this.leftWidth

			this.leftTop = leftTop

			this.leftLeft = leftLeft

		},
		leftClick(ev) {

			if (ev.currentTarget === this.$refs.leftWrap) {

				ev.stopPropagation()

				this.startTop = this.toPoint(this.$refs.leftWrap.style.top)

				this.startLeft = this.toPoint(this.$refs.leftWrap.style.left)

				let clickX = this.$refs.leftWrap.getBoundingClientRect().left + document.documentElement.scrollLeft

				let clickY = this.$refs.leftWrap.getBoundingClientRect().top + document.documentElement.scrollTop

				const offsetY = ev.clientY - clickY

				const offsetX = ev.clientX - clickX

				this.leftTop = offsetY / this.leftHeight

				this.leftLeft = offsetX / this.leftWidth
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
			var s = Math.round((hsb.s * 255) / 100)
			var v = Math.round((hsb.b * 255) / 100)

			if (s === 0) {
				rgb.r = rgb.g = rgb.b = v
			} else {
				let t1 = v
				let t2 = ((255 - s) * v) / 255
				let t3 = ((t1 - t2) * (h % 60)) / 60

				if (h === 360) {
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
		RGBToHSB(rgb) {
			if (!rgb) {
				return rgb
			}
			var hsb = {
				h: 0,
				s: 0,
				b: 0
			}
			var min = Math.min(rgb.r, rgb.g, rgb.b)
			var max = Math.max(rgb.r, rgb.g, rgb.b)
			var delta = max - min

			if (!rgb) {
				return
			}
			hsb.b = max
			hsb.s = max !== 0 ? (255 * delta) / max : 0
			if (hsb.s !== 0) {
				if (rgb.r === max) {
					hsb.h = (rgb.g - rgb.b) / delta
				} else if (rgb.g === max) {
					hsb.h = 2 + ((rgb.b - rgb.r) / delta)
				} else {
					hsb.h = 4 + ((rgb.r - rgb.g) / delta)
				}
			} else {
				hsb.h = -1
			}
			hsb.h *= 60
			if (hsb.h < 0) {
				hsb.h += 360
			}
			hsb.s *= 100 / 255
			hsb.b *= 100 / 255
			return hsb
		},
		RGBToHex(rgb) {
			if (!rgb) {
				return rgb
			}
			var hex = [
				rgb.r.toString(16),
				rgb.g.toString(16),
				rgb.b.toString(16)
			]

			hex.forEach(function(val, nr) {
				if (val.length === 1) {
					hex[nr] = '0' + val
				}
			})
			return hex.join('')
		},
		HSBToHex(hsb) {
			return this.RGBToHex(this.HSBToRGB(hsb))
		},
		HexToRGB(hex) {


		    let rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i

			let hex_v = hex.replace(rgx, (m, r, g, b) => r + r + g + g + b + b)

			let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex_v)


			let rgb_v = rgb !== null ? {
				r: parseInt(rgb[1], 16),
		    	g: parseInt(rgb[2], 16),
		    	b: parseInt(rgb[3], 16)
			} : rgb

			return rgb_v

		},
		HexToHSB(hex) {
			return this.RGBToHSB(this.HexToRGB(hex))
		}
	},
	directives: {
		drag: {
			inserted(el,binding,vnode) {
				let valFunc = binding.value
				let args = binding.arg

				args = vnode.context.$refs[args]

				function toPoint(percent) {
					var str = percent.replace('%','')

					str = str / 100
					return str
				}

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

			}
		}
	}
})
</script>

<style lang="scss" scoped>
	.simple-color-picker{
		width: 100%;
		height: 100%;
		z-index: 99999;
		position: relative;
		$p:&;
		&__card{
			width: 216px;
		    background: #fff;
		    border-radius: 2px;
		    position: relative;
		    border: 1px solid #c9ccd1;
		    box-shadow: 0 8px 10px 0 rgba(0,0,0,.03),0 1px 2px 0 rgba(0,0,0,.06),0 3px 6px 0 rgba(0,0,0,.04);
		    margin:0 auto;
		    margin-top: 50px;
		    z-index: 999999;
		    &:before{
		    	content:"";
			    width: 0px;
			    height: 0px;
			    border-style: solid;
			    border-width: 0px 5px 6px;
			    border-color: transparent transparent rgb(201, 204, 209);
			    position: absolute;
			    top: -7px;
			    left: 36px;
		    }
		    &:after{
		    	content:"";
				width: 0px;
			    height: 0px;
			    border-style: solid;
			    border-width: 0px 5px 6px;
			    border-color: transparent transparent rgb(255, 255, 255);
			    position: absolute;
			    top: -5px;
			    left: 36px;
		    }
		    #{$p}__body{
		    	padding: 20px 12px 20px 20px;
		    	zoom: 1;
		    	&:after{
					content: "";
				    display: table;
				    clear: both;
				}
				&:before{
					content: "";
					display: block;
				}
		    	#{$p}__tab{
		    		font-size: 13px;
				    color: #9a9ca1;
				    margin-bottom: 16px;
				    position: relative;
				    span{
				    	cursor: pointer;
				    	&:hover{
				    		color: #65676e;
				    	}
				    }
				    #{$p}__item--active{
				    	color: #65676e;
				    }
		    	}
		    	.ui-clearfix{
		    		zoom: 1;
					padding-bottom: 16px;
					&:after{
						content: "";
					    display: table;
					    clear: both;
					}
					&:before{
						content: "";
    					display: block;
					}
					#{$p}__basecolor{
						background: rgb(255, 255, 255);
						height: 16px;
						width: 16px;
						cursor: pointer;
						float: left;
						border-radius: 0px;
						box-sizing: border-box;
						margin: 0px 4px 4px 0px;
					}
					.saturationWrap{
						width: 140px;
						height: 104px;
						position: relative;
						margin-right: 12px;
						margin-bottom: 10px;
						border-radius: 2px 2px 0px 0px;
						float: left;
						overflow: hidden;
					}
		    	}
		    	#{$p}__saturation{
					position: absolute;
					top: 0px;
					right: 0px;
					bottom: 0px;
					left: 0px;
					background: rgb(255, 0, 0);
				}
				#{$p}__wrapBg{
					position: absolute;
					top: 0px;
					right: 0px;
					bottom: 0px;
					left: 0px;
					background: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0));
					#{$p}__wrapblock{
						position: absolute;
						top: 0px;
						right: 0px;
						bottom: 0px;
						left: 0px;
						background: linear-gradient(to top, rgb(0, 0, 0), rgba(0, 0, 0, 0));
					}
					#{$p}__wrapsub{
						position: absolute;
						cursor: default;
						#{$p}__pointer{
							width: 8px;
						    height: 8px;
						    border-radius: 4px;
						    box-shadow: inset 0 0 0 1px #fff;
						    transform: translate(-4px,-4px)
						}
					}
				}
				.hueWrap{
					height: 104px;
					width: 12px;
					float: left;
					position: relative;
					#{$p}__hueWrapbg{
						position: absolute;
						top: 0px;
						right: 0px;
						bottom: 0px;
						left: 0px;
						background: linear-gradient(to top, rgb(255, 0, 0) 0%, rgb(255, 255, 0) 17%, rgb(0, 255, 0) 33%, rgb(0, 255, 255) 50%, rgb(0, 0, 255) 67%, rgb(255, 0, 255) 83%, rgb(255, 0, 0) 100%);
						#{$p}__picker{
							margin: 0px 2px;
							position: relative;
							height: 100%;
							#{$p}__pointer{
								position: absolute;
								left: 0px;
								top: 100%;
								z-index:222;
								#{$p}__pointerItem{
									width: 20px;
								    height: 8px;
								    border: 1px solid #e4e6eb;
								    transform: translate(-6px,-1px);
								    background-color: #fff;
								    box-shadow: 0 0 2px 0 rgba(0,0,0,.3);
								    border-radius: 1px;
								    position:relative;z-index:222
								}
							}
						}
					}
				}
				#{$p}__currentColor{
					height: 16px;
					width: 16px;
					float: left;
					color: rgb(152, 161, 164);
					display: flex;
					align-items: center;
					justify-content: center;
					text-indent: -400em;
					margin-top: 3px;
					margin-right: 8px;
					border: 1px solid rgb(159, 100, 100);
				}
				#{$p}__currentHex{
					position: relative;
					input{
						width: 143px;
						font-size: 14px;
						color: rgb(154, 156, 161);
						border: 0px;
						outline: none;
						height: 24px;
						box-shadow: rgb(228, 230, 235) 0px 0px 0px 1px inset;
						border-radius: 0px 2px 2px 0px;
						float: left;
						padding-left: 8px;
					}
				}
		    }
		}
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
.Twitter__tab-vqD8I {
    font-size: 13px;
    color: #9a9ca1;
    margin-bottom: 16px;
}
.Twitter__tab-vqD8I span {
    cursor: pointer;
}
.Twitter__tab-vqD8I span.Twitter__active-3TNoY, .Twitter__tab-vqD8I span:hover {
    color: #65676e;
}
.DividingLine__border-1DzBr {
    border-left: 1px solid #e1e3e9;
    margin-left: 10px;
    margin-right: 10px;
    height: 10px;
    display: inline-block;
}

</style>