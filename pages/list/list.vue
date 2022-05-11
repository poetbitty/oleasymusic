<template>
	<view class="list">
		<!-- 排行歌曲页面背景 -->
		<view class="bgandhead">
			<view class="listbg" :style="{'background-image':'url('+playlist.coverImgUrl+')' }"></view>
			<!-- 页面head -->
			<listhead title="歌单" :icon="true" color="white"></listhead>
		</view>
		
		<!-- 页面详细信息 -->
		<view class="container" v-show="!isLoading">
			
			<scroll-view scroll-y="true">
				<!-- 列表头部信息 -->
				<view class="list-head">
					
					<view class="list-head-left">
						<image :src="playlist.coverImgUrl"></image>
						<text class="iconfont icon-yousanjiao">{{playCount}}</text>
					</view>

					<view class="list-head-right">
						<view>{{playlist.name}}</view>
						<view>
							<image :src="playlist.creator.avatarUrl"></image>
							<text>{{playlist.creator.nickname}}</text>
						</view>
						<view>
							{{playlist.description}}
						</view>
					</view>
				</view>
				
				<!-- 分享好友功能 -->
				<!-- #ifde f MP-WEIXIN -->
				<button class="list-share" one-type="share">
					<text class="iconfont icon-fenxiang"></text>
					分享给微信好友
				</button>
				<!-- #endi f -->



				<!-- 音乐播放列表 -->
				<view class="list-music">
					<view class="list-music-head">
						<text class="iconfont icon-bofang"></text>
						<text>播放全部</text>
						<text>(共{{playlist.trackCount}}首)</text>
					</view>


					<!-- 歌曲列表 -->
					<view class="list-music-item" v-for="(item,index) in playlist.tracks" :key="index"
						@click="ToMusicDetail(item.id)">
						<view class="list-music-top">{{index+1}}</view>
						<view class="list-music-song">
							<view>{{item.name}}</view>
							<view>
								<image v-if="datamsg[index].maxbr == 999000 " src="../../static/sq.png"></image>
								{{item.ar[0].name}} - {{item.name}}
							</view>
						</view>
						<text class="iconfont icon-bofang"></text>
					</view>


				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import listhead from '../../components/musichead/musichead.vue';
	import '@/common/iconfont.css'
	import {
		getlistitem
	} from '@/common/hotapi.js'
	export default {
		components: {
			listhead,
		},
		data() {
			return {
				// 页面是否加载出来
				isLoading: true,
				
				//歌曲列表信息
				playlist: {
					creator: {
						avatarUrl: ''
					}
				},
				
				datamsg: {},

			}
		},
		onLoad(options) {
			if (options.listid) {
				console.log(options.listid);
			} else {
				options.listid = '19723756'
			}


			//获取歌曲列表数据
			getlistitem(options.listid).then((res) => {
				this.playlist = res.data.playlist;
				this.datamsg = res.data.privileges;
				// console.log(res);
				this.isLoading = false;
			})


		},
		methods: {
			
			//跳转到歌曲播放页
			ToMusicDetail(songid) {
				uni.navigateTo({
					url: '/pages/detail/detail?songid=' + songid,

				})

			}
		},
		computed: {
			
			//计算播放次数
			playCount() {
				let count = this.playlist.playCount + "";
				if (count.length > 8) {
					return count.slice(0, -8) + "亿"
				} else {
					return count.slice(0, -4) + "万"
				}

			},

		}
	}
</script>

<style>
	.listbg {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(10px);
		transform: scale(1.2);

	}

	.list-head {
		display: flex;
		margin: 30rpx;
	}

	.list-head-left {
		width: 264rpx;
		height: 264rpx;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		margin-right: 42rpx;
	}

	.list-head-left image {
		width: 100%;
		height: 100%;
	}

	.list-head-left text {
		position: absolute;
		right: 12rpx;
		top: 8rpx;
		color: white;
		font-size: 16rpx;
	}

	.list-head-right {
		flex: 1;
		color: #f0f2f7;
	}

	.list-head-right view:nth-child(1) {
		color: white;
		font-size: 34rpx;
	}

	.list-head-right view:nth-child(2) {
		display: flex;
		margin: 20rpx 0;
		font-size: 24rpx;
		align-items: center;
	}

	.list-head-right view:nth-child(2) image {
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		margin-right: 14rpx;


	}

	.list-head-right view:nth-child(3) {
		line-height: 34rpx;
		font-size: 22rpx;
	}

	.list-share {
		width: 330rpx;
		height: 74rpx;
		margin: 0 auto;
		background: rgba(0, 0, 0, 0.4);
		border-radius: 37rpx;
		color: white;
		text-align: center;
		line-height: 74rpx;
		font-size: 28rpx;
	}

	.list-share text {
		margin-right: 16rpx;
	}

	.list-music {
		background-color: white;
		border-radius: 50rpx;
		margin-top: 40rpx;
		overflow: hidden;
	}

	.list-music-head {
		height: 50rpx;
		margin: 30rpx 0 70rpx 22rpx;
	}

	.list-music-head text:nth-child(1) {
		height: 50rpx;
		font-size: 50rpx;
	}

	.list-music-head text:nth-child(2) {
		font-size: 30rpx;
		margin: 0 10rpx 0 26rpx;
	}

	.list-music-head text:nth-child(3) {
		font-size: 26rpx;
		color: #b2b2b2;
	}

	.list-music-item {
		display: flex;
		margin: 0 32rpx 66rpx 16rpx;
		align-items: center;
		color: #959595;
	}

	.list-music-top {
		width: 58rpx;
		font-size: 33rpx;
		line-height: 50rpx;
	}

	.list-music-song {
		flex: 1;
	}

	.list-music-song view:nth-child(1) {
		font-size: 28rpx;
		color: black;
		width: 70vw;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) {
		/* display: flex; */
		width: 594rpx;
		font-size: 20rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.list-music-song view:nth-child(2) image {
		width: 32rpx;
		height: 20rpx;
		padding-top: 3px;
		margin-right: 3px;
	}

	.list-music-item text {
		font-size: 50rpx;
		color: #c7c7c7;
	}
</style>
