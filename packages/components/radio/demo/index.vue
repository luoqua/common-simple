<template>
	<div>
		<group-form
			label-name="类型">
			<radio-group v-model="radio_value">
				<radio id="1">图片</radio>
				<radio id="2">视频</radio>
			</radio-group>
		</group-form>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import radioGroup from '@/components/radio_group'
import Radio from '../index'

export default create({
	name: 'radio-demo',
	props: [],
	data() {
		return {
			radio_value: 1
		}
	},
	components: {
		groupForm,
		Radio,
		radioGroup
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" >

</style>