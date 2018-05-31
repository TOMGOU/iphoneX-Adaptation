<template>
    <div class="video" id="g-video">
    <!-- 内容编写区 S -->
        <div class="inside-wrap" id="PCont">
            <div class="video_box">
                <div class="video_box_top">
                    <p class="video_type" v-for="(item, index) in videoTypeList" :key="item.navId" :class="{select_video: videoTypeIndex==index}">
						<a href="javascript:;" @click="navAction(item.navId, index)">
							{{item.text}}
						</a>
					</p>
                    <!-- <p class="video_type"><a  href="javascript:;" @click="typeChoose()">赛事集锦</a></p> -->
                </div>
                <div class="match_video" style="display: block;">
                    <!-- <table class="match_info" border="1" v-show="videoTypeIndex == 0">
                        <tr>
                            <td class="info_title" @click="navAction(3861)">赛事</td>
                            <td class="info_contant">
                                <a v-for="item in matchNavList" :key="item.navId" href="javascript:;" @click="navAction(item.navId)" :class="{select_color: matchNavId==item.navId}">
                                    {{item.text}}
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td class="info_title">战队</td>
                            <td class="info_contant"><a href="javascript:;" @click="navAction()">XQ</a><a href="javascript:;" @click="navAction()">AG超会玩</a><a href="javascript:;" @click="navAction()">QGhappy</a><a href="javascript:;" @click="navAction()">RNG.M</a><a href="javascript:;" @click="navAction()">EDG.M</a></td>
                        </tr>
                        <tr>
                            <td class="info_title">选手</td>
                            <td class="info_contant"><a href="javascript:;" @click="navAction()">猫神</a><a href="javascript:;" @click="navAction()">辰鬼</a><a href="javascript:;" @click="navAction()">fly</a><a href="javascript:;" @click="navAction()">老杨</a><a href="javascript:;" @click="navAction()">老王</a></td>
                        </tr>
                    </table> -->
                    <scroll-helper ref="vScroll" :canLoadMore="true" @loadMore="handleLoreMore">
                        <div class="video_list">
                            <div class="video_list_box" v-for="(item, index) in listData" :key="index">
                                <router-link :to="{name: 'vdetail', params: {id: item.iVideoId}}">
                                <!--  <video class="video_v_playing"  src="http://1.189.219.7/huya-w6.huya.com/1814/28310155/1300/572d18375088180e9b77b23647202e23.mp4" width="100%" height="100%" frameborder="0"></video> -->
                                    <img class="video_list_img" :src="item.sIMG">
                                    <img class="video_play2" src="@assets/img/index_videoPlay_logo.png">
                                    <div class="video_bt">
                                        <div class="liulang"><img class="liulang_logo" src="@assets/img/index_liuliang.png">  {{item.iTotalPlay}}</div>
                                        <div class="index_date">{{item.sCreated | distanceTime}}</div>
                                    </div>
                                    <div class="video_list_title">{{item.sTitle}}</div>
                                </router-link>
                            </div>
                        </div>
                    </scroll-helper>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '@utils/http.js';

export default {
	name: 'vvideo',
	data() {
	    return {
			videoTypeList: [
				{navId: 3861, text: '赛事回放'},
				{navId: 3862, text: '赛事集锦'}
			], // 头部导航列表数组
			videoTypeIndex: 0, // 头部导航当前选中的下标，默认选中第一项
	        matchNavList: [
	            {navId: 4261, text: 'TGA'}
	            // {navId: 4041, text: 'QGC'},
	            // {navId: 4071, text: 'WGC'},
	            // {navId: 4042, text: '城市赛'},
	            // {navId: 4043, text: '校园赛'}
	        ], // 导航数据数组
	        allMatchData: {}, // 所有视频列表数据
	        listData: [], // 当前选中的视频列表数据
			matchNavId: 3861, // 赛事导航选中id，默认为赛事回放id
			pageSize: 12, // 一页请求的数据条数
			pageNum: 1, // 当前请求数据的页码
			totalPage: 1, // 总页码
        	canRequire: false // 能否请求下一次数据，截流
	    };
	},
	mounted() {
		this.getData();
	},
	methods: {
	    getData() {
			let id = this.matchNavId;
	        get({
	            url: '//apps.game.qq.com/wmp/v3.1/',
	            params: {
	                p1: 'searchKeywordsList',
	                r0: 'cors',
	                r1: 'userObj',
	                order: 'sIdxTime',
	                pagesize: this.pageSize,
	                page: this.pageNum,
	                type: 'iTag',
	                source: 'client_circle_detail',
	                p0: 77,
	                id
	            }
	        }).then(res => {
				// console.log(res);
				if (!res.msg.result) return;
				let { result, totalpage } = res.msg;
				if (!this.allMatchData[id]) {
					// 没有当前数据，初始化
					this.allMatchData[id] = {
						data: []
					};
				}
				this.allMatchData[id].data = this.allMatchData[id].data.concat(result);
				this.listData = this.listData.concat(result);
				this.totalPage = totalpage;
				this.pageNum = this.pageNum + 1;
				this.canRequire = true;
	        });
	    },
	    typeChoose() {
        	//
		},
		// 导航切换 参数1：赛事id， 参数2：头部导航下标
	    navAction(id, index) {
			if (id == this.matchNavId) return;
			if (index != undefined) {
				this.videoTypeIndex = index;
			}
			// 滚动回顶部
			this.$refs.vScroll.scrollTo();
			// 如果有数据，保存当前赛事页数和总页数
			if (this.allMatchData[this.matchNavId]) {
				this.allMatchData[this.matchNavId].pageNum = this.pageNum;
				this.allMatchData[this.matchNavId].totalPage = this.totalPage;
			}
			this.matchNavId = id;
	        if (this.allMatchData[id]) {
				// 取出将要切换到的赛事的数据
				this.listData = this.allMatchData[id].data;
				this.totalPage = this.allMatchData[id].totalPage;
				this.pageNum = this.allMatchData[id].pageNum;
				this.canRequire = true;
			} else {
				// 重置
				this.listData = [];
				this.pageNum = 1;
				this.totalPage = 1;
	        	this.getData();
			}
		},
		// 加载更多
		handleLoreMore() {
			if (this.pageNum > this.totalPage || !this.canRequire) return;
			this.canRequire = false;
			this.getData();
		}
	}
};
</script>

