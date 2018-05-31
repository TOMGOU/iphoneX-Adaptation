<template>
    <div class="matchInfo" id="g-matchInfo">
    <!-- 内容编写区 S -->
        <div class="inside-wrap" id="PCont">
            <div class="matchInfo_box">
            <div class="box_top">
                <div class="top_title">
                    <img class="title_logo" src="//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_schedule1.png">
                        <p class="title_text">赛事资讯</p>
                </div>
                <div class="top_nav">
                    <ul class="nav_info">
                        <li v-for="item in navList" :key="item.navId">
                            <a :class="{select_color: infoId==item.navId}" href="javascript:;" @click="navAction(item.navId)" :ontouchend="item.touch">
                                {{item.text}}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <scroll-helper ref="mScroll" @ISResize="handleResize" :canLoadMore="true" @loadMore="handleLoreMore" :styleObj="{height: 'calc(100% - 0.97rem)'}">
                <div class="info_choose_box" style="display: block;">
                    <div class="box_contant" v-for="(item, index) in listData" :key="index">
                        <div class="info_box">
                            <router-link :to="{name: 'detail', params: {id: item.iNewsId}}">
                                <div class="info_box_left">
                                    <div class="info_text">{{item.sTitle}}</div>
                                    <div class="liulang"><img class="liulang_logo" src="@assets/img/index_liuliang.png">  {{item.iTotalPlay}}</div>
                                    <div class="index_date">{{item.sCreated | formatTime}}</div>
                                </div>
                                <div class="info_box_right"><img class="info_img" :src="item.sIMG"></div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </scroll-helper>
        </div>
        </div>
    </div>
</template>

<script>
import { get } from '@utils/http.js';

