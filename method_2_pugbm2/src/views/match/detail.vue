<template>
    <div class="detail" style="height: 100%">
    <!-- 内容编写区 S -->
        <div  id="PCont" class="inside-wrap">
			<scroll-helper ref="dScroll" :styleObj="{height: 'calc(100% - 40px)'}" :wrapper-style="{height: height}" @scrollStart="handleScrollStart">
				<div class="content-wrap content-wrap-detail" >
					<div class="detail-wrap news-detail-wrap" :style="flag && {backgroundColor: '#fff'}" ref="wrap">
						<!--头部信息-->
						<div class="news-detail-hd">
							<h1 class="title" :style="flag && {color: '#000'}">{{detailData.sTitle}}</h1>
							<div class="info"><span>发布于 {{detailData.sCreated}}</span>
								<a href="javascript:" title="" class="btn_deng ig-light-trigger ig-light-env-dark" :style="flag && {backgroundColor: '#3f3f3f', borderColor: '#3f3f3f'}" @click="lampTrigger()"><i class="igfont">💡</i><span class="ig-light-txt">{{flag ? '关灯' : '开灯'}}</span>
									<!-- <i class="igfont">&#xe634;</i><span class="ig-light-txt">关灯</span> -->
								</a>
							</div>
						</div>
						<!--正文内容-->
						<div class="news-detail-bd" :style="flag && {color: '#000'}" v-html="detailData.sContent">
							
						</div>
						<div class="news-detail-bd">
						<p><span style="font-family:微软雅黑;font-size:medium;">
							　想要在“全军出击”的世界中获得第一，是非常重要的一步。老地图绝地岛中的各个地区的资源丰富程度和建筑地形，很多老“击友”想必都以耳熟于心，即便是新地图—米拉玛沙漠，经过这几天的摸索大家也都对其有了一个大概的了解，什么皮卡多、别墅、狮城、军事基地，都是资源相当丰富的地方，也是大家首选的几个降落“圣地”。而本期，咱们就来说一个被大家遗忘的真·圣地—圣马丁城。
							<img class="textImg" src="https://itea-cdn.qq.com/file/editor/20180408/1.1523183083.820ad00454c5a210632191ce69e8d0ac.650x365_501402.png">
							圣马丁城位于整张米拉玛沙漠地图的中间位置，西南邻着变电站，东北接别墅区，南方不远就是皮卡多城。单从平面图来看，它所处的位置甚至比皮卡多城更好也更贴近中心，但由于圣马丁城四面环山，想要跑图只能选择横穿山地或者沿公路绕行，因此很多人基于跑图的考虑，并不会选择这作为降落点。但正所谓你的缺点有时候正是你的优势。作为一个被遗忘的地方，圣马丁城还是很适合一些新手或着喜欢“苟”发育的“击友”作为降落点的。
						</span></p>
						<p><span style="font-family:微软雅黑;font-size:medium;"><b><span style="color:#ff0000;">路线推荐</span></b></span></p>
						<center><img  class="textImg" src="https://itea-cdn.qq.com/file/editor/20180408/2.1523183099.97dbfeac69826e71c00b9294fc183fd1.650x365_542781.png"></center>
						<center><br></center>
						<p><span style="font-family:微软雅黑;font-size:medium;">　圣马丁城区域比较大，房屋建筑也比较多，单说搜资源 ，很多人都会感觉无从下手。而圣马丁城资源最丰富的地区就是它的西侧和南侧，因此我个人比较推荐的搜索路线有两条，线路A是从西到东搜，线路B是从南到北搜。从西到东这条路线，我们可以选择“坠机高地”降落，搜索完高地后，从南侧或东侧下山，到达两个仓库处，然后开始慢慢深入城市的中心区域搜索。而从南到北这条路线则是从其南侧的高地降落，沿高地东侧缓坡下山，先沿东西大路搜索路南的建筑，待身上装备的差不多了，再深入城区。</span></p>
						<center><img  class="textImg" src="https://itea-cdn.qq.com/file/editor/20180408/3.1523183109.8e798615435ad1007534285407d8facc.650x365_431350.png"></center>
						<center><br></center>
						<p><span style="font-family:微软雅黑;font-size:medium;">　而且，A、B两条线路都有刷车点，十分方便咱们跑圈。A线路东、南的两个仓库附近一般情况下都会有车辆载具。而B线路沿着公路搜索，如果这都找不到车，那就去A线路那里抢吧。</span></p>
						<p><span style="font-family:微软雅黑;font-size:medium;">　　<b><span style="color:#ff0000;">注意事项</span></b></span></p>
						<p><span style="font-family:微软雅黑;font-size:medium;">　　搜索路线有了，咱也别光顾着埋头搜东西，还有一些需要注意的地方。</span></p>
						<p><span style="font-family:微软雅黑;font-size:medium;">第一，要小心别墅区和电站的敌人。降落在这两个地方敌人在搜索完他们的地方后，如果安全范围允许，那么八成可能都会把圣马丁城作为第二个搜索点。第二，撤离路线。上面咱们已经说了，虽然圣马丁城位于地图中间，但由于其四面环山，因此总体来说交通并不是十分方便。如果安全区是缩在圣马丁城以南，咱们能选择的跑圈路线无非就三条，其一沿城西公路绕新山城入安全区，其二沿城东公路往南拐进安全区。而最快速的第三条线路就是横穿南侧山地，经电站东侧进安全区。如果想选择一二条路线跑圈，那么一定要给自己留下较为充足的跑圈时间，不要等到危险圈贴近了才想到跑。如果选第三条路线，那尽量不要靠近电站，一方电站内有敌人阻击。本期的讲解就先到这里，咱们米拉玛见。
						</span></p>
						</div>
						<!--底部信息-->
						<div class="news-detail-ft">
							<div class="detail-like like-wr">
								<div class="users like-users"></div>
								<div class="count"><span class="like-num">{{fabulousNum}}</span>人赞过</div>
								<!-- <a href="javascript:" title="赞一个" class="action like-heart" :style="!isFabulous && {opacity: 0.5}"> -->
								<a href="javascript:" title="赞一个" class="action like-heart" :style="!isFabulous && {opacity: 0.5}" @click="fabulousAcation">
									<i class="igfont"></i> 赞一个
									<span class="action-response">+1</span>
								</a>
							</div>
							<!-- <div class="shareFoot">
								<div class="shareBtn"><i class="igfont">&#xe604;</i>告诉好基友去</div>
							</div> -->
						</div>
						<div class="igui-detail-related">
							<div class="igui-title_full" :style="flag && {background: '#dddbd8'}">
								<h6 :style="flag && {color: '#2a2a2a'}">相关内容</h6>
							</div>
							<div class="bd">
								<scroll-helper :myScrollConfig="{scrollX: true, scrollY: false}" :wrapperStyle="{display: 'inline-block'}">
									<ul class="igui-list-related">
										<li v-for="(item, index) in detailData.linkList" :key="index" :style="flag && {color: '#2a2a2a'}" style="width: 4rem">
											<router-link :to="{name: 'detail', params: {id: item.iNewsId}}" class="a-tgax">
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
						<div ref="comment">
							<comment-main></comment-main>
						</div>
					</div>

					<!--占位图-->
					<div class="news-wrap-loader" style=""> <!--头部信息--> <div class="news-detail-hd"><h1 class="title" :style="flag && {color: '#000'}"></h1> <div class="info"><span></span> <span></span> <span></span></div> </div> <!--正文内容--> <div class="news-detail-bd" :style="flag && {color: '#000'}"> <p><i></i></p> <p><span></span> <span></span> <span></span> <span style="width: 50%;"></span></p> <p><span></span> <span></span> <span></span> <span></span> <span style="width: 10%;"></span></p> <p><span></span> <span></span> <span style="width: 20%;"></span></p> </div> </div>
				</div>
				
				<div class="share-guide-task" style="display:none;">
					<p class="share-text">
						点击 “<i class="igfont">&#xe604;</i>” 按钮分享出去哦~
					</p>
				</div>
			</scroll-helper>
        </div>
    </div>
