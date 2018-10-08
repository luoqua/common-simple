<template>
	<div>
		<group-form
			label-name="外层图片">
			<Upload 
				:upload-parm="parm"
				:beforeUpload="beforeUpload"/>
		</group-form>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import {getSignature} from '@/api/permission'
import Upload from '../index'

export default create({
	name: 'radio-demo',
	props: [],
	data() {
		return {
			radio_value: 1,
			parm: {}
		}
	},
	components: {
		groupForm,
		Upload
	},
	created() {

		getSignature().then((data) => {
			this.parm = data
			this.parm['key'] = ''
		})
	},
	methods:{
		beforeUpload() {

			this.parm.key = 'upload/1323123123'

			console.log(this.parm)
			return true
		}
	}
})
</script>


<style type="text/css" lang="scss" >

</style>