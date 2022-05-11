<template>
	<view class="hottop" @click="navtolist(listid)">
		
		<view class="hottop-img">
			<image :src="src"></image>
			<text>{{imgtext}}</text>
		</view>
		
		
		<view class="hottop-text">
			<text v-for="(item,index) in listname">
			{{index+1}}.{{item.first}} - {{item.second}}		
			</text>
		</view>
	</view>
	
</template>

<script>
	export default {
		name: "hottop",
		props: ['src', 'imgtext', 'listname','listid'],
		data() {
			return {

			};
		},
		methods: {
			navtolist(listid){
				uni.navigateTo({
					url:'../../pages/list/list?listid='+listid,
					
				})
			},
			
			
		}
	}
</script>

<style>
	.hottop {
		margin: 0 30rpx;
		margin-top: 45rpx;
		margin-bottom: 34rpx;
		display: flex;
		
	}

	.hottop-img {
		width: 212rpx;
		height: 202rpx;
		overflow: hidden;
		margin-right: 22rpx;
		position: relative;
	}

	.hottop-img image {
		width: 100%;
		height: 100%;
		border-radius: 15rpx;
	}

	.hottop-img text {
		position: absolute;
		left: 12rpx;
		bottom: 16rpx;
		color: white;
		font-size: 10rpx;
	}

	.hottop-text{
		width: 400rpx;
		font-size: 24rpx;
		line-height: 66rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
