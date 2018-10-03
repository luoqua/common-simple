<template>
	<group-form>
		<color-picker></color-picker>
	</group-form>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import colorPicker from '../index.vue'

export default create({
	name: 'color-picker-demo',
	props: [],
	data() {
		return {
		}
	},
	components: {
		colorPicker,
		groupForm
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss"   >

</style>