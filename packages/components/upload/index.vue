 <template>
	<div :class="b()">
		<Button  />
		<input id="file" type="file" name="file" @change="upload($event)" multiple />
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
		afterUpload: Function,
		uploadProgress: Function,
		AfterUpload: Function
	},
	data() {
		return {
			uploadfile: [],
			Index: 0
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
						this.AfterUpload && this.AfterUpload(result)
					}).catch(function(err) {
						console.log(err)
					})
				})

			} else {
				readImgData(files).then(data => {
					this.readFile(data,files).then((result) => {
						this.AfterUpload && this.AfterUpload(result)
					}).catch(function(err) {
						console.log(err)
					})
				})
			}

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

				this.Index++

				files.Index = this.Index

				uploadParm.append('file',files)

				uploadStart = upload(uploadParm)

				resultParm = JSON.parse(JSON.stringify(this.uploadParm))

				this.uploadProgress && this.uploadProgress(files)

				uploadStart.then((result) => {

					let res = {
						result: Object.assign(result,resultParm),
						files: files
					}

					this.$emit('getFile',files)


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