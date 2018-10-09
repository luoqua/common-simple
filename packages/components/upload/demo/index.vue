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
import {getRandom} from '@/utils/common'
import Upload from '../index'

export default create({
	name: 'radio-demo',
	props: [],
	data() {
		return {
			radio_value: 1,
			parm: {
				key: '',
				success_action_status: 200,
				maxSize: 300,			// 默认单位是kb
				rect: '800*800 / 640*800 / 800*640 / 800*450'
			}
		}
	},
	components: {
		groupForm,
		Upload
	},
	created() {
		getSignature().then((data) => {
			this.parm = Object.assign(this.parm,data)
		})
	},
	methods: {
		beforeUpload(file) {
			const isltsize = Math.round((file.size / 1024) * 100) / 100 > this.maxSize

			if (!isltsize) {
				return
			}
			this.parm.key = `${this.parm.dir}/${getRandom()}.${file.type.split('/').pop()}`
			return isltsize
		},
		random_string() {

		}
	}
})
</script>


<style type="text/css" lang="scss" >

</style>