<template>
	<view class="index">
	<!-- 标题和头部内容 -->
	<musichead title="网易云音乐" :icon="false"></musichead>
	
	<!-- 搜索歌曲 -->
	<view class="index-search">
		<text class="iconfont icon-fangdajing"></text>
		<input placeholder="搜索歌曲" @click="ToSearch"/>
	</view>
	

	<!-- 骨架屏 -->
	<skeleton :loading="isloading" 
	:avatarSize="skeleton1.avatarSize" 
	:row="skeleton1.row" 
	:showTitle="skeleton1.showTitle">
	  	<!-- 热歌榜 -->
		<view>
			<hottop v-for="(item,index) in mlist" 
			:clist="item"
			:src="item.coverImgUrl" 
			:imgtext="item.updateFrequency" 
			:listname="item.tracks"
			:listid='item.listid'
			:key="index"></hottop>
		</view>
		
	</skeleton>
	
	
	<!-- 骨架屏 -->
	<skeleton v-for="item in 3" :loading="isloading"
	:avatarSize="skeleton1.avatarSize" 
	:row="skeleton1.row" 
	:showTitle="skeleton1.showTitle">
	</skeleton>

	
	</view>
</template>

<script>
	import '@/common/iconfont.css';
	import musichead from '../../components/musichead/musichead.vue';
	import hottop from '../../components/hottop/hottop.vue';
	import { toplist } from '@/common/hotapi.js'
	import Skeleton from '@/components/J-skeleton/J-skeleton.vue'
	
	export default {
		data() {
			return {
				//热门榜列表
				mlist:[],
				
				//骨架屏加载
				isloading:true,
				//骨架屏信息
				skeleton1: {
				        avatarSize: '100rpx',
				        row: 2,
				        showTitle: true,
				      },
			}
		},
		components:{
			musichead,hottop,Skeleton
		},
		onLoad() {
			
			//获取热门歌曲榜单
			toplist().then((res)=>{
				if(res){
						this.mlist = res;
						this.isloading = false;
				}
				
			})
			
		},
		methods: {
			ToSearch(){
				setTimeout(()=>{
					
					uni.navigateTo({
						url:'../search/search'
					})
					
				},130)
				
			}
		}
	}
</script>

<style scoped>
	.index-search{
		display: flex; 
		align-items: center;
		height: 70rpx;
		margin: 40rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}
	.index-search text{
		font-size: 26rpx;
		margin-left: 28rpx;
		margin-right: 26rpx;
	}
	.index-search input{
		font-size: 30rpx;
	}
</style>
