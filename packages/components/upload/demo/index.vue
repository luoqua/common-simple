<template>
	<div>
		<group-form
			label-name="外层图片">
			<Upload
				:upload-parm="parm"
				:beforeUpload="beforeUpload"
				:rect-size="rect"
				@getFile="getFile"
				:uploadProgress="uploadProgress" 
				:AfterUpload="AfterUpload"/>
			<Progress
					:file-list="uploadFile"
					:is-done="isdone"/>
			<preview-list 
					:img-wrap="imgList"/>
		</group-form>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import {getSignature} from '@/api/permission'
import {getRandom} from '@/utils/common'
import Progress from '@/components/progress'
import Upload from '../index'
import previewList from '../preview-list'
import {staticURL} from '@/config/baseUrl'

export default create({
	name: 'radio-demo',
	props: [],
	data() {
		return {
			radio_value: 1,
			parm: {
				key: '',
				success_action_status: 200
			},
			maxSize: 300,			// 默认单位是kb
			rect: '',
			uploadFile: [],
			isdone: false,
			imgList: []
		}
	},
	components: {
		groupForm,
		Upload,
		Progress,
		previewList
	},
	created() {
		getSignature().then((data) => {
			this.parm = Object.assign(this.parm,data)
		})
	},
	methods: {
		beforeUpload(file) {
			const isltsize = Math.round((file.size / 1024) * 100) / 100 < this.maxSize

			if (!isltsize) {
				return
			}

			this.parm.key = `${this.parm.dir}/${getRandom()}.${file.type.split('/').pop()}`

			return isltsize
		},
		random_string() {

		},
		AfterUpload(file) {
			let imgList = []

			imgList = Array.isArray(file) ? file : [file]

			Object.keys(imgList).forEach((key) => {

			})
		},
		getFile(file) {
			setTimeout(() => {
				this.uploadFile.map((item) => {
					if (item.Index === file.Index) {
						item.isdone = true
					}
				})
			},1000)
		},
		after(value) {
			this.uploadFile.push(value.files)
		},
		uploadProgress(file) {
			this.uploadFile.push(Object.assign(file,{isdone: false,processWidth: 0}))
		}
	}
})
</script>


<style type="text/css" lang="scss" >

</style>