 <template>
	<div :class="b()">
		<Button  />
	</div>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import Button from '@/components/button'

export default create({
	name: 'upload',
	props: [],
	data() {
		return {
		}
	},
	components: {
		Button
	},
	methods: {
	}
})
</script>


<style type="text/css" lang="scss">

</style>