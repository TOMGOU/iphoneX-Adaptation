<template>
    <div class="more" id="g-more">
    <!-- 内容编写区 S -->
        <div class="inside-wrap" id="PCont">
            <div class="more_box">
                <ul class="nav">
                    <!-- <li v-for="(item, index) in matchListData" :key="index" :class="{active: index == matchSelectIndex}">
						<a  href="javascript:;" @click="matchNavAction(index, item.id)">
							{{item.short_title}}
						</a>
					</li> -->
                    <!-- <li class="active"><a  href="javascript:;" @click="matchNavAction()" ontouchend="PTTSendClick('btn','TGA','TGA');">TGA</a></li>
                    <li><a  href="javascript:;" @click="matchNavAction()" ontouchend="PTTSendClick('btn','QGC','QGC');">QGC</a></li>
                    <li><a  href="javascript:;" @click="matchNavAction()" ontouchend="PTTSendClick('btn','WGC','WGC');">WGC</a></li>
                    <li><a  href="javascript:;" @click="matchNavAction()" ontouchend="PTTSendClick('btn','citygame','城市赛');">城市赛</a></li>
                    <li><a  href="javascript:;" @click="matchNavAction()" ontouchend="PTTSendClick('btn','schoolgame','校园赛');">校园赛</a></li> -->
                </ul>
                <div class="more_choosebox" id="office_div" style="display: block;">
                    <ul class="left_nav">
                        <li class="left_nav_top"></li>
                        <li v-for="(item, index) in sideNavList" :key="index" :class="sideNavIndex == index ? item.className + ' select_match' : item.className">
							<a href="javascript:;" @click="sideNavAction(index)" :ontouchend="item.touch">
								{{item.text}}
							</a>
						</li>
                    </ul>
                    <div class="more_team m_t1" v-show="sideNavIndex == 0">
						<scroll-helper :wrapperStyle="{overflow: 'hidden', minHeight: '100%'}">
							<div class="office_top">
								<img class="team_logo" :src="curMatchInfo.url || ''">
								<div class="office_right">
									<div class="office_title">{{curMatchInfo.title}}</div>
									<div class="jiangjin">{{curMatchInfo.reward | formatReward}}</div>
								</div>
							</div>
							<div class="office_box">
								{{curMatchInfo.descr}}
							</div>
                            <div class="office_box office_rule">
                                <h3>赛事规则</h3>
                                <div v-html="curMatchInfo.rule"></div>
                            </div>
						</scroll-helper>
                    </div>
                    <div class="more_team m_t2" v-show="sideNavIndex == 1">
						<scroll-helper>
							<div class="team_logo_list">
								<scroll-helper :myScrollConfig="{scrollX: true, scrollY: false}" :wrapperStyle="{display: 'inline-block', height: '100%'}">
									<ul>
										<a href="javascript:;" v-for="(item, index) in curWarTeamData" :key="index" @click="warTeamSelect(index, item.id)">
											<img class="team_logo" :src="item.logo + '?' + Math.random().toString().slice(-3)">
										</a>
									</ul>
								</scroll-helper>
							</div>
							<div class="team_summary">
								<div class="info_tip1">
									<img class="index_schedule1" src="//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_schedule1.png">
									<div>战队简介</div>
								</div>
								<div class="team_contant">
									<div class="team_logo_box">
										<img class="office_team_logo" :src="curWarTeamData.length>0 ? curWarTeamData[warTeamIndex].logo : ''">
									</div>
									<div>
										<p class="team_title">{{curWarTeamData.length>0 ? curWarTeamData[warTeamIndex].name : ''}}</p>
										<div class="team_text team_text2">
											{{curWarTeamData.length>0 ? curWarTeamData[warTeamIndex].descr : ''}}
										</div>
									</div>
								</div>
							</div>
							<div class="info_tip1">
								<img class="index_schedule1" src="//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/index_schedule1.png">
								<div>战队队员</div>
							</div>
							<team-member v-for="(item, index) in curTeamMembers.teamMemList" :key="index" :memberData="item" :teamId="curTeamMembers.teamId"></team-member>
						</scroll-helper>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '@utils/http.js';
