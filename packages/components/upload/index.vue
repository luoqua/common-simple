 <template>
	<div :class="b()">
		<Button  />
		<input id="file" type="file" name="file" @change="upload($event)"/>

		<ul class="mod-uploader" style="position: relative; display: block;">
			<li class="mod-uploader__item" id="uploadItemWU_FILE_4">
		        <div class="mod-uploader__meta">
		            <span class="mod-uploader__name">snsvideodownload.png</span>
		            <em class="mod-uploader__size">(155.62K)</em>
		        </div>
		        <div class="mod-uploader__process">
		            <div class="mod-uploader__process-done" style="width: 20.3657%; transition: width 0.3s ease 0s;"></div>
		        </div>
    		</li>
    	 </ul>

    	 <div class="UploadPreview__wrp-2ZW22 ui-mt-15">
    	 	<div class="UploadPreview__imgWrp-21R0D" style="background-image: url(&quot;http://wxsnsdythumb.wxs.qq.com/109/20204/snsvideodownload?m=917833e3d5c25e21c597793424d0720b&amp;filekey=30340201010420301e02016d040253480410917833e3d5c25e21c597793424d0720b0203026e79040d00000004627466730000000131&amp;hy=SH&amp;storeid=32303138313030373132333633343030303739396264313336666664393336663561333230613030303030303664&amp;bizid=1023&quot;);">
    	 		<a class="UploadPreview__imgOpr-1ENua">
    	 			<i class="icon__base-2qdgw icon__bin-Xt0w-" data-role="icon" style="vertical-align: 6px;">

    	 			</i>
    	 		</a>
    	 </div>
    	</div>
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'
import Button from '@/components/button'
import {upload} from '@/api/permission'
import {readImgData} from '@/utils/common'

export default create({
	name: 'upload',
	props: {
		uploadParm: {
			type: Object,
			default: {}
		},
		beforeUpload: {
			type: Function,
			default: () => true
		}
	},
	data() {
		return {
		}
	},
	mounted() {
	},
	components: {
		Button
	},
	methods: {
		upload(e) {
			let files = e.target.files
			let uploadParm = this.uploadParm || {}
			let uploadStart

			files = files.length === 1 ? files[0] : [].slice.call(files,0)

			if (!files || (this.beforeRead && !this.beforeRead(files))) {
				return
			}

			if (this.accept && this.accept.indexOf(files.type) === -1) {
				console.log('不支持当前上传文件类型')

			}
			readImgData(files).then(data => {
				this.handleRectSize(data)
			})
			uploadParm = this.initFormData(uploadParm)

			if (Array.isArray(files)) {

				files.forEach((item) => {
					uploadParm.append('file',item)
					uploadStart = upload(uploadParm)

					this.uploadProgress()

					uploadStart.then((data) => {
						this.afterUpload(data)
					})
				})

			} else {
				uploadParm.append('file',files)

				uploadStart = upload(uploadParm)

				this.uploadProgress()

				uploadStart.then((data) => {
					this.afterUpload(data)
				})
			}

		},
		uploadProgress() {

		},
		handleRectSize(data) {
			if (data) {
				let height = data.height
				let width = data.width

				this.rectSize.split('/').some((item) => {
					return `${width} * ${height}` === item.trim()
				})
			}
		},
		initFormData(data) {
			let formData = new FormData()

			Object.keys(data).forEach(function(key) {
				formData.append(key,data[key])
			})

			return formData
		}
	}
})
</script>


<style type="text/css" lang="scss">

</style>