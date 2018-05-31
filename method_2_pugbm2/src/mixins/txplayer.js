import { script } from '@utils/http.js';
import tokenParams from '@utils/tokenParams.js';
// 带_开头的方法一般性不手动调用, 由内部方法调用
// 1.通过mixins方式引入该模块
// 2.在组件内中的mounted created生命周期函数调用initVideo传入初始化参数
// 3. 传入videoId调用playVideo, (先回查询sVID > 初始化播放器 > 更新数据)
export default {
	data () {
		return {
			player: null,
			queryParams: tokenParams,
			defaultConfig: {
				autoplay: false,
				showLoopPlay: true,
				useConnectionPlay: true,
				height: '100%',
				width: '100%',
				showHTML5Switch: true,
				containerId: 'video_player', // 容器id名 (必填)
				vid: '' // 视频id (必填)
			}
		};
	},
	methods: {
		async _getTxPlayerJs () {
			if (window.Txplayer) return window.Txplayer;
			await script({
				url: '//vm.gtimg.cn/tencentvideo/txp/js/txplayer.js',
				loadRemove: false
			});
			return window.Txplayer;
		},
		async _getVid (id) {
			let {
				openid: openId,
				channel,
				partition,
				agent
			} = this.queryParams;
			if (!id) {
				console.error(new Error('请传入视频id. init error'));
				return;
			}
			await script({
				url: '//apps.game.qq.com/wmp/v3.1/public/search.php?p0=18&source=client_circle_detail',
				params: {
					openId,
					id,
					agent,
					channel,
					area: partition
				}
			});
			const {
				status, msg
			} = window.searchObj;
			if (status === 0) {
				return msg.sVID;
			}
			return '';
		},
		async _updatePlayCount (vid) {
			let {
				openid: openId,
				channel,
				partition,
				agent
			} = this.queryParams;
			script({
				url: '//apps.game.qq.com/wmp/v3.1/?p0=18&p1=updateTotalPlay&source=client_circle_detail&p5=1&p3=1',
				params: {
					openId,
					p2: vid,
					channel,
					area: partition,
					agent
				}
			});
		},
		async _play (vid) {
			let playerConfig = Object.assign({}, this.defaultConfig),
				{
					containerId
				} = playerConfig;
			if (!vid) {
				console.error(new Error('vid is undefined. init error'));
				return;
			}
			if (!containerId) {
				console.error(new Error('请指定显示视频的元素Id . init error'));
				return;
			}
			if (containerId.indexOf('#') === 0) {
				playerConfig.containerId = containerId.slice(1);
			}
			if (!document.querySelector(`#${containerId}`)) {
				console.error(new Error('未获取到该元素 . init error'));
				return;
			}
			playerConfig.vid = vid;
			if (this.player) {
				this.player.play(vid);
			} else {
				if (!window.Txplayer) {
					await this._getTxPlayerJs();
				}
				this.player = new window.Txplayer(playerConfig);
			}
			this._updatePlayCount(vid);
		},
		async initVideo (config = {}) { // 初始化加载 txplayer 及参数配置
			Object.assign(this.defaultConfig, config);
			let player = await this._getTxPlayerJs();
			return player;
		},
		playVideoBySvid (svid) {
			this._play(svid);
		},
		async playVideo (videoId) { // 调用播放
			await this._getTxPlayerJs();
			let vid = await this._getVid(videoId);
			this._play(vid);
		}
	}
};