import teamMembers from '@comps/teamMembers/teamMembers.vue';
export default {
	name: 'more',
	components: {
		[teamMembers.name]: teamMembers
	},
	data() {
		return {
			matchListData: [], // 赛事列表
			matchSelectIndex: 0, // 选中的赛事的下标，默认选中第一个
			curMatchInfo: {}, // 当前选中赛事的赛事简介
			allWarTeamData: {}, // 存放所有战队数据
			curWarTeamData: {}, // 当前选中的战队数据
			warTeamIndex: 0, // 战队选中的下标，默认选中第一个
			sideNavIndex: 0, // 侧边导航选中下标
			matchTeamMembersData: {}, // 当前赛事的所有战队队员数据
			curTeamMembers: {}, // 当前选中的战队队员数据
			sideNavList: [
				{text: '赛事简介', touch: "window.PTTSendClick('btn','Event Info','赛事简介');", className: 'introduce intro1'},
				{text: '战队简介', touch: "window.PTTSendClick('btn','content','战队简介');", className: 'introduce intro2'}
				// {text: '赛程', touch: "window.PTTSendClick('btn','ScheduleWTAATPFixtures','赛程');", className: 'introduce2'},
				// {text: '赛况数据', touch: "window.PTTSendClick('btn','gamedata','赛况数据');", className: 'match_data match_top'},
				// {text: '战队数据', touch: "window.PTTSendClick('btn','Team data','战队数据');", className: 'match_data'},
				// {text: '选手数据', touch: "window.PTTSendClick('btn','Player data','选手数据');", className: 'match_data'}
			] // 侧边导航列表
		};
	},
	filters: {
		formatReward(reward) {
			if (!reward) return '';
			if (!reward.reward1) return '';
			let reward1 = parseInt(reward.reward1) / 10000;
			let reward2 = parseInt(reward.reward2) / 10000;
			let reward3 = parseInt(reward.reward3) / 10000;
			return `冠军${reward1}万 亚军${reward2}万 季军${reward3}万`;
		}
	},
	mounted() {
		// 赛事列表数据请求
		get({
			url: '//itea-cdn.qq.com/file/ingame/pubgm/matchlist.json'
		}).then((res) => {
			// console.log(res);
			// 将规则数据换行符转成<br />标签
			res.map(item => {
				item.rule = this.formatRule(item.rule);
			});
			this.matchListData = res;
			this.curMatchInfo = res[0];
			this.getWarTeam(res[0].id);
		});
	},
	methods: {
		// 战队数据请求
		getWarTeam(id) {
			get({
				url: '//itea-cdn.qq.com/file/ingame/pubgm/matchteaminfo' + id + '.json'
			}).then((res) => {
				// console.log(res.teamlist);
				this.curWarTeamData = res.teamlist;
				this.allWarTeamData[id] = res.teamlist; // 保存请求回来的战队数据
				this.getTeamMembers(id, res.teamlist[0].id);
			});
		},
		// 战队队员数据请求
		getTeamMembers(matchId, teamId) {
			get({
				url: '//itea-cdn.qq.com/file/ingame/pubgm/matchteammeminfo' + matchId + '.json'
			}).then(res => {
				// console.log(res, '----------');
				this.matchTeamMembersData = res.teammemlist;
				this.curTeamMembers = res.teammemlist[teamId] || {teamMemList: []}; //兼容数据teammemlist为[]的情况
				this.curTeamMembers.teamId = teamId;
			});
		},
		// 头部导航切换
	    matchNavAction(index, id) {
			if (this.matchSelectIndex == index) return;
			this.sideNavIndex = 0; // 重置侧边导航选中下标
			this.warTeamIndex = 0; // 重置战队选中下标
			this.curTeamMembers = {}; // 清空当前战队队员数据
			this.curMatchInfo = this.matchListData[index]; // 获得当前选中赛事的赛事简介信息数据
			this.matchSelectIndex = index;
			if (this.allWarTeamData[id]) {
				this.curWarTeamData = this.allWarTeamData[id];
				this.getTeamMembers(id, this.curWarTeamData[0].id);
				return;
			}
			this.getWarTeam(id);
		},
		// 侧边导航切换
	    sideNavAction(index) {
			if (index > 1) {
				alert('敬请期待');
				return;
	        }
			this.sideNavIndex = index;
		},
		// 战队导航切换
		warTeamSelect(index, id) {
			this.warTeamIndex = index;
			this.curTeamMembers = this.matchTeamMembersData[id] || {teamMemList: []};
			this.curTeamMembers.teamId = id;
		},
		// 战队规则格式化
		formatRule(rule) {
			if (!rule) return '';
			let arr = rule.split('\n');
			rule = arr.join('<br />');
			return rule;
		}
	}
};
</script>

