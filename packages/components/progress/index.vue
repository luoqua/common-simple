<template>
	<ul :class="b()">
		<li :class="b('item')" >
	        <div :class="b('meta')" >
	            <span :class="b('name')" >snsvideodownload.png</span>
	            <em :class="b('size')" >(155.62K)</em>
	        </div>
	        <div :class="b('process')" >
	            <div :class="b('process-done')"  style="width: 20.3657%; transition: width 0.3s ease 0s;"></div>
	        </div>
	    </li>
	</ul>
</template>



<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'progress',
	props: [],
	data() {
		return {
		}
	},
	components: {

	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss">
	.simple-progress {
	    border: 1px solid #e7e7eb;
	    width: 300px;
	    border-radius: 2px;
	    background-clip: padding-box;
	    position: relative;
	    background-color: #fff;
	    position: relative;
	    display: block;
	    font-size:14px;
	    $p:&;
	    &__item{
	    	border-bottom: 1px solid #e7e7eb;
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
		    background-clip: padding-box
	    }
	}

</style>