<template>
	<view class="search">

		<!-- 标题和头部内容 -->
		<searchhead title="歌单" :icon="true" color="black"></searchhead>

		<!-- 搜索歌曲 -->
		<view class="index-search">
			<text class="iconfont icon-fangdajing"></text>
			<input v-model="searchWord" placeholder="搜索歌曲" @confirm="search(searchWord)" />
			<text v-show="searchType != 1" class="iconfont icon-31guanbi" @click="clearnull"></text>
		</view>

		<!-- 热搜榜 -->
		<block v-if="searchType == 1">
			<!-- 热歌搜索榜 -->
			<view class="search-hot">
				<view class="search-hot-head">热搜榜</view>

				<!-- 热搜歌曲item -->
				<view class="search-hot-item" v-for="(item,index) in searchHot" :key="index"
					@click="search(item.searchWord)">
					<view class="search-hot-top" :style="{color: (index+1 > 3 ? '#878787' : '#fb2222')}">{{index+1}}
					</view>
					<view class="search-hot-word">
						<view>
							{{item.searchWord}}
							<image v-if="item.iconUrl" :src="item.iconUrl"></image>
						</view>
						<view>{{item.content}}</view>
					</view>
					<text class="search-hot-count">{{item.score}}</text>
				</view>


			</view>

		</block>


		<!-- 搜索结果 -->
		<block v-if="searchType == 2">
			<view class="search-result">
				<!-- 搜索歌曲item -->
				<view class="search-result-item" v-for="(item,index) in searchresult" @click="resultTodetail(item.id)">
					<view class="search-result-word">
						<view>{{item.name}}</view>
						<view>{{item.artists[0].name}} - {{item.album.name}}</view>
					</view>
					<text class="iconfont icon-bofang"></text>
				</view>

			</view>
		</block>

		<!-- 搜索热词提示 -->
		<block v-else-if="searchType == 3">
			<view class="search-suggest">
				<view class="search-suggest-head">搜索"{{searchWord}}"</view>

				<view class="search-suggest-item" v-for="(item,index) in searchSuggest" :key="index"
					@click="search(item.keyword)">
					<text class="iconfont icon-fangdajing"></text>
					{{item.keyword}}
				</view>

			</view>
		</block>



		<!-- 解决底部留白问题 -->
		<view style="height: 25rpx;"></view>

	</view>
</template>

<script>
	import searchhead from '@/components/musichead/musichead.vue';
	import {
		searchSuggest,
		searchHot,
		searchWord
	} from '../../common/hotapi.js';

	export default {
		components: {
			searchhead,
		},
		data() {
			return {
				//搜索排行榜
				searchHot: [],

				//搜索框内容
				searchWord: '',

				//显示搜索结果还是搜索热榜
				searchType: 1,

				//搜索结果list
				searchresult: [],

				//搜索提示数据
				searchSuggest: [],

			}
		},
		onLoad() {

			//获取搜索排行榜数据
			searchHot().then((res) => {
				this.searchHot = res.data.data;
				// console.log(res.data.data);
			})


		},
		methods: {

			//搜索获取数据
			search(songname) {
				this.searchWord = songname
				searchWord(songname).then((res) => {
					this.searchresult = res.data.result.songs;
					this.searchType = 2;
				})
			},

			//清空搜索框内容
			clearnull() {
				this.searchWord = '';
				this.searchType = 1;
			},

			//跳转到搜索详情页
			resultTodetail(songid) {
				uni.navigateTo({
					url: '/pages/detail/detail?songid=' + songid,

				})
			}
		},

		watch: {
			//监听搜索框进行热词提示
			searchWord(value) {
				
				//节流处理和防止胡乱输入有一个就可以了


				//判断数据是否为空
				if (value) {
					searchSuggest(value).then((res) => {
						this.searchSuggest = res.data.result.allMatch;
						
						//防止胡乱输入
						if(this.searchSuggest==null){
							//处理胡乱输入逻辑
							
						}
						
						
						// 判断是否在当前页，防止重新进入
						if (this.searchType != 3) {
							this.searchType = 3;
							console.log(this.searchType);
						}
						console.log(value);
					})

				} else {
					this.searchType = 1;
				}

			}
		}
	}
</script>

<style>
	.index-search {
		display: flex;
		align-items: center;
		height: 70rpx;
		margin: 40rpx 30rpx 30rpx 30rpx;
		background-color: #f7f7f7;
		border-radius: 50rpx;
	}

	.index-search text {
		font-size: 26rpx;
		margin-left: 28rpx;
		margin-right: 26rpx;
	}

	.index-search input {
		font-size: 30rpx;
		margin-right: 180rpx;
	}

	.search-hot {
		margin: 0 30rpx;
		margin-top: 65rpx;
		font-size: 26rpx;
	}

	.search-hot-head {
		margin-bottom: 36rpx;
	}

	.search-hot-item {
		display: flex;
		align-items: center;
		margin-bottom: 58rpx;
	}

	.search-hot-top {
		color: #fb2222;
		width: 60rpx;
		margin-left: 8rpx;
		font-size: 32rpx;
	}

	.search-hot-word {
		flex: 1;
	}

	.search-hot-word view:nth-child(1) {
		font-size: 30rpx;
		color: black;
	}

	.search-hot-word view:nth-child(2) {
		font-size: 24rpx;
		color: #878787;
	}

	.search-hot-word image {
		margin-left: 10rpx;
		width: 48rpx;
		height: 22rpx;
	}

	.search-hot-count {
		color: #878787;
	}

	.search-result {
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
	}

	.search-result-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 2rpx #e4e4e4 solid;
	}

	.search-result-word {}

	.search-result-word view:nth-child(1) {
		font-size: 28rpx;
		color: #235790;
		margin-bottom: 12rpx;
	}

	.search-result-word view:nth-child(2) {
		font-size: 22rpx;
		color: #898989;
	}

	.search-result-item text {
		font-size: 50rpx;
	}

	.search-suggest {
		border-top: 2rpx #e4e4e4 solid;
		padding: 30rpx;
		font-size: 26rpx;
	}

	.search-suggest-head {
		color: #4574a5;
		margin-bottom: 74rpx;
	}

	.search-suggest-item {
		color: #5d5d5d;
		margin-bottom: 74rpx;
	}

	.search-suggest-item text {
		color: #bdbdbb;
		margin-right: 28rpx;
		position: relative;
		top: 2rpx;
	}
</style>