<style lang="scss">
@import '../../assets/scss/mixin.scss';
#g-more {
    position: relative;
    height: 100%;
    
    div#PCont {
        position: absolute;
        width: 11.18rem;
        height: calc(100% - 30px);;
        left: 1.88rem;
        top: 15px;
        overflow: hidden;
    }
    a {
        text-decoration: none;
        color: #fff;
    }
    .more_box {
        height: 100%;
        // height: 6.14rem;
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/video_boxbg.png) no-repeat;
        background-size: 100% 100%;
        font-size: 0.25rem;
        color: #fff;
        /*border: 0.01rem solid #666;*/
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        margin-bottom: 1rem;
        /*overflow: scroll;*/
    }
    .more_choosebox {
        display: none;
        height: calc(100% - 0.7rem);
    }
    /*nav*/
    .nav {
        color: #9f9c97;
        font-size: 0.26rem;
        height: 0.7rem;
        width: 100%;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
    }
    .nav li {
        width: 1.22rem;
        height: 0.7rem;
        float: left;
        line-height: 0.7rem;
        text-align: center;
        background-image: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/nav_border.png);
        background-position: right top;
        background-size: 0.01rem 0.69rem;
        border-right: 0.01rem solid rgba(211, 211, 211, 0.2);
    }
    .nav li.active {
        color: #fff;
        background-image: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/nav_sel_bg.png);
        background-size: 100%;
        background-position: center;
    }
    .left_nav {
        width: 2.18rem;
        height: 100%;
        left: 0;
        /*margin-top: 1rem;*/
        border-right: 0.01rem solid rgba(169, 169, 169, 0.5);
    }
    .left_nav_top {
        height: 0.39rem;
        width: 100%;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
    }
    .left_nav .introduce {
        width: 2.18rem;
        height: 0.9rem;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
        text-align: center;
        line-height: 0.9rem;
    }
    .left_nav .introduce a,
    .left_nav .introduce2 a,
    .match_data a,
    .nav a {
        font-size: 0.22rem;
        color: #9f9c97;
        display: block;
    }
    .left_nav .select_match a,
    .active a {
        color: #fff;
        font-weight: bold;
    }
    .left_nav .introduce2 {
        width: 2.18rem;
        height: 0.9rem;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
        text-align: center;
        line-height: 0.9rem;
    }
    .match_top {
        margin-top: 0.21rem !important;
    }
    .match_data {
        /*margin-top: 0.5rem;*/
        width: 1.54rem;
        height: 0.54rem;
        background: url();
        text-align: center;
        line-height: 0.54rem;
        border: 0.01rem solid rgba(211, 211, 211, 0.2);
        display: block;
        margin: 0 auto;
        margin-bottom: 0.12rem;
    }
    .match_data p {
        width: 1.54rem;
        height: 0.54rem;
        background: url();
        text-align: center;
        line-height: 0.54rem;
        border: 0.01rem solid rgba(211, 211, 211, 0.2);
        display: block;
        margin: 0 auto;
        margin-bottom: 0.12rem;
    }
    .more_team {
        position: absolute;
        width: 9rem;
        // height: 5.2rem;
        height: calc(100% - 0.7rem);
        left: 2.18rem;
        top: 0.7rem;
        // display: none;
        // overflow: scroll;
        // overflow-x: hidden;
        // -webkit-overflow-scrolling: touch;
        /*border: 0.01rem solid red;*/
    }
    .team_logo_list {
        height: 1.1rem;
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
        // overflow-x: scroll;
        // -webkit-overflow-scrolling: touch;
    }
	.team_logo_list ul {
		height: 100%;
		display: inline-block;
		white-space: nowrap;
	}
	.team_logo_list ul a {
		display: inline-block;
		height: 100%;
	}
    .team_logo {
        width: 1.19rem;
        height: 0.58rem;
        margin-left: 0.52rem;
        margin-top: 0.29rem;
        float: left;
        /*border: 0.01rem solid red;*/
    }
    .index_schedule1 {
        float: left;
        margin: 0.05rem 0.13rem auto 0.58rem;
        height: 0.24rem;
        width: 0.08rem;
    }
    .info_tip1 {
        margin-top: 0.15rem;
    }
    .team_summary,
    .worker_summary {
        border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
		min-height: 1.7rem;
		overflow: hidden;
    }
    .team_contant {
        width: 8.6rem;
        word-wrap: break-word;
        /*border: 0.01rem solid red;*/
        margin-bottom: 0.12rem;
        position: relative;
        margin-bottom: 0.1rem;
    }
    .team_title {
        margin-left: 2.4rem;
        margin-top: 0.1rem;
        font-size: 0.3rem;
        font-weight: 600;
    }
    .team_title2 {
        margin-left: 2.4rem;
        margin-top: 0.1rem;
        font-size: 0.3rem;
        font-weight: 600;
    }

    .team_text {
        margin-left: 2.4rem;
        font-size: 0.24rem;
        margin-top: 0.06rem;
        margin-bottom: 0.2rem;
    }
    .worker {
        width: 0.81rem;
        height: 0.82rem;
        margin-left: 0.77rem;
        margin-top: 0.23rem;
        float: left;
    }
    .like_box {
        right: 0;
        position: absolute;
        top: 0.09rem;
        font-size: 0.18rem;
        min-width: 0.8rem;
        height: 0.3rem;
        text-align: center;
    }
	.like_box img {
        vertical-align: middle;
	}
    .like {
        width: 0.24rem;
        height: 0.19rem;
    }
    .select_match {
        background: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/more_threechoose.png)
        no-repeat;
        background-size: 100% 100%;
    }

    /*官方赛DIV*/
    .office_top {
        margin-top: 0.5rem;
        width: 100%;
        /*border: 0.01rem solid red;*/
        height: 1rem;
    }
    .office_team_logo {
        width: 1.54rem;
        height: 0.77rem;
        margin-left: 0.52rem;
        margin-top: 0.1rem;
        float: left;
    }
    .office_right {
        float: left;
        /*border: 0.01rem solid red;*/
        margin-left: 0.55rem;
    }
    .office_title {
        font-size: 0.43rem;
        color: #ff9f00;
        margin-top: 0;
    }
    .jiangjin {
        font-size: 0.21rem;
    }
    .office_box {
        width: 7.97rem;
        margin-left: 0.52rem;
        word-wrap: break-word;
        margin-top: 0.2rem;
        margin-bottom: 0.25rem;
    }
    .office_rule h3 {
        color: #ff9f00;
        font-weight: normal;
        margin-bottom: 0.1rem;
    }
    @media all and (orientation: portrait) {
        div#PCont {
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            overflow: visible;
        }
        .more_box {
            width: 100%;
            height: 100%;
            font-size: 0.25rem;
            color: #ffffff;
            overflow: visible;
        }
        .nav li {
            width: 20%;
            height: 0.7rem;
            float: left;
            line-height: 0.7rem;
            text-align: center;
            background-image: url(//game.gtimg.cn/images/pubgm/ingameact/a20180321matchcenterwsq/nav_border.png);
            background-position: right top;
            background-size: 0.01rem 0.69rem;
            border-right: 0.01rem solid rgba(211, 211, 211, 0.2);
            box-sizing: border-box;
        }
        .left_nav {
            width: 20%;
            height: 100%;
            left: 0;
            border-right: 0.01rem solid rgba(169, 169, 169, 0.5);
        }
        .left_nav .introduce {
            width: 100%;
            height: 0.9rem;
            border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
            text-align: center;
            line-height: 0.9rem;
        }
        .left_nav .introduce2 {
            width: 100%;
            height: 0.9rem;
            border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
            text-align: center;
            line-height: 0.9rem;
        }
        .match_data {
            width: 1.24rem;
            height: 0.54rem;
            background: url();
            text-align: center;
            line-height: 0.54rem;
            border: 0.01rem solid rgba(211, 211, 211, 0.2);
            display: block;
            margin: 0 auto;
            margin-bottom: 0.12rem;
        }
        .more_team {
            position: absolute;
            width: 78%;
            // height: 100%;
            left: 20%;
            // overflow: visible;
        }
        .office_top {
            margin-top: 0.2rem;
        }
        .office_box {
            width: auto;
            word-wrap: break-word;
            margin: 0.2rem auto 0.25rem 0.2rem;
        }
        .team_logo_list ul {
            height: 1.1rem;
            border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
            width: 9rem;
        }
        .team_logo_list {
            height: 1.1rem;
            border-bottom: 0.01rem solid rgba(211, 211, 211, 0.2);
            width: 6rem;
            // overflow-x: scroll;
            // -webkit-overflow-scrolling: touch;
        }
        .team_logo_list::-webkit-scrollbar {
            display: none;
        }
        .team_contant {
            width: 100%;
            word-wrap: break-word;
            /* border: 0.01rem solid red; */
            margin-bottom: 0.12rem;
            position: relative;
            margin-bottom: 0.1rem;
        }
        .office_team_logo,
        .index_schedule1 {
            margin-left: 0.32rem;
        }
        .like_box {
            left: 1.8rem;
            position: absolute;
            top: 0.44rem;
            font-size: 0.18rem;
            width: 1.5rem;
        }
        .team_title {
            margin-left: 2.2rem;
            margin-top: 0.1rem;
            font-size: 0.25rem;
            font-weight: 600;
        }
        .team_title2 {
            margin-left: 1.8rem;
            margin-top: 0.1rem;
            font-size: 0.25rem;
            font-weight: 600;
        }
        .team_text {
            margin-left: 1.8rem;
            font-size: 0.2rem;
            margin-top: 0.46rem;
            margin-bottom: 0.2rem;
        }
        .team_text2 {
            margin-top: 0.2rem;
            margin-left: 2.2rem;
        }
        .worker {
            width: 1rem;
            height: 1rem;
            margin-left: 0.32rem;
            margin-top: 0.23rem;
            float: left;
        }
    }
}
</style>
