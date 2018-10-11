<template>
	<transition-group
		tag="ul"
		name="simple-progress"
		:class="b()">
		<li :class="b('item')"  v-for="(item, index) in fileList" :key="index" >
	        <div :class="b('meta')" >
	            <span :class="b('name')" >{{item.name}}</span>
	            <em :class="b('size')" >(155.62K)</em>
	        </div>
	        <div :class="b('process')" >
	            <div :class="b('process-done')"
	            	:style="progress_percent"
	            	></div>
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
		return {
			show: false,
			processWidth: 0
		}
	},
	components: {

	},
	computed: {
		progress_percent() {
			return {
				width: ((this.processWidth * 100) / 100).toFixed(4) + '%'
			}
		}
	},
	watch: {
		fileList() {
			setTimeout(() => {
				this.show = !this.show
				this.setInc()
				setTimeout(() => {
					this.progressDone()
				},1000)

			},3000)
		}
	},
	methods: {
		setInc() {
			setTimeout(() => {
				let processWidth = this.processWidth

				this.processWidth = this.clamp((Math.random() * 2) + processWidth,0, 99.6)
				this.setInc()
			},200)
		},
		progressDone() {
			setTimeout(() => {
				this.processWidth = this.clamp(this.processWidth + (30 + (50 * Math.random()), 0, 99.4))
				setTimeout(() => {
					this.processWidth = 100
					setTimeout(() => {
						this.show = !this.show
					},500)
				})
			},200)
		},
		clamp(n,min,max) {
			if (n < min) {
				return min
			}
			if (n > max) {
				return max
			}
			return n
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