export default {
	name: 'match-info',
	data() {
	    return {
	        navList: [
	            {navId: 3808, text: '最新资讯', touch: "window.PTTSendClick('btn','news','最新资讯');"},
	            {navId: 4066, text: 'TGA', touch: "window.PTTSendClick('btn','TGA','TGA');"},
	            // {navId: 4067, text: 'QGC', touch: "window.PTTSendClick('btn','QGC','QGC');"},
	            {navId: 4068, text: 'WGC', touch: "window.PTTSendClick('btn','WGC','WGC');"}
	            // {navId: 4069, text: '城市赛', touch: "window.PTTSendClick('btn','citygame','城市赛');"},
	            // {navId: 4070, text: '校园赛', touch: "window.PTTSendClick('btn','schoolgame','校园赛');"}
	        ], //导航数据数组
	        allData: {}, //存放所有图文列表数据
	        listData: [], //当前选中的图文列表数据
			ISStyle: { // iscroll的滚动容器标签样式对象
				height: '5.16rem'
			},
			infoId: 3808, // 导航选中id，默认为最新资讯id
			pageSize: 8, // 一页请求的数据条数
			pageNum: 1, // 当前请求数据的页码
			totalPage: 1, // 总页码
        	canRequire: false // 能否请求下一次数据，截流
	    };
	},
	filters: {
	    formatTime(val) {
			if (!val) return val;
			val = val.replace(/-/g, '/');
	        var d = new Date(val);
	        var month = d.getMonth() + 1;
	        var date = d.getDate();
	        month = month < 10 ? '0' + month : month;
	        date = date < 10 ? '0' + date : date;
	        return month + '-' + date;
	    }
	},
	mounted() {
	    this.getData();
		this.$refs.mScroll.bindResize();
	},
	methods: {
	    getData() {
			let id = this.infoId;
	        get({
	            url: '//apps.game.qq.com/wmp/v3.1/',
	            params: {
	                p1: 'searchNewsKeywordsList',
	                r0: 'cors',
	                r1: 'userObj',
	                order: 'sIdxTime',
	                pagesize: this.pageSize,
	                page: this.pageNum,
	                type: 'iTag',
	                source: 'client_circle_detail',
	                p0: 77,
	                id: id
	            }
	        }).then(res => {
				if (!res.msg.result) return;
				let { result, totalpage } = res.msg;
				if (!this.allData[id]) {
					// 没有当前数据，初始化
					this.allData[id] = {
						data: []
					};
				}
				this.allData[id].data = this.allData[id].data.concat(result);
				this.listData = this.listData.concat(result);
				this.totalPage = totalpage;
				this.pageNum = this.pageNum + 1;
				this.canRequire = true;
	        });
	    },
	    navAction(id) {
			if (id == this.infoId) return;
			// 滚动回顶部
			this.$refs.mScroll.scrollTo();
			// 如果有数据，保存当前赛事页数和总页数
			if (this.allData[this.infoId]) {
				this.allData[this.infoId].pageNum = this.pageNum;
				this.allData[this.infoId].totalPage = this.totalPage;
			}
			this.infoId = id;
			if (this.allData[id]) {
				// 取出将要切换到的赛事的数据
				this.listData = this.allData[id].data;
				this.totalPage = this.allData[id].totalPage;
				this.pageNum = this.allData[id].pageNum;
				this.canRequire = true;
			} else {
				// 重置
				this.listData = [];
				this.pageNum = 1;
				this.totalPage = 1;
	        	this.getData();
			}
		},
		// 屏幕旋转
		handleResize(type) {
			if (type == 1) {
				this.ISStyle.height = '5.16rem';
			} else {
				this.ISStyle.height = '10.8rem';
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
#g-matchInfo {
    height: 100%;
    
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
    .matchInfo_box {
        position: absolute;
        top: 0;
        left: 0;
        width: 11.19rem;
        // height: 6.14rem;
        height: 100%;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_boxbg.png)
        no-repeat;
        background-size: 100% 100%;
        font-size: 0.25rem;
        color: #ffffff;
        // overflow: scroll;
        // -webkit-overflow-scrolling: touch;
    }
    // .matchInfo_box::-webkit-scrollbar {
    //     display: none;
    // }
    .box_top {
        width: 100%;
        height: 0.47rem;
        margin-bottom: 0.5rem;
    }
    .top_title {
        width: 2.01rem;
        height: 0.47rem;
        margin: 0.28rem 0.36rem auto 0.54rem;
        /*border: 0.01rem solid red;*/
        line-height: 0.47rem;
        float: left;
    }
    .title_logo {
        float: left;
        height: 0.28rem;
        width: 0.08rem;
        margin-top: 0.08rem;
        margin-right: 0.15rem;
    }
    .title_text {
        font-size: 0.44rem;
        float: left;
    }
    .top_nav {
        float: left;
        height: 0.3rem;
        margin-top: 0.45rem;
        /*border: 0.01rem solid red;*/
    }
    .nav_info li {
        float: left;
        width: 1.3rem;
        display: block;
        text-align: center;
        border-right: 0.01rem solid rgba(211, 211, 211, 0.5);
        height: 0.3rem;
    }
    .nav_info li a{
        display: block;
    }
    .box_contant {
        height: 1.8rem;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.5);
    }
    .info_box {
        margin-left: 0.54rem;
        height: 1.8rem;
        /*border-bottom: 0.01rem solid #e5e5e5;*/
        /*	border: 0.01rem solid red;*/
    }
    .info_box_left {
        /*	border: 0.01rem solid red;*/
        width: 7.4rem;
        margin-top: 0.3rem;
        float: left;
    }
    .info_text {
        word-wrap: break-word;
        font-size: 0.29rem;
    }
    .info_box_right {
        float: right;
        margin-right: 0.54rem;
        margin-top: 0.3rem;
    }
    .info_img {
        width: 2.15rem;
        height: 1.21rem;
    }
    .liulang {
        font-size: 0.23rem;
        float: left;
        margin-left: 0.12rem;
        margin-top: 0.24rem;
    }
    .liulang_logo {
        width: 0.3rem;
        height: 0.24rem;
    }
    .index_date {
        float: right;
        font-size: 0.2rem;
        margin-right: 0.12rem;
        margin-top: 0.24rem;
    }
    .select_color {
        color: #ff9000;
    }
    .info_choose_box {
        display: none;
    }
    @media all and (orientation: portrait) {
        div#PCont {
            width: 100%;
            height: auto;
            left: 0;
            top: 0;
            bottom: 1.2rem;
            overflow: visible;
        }
        .matchInfo_box {
            width: 100%;
            height: 100%;
            font-size: 0.25rem;
            color: #ffffff;
            // overflow: visible;
        }
        .top_title {
            margin-left: 0.2rem;
            float: none;
        }
        .nav_info li {
            float: left;
            width: 16%;
            display: block;
            text-align: center;
            border-right: 0.01rem solid rgba(211, 211, 211, 0.5);
            height: 0.3rem;
        }
        .top_nav {
            width: 100%;
            margin-top: 0.25rem;
        }
        .info_box {
            margin-left: 0.2rem;
        }
        .info_text {
            word-wrap: break-word;
            font-size: 0.24rem;
        }
        .info_box_left {
        /*	border: 0.01rem solid red;*/
            width: 70%;
            margin-top: 0.3rem;
            float: left;
        }
        .info_box_right {
            float: right;
            margin-right: 0.2rem;
            margin-top: 0.3rem;
        }
        .info_img {
            width: 1.8rem;
            height: 1rem;
        }
    }
}
</style>

