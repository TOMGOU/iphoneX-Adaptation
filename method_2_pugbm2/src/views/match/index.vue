<template>
    <div class="index" id="g-index">
        <!-- 内容编写区 S -->
        <div class="inside-wrap" id="PCont">
            <scroll-helper>
                <div class="event_center">
                    <div class="center_box">
                        <div class="zhibo_box">
                            <div class="video_box">
                                <div class="video_top">
									<img v-show="curVideoData.type == 1" class="zhibo_logo" src="@assets/img/index_zhibo_logo.png">
									<img v-show="curVideoData.type == 2" class="zhibo_logo" src="@assets/img/index_chongbo_logo.png">
                                    <!-- <div>官方赛第一届第二场</div> -->
                                    <div>{{curVideoData.title}}</div>
                                </div>
                                <div>
                                    <!-- <img class="video_play" id="btnPlay" src="@assets/img/index_videoPlay_logo.png"> -->
                                    <div class="mod_player" id="mod_player">
                                        <txplayer v-if="curVideoData.type == 2" :svid="curVideoData.url || ''" :config="{autoplay: true}" style="height: 100%"></txplayer>
										<txvlive v-if="curVideoData.type == 1" :vid="curVideoData.url || ''" style="height: 100%"></txvlive>
                                    </div>
                                </div>
                                <!-- <div class="video_bottom"><img class="video_full" src="//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_full_logo.png"></div> -->
                            </div>
                            <!-- <div class="nav_video">
                                <ul class="match_ul">
                                    <li v-for="item in matchListData" :key="item.id" :class="{select_video: item.id == matchSelectItem}">
                                        <a href="javascript:;" @click="matchNavAction(item.id)" :ontouchend="item.touch">
                                            <p class="match_type">{{item.short_title}}</p>
                                            <p class="status" v-if="item.status == 1">直播中</p>
                                        </a>
                                    </li>
                                </ul>
                            </div> -->
                            <scroll-helper :styleObj="{height: 'calc(100% - 3.46rem)'}">
                                <div class="entry_box">
                                    <div class="entry_left" :style="this.advertisementData.pos21184 && {backgroundImage: 'url(' + this.advertisementData.pos21184[2] + ')'}">
                                        <a :href="this.advertisementData.pos21184 ? this.advertisementData.pos21184[1] : 'javascript:;'">
                                            <!-- <img class="entry_logo" :src="this.advertisementData.pos21184 && this.advertisementData.pos21184[2]">
                                            <p>{{this.advertisementData.pos21184 && this.advertisementData.pos21184[0]}}</p> -->
                                        </a>
                                    </div>
                                </div>
                                <div class="entry_box">
                                    <div class="entry_left" :style="this.advertisementData.pos21185 && {backgroundImage: 'url(' + this.advertisementData.pos21185[2] + ')'}">
                                        <a :href="this.advertisementData.pos21185 ? this.advertisementData.pos21185[1] : 'javascript:;'">
                                            <!-- <img class="entry_logo" :src="this.advertisementData.pos21185 && this.advertisementData.pos21185[2]">
                                            <div>{{this.advertisementData.pos21185 && this.advertisementData.pos21185[0]}}</div> -->
                                        </a>
                                    </div>
                                </div>
								<div class="entry_box">
                                    <div class="entry_left" :style="this.advertisementData.pos21408 && {backgroundImage: 'url(' + this.advertisementData.pos21408[2] + ')'}">
                                        <a :href="this.advertisementData.pos21408 ? this.advertisementData.pos21408[1] : 'javascript:;'">
                                        </a>
                                    </div>
                                </div>
                            </scroll-helper>
                        </div>

                    </div>
                    <div class="right_box">
                        <div class="ad_top" :style="this.advertisementData.pos21183 && {backgroundImage: 'url(' + this.advertisementData.pos21183[2] + ')'}">
                            <a :href="this.advertisementData.pos21183 ? this.advertisementData.pos21183[1] : 'javascript:;'">
                                <!-- <p class="ad_text1">PUBGM来了</p>
                                <p class="ad_text2">官方正宗吃鸡</p> -->
                            </a>
                        </div>
                        <div class="right_box_bottom">
                            <scroll-helper>
                                <div class="info_box">
                                    <div class="info_top">
                                        <div class="info_tip1">
                                            <img class="index_schedule1" src="@assets/img/index_schedule1.png">
                                            <div id="whiteLinkBtn">赛事快讯</div>
                                        </div>
                                        <div class="info_more">
                                            <router-link :to="{name: 'matchInfo'}" ontouchend="PTTSendClick('link','more','更多');">
                                                更多
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="info_contant">
                                        <ul class="nav_info">
                                            <li v-for="(item, index) in matchInformation" :key="index">
                                                <router-link :to="{name: 'detail', params: {id: item.iNewsId}}">
                                                    <div class="info_img1" :style="{backgroundImage: 'url(' + item.sIMG + ')'}">
                                                        <p class="pic_img">{{item.sDesc | getTag('name')}}</p>
                                                        <img class="video_tip" :src="item.sDesc | getTag">
                                                        <div>
                                                            <p class="info_text">{{item.sTitle}}</p>
                                                            <!-- <div>
                                                                <div class="liulang"><img class="liulang_logo" src="@assets/img/index_liuliang.png"> {{item.iTotalPlay}}</div>
                                                                <div class="index_date">{{item.sCreated | formatTime}}</div>
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </router-link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="info_top" style="margin-bottom: 0.13rem;">
                                        <div class="info_tip1">
                                            <img class="index_schedule1" src="@assets/img/index_schedule1.png">
                                            <div>精彩瞬间</div>
                                        </div>
                                        <div class="info_more">
                                            <router-link :to="{name: 'video'}" ontouchend="PTTSendClick('link','more','更多');">
                                                更多
                                            </router-link>
                                        </div>
                                    </div>
                                    <div class="info_contant">
                                        <div class="video_list">
                                            <div v-for="(item, index) in wonderfulMoment" :key="index"
                                                :style="{backgroundImage: 'url(' + item.sIMG + ')'}"
                                                :class="'video_list_img' + (index+1)">
                                                <router-link :to="{name: 'vdetail', params: {id: item.iVideoId}}">
                                                    <img class="video_play2" src="@assets/img/index_videoPlay_logo.png">
                                                </router-link>
												<p>{{item.sTitle}}</p>
                                                <!-- <video class="index_v_playing2" src="http://1.189.219.7/huya-w6.huya.com/1814/28310155/1300/572d18375088180e9b77b23647202e23.mp4" width="100%" height="100%" frameborder="0"></video> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </scroll-helper>
                        </div>
                    </div>
                </div>
            </scroll-helper>
    	</div>
    </div>
