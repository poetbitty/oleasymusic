<template>
	<view class="detailView">
		<!-- 播放页背景 -->
		<view class="detail" :style="{'background-image':'url('+songdetail.al.picUrl+')' }"></view>
		<!-- 播放页头部head -->
		<detailhead :title="songdetail.name" :icon="true" color="white"></detailhead>
		
		<!-- 播放唱片，歌词等信息 -->
		<view>
			<scroll-view scroll-y="true">
				
				<!-- 播放唱片 -->
				<view class="detail-play">
					<image :src="songdetail.al.picUrl" class="detail-play-img" :class="{'detail-play-run': !isplayRotate}"></image>
					<!--播放按钮 -->
					<text @click="playpause" class="iconfont" :class="iconplay"></text>
				</view>

				<!-- 歌词信息 -->
				<view class="detail-lyric">
					<view class="detail-lyric-wrap">
						<view class="detail-lyric-item" v-for="(item,index) in songLyric" :key="index"
							:class="{'detail-lyric-active' : lyricindex == index}">{{item.lyric}}</view>
						<!-- <view class="detail-lyric-item detail-lyric-active">落叶也在身旁</view> -->

					</view>
				</view>

			</scroll-view>
		</view>
	</view>
</template>

<script>
	import detailhead from '../../components/musichead/musichead.vue';
	import '@/common/iconfont.css'
	import {
		getlyric,
		getsongmsg,
		getsongurl
	} from '../../common/hotapi.js'

	export default {
		components: {
			detailhead
		},
		data() {
			return {
				// 音乐播放器对象
				bgAudioMannager: {},
				
				//curr当前歌词索引
				lyricindex: 0,
				
				//存放歌词对象
				songLyric: [{
					lyric: ""
				}],
				
				//歌词url
				songdetail: {
					al: {
						picUrl: ''
					}
				},
				
				//播放图标
				iconplay: 'icon-zanting',
				
				//唱片是否旋转
				isplayRotate: false,
				
				//歌词定时器
				timer:{},
				
			}
		},
		onLoad(options) {
			// 获取歌词id
			let id = options.songid;
			
			//获取歌曲信息(背景图片等)
			getsongmsg(id).then((res) => {
				// console.log(res);
				this.songdetail = res.data.songs[0];

			})
			
			//获取歌词信息
			getlyric(id).then((res) => {
				let lyric = res.data.lrc.lyric;
				
				// 处理歌词信息
				let re = /\[([^\]]+)\]([^\[]+)/g;
				let result = [];
				lyric.replace(re, ($0, $1, $2) => {
					result.push({
						"time": this.formatTimeSec($1),
						"lyric": $2
					})
				})
				this.songLyric = result;
				// console.log(result);
			})

			//获取播放歌曲url
			getsongurl(id).then((res) => {
				
				// 适配微信小程序播放器对象
				// #ifdef MP-WEIXIN
				this.bgAudioMannager = uni.getBackgroundAudioManager();
				this.bgAudioMannager.title = this.songdetail.name;
				//#endif
				
				// 适配H5播放器对象
				// #ifdef H5
				this.bgAudioMannager = uni.createInnerAudioContext()
				this.iconplay = "icon-bofang"
				this.isplayRotate = false;
				//#endif
				
				//歌曲url
				this.bgAudioMannager.src = res.data.data[0].url || '';
					
				//判断获取歌曲url为空，就提示无法播放
					if(this.bgAudioMannager.src == ''){
						uni.showToast({
							title:"歌曲版权受限无法播放",
							icon:'none'
						})
					}
						
				//歌曲播放设置(播放时会触发)
				this.bgAudioMannager.onPlay(()=>{
					this.iconplay = "icon-zanting"
					this.isplayRotate = true
					this.listenLyricIndex();
				})
				
				//歌曲暂停设置
				this.bgAudioMannager.onPause(()=>{
					this.iconplay = "icon-bofang"
					this.isplayRotate = false
					clearInterval(this.timer);
				})
			})

		},
		onShow(){
			// 打开歌词定时器
			this.listenLyricIndex()
		},
		onUnload() {
			// 清除歌词播放器
			clearInterval(this.timer)
			
			//H5退出时销毁对象
			//#ifdef H5
			this.bgAudioMannager.destroy();
			//#endif
		},
		onHide() {
			clearInterval(this.timer)
			
			//#ifdef H5
			this.bgAudioMannager.destroy();
			//#endif
		},
		methods: {
			// 监听歌词播放
			listenLyricIndex(){
				clearInterval(this.timer);
				this.timer = setInterval(()=>{
					for(let i=0; i < this.songLyric.length;i++){
						if(this.bgAudioMannager.currentTime>this.songLyric[this.songLyric.length-1].time){
								this.lyricindex = this.songLyric.length-1;
									break;
						}
						
						if(this.bgAudioMannager.currentTime>this.songLyric[i].time && this.bgAudioMannager.currentTime<this.songLyric[i+1].time){
							this.lyricindex = i;
						}
						
						
					}
				},500)
				
			},
			
			//按钮控制播放暂停
			playpause(){
				// console.log(this.bgAudioMannager.src);
				if(this.bgAudioMannager.paused){
						this.bgAudioMannager.play();
					
				}else{
					this.bgAudioMannager.pause();
				}
				// this.isplayRotate = this.isplayRotate;
			},
			
			//格式化时间
			formatTimeSec(value) {
				let arr = value.split(':');
				return (Number(arr[0] * 60) + Number(arr[1])).toFixed(1);
			},
		}
	}
</script>

<style>
	.detail {
		width: 100%;
		height: 100vh;
		position: fixed;
		left: 0;
		top: 0;
		background-size: cover;
		background-position: center 0;
		filter: blur(20px);
		transform: scale(1.2);
	}

	.detail-play {
		width: 650rpx;
		height: 750rpx;
		background-size: cover;
		background-image: url('../../static/mdesk.png');
		margin: 0 auto 20rpx 30rpx;
		position: relative;
	}
	
	 .detail-play-img{
		 animation: move 10s linear infinite;
		 animation-play-state: running;
	 }
	
	 .detail-play-run {
		animation-play-state: paused;
	}
	
	@keyframes move {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	.detail-play image {
		width: 350rpx;
		height: 350rpx;
		border-radius: 50%;
		position: absolute;
		left: 37rpx;
		top: 227rpx;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.detail-play text {
		width: 100rpx;
		height: 100rpx;
		font-size: 100rpx;
		color: white;
		position: absolute;
		left: 35rpx;
		top: 200rpx;
		right: 0;
		bottom: 0;
		margin: auto;
	}

	.detail-lyric {
		font-size: 32rpx;
		line-height: 82rpx;
		height: 246rpx;
		text-align: center;
		/* overflow: hidden; */
		color: #6f6e73;
	}

	.detail-lyric-wrap {}

	.detail-lyric-item {
		padding-left: 50rpx;
		padding-right: 50rpx;
		font-family: "时尚中黑简体";
		height: 82rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.detail-lyric-active {
		color: white;
	}
</style>
