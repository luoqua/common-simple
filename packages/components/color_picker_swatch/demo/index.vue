<template>
	<div :class="b()">
		<color-picker-swatch 
			:current-color="currentColor"
			@togglePicker="change()"
			>
		</color-picker-swatch>
		<color-picker
			@GetCurrentColor="onGetCurrentColor"
			:isOpen="isOpen"
			@togglePicker="change()"
			/>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import colorPickerSwatch from '@/components/color_picker_swatch'
import colorPicker from '@/components/color_picker'

export default create({
	name: 'color_picker_swatch_demo',
	props: [],
	data() {
		return {
			currentColor: '#ffffff',
			isOpen: false
		}
	},
	computed: {
	},
	components: {
		colorPickerSwatch,
		colorPicker
	},
	methods: {
		onGetCurrentColor(value) {
			this.currentColor = value
		},
		change() {
			this.isOpen = !this.isOpen
		}
	}
})
</script>


<style type="text/css" lang="scss" scoped>
	.simple-color_picker_swatch_demo{
		position: relative;
	}
</style>