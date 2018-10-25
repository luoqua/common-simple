<template>
	<swipe>
		<swipe_item	v-for="(image, index) in images" :key="index">
			<img :src="image" style="width:100%;height:200px">
		</swipe_item>
	</swipe>
</template>



<script type="text/javascript">
import Swipe from '@/components/swipe'
import swipeItem from '@/components/swipe-item'

export default {
	name: 'preview-page',
	props: [],
	data() {
		return {

		}
	},
	components: {
		Swipe,
		swipeItem
	},
	serverRequest(store) {
        return store.dispatch('getimgUrls')
    },
    computed: {
    	images() {
    		return this.$store.state.imgUrls
    	}
    },
	methods: {

	}
}
</script>


<style type="text/css" lang="scss">

</style>