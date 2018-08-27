<template>
	<swipe @change="onChange" vertical class="demo-swipe--vertical">
		<swipe_item	v-for="(image, index) in images" :key="index">
			<img :src="image" style="width:100%;height:200px">
		</swipe_item>
	</swipe>
</template>

<script>
import swipe from '../index.vue'
import swipe_item from '../../swipe-item/index.vue'

export default{
	data() {
	    return {
	      images: [
	        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
	        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
	        'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
	        'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
	      ]
	    }
	},
	components: {
		swipe,
		swipe_item
	},
	methods: {
		onChange(index) {
			console.log(index)
		}
	}
}
</script>

<style lang="scss" scoped>
	.demo-swipe--vertical{
		height: 200px;
		overflow: hidden;
	    .van-swipe-item {
	      line-height: 200px;
	    }
	}
</style>