<template>
	<group-form
		label-name="名称"
		:is-top="true">
		<Input 
			label-name="名称"
			:length-limit="10"
			init-value="标题"/>
	</group-form>	
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import Input from '@/components/input'

export default create({
	name: 'text-tile',
	props: [],
	data() {
		return {
		}
	},
	components: {
		groupForm,
		Input
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss">

</style>