<template>
    <div class="vdetail" style="height: 100%; width: 100%">
    <!-- 内容编写区 S -->
        <div class="inside-wrap" id="PCont">
			<scroll-helper ref="vdScroll" :styleObj="{height: 'calc(100% - 40px)'}" :wrapper-style="{height: height}" @scrollStart="handleScrollStart">
				<div class="content-wrap content-wrap-detail ">
					<div class="detail-wrap video-detail-wrap" :style="flag && {backgroundColor: '#fff'}" ref="wrap">
						<div class="news-detail-hd">
							<h1 class="title" :style="flag && {color: '#000'}">{{vdetailData.sTitle}}</h1>
							<div class="info"><span>发布于{{vdetailData.sCreated | distanceTime}}</span>
								<!-- <span>
								<i class="fas fa-eye fa-sm"></i>
									12
								</span> -->
								<a href="javascript:" title="" class="btn_deng ig-light-trigger ig-light-env-dark" @click="lampTrigger()"><i class="igfont">💡</i><span class="ig-light-txt">{{flag ? '关灯' : '开灯'}}</span>
									<!-- <i class="igfont">&#xe634;</i><span class="ig-light-txt">关灯</span> -->
								</a>
							</div>
						</div>

						<div class="vdetail-wrap">
							<div class="vdetail-player">
								<txplayer v-show="curVideoId" :svid="curVideoId" style="height: 4rem;"></txplayer>
								<template v-if="!curVideoId">
									<div class="hd"></div>
									<div class="bd" id="vplayer">
									<!-- <video  controls id="videoID"  class="index_v_playing" src="http://1.189.219.7/huya-w6.huya.com/1814/28310155/1300/572d18375088180e9b77b23647202e23.mp4" width="100%" height="100%" frameborder="0" webkit-playsinline  x5-playsinline playsinline>
										</video>  -->
									</div>
								</template>
							</div>
							<div class="vdetail-info" v-cloak>
								<div class="bd">
									<div class="detail-like like-wr">
										<div class="users like-users"></div>
										<div class="count"><span class="like-num">{{fabulousNum}}</span>人赞过</div>
										<!-- <a href="javascript:" title="赞一个" class="action like-heart" :style="!isFabulous && {opacity: 0.5}"> -->
										<a href="javascript:" title="赞一个" class="action like-heart" :style="!isFabulous && {opacity: 0.5}" @click="fabulousAcation">
											<i class="igfont"></i> 赞一个
											<span class="action-response">+1</span>
										</a>
									</div>
								</div>
							</div>
							<!-- <div class="shareFoot">
								<div class="shareBtn"><i class="igfont">&#xe604;</i>告诉好基友去</div>
							</div> -->
						</div>
						<div class="igui-detail-related" v-if="vdetailData.linkList && vdetailData.linkList.length>0">
							<div class="igui-title_full"><h6>相关视频</h6></div>
							<div class="bd">
								<scroll-helper :myScrollConfig="{scrollX: true, scrollY: false}" :wrapperStyle="{display: 'inline-block'}">
									<ul class="igui-list-related">
										<li v-for="(item, index) in vdetailData.linkList" :key="index" style="width: 4rem">
											<router-link :to="{name: 'vdetail', params: {id: item.iVideoId}}" class="a-tgax">
												<div class="thumb">
													<img :src="item.sIMG" alt="">
												</div>
												<div class="info">
													<h6 :style="flag && {color: '#2a2a2a'}">{{item.sTitle}}</h6>
													<span>{{item.sCreated | distanceTime}}</span>
												</div>
											</router-link>
										</li>
									</ul>
								</scroll-helper>
							</div>
						</div>
						<div ref='comment'>
							<comment-main></comment-main>
						</div>
					</div>

					<div class="share-guide-task" style="display:none;">
						<p class="share-text">
							点击 “<i class="igfont">&#xe604;</i>” 按钮分享出去哦~
						</p>
					</div>
				</div>
			</scroll-helper>
	    </div>
    </div>
</template>

<script>
import '@css/main.min.css';
import { get, jsonp } from '@utils/http.js';
import txplayer from '@comps/txplayer/index.js';

