 <template>
	<div :class="b()">
		<div>
			<button type="button" class="Button_new__base-1H7bt Button_new__default-3C02p webuploader-container" style="width: 106px; transition: none; padding: 0px;">
				<div class="webuploader-pick" style="width: 106px; height: 36px;">
					<span class="Button_new__content-3NEGo">上传图片</span>
				</div>
				<div id="rt_rt_1coo1gb76b971gon138vblj1iro1" style="position: absolute; top: 0px; left: 0px; width: 106px; height: 36px; overflow: hidden; bottom: auto; right: auto;">
					<input type="file" name="file" class="webuploader-element-invisible" accept="image/jpg,image/jpeg,image/png,image/bmp">
					<label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);">
						
					</label>
				</div>
			</button>
			<ul class="mod-uploader" style="position:relative;display:none"> 
				<script type="text/html" id="item_tpl"> 
					<li class="mod-uploader__item" id="uploadItem<%=id%>">
				        <div class="mod-uploader__meta">
				            <span class="mod-uploader__name"><%=fileName%></span>
				            <em class="mod-uploader__size">(<%=size%>)</em>
				        </div>
				        <div class="mod-uploader__process">
				            <div class="mod-uploader__process-done" style="width: 10%"></div>
				        </div>
    				</li> 
				</script> 
			</ul>
		</div>
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
export default create({
	name: 'upload',
	props: [],
	data() {
		return {
		}
	},
	methods: {
	}
})
</script>


<style type="text/css" lang="scss" scoped>
</style>