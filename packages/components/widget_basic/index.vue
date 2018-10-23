<template>
<div :class="b()">
	<div :class="b('head')" >
		<span :class="b('title')">页面顶部</span>
	 	<div :class="b('right')">
	 		<simple-operator></simple-operator>

	 		<a href="javascript:void(0);" @click="togglePick">{{message}}</a>
	 	</div>
	</div>
	<div :class="b('body')" 
		 :style="maxheight">
		<div :class="b('padding')">
			<slot></slot>
		</div>
	</div>
</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'widget-basic',
	props: {
		value: null
	},
	data() {
		return {
			toggle: true
		}
	},
	computed: {
		message() {
			const toggle = this.toggle

			return toggle === false ? '收起' : '展开'
		},
		maxheight() {
			const toggle = this.toggle

			return {
				maxHeight: toggle === false ? '1500px' : '0px',
			    overflow: toggle === false ? 'initial' : 'hidden'
			}
		}
	},
	components: {
		'simple-operator': {
			functional: true,
			render(createElement, context) {
				const parent = context.parent.value
				const graparent = context.parent.parent
				let basic_num = [...,graparent[value],graparent[value-1],...] = graparent.basic_num
				const del = {
					domProps: {
					    innerHTML: '删除'
					},
					on: {
						del() {
							console.log('del')
						}
					}
				}
				const up = {
					domProps: {
					    innerHTML: '上移'
					},
					on: {
						up() {
							console.log('up')
						}
					}
				}
				const down = {
					domProps: {
					    innerHTML: '下移'
					},
					on: {
						down() {
							console.log('down')
						}
					}
				}

				let operator = [del,up,down]

				return operator.map((item) => {
					return createElement('a',item)
				})

			}
		}
	},
	methods: {
		togglePick() {
			this.toggle = !this.toggle
		}
	}
})
</script>


<style type="text/css" lang="scss"    >
	.simple-widget-basic{
		margin-bottom: 8px;
	    border-radius: 2px;
	    position: relative;
	    $p:&;
	    &__head{
	    	background: #fafbfc;
		    border: 1px solid #e3e4e6;
		    padding: 14px 15px;
		    font-size: 14px;
		    line-height: 16px;
		    &:hover{
		    	background: #f4f5f7;
    			border-color: #d3d4d6;
		    }
		    #{$p}__title{
	    		color: #8f9196;
	    	}
	    	#{$p}__right{
	    		float: right;
	    	}
	    }
	    &__body{
	    	max-height: 1500px;
		    transition-duration: .3s;
			transition-timing-function: cubic-bezier(0,1,.5,1);
		    #{$p}__padding{
		    	color: #111;
			    border: 1px solid #e3e4e6;
			    border-top: none;
			    padding: 40px 0 48px 40px;
		    }
	    }

	}
</style>