</template>

<script>
import { script, get } from '@utils/http.js';
import txplayer from '@comps/txplayer/index.js';
import txvlive from '@comps/txvlive/index.js';

export default {
	name: 'index',
	data() {
	    return {
			matchListData: [], //赛事列表
			matchSelectItem: -1, //选中的赛事item，默认不选中
	        advertisementData: {}, // 广告位数据
			// curVideoId: '', // 当前视频svid
			allLiveBroadcastData: {}, //存放所有直播数据
			curVideoData: {}, // 存放当前选中的直播数据
			matchInformation: [], //赛事资讯
			wonderfulMoment: [] //精彩瞬间
	    };
	},
	components: {
		txplayer,
		txvlive
	},
	filters: {
	    // formatTime(val) {
		// 	if (val) return '';
		// 	val = val.replace(/-/g, '/');
	    //     var d = new Date(val);
	    //     var month = d.getMonth() + 1;
	    //     var date = d.getDate();
	    //     month = month < 10 ? '0' + month : month;
	    //     date = date < 10 ? '0' + date : date;
	    //     return month + '-' + date;
		// },
		getTag(value, name) {
			if (!value) return value;
			// value = value.match(/【.*】/)[0];
			// value = value.replace(/【|】/g, '');
			if (value.indexOf('【') == -1) return '';
			value = value.slice(value.indexOf('【') + 1, value.indexOf('】'));
			// 返回标签名称
			if (name == 'name') return value;
			// 返回标签背景图片
			if (value == '热门') {
				return require('@assets/img/index_video_tip2.png');
			}
			return require('@assets/img/index_video_tip1.png');
		}
	},
	async mounted() {
		// import(/* webpackChunkName: "eruda" */'eruda').then(eruda => {
		// 	eruda.init({
		// 		tool: ['elements', 'console', 'network', 'sources', 'info']
		// 	});
		// 	document.querySelector('.eruda-container').addEventListener('touchmove', (e) => {
		// 		e.stopPropagation();
		// 	}, false);
		// });
	    // var player = new Txplayer({
	    //     containerId: "mod_player",
	    //     vid: "n0026jatcbd",
	    //     width: "100%",
	    //     height: "100%",
	    //     autoplay: true
	    // });
		// this.curVideoId = 'n0026jatcbd';
		// 广告位数据请求
		script({
	        url: '//game.qq.com/time/qqadv/Info_new_16036.js'
	    }).then(() => {
	        this.advertisementData = {
	            pos21183: window.oDaTaNew16036.pos21183,
	            pos21184: window.oDaTaNew16036.pos21184,
	            pos21185: window.oDaTaNew16036.pos21185,
	            pos21408: window.oDaTaNew16036.pos21408
	        };
			var { tokenStr } = this.$tokenParams;
	        for (var key in this.advertisementData) {
	            // this.advertisementData[key][0] = decodeURIComponent(this.advertisementData[key][0]);
	            this.advertisementData[key][1] = this.advertisementData[key][1].indexOf('?') == -1 ? this.advertisementData[key][1] + '?' + tokenStr : this.advertisementData[key][1] + '&' + tokenStr;
	            this.advertisementData[key][2] = '//ossweb-img.qq.com/upload/adw/' + this.advertisementData[key][2];
			}
		});
		// 赛事列表数据请求
		get({
			url: '//itea-cdn.qq.com/file/ingame/pubgm/matchlist.json'
		}).then((res) => {
			// console.log(res);
			this.matchListData = res;
			this.matchSelectItem = res[0].id;
			this.getLiveBroadcast(res[0].id);
	    });
	    // 赛事资讯数据请求
		get({
			url: '//apps.game.qq.com/wmp/v3.1/',
			params: {
				p1: 'searchNewsKeywordsList',
				r0: 'cors',
				r1: 'userObj',
				order: 'sIdxTime',
				pagesize: 8,
				page: 1,
				type: 'iTag',
				source: 'client_circle_detail',
				p0: 77,
				id: 3808
			}
		}).then(res => {
			// console.log(res);
			this.matchInformation = res.msg.result.slice(0, 5);
		});
		// 精彩瞬间数据请求
		get({
			url: '//apps.game.qq.com/wmp/v3.1/',
			params: {
				p1: 'searchKeywordsList',
				r0: 'cors',
				r1: 'userObj',
				order: 'sIdxTime',
				pagesize: 12,
				page: 1,
				type: 'iTag',
				source: 'client_circle_detail',
				p0: 77,
				id: 3811
			}
		}).then(res => {
			// console.log(res);
			this.wonderfulMoment = res.msg.result.slice(0, 2);
		});
		// 白名单插件
		if (!window._whiteName) {
			await script({
				url: '//ossweb-img.qq.com/images/js/bsCommonFiles/js/white/white-plugins.js',
				loadRemove: false
			});
		}
		window._whiteName({
			eleId: 'whiteLinkBtn', // 绑定点击弹出框的元素
			game: 'pubgm' // 游戏id 如 hlddz
		});
	},
	methods: {
	    matchNavAction(id) {
			if (this.matchSelectItem == id) return;
			this.matchSelectItem = id;
			if (this.allLiveBroadcastData[id]) {
				this.curVideoData = this.allLiveBroadcastData[id];
				return;
			}
			this.getLiveBroadcast(id);
		},
		// 直播数据请求
		getLiveBroadcast(id) {
			get({
				url: '//itea-cdn.qq.com/file/ingame/pubgm/matchlivebasic' + id + '.json'
			}).then((res) => {
				// console.log(res);
				this.curVideoData = res;
				this.allLiveBroadcastData[res.id] = res; // 保存请求回来的直播数据
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../assets/scss/mixin.scss';
#g-index {
    height: 100%;

	@include land {
		.wrapper, .event_center, .right_box, .center_box, .zhibo_box {
			height: 100%;
		}
		.right_box .right_box_bottom {
			height: calc(100% - 2.05rem);
		}
		.right_box_bottom .wrapper, .zhibo_box .wrapper {
			height: auto;
		}
	}
    div#PCont {
        position: absolute;
        width: 11.18rem;
        // height: 6.14rem;
        height: calc(100% - 30px);
        left: 1.88rem;
        // top: 0.3rem;
        top: 15px;
        overflow: hidden;
    }
    * {
        padding: 0;
        margin: 0;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    .event_center {
        // height: 6.14rem;
        width: 13.34rem;
        font-size: 0.25rem;
        /*background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/bg.png) no-repeat  top;*/
        background-size: 100% 100%;
        color: #ffffff;
        // position: absolute;
        position: relative;
        left: 0;
        top: 0;
        overflow: hidden;
        /*border: 0.01rem solid red;*/
    }

    /*直播界面*/
    .center_box {
        width: 6.16rem;
        // height: 6.14rem;
        float: left;
        // overflow: scroll;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        /*margin-left: 1.89rem;*/
    }
    .center_box::-webkit-scrollbar {
        display: none;
    }
    .zhibo_box {
        width: 6.16rem;
        // height: 5.19rem;
        // margin: 0rem 0rem 0.19rem auto;
        /*border: 0.01rem solid red;*/
    }
    .mod_player {
        width: 100%;
        height: 2.8rem;
    }
    .video_box {
        width: 100%;
        height: 3.46rem;
        /*border: 0.01rem solid red;*/
        /* background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video.png); */
        position: relative;
    }
    .video_top {
        width: 100%;
        height: 0.61rem;
		// background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_topbg.png) no-repeat;
		background: url(../../assets/img/index_video_topbg.png) no-repeat;
        background-size: 100% 100%;
		line-height: 0.61rem;
		display: flex;
    }
    .zhibo_logo {
        margin-left: 0.23rem;
        margin-right: 0.09rem;
        margin-top: 0.13rem;
        // float: left;
        width: 0.98rem;
        height: 0.34rem;
    }
    .video_play {
        position: absolute;
        left: 2.7rem;
        top: 1.5rem;
        width: 0.73rem;
        height: 0.73rem;
        z-index: 8;
    }
    .index_v_playing {
        width: 100%;
        height: 2.9rem;
    }
    .video_bottom {
        height: 0.55rem;
        width: 100%;
        position: absolute;
        bottom: 0;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_v_bottom.png);
    }
    .video_full {
        float: right;
        margin-right: 0.15rem;
        margin-top: 0.12rem;
        width: 0.31rem;
        height: 0.31rem;
    }
    /*直播赛事类型选项卡*/
    .nav_video {
        width: 100%;
        height: 0.72rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_choosebg.png);
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
    }
    .match_ul li {
        height: 0.72rem;
        width: 1.21rem;
        float: left;
        text-align: center;
        list-style: none;
        vertical-align: middle;
        border-right: 0.01rem solid rgba(211, 211, 211, 0.2);
    }
    .match_type {
        font-size: 0.22rem;
        margin-top: 0.13rem;
        /*line-height: 0.72rem;*/
    }
    .status {
        font-size: 0.1rem;
        color: #ff9000;
    }
    /*报名入口*/
    .entry_box {
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_entry_bg.png);
        width: 100%;
        // height: 100%;
        height: 1rem;
        overflow: hidden;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.6);
    }
    .entry_left {
        width: 100%;
        height: 1rem;
        // line-height: 1rem;
        // padding-left: 1.58rem;
        box-sizing: border-box;
        background-size: 100% 100%;
    }
    .entry_left a {
        display: block;
        width: 100%;
        height: 100%;
    }
    .entry_logo {
        /*background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_entry_bg.png); width: 100%;height: 100%;*/
        float: left;
        margin: 0.25rem 0.1rem auto 0.3rem;
        height: 0.51rem;
        width: 0.51rem;
    }
    /*赛程图*/
    .shedule {
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_schedule3.png);
        height: 1.21rem;
        width: 100%;
        /*border: 0.01rem solid red;*/
    }
    .shedule_top {
        height: 0.33rem;
        width: 1.03rem;
        float: left;
        margin: 0.16rem auto auto 0.25rem;
    }
    .index_more {
        height: 0.3rem;
        width: 0.68rem;
        float: right;
        margin: 0.16rem 0.2rem auto auto;
    }
    .index_schedule1 {
        float: left;
        margin-right: 0.13rem;
        margin-top: 0.05rem;
        height: 0.24rem;
        width: 0.08ren;
    }
    .schedule_text {
        float: left;
    }
    .right_box {
        width: 4.85rem;
        float: left;
        margin-left: 0.21rem;
        /*border: 0.01rem solid red;*/
    }
    /*广告位*/
    .ad_top {
        height: 1.47rem;
        width: 100%;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/ad_bg.png)
        no-repeat;
        background-size: 100% 100%;
        /*margin-top: 0.29rem;*/
    }
    .ad_top a {
        display: block;
        height: 100%;
    }
    .ad_text1 {
        font-size: 0.3rem;
        position: relative;
        left: 0.24rem;
        top: 0.35rem;
    }
    .ad_text2 {
        font-size: 0.22rem;
        position: relative;
        left: 0.24rem;
        top: 0.34rem;
    }
    /*赛事快讯*/
    .right_box_bottom {
        width: 4.45rem;
        height: 4.2rem;
        margin-top: 0.2rem;
        padding: 0.19rem;
        // background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_topbg.png) no-repeat;
        background: url(../../assets/img/index_video_topbg.png) no-repeat;
        background-size: 100% 100%;
        // overflow: scroll;
        // -webkit-overflow-scrolling: touch;
        /*border: 0.01rem solid red;*/
    }
    // .right_box_bottom::-webkit-scrollbar {
    //     display: none;
    // }
    .info_box {
        width: 4.48rem;
        // height: 4.56rem;
    }
    .info_top {
        width: 100%;
        height: 0.28rem;
    }
    .info_tip1 {
        float: left;
        width: 1.28rem;
    }
    .info_more {
        float: right;
        width: 0.68rem;
    }
    .info_contant {
        width: 100%;
        position: relative;
        margin-top: 0.1rem;
    }
    .info_contant .video_list {
		// overflow: hidden;
		height: 1.47rem;
	}
    .info_contant .video_list p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .nav_info li {
        list-style: none;
        width: 100%;
        height: 1.16rem;
        /*border: 0.01rem solid red;*/
        position: relative;
    }
    .info_img1 {
        width: 1.67rem;
        height: 0.94rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_fastNew1.png)
        no-repeat;
        background-size: 100% 100%;
    }
	.pic_img {
		width:.41rem;
		position: absolute;
		font-size: .13rem;
		width: 0.43rem;
		line-height: 0.24rem;
		text-align: center;
	}
    .video_tip {
        width: 0.43rem;
        height: 0.24rem;
		display: block;
    }
    .video_tip[src=''] {
        display: none;
    }
    .info_text {
        position: absolute;
        left: 1.77rem;
        // top: 0.08rem;
        top: 0;
        -webkit-line-clamp: 2;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
    .liulang {
        position: absolute;
        bottom: 0.2rem;
        left: 1.77rem;
        font-size: 0.2rem;
    }
    .liulang_logo {
        width: 0.3rem;
        height: 0.24rem;
		vertical-align: middle;
    }
    .index_date {
        position: absolute;
        bottom: 0.2rem;
        right: 0.03rem;
        font-size: 0.2rem;
    }
    .info_tip2 {
        width: 100%;
        margin-bottom: 0.13rem;
    }
    .index_v_playing2 {
        width: 2.15rem;
        height: 1.17rem;
    }
    .video_list_img1 {
        width: 2.15rem;
        height: 1.17rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video1.png)
        no-repeat;
        background-size: 100% 100%;
        float: left;
        margin-right: 0.18rem;
        position: relative;
        margin-bottom: 0.2rem;
    }
    .video_list_img2 {
        width: 2.15rem;
        height: 1.17rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video2.png)
        no-repeat;
        background-size: 100% 100%;
        float: left;
        position: relative;
        /*border: 0.01rem solid red;*/
        margin-bottom: 0.2rem;
    }
    .video_list_img1 a, .video_list_img2 a {
        display: block;
        height: 100%;
    }
    .video_play2 {
        width: 0.54rem;
        height: 0.54rem;
        left: 0.84rem;
        top: 0.34rem;
        position: absolute;
    }
    .select_video {
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_choose.png)
        no-repeat;
        background-size: 100% 100%;
    }
    .match_ul a {
        color: #9f9c97;
        display: block;
        height: 100%;
        overflow: hidden;
    }
    .select_video a {
        color: #fff;
        font-weight: bold;
    }

    @media all and (orientation: portrait) {
        div#PCont {
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: visible;
        }
        .event_center {
            width: 100%;
            height: 100%;
            font-size: 0.25rem;
            color: #ffffff;
            // overflow: auto;
            // overflow-x: hidden;
        }
        .center_box {
            width: 100%;
            height: 6.14rem;
            /*margin-left: 1.89rem;*/
        }
        .zhibo_box {
            width: 100%;
            height: 5.19rem;
            margin: 0rem 0rem 0.19rem auto;
            /*border: 0.01rem solid red;*/
        }
        .mod_player {
            height: 2.9rem;
        }
        .match_ul li {
            height: 0.72rem;
            width: 20%;
            float: left;
            text-align: center;
            list-style: none;
            vertical-align: middle;
            border-right: 0.01rem solid rgba(211, 211, 211, 0.2);
            box-sizing: border-box;
        }
        .entry_left {
            width: 100%;
            height: 1rem;
            // line-height: 1rem;
            // margin-left: 32%;
        }
        .right_box {
            width: 100%;
            margin-left: 0;
        }
        .right_box_bottom {
            width: 100%;
            height: 100%;
            margin-top: 0;
            padding: 0.19rem;
			// background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_topbg.png) no-repeat;
			background: url(../../assets/img/index_video_topbg.png) no-repeat;
            background-size: 100% 100%;
            /*border: 0.01rem solid red;*/
        }
        .ad_top {
            height: 2rem;
            width: 100%;
            background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/ad_bg.png)
                no-repeat;
            background-size: 100% 100%;
            /*margin-top: 0.29rem;*/
        }
        .info_box {
            width: 100%;
            height: 100%;
        }
        .info_more {
            float: right;
            width: 0.68rem;
            margin-right: 0.15rem;
        }
        .nav_info {
            margin-right: 0.3rem;
            margin-top: 0.2rem;
        }
        .nav_info li {
            box-sizing: border-box;
            margin-bottom: 0.1rem;
            border-bottom: 0.01rem solid rgba(211, 211, 211, 0.6);
        }
        .video_list_img1 {
            width: 40%;
            height: 1.7rem;
            margin-right: 10%;
            margin-bottom: 1.5rem;
        }
        .video_list_img2 {
            width: 40%;
            height: 1.7rem;
            margin-bottom: 1.5rem;
        }
        .video_play2 {
            width: 0.54rem;
            height: 0.54rem;
            left: 1.2rem;
            top: 0.64rem;
            position: absolute;
        }
    }
}
</style>