export default {
	name: 'vdetail',
	data() {
	    return {
			height: 0, // 滚动视图高度 解决safair浏览器因relative定位高度不能自适应的问题
	        vdetailData: {}, // 视频详情数据
	        curVideoId: '', // 当前播放的视频id
			flag: false, // 开关灯状态，默认为false关灯
			isFabulous: false, // 是否点赞该视频，默认为false
			fabulousNum: null, // 点赞次数
			canFabulous: true // 是否可以点赞/取消点赞，默认true，正在请求过程则为false
	    };
	},
	components: {
	    txplayer
	},
	mounted() {
		// 获取详情数据
		this.getData();
		// 查询用户点赞情况
		this.queryIsOperation();
	},
	watch: {
	    '$route' (newVal, oldVal) {
	        if (newVal == oldVal) return;
			this.getData();
			this.queryIsOperation();
			// 滚动回顶部
			this.$refs.vdScroll.scrollTo();
		},
		// 监听评论数量
		'$comment.comments.total' () {
			this.$nextTick(() => {
				this.handleScrollStart();
			});
		},
		flag(newVal, oldVal) {
			if (newVal) {
				this.addBar.classList.remove('addbar');
			} else {
				this.addBar.classList.add('addbar');
			}
		}
	},
	methods: {
	    getData() {
	        let { id } = this.$route.params;
	        get({
	            url: '//apps.game.qq.com/wmp/v3.1/public/search.php',
	            params: {
	                p1: 'searchNewsKeywordsList',
	                r0: 'cors',
	                r1: 'userObj',
	                order: 'sIdxTime',
	                pagesize: 10,
	                page: 1,
	                type: 'iType',
	                source: 'client_circle_detail',
	                p0: 77,
	                id: id
	            }
	        }).then(res => {
	            // console.log(res.msg);
	            this.vdetailData = res.msg;
				this.curVideoId = this.vdetailData.sVID;
				// 创建评论对象
				let iTime = res.msg.sCreated;
				iTime = iTime.split('-').slice(0, 2).join('');
				this.$comment.refresh({
					options: {
						title: res.msg.sTitle,
						stime: iTime,
						objid: res.msg.iVideoId,
						moduleId: 'video_mobile'
					},
					theme: this.flag ? 'light' : 'dark'
				});
				this.$nextTick(() => {
					this.height = this.$refs.wrap.offsetHeight + 'px';
				});
				// 抽出评论组件中的回复和举报窗口和悬浮条放到body中
				this.addBar = this.$refs.comment.getElementsByClassName('comment-add-bar')[0];
				this.reply = this.$refs.comment.getElementsByClassName('pop_reply')[0];
				this.report = this.$refs.comment.getElementsByClassName('np-comment-report-pop')[0];
				document.body.appendChild(this.addBar);
				document.body.appendChild(this.reply);
				document.body.appendChild(this.report);
				this.addBar.classList.add('addbar');
	        });
	    },
	    lampTrigger() {
			this.flag = !this.flag;
			// 跟新评论背景
			this.$comment.refresh({
				theme: this.flag ? 'light' : 'dark'
			});
		},
		fabulousAcation() {
			if (!this.canFabulous) return;
			this.canFabulous = false; // 改为false，不能继续请求
			let url = '/php/ingame/interactcenter/cancel_user_oper_resource.php'; // 默认取消点赞
			if (!this.isFabulous) {
				// 点赞
				url = '/php/ingame/interactcenter/user_operate_resource.php';
			}
			this.getFabulousData({
				url
			}).then(res => {
				this.isFabulous = !this.isFabulous;
				this.fabulousNum = res.data.num;
				this.canFabulous = true; // 重置为true
			});
		},
		async getFabulousData({url, params = {}}) {
			let { algorithm, version, encode, timestamp, sig, appid, msdkEncodeParam } = this.$tokenParams;
			let { id } = this.$route.params;
			let res = await jsonp({
				url: '//app.ingame.qq.com' + url,
				params: Object.assign({
					game: 'pubgm',
					operate_type: 1,
					bid: 'detail_like',
					channel: 4,
					works_id: id,
					works_type: 1, // 1视频，2文章，11战队
					roleid: 1,
					partition: 1,
					algorithm,
					version,
					encode,
					timestamp,
					sig,
					appid,
					msdkEncodeParam
				}, params)
			});
			return res;
		},
		queryIsOperation() {
			// 查询该用户是否点赞过
			this.getFabulousData({
				url: '/php/ingame/interactcenter/query_my_operate_resource.php',
				params: {
					start: 0,
					num: 100
				}
			}).then(res => {
				// console.log(res.data.workslist);
				let { id } = this.$route.params;
				res.data.workslist.map(item => {
					if (item.works_id == id) {
						this.fabulousNum = item.nums;
						this.isFabulous = true;
					}
				});
				if (!this.fabulousNum) {
					//用户没有点赞过该视频
					this.queryFabulousNum();
				}
			});
		},
		queryFabulousNum() {
			// 查询点赞次数
			this.getFabulousData({
				url: '/php/ingame/interactcenter/query_resource_operate.php',
				params: {
					start: 0,
					num: 1
				}
			}).then(res => {
				// console.log(res.data);
				this.fabulousNum = res.data.num;
			});
		},
		handleScrollStart() {
			this.height = this.$refs.wrap.offsetHeight + 'px';
			this.$nextTick(() => {
				this.$refs.vdScroll.myScroll.refresh();
			});
		}
	},
	beforeDestroy() {
		// 移除body中的回复和举报窗口和悬浮条
		document.body.removeChild(this.addBar);
		document.body.removeChild(this.reply);
		document.body.removeChild(this.report);
	}
};
</script>

<style>
.pop_reply, .np-comment-report-pop, .comment-add-bar {
	width: auto;
	height: auto;
	left: 1.76rem;
	right: 0;
	bottom: 0;
}
.comment-add-bar {
	display: block !important;
	position: absolute;
}
.report-bd .report-options {
	display: inline-block;
	width: 50%;
}
.comment-add-bar--input { 
	border: 1px solid rgba(0, 0, 0, 0.3);
}
.addbar {
	background: #272729;
}
.addbar .comment-add-bar--input {
	border: 1px solid rgba(255, 255, 255, 0.3);
}
@media all and (orientation: portrait) {
	.pop_reply, .np-comment-report-pop, .comment-add-bar {
		width: auto;
		height: auto;
		left: 0;
		right: 0;
		bottom: 1.2rem
	}
	.report-bd .report-options {
		display: block;
		width: 100%;
	}
}
</style>

