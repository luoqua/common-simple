<template>
	<label :class="b({disable: isDisabled})">
		<span :class="b('radioInput')">
			<i :class="b('radioIcon')" 
				:name="currentValue === id ? 'selected' : ''">
					
				</i>
		</span>
		<span :class="b('radioLabel')" @click="select(id)">
			<slot />
		</span>
		<input 
			type="radio" 
			:class="b('radioOrigin')" 
			v-model="currentValue" 
			:value="id">
	</label>
</template>



<script type="text/javascript">
import create from '@/utils/create'
import getParent from '@/components/mixins/getParent'

export default create({
	name: 'radio',
	props: {
		id: null
	},
	mixins: [getParent],
	data() {
		return {
			isDisabled: false,
			value: ''
		}
	},
	computed: {
		currentValue: {
			get() {
				return this.$parent.value || this.value
			},
			set(val) {
				(this.$parent || this).value = val
			}
		}
	},
	created() {
		this.getParent('simple-radio-group')
	},
	methods: {
		select(val) {
			this.currentValue = val
		}
	}
})
</script>


<style type="text/css" lang="scss">
.simple-radio{
	display: inline-block;
    cursor: pointer;
    font-size: 14px;
    line-height: 16px;
    $p:&;
    &:not(:last-of-type){
    	margin-right: 20px;
    }
    &__radioInput{
    	display: inline-block;
		vertical-align: text-bottom;
    }
    &__radioLabel{
    	position: relative;
	    display: inline-block;
	    margin-left: 5px;
	    vertical-align: text-bottom;
    }
    &__radioIcon{
    	display: block;
	    position: relative;
	    box-sizing: border-box;
	    width: 16px;
	    height: 16px;
	    background-color: #fafbfc;
	    box-shadow: inset 0 0 0 1px #bec0c2;
	    border-radius: 100%;
	    transition: background-color .1s ease,box-shadow .1s ease;
	    
	    &:after{
			content: "";
		    position: absolute;
		    background-color: transparent;
		    z-index: 0;
		    top: -10px;
		    left: -10px;
		    width: 36px;
		    height: 36px;
	    }
	    &[name='selected']{
	    	&:before{
		    	transform: scale(1);
	    		background-color: #646464;
    		}
	    }
	    &:before{
	    	top: 4px;
		    left: 4px;
		    width: 8px;
		    height: 8px;
		    border-radius: inherit;
		    transform: scale(.1);
		    will-change: transform,background-color;
		    transition: transform .1s cubic-bezier(.645,.045,.355,1),background-color .1s cubic-bezier(.645,.045,.355,1);
		    content: "";
		    position: absolute;
		    background-color: transparent;
	    }
    }
    &__radioOrigin{
    	box-sizing: border-box;
		padding: 0;
    	display: none;
    }
}
</style>