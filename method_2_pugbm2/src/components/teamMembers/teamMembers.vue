<template>
	<div class="worker_summary">
		<div class="team_contant">
			<img class="worker" :src="memberData.icon">
			<div class="word_box">
				<p class="team_title2">{{memberData.name}}</p>
				<!-- <div class="like_box"> -->
				<div class="like_box" @click="fabulousAcation">
					<img class="like" src="@assets/img/more_xin.png" :style="!isFabulous && {opacity: 0.4}">
					 {{fabulousNum}}
				</div>
				<div class="team_text">{{memberData.descr}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { jsonp } from '@utils/http.js';
export default {
	name: 'team-member',
	props: {
		memberData: {
			type: Object,
			default: () => {}
		},
		teamId: {
			type: String,
			required: true,
			default: ''
		}
	},
	data() {
		return {
			isFabulous: false, // 是否点赞该视频，默认为false
			fabulousNum: null, // 点赞次数
			memberId: null, // 队员点赞id
			canFabulous: true // 是否可以点赞/取消点赞，默认true，正在请求过程则为false
		};
	},
	mounted() {
		// 查询用户点赞情况
		this.queryIsOperation();
	},
	watch: {
		memberData() {
			// 查询用户点赞情况
			this.queryIsOperation();
		}
	},
	methods: {
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
			let res = await jsonp({
				url: '//app.ingame.qq.com' + url,
				params: Object.assign({
					game: 'pubgm',
					operate_type: 1,
					bid: 'team_like',
					channel: 4,
					works_id: this.memberId,
					works_type: 11, // 1视频，2文章，11战队
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
			// 重置点赞数据
			this.memberId = this.teamId * 10000 + Number(this.memberData.id);
			this.isFabulous = false;
			this.fabulousNum = null;
			this.canFabulous = true;
			// 查询该用户是否点赞过
			this.getFabulousData({
				url: '/php/ingame/interactcenter/query_my_operate_resource.php',
				params: {
					start: 0,
					num: 100
				}
			}).then(res => {
				// console.log(res.data.workslist);
				res.data.workslist.map(item => {
					if (item.works_id == this.memberId) {
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
		}
	}
};
</script>