<style lang="scss">
@import '../../assets/scss/mixin.scss';
#g-video {
    height: 100%;
    
    @include land {
		.video_box {
            height: 100%;
        }
	}
    div#PCont {
        position: absolute;
        width: 11.18rem;
        height: calc(100% - 30px);
        left: 1.88rem;
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
    .video_box {
        position: absolute;
        left: 0;
        top: 0;
        width: 11.19rem;
        // height: 6.14rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_boxbg.png)
        no-repeat;
        background-size: 100% 100%;
        font-size: 0.25rem;
        color: #ffffff;
        // overflow: scroll;
        // -webkit-overflow-scrolling: touch;
    }
    // .video_box::-webkit-scrollbar {
    //     display: none;
    // }
    .video_box_top {
        width: 100%;
        height: 0.72rem;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.5);
    }
    .video_type {
        width: 50%;
        height: 100%;
        float: left;
        text-align: center;
        line-height: 0.72rem;
    }
    .match_video {
        margin-top: 0.25rem;
        margin-left: 0.69rem;
        width: 10rem;
        height: calc(100% - 0.98rem);
        display: none;
    }
    .match_info {
        border-collapse: collapse;
        border-color: #e5e5e5;
    }
    .match_info tr {
        height: 0.58rem;
        width: 10rem;
    }

    .info_title {
        width: 1.2rem;
        text-align: center;
    }
    .info_contant {
        width: 8.78rem;
    }
    .match_info td a {
        float: left;
        margin-left: 0.6rem;
    }
    .video_list {
        // margin-top: 0.15rem;
        width: 10.41rem;
        overflow: hidden;
    }
    .video_list_box {
        float: left;
        width: 3.03rem;
        height: 2.1rem;
        position: relative;
        margin-bottom: 0.3rem;
        margin-right: 0.44rem;
        /*border: 0.01rem solid #FFFFFF;*/
    }
    .video_list_box a{
        display: block;
        height: 100%;
    }
    .video_play2 {
        width: 0.66rem;
        height: 0.66rem;
        position: absolute;
        top: 0.49rem;
        left: 1.19rem;
    }
    .video_v_playing {
        width: 3.03rem;
        height: 1.66rem;
    }
    .video_list_img {
        width: 3.03rem;
        height: 1.66rem;
    }
    .video_bt {
        position: absolute;
        width: 100%;
        height: 0.31rem;
        top: 1.35rem;
        line-height: 0.31rem;
        // background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_video_topbg.png) no-repeat;
        background: url(../../assets/img/index_video_topbg.png) no-repeat;
        background-size: 100% 100%;
    }
    .liulang {
        font-size: 0.23rem;
        float: left;
        margin-left: 0.12rem;
    }
    .liulang_logo {
        margin-top: 0.02rem;
        width: 0.3rem;
        height: 0.24rem;
        /*line-height: 0.24rem;*/
    }
    .index_date {
        float: right;
        font-size: 0.2rem;
        margin-right: 0.12rem;
    }
	.video_list_title {
		// display: -webkit-box;
		// -webkit-box-orient: vertical;
		// -webkit-line-clamp: 2;
		// overflow: hidden;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
	}
    .select_video {
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_choose.png)
        no-repeat;
        background-size: 100% 100%;
    }
    .select_color {
        color: #ff9000;
    }
    .video_type a {
        font-size: 0.22rem;
        color: #9f9c97;
		display: block;
    }
    .select_video a {
        color: #fff;
        font-weight: bold;
    }
    .info_title {
        color: #e5e5e5;
    }
    .info_contant {
        color: #dadbdb;
    }

    @media all and (orientation: portrait) {
        div#PCont {
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: visible;
        }
        .video_box {
            width: 100%;
            // height: 100%;
			height: auto;
			bottom: 1.2rem;
            font-size: 0.25rem;
            color: #ffffff;
            // overflow: scroll;
        }
        .match_video {
            margin-top: 0.25rem;
            margin-left: 0;
            width: 100%;
            height: calc(100% - 0.98rem);
            display: none;
        }
        .match_info tr {
            height: 0.58rem;
            width: 100%;
        }
        .info_title {
            width: 1%;
            text-align: center;
        }
        .info_contant {
            width: 4%;
        }
        .match_info td a {
            float: left;
            margin-left: 0.3rem;
        }
        .video_list {
            margin-top: 0.15rem;
            width: 100%;
        }
        .video_list_box {
            float: left;
            width: 3.03rem;
            height: 2.16rem;
            position: relative;
            margin: auto 0.3rem 0.3rem 0.3rem;
            /*border: 0.01rem solid #FFFFFF;*/
        }
    }
}
</style>
