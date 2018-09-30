<template>
	<div :class="b()" @click="$emit('togglePicker')">
		<div :class="b('color')"
			 :style="bgColor">
		</div>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'color_picker_swatch',
	props: {
		currentColor: {
			type: String,
			default: '#ffffff'
		}
	},
	data() {
		return {
		}
	},
	computed: {
		bgColor() {
		
			return {
				backgroundColor: this.currentColor,
				borderColor: this.currentColor !== '#ffffff' ? this.currentColor : '#e4e6eb'
			}
		}
	},
	components: {
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" scoped>
	.simple-color_picker_swatch{
		padding: 5px;
	    background: #fafbfc;
	    border-radius: 2px;
	    border: 1px solid #e3e4e6;
	    display: inline-block;
	    cursor: pointer;
	    position: relative;
	    &__color{
	    	width: 36px;
		    height: 20px;
		    border: 1px solid #ebedf0;
		    border-radius: 2px;
		    box-sizing: border-box;
	    	background-color: rgb(255, 255, 255);
	    	border-color: rgb(228, 230, 235);
	    }

	}
</style>