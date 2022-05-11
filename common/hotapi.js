const baseURL = "http://localhost:3000"

// const baseURL = "http://192.168.43.107:3000"
// 热榜接口
export function toplist(){

	return new Promise((resolve,reject)=>{
		
		let listIds = ['19723756','3779629','2884035','3778678']
		
		uni.request({
			
			url:`${baseURL}/toplist/detail`,
			success:(res)=>{
				let list = res.data.list;
				list = list.slice(0,4);
				list.map((item,index)=>{
					item.listid = listIds[index]
				})
				resolve(list)
			},
			fail:(res)=> {
				console.log(res);
			},
			
		})
	})
	
}

// 热歌排名列表接口
export function getlistitem(listid){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/playlist/detail?id=${listid}`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}


//歌曲信息接口
export function getsongmsg(songid){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/song/detail?ids=${songid}`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}

//歌词接口
export function getlyric(songid){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/lyric?id=${songid}`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}

//获取歌曲播放url地址
export function getsongurl(songid){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/song/url?id=${songid}`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}

//搜索详情接口
export function searchHot(){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/search/hot/detail`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}

//搜索歌曲
export function searchWord(songname){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/search?keywords=${songname}`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}

//输入框提示
export function searchSuggest(songname){

	return new Promise((resolve,reject)=>{

		uni.request({
			url:`${baseURL}/search/suggest?keywords=${songname}&type=mobile`,
			success:(res)=>{
            resolve(res)	
				}	
		})
	})
	
}