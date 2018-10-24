<template>
<div :class="b()" >
	<div :class="b('head')" >
		<span :class="b('title')">{{title}}</span>
	 	<div :class="b('right')">
	 		<simple-operator></simple-operator>
			<span :class="b('boderline')"></span>
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
		value: null,
		title: null,
		length: null
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
				let index = context.parent.value
				let operator
				let length = context.parent.length

				const del = {
					domProps: {
					    innerHTML: '删除'
					},
					class: {
					    del: true
					},
					on: {
						click() {
							context.parent.$emit('del',index)
						}
					}
				}
				const up = {
					domProps: {
					    innerHTML: '上移'
					},
					class: {
						move: true
					},
					on: {
						click() {
							context.parent.$emit('move',index - 1,index)
						}
					}
				}
				const down = {
					domProps: {
					    innerHTML: '下移'
					},
					class: {
						move: true
					},
					on: {
						click() {
							context.parent.$emit('move',index,index + 1)
						}
					}
				}


				switch (index) {
					case 0:
						operator = []
						break
					case 1:
						operator = [del,down]
						break
					case length - 1:
						operator = [del,up]
						break
					default:
						operator = [del,up,down]
				}

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
	    transition: all 1s;
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
		    a{
		    	cursor: pointer;
		    }
		    #{$p}__title{
	    		color: #8f9196;
	    	}
	    	#{$p}__right{
	    		float: right;
	    	}
	    	#{$p}__boderline{
	    		border-left: 1px solid #e1e3e9;
			    margin-left: 10px;
			    margin-right: 10px;
			    height: 10px;
			    display: inline-block;
	    	}
	    	.del{
	    		color: #8f9196;
    			margin-left: 10px;
    			&:hover{
    				color: #65676e;
    				text-decoration: none;
    			}
	    	}
	    	.move{
	    		color: #8f9196;
    			margin-left: 10px;
    			&:hover{
    				color: #65676e;
    				text-decoration: none;
    			}
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