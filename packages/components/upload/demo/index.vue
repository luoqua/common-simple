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
				:AfterUpload="AfterUpload">
				<Button />
				<p slot="tip">
					<span>
						<!-- react-text: 150 -->图片格式：大小不超过300KB，不支持GIF格式<!-- /react-text -->
						<br><!-- react-text: 152 -->文字占图片篇幅不超过30%<!-- /react-text -->
						<br><!-- react-text: 154 -->朋友圈广告： <!-- /react-text -->
						<br><!-- react-text: 156 -->1.在投放朋友圈广告时，此图会同步作为朋友圈外层图<!-- /react-text -->
						<br><!-- react-text: 158 -->2.适配“常规广告”图片尺寸：800像素 * 800像素 /  640像素 * 800像素 / 800像素 * 640像素<!-- /react-text -->
						<br><!-- react-text: 160 -->3.适配“卡片广告”图片尺寸：800像素 * 450像素<!-- /react-text -->
						<br><!-- react-text: 162 -->公众号广告：<!-- /react-text -->
						<br><!-- react-text: 164 -->支持如下尺寸：800像素 * 800像素 / 640像素 * 800像素 / 800像素 * 640像素 / 800像素 * 450像素<!-- /react-text -->
						<br>
					</span>
				</p>
			</Upload>
			<Progress
					:file-list="uploadFile"
					:is-done="isdone"/>
			<preview-list
					:img-wrap="imgList"
					@delFile="delfile"/>
		</group-form>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'
import groupForm from '@/components/group_form'
import {getSignature} from '@/api/permission'
import {getRandom} from '@/utils/common'
import Progress from '@/components/progress'
import {staticURL} from '@/config/baseUrl'
import Button from '@/components/button'
import Upload from '../index'
import previewList from '../preview-list'

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
		previewList,
		Button
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

			this.imgList = imgList.map((item) => {
				return item = staticURL + item.result.key
			})

		},
		getFile(file) {
			setTimeout(() => {
				this.uploadFile.map((item) => {
					if (item.Index === file.Index) {
						item.isdone = true
					}
				})
			})
		},
		after(value) {
			this.uploadFile.push(value.files)
		},
		uploadProgress(file) {
			this.uploadFile.push(Object.assign(file,{isdone: false,processWidth: 0}))
		},
		delfile(index) {
			this.uploadFile.splice(index,1)
			this.imgList.splice(index,1)
			console.log(this.imgList)
		}
	}
})
</script>


<style type="text/css" lang="scss" >

</style>