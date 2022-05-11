<template>
	<view class="music-head" :style="{'color':color}">
		
		<view  v-if="icon" class="music-head-icon">
			<text  class="iconfont icon-zuojiantou" @click="navBack"></text>
			 | 
			<text class="iconfont icon-zhuye" @click="navUrl"></text>
		</view>
		
		
		<text class="headtext">{{title}}</text>

	</view>
</template>

<script>
	export default {
		name:"musichead",
		props:['title','icon','color'],
		data() {
			return {
				
			};
		},
		methods:{
			navBack(){
				console.log('back');
				uni.navigateBack();
			},
			navUrl(){
				console.log('home');
				uni.navigateTo({
					url:'../../pages/index/index'
				})
			}
		}
		
	}
</script>

<style>
	.music-head{
		width: 100%;
		height: 75px;
		font-size: 18px;
		line-height: 80px;
		text-align: center;
		color: black;
		position: relative;
	}

	.music-head-icon{
		position: absolute;
		left: 8px;
		top: 25px;
		width: 90px;
		height: 31px;
		background-color: rgba(0, 0, 0, 0.4);
		color: white;
		line-height: 31px;
		border-radius: 15px;
		display: flex;
		justify-content: space-evenly;
	}
	
	.headtext{
		margin-left: 184rpx;
		margin-right: 184rpx;
		width: 200px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>