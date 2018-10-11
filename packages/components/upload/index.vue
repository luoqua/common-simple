 <template>
	<div :class="b()">
		<Button  />
		<input id="file" type="file" name="file" @change="upload($event)" multiple />
    	<!-- <div :class="b('uploadPreview')" >
    	 	<div :class="b('imgWrap')" v-for="(item,index) in imgWrap" :style="item.bg">
    	 		<a class="UploadPreview__imgOpr-1ENua">
    	 			<i class="icon__base-2qdgw icon__bin-Xt0w-" data-role="icon" style="vertical-align: 6px;">

    	 			</i>
    	 		</a>
    	 	</div>
    	</div> -->
	</div>
</template>


<script type="text/javascript">
import create from '@/utils/create'
import Button from '@/components/button'
import {upload} from '@/api/permission'
import {readImgData,trim} from '@/utils/common'

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
		},
		rectSize: String,
		afterUpload: Function
	},
	data() {
		return {
			uploadfile: []
		}
	},
	computed: {
		imgWrap() {
			return this.uploadfile.map((item) => {
				item.bg = {backgroundImage: `url(${item.url})`}
				return item
			})
		}
	},
	mounted() {},
	components: {
		Button
	},
	methods: {
		upload(e) {
			let files = e.target.files

			files = files.length === 1 ? files[0] : [].slice.call(files,0)

			if (Array.isArray(files)) {

				Promise.all(files.map(readImgData)).then((arr) => {
					Promise.all(arr.map((item,index) =>
						this.readFile(item,files[index])
					)).then((result) => {
						this.afterUpload(result)
					}).catch(function(err) {
						console.log(err)
					})
				})

			} else {
				readImgData(files).then(data => {
					this.readFile(data,files).then((result) => {
						// this.uploadfile.push({url: `${staticURL}/${this.uploadParm.key}`})
						// this.afterUpload(result)
						let afterParm = {
							result: result,
							files: files
						}

						this.$emit('afterupload',afterParm)

					}).catch(function(err) {
						console.log(err)
					})
				})
			}

		},
		uploadProgress() {

		},
		readFile(data,files) {
			let uploadParm = this.uploadParm || {}
			let uploadStart
			let resultParm

			return new Promise((resolve,reject) => {

				if (!this.handleRectSize(data)) {
					reject('尺寸大小不符合')
					return
				}
				if (!files || (this.beforeUpload && !this.beforeUpload(files))) {
					reject('尺寸大小不符合')
					return
				}
				if (this.accept && this.accept.indexOf(files.type) === -1) {
					console.log('不支持当前上传文件类型')
					reject('尺寸大小不符合')
					return
				}
				uploadParm = this.initFormData(uploadParm)

				uploadParm.append('file',files)

				uploadStart = upload(uploadParm)

				resultParm = JSON.parse(JSON.stringify(this.uploadParm))

				this.uploadProgress()

				uploadStart.then((result) => {
					let res = Object.assign(result,resultParm)

					resolve(res)
				})
			})
		},
		handleRectSize(data) {
			console.log()
			if (data && this.rectSize) {
				let height = data.height
				let width = data.width
				let rectSizeArr = this.rectSize.split('/')

				if (Array.isArray(rectSizeArr)) {
					return rectSizeArr.some((item) => {
						return `${width}*${height}` === trim(item)
					})
				}
				return `${width}*${height}` === trim(this.rectSize)
			}
			return true
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
	.simple-upload{
		$p:&;
		&__uploadPreview{
			vertical-align: top;
    		font-size: 0;
    		margin-top: 15px;
		}
		&__imgWrap{
			background-size: cover;
    		background-position: 50%;
    		width: 100px;
		    height: 100px;
		    margin-right: 10px;
		    position: relative;
		    display: inline-block;
    	}
	}

</style>