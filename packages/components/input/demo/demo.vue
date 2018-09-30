<template>
	<div>
	<group-form
		label-name="页面名称">
		<Input 
			:length-limit="10"
			form-tip="用于记录生成页"
		/>
	</group-form>
	<group-form
		label-name="页面颜色">
		<color-picker-swatch-demo />
	</group-form>

</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import colorPickerSwatchDemo from '@/components/color_picker_swatch/demo/index'
import Input from '../index.vue'

export default create({
	name: 'input-demo',
	props: [],
	data() {
		return {
		}
	},
	components: {
		groupForm,
		Input,
		colorPickerSwatchDemo
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" >

</style>