</template>

<script>
import '@css/main.min.css';
import { get, jsonp } from '@utils/http.js';

export default {
	name: 'detail',
	data() {
	    return {
			height: 0, // 滚动视图高度 解决safair浏览器因relative定位高度不能自适应的问题
			detailData: {}, //图文详情数据
			flag: false, // 开关灯状态，默认为false关灯
			isFabulous: false, // 是否点赞该文章，默认为false
			fabulousNum: null, // 点赞次数
			canFabulous: true // 是否可以点赞/取消点赞，默认true，正在请求过程则为false
	    };
	},
	mounted() {
		// 获取详情数据
		this.getData();
		// 查询用户点赞情况
		this.queryIsOperation();
	},
	computed: {
		cmtype: () => {
			return window.igUtil.getUrlParam('cmtype') || 'feed';
		}
	},
	watch: {
	    '$route' (newVal, oldVal) {
	        if (newVal == oldVal) return;
			this.getData();
			this.queryIsOperation();
			// 滚动回顶部
			this.$refs.dScroll.scrollTo();
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
	            url: '//apps.game.qq.com/wmp/v3.1/public/searchNews.php',
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
				this.detailData = res.msg;
				// 创建评论对象
				let iTime = res.msg.sCreated;
				iTime = iTime.split('-').slice(0, 2).join('');
				this.$comment.refresh({
					options: {
						title: res.msg.sTitle,
						stime: iTime,
						objid: res.msg.iNewsId,
						moduleId: this.cmtype + '_mobile'
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
			this.addBar = this.$refs.comment.getElementsByClassName('comment-add-bar')[0];
			document.body.appendChild(this.addBar);
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
					works_type: 2, // 1视频，2文章，11战队
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
				this.$refs.dScroll.myScroll.refresh();
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

<style lang="scss">
@import '../../assets/scss/mixin.scss';
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
@include por {
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