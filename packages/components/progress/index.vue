<template>
	<transition-group
		tag="ul"
		name="simple-progress"
		:class="b()">
		<li :class="b('item')"  v-for="(item, index) in fileList" :key="index" v-if="item.processWidth !== 100">
	        <div :class="b('meta')" >
	            <span :class="b('name')" >{{item.name}}</span>
	            <em :class="b('size')" >{{toSize(item.size)}}</em>
	        </div>
	        <div :class="b('process')" >
	            <div :class="b('process-done')"
	            	:style="{width:toPercent(item.processWidth)}"
	            	>
	            </div>
	        </div>
	    </li>
	</transition-group>
</template>


<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'progress',
	props: {
		fileList: Array
	},
	data() {
		return {}
	},
	components: {
	},
	watch: {
		fileList() {
			this.fileList.forEach((item,index) => {
				if (item.processWidth === 0) {
					this.setInc(item,index)
				}
			})
		}
	},
	methods: {
		setInc(item,index) {
			requestAnimationFrame(() => {
				let processWidth = item.processWidth

				if (item.processWidth === 60.6 && item.isdone === true) {
					this.progressDone(item,index)
					return
				}
				item.processWidth = this.clamp((Math.random() * 2) + processWidth,0, 60.6)
				this.$set(this.fileList,index,item)
				this.setInc(item,index)

			})
		},
		progressDone(item,index) {
			if (item.processWidth > 60 && item.processWidth < 100) {
				item.processWidth = this.clamp((Math.random() * 20 + 30) + item.processWidth,99.5, 99.6)
				this.$set(this.fileList,index,item)
				setTimeout(() => {
					item.processWidth = 100
					this.$set(this.fileList,index,item)
				},1000)
			}
		},
		clamp(n,min,max) {
			if (n < min) {
				return min
			}
			if (n > max) {
				return max
			}
			return n
		},
		toPercent(width) {
			return Math.round((width * 100) / 100) + '%'
		},
		toSize(size) {
			return (size / 1024 * 100 / 100).toFixed(2) + 'k'
		}
	}
})
</script>


<style type="text/css" lang="scss">
	.simple-progress {
	    width: 300px;
	    border-radius: 2px;
	    background-clip: padding-box;
	    position: relative;
	    background-color: #fff;
	    position: relative;
	    display: block;
	    font-size:14px;
	    margin-top: 5px;
	    $p:&;
	    &__item{
	    	border: 1px solid #e7e7eb;
		    padding: 5px 10px;
		    position: relative;
	    }
	    &__name{
	    	display: inline-block;
		    *display: inline;
		    *zoom:1;width: 100px;
		    overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    max-width: 100%;
		    vertical-align: middle
	    }
	    &__size{
	    	color: #7b7b7b;
	    	font-style: normal
	    }
	    &__process{
	    	height: 5px;
		    width: 100px;
		    background: #e1e3e6;
		    border-radius: 4px;
		    background-clip: padding-box;
		    position: absolute;
		    top: 14px;
		    right: 10px
	    }
	    &__process-done{
	    	background: #5aa1dd;
		    position: absolute;
		    height: 5px;
		    border-radius: 2px;
		    background-clip: padding-box;
		    transition: width 0.3s ease 0s;
	    }
	}
</style>