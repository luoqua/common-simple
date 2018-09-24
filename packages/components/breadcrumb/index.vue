<template>
  <div aria-label="Breadcrumb" role="navigation" class="el-breadcrumb app-breadcrumb breadcrumb-container">
  	<span>
  		<span class="el-breadcrumb__item">
  			<span role="link" class="el-breadcrumb__inner">
  				<a href="#/dashboard" class="">Dashboard</a>
  			</span>
  			<span role="presentation" class="el-breadcrumb__separator">/</span>
  		</span>
  		<span class="el-breadcrumb__item">
  			<span role="link" class="el-breadcrumb__inner">
  				<span class="no-redirect">Charts</span>
  			</span>
  			<span role="presentation" class="el-breadcrumb__separator">/</span>
  			<span class="el-breadcrumb__item" aria-current="page">
  				<span role="link" class="el-breadcrumb__inner">
  					<span class="no-redirect">Keyboard Chart</span>
  				</span>
  				<span role="presentation" class="el-breadcrumb__separator">/</span>
  			</span>
  		</span>
  	</span>
</div>

</template>





<script type="text/javascript">
import create from '@/utils/create'

export default create({
	name: 'Breadcrump',
	props: [],
	data() {
		return {
		}
	},
	methods: {

	}
})
</script>


<style type="text/css" lang="scss" >
		.breadcrumb-container{
		    display: inline-block;
		    font-size: 14px;
		    line-height: 60px;
		    float: left;
		    margin-left: 72px;
		}
</style>