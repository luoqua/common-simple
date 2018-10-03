<template>
	<div>
		<group-form
			label-name="外层图片">
			<Upload />
		</group-form>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import Upload from '../index'

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
		Upload
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" >

</style>