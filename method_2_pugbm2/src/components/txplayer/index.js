import { script } from '@utils/http.js';
import tokenParams from '@utils/tokenParams.js';
import regEvents from './event.js';
// 事件支持与vue事件一致 @play-state-change="fn" 所支持事件请移步./event.js

export default {
	props: {
		config: { // txplayer参数配置
			type: Object,
			default: () => {}
		},
		videoId: { // 未获取到实际id的(一般为数字组成的)
			type: [String, Number],
			default: ''
		},
		svid: { // 获取到实际id的(一般为数字加字母的)
			type: [String, Number],
			default: ''
		}
	},
	data () {
		return {
			queryParams: tokenParams,
			defaultConfig: {
				autoplay: false,
				showLoopPlay: true,
				useConnectionPlay: true,
				height: '100%',
				width: '100%',
				showHTML5Switch: true,
				containerId: 'player_' + Math.random().toString().slice(-5), // 容器id名 (必填)
				vid: '' // 视频id
			}
		};
	},
	watch: {
		videoId (val) {
			this.playVideo(val);
		},
		svid (id) {
			this.playVideoBySvid(id);
		}
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
		async _play (vid, flag = true) {
			Object.assign(this.defaultConfig, this.config);
			if (!vid) {
				console.error(new Error('vid is undefined. init video error'));
				return;
			}
			this.defaultConfig.vid = vid;

			// 先销毁重new
			// if (window.__player && flag) {
			// 	window.__player && window.__player.destroy();
			// }

			if (!window.Txplayer) {
				await this._getTxPlayerJs();
			}
			window.__player = new window.Txplayer(this.defaultConfig);

			window.__player.on('browserFullscreenChange', (isFull) => {
				if (isFull === true) {
					document.body.appendChild(this.$el);
				} else {
					this.$el.$commentEl.parentNode.insertBefore(this.$el, this.$el.$commentEl);
				}
				this.$nextTick(() => {
					window.__player.play(this.defaultConfig.vid);
				});
				this.$emit('browser-fullscreen-change', isFull);
			});
			regEvents.call(this, window.__player);
			this._updatePlayCount(vid);
		},
		playVideoBySvid (svid) {
			this._play(svid);
		},
		async playVideo (videoId) { // 调用播放
			await this._getTxPlayerJs();
			let vid = await this._getVid(videoId);
			this._play(vid);
		}
	},
	async created () {
		this._getTxPlayerJs();
	},
	render (h) {
		return (
			<div
				id={this.defaultConfig.containerId}
				class="tx-player">
				<slot></slot>
			</div>
		);
	},
	mounted () {
		let commentEl = document.createComment(`txplayer of ${this.defaultConfig.containerId}`);
		this.$el.$commentEl = commentEl;
		this.$el.parentNode.insertBefore(commentEl, this.$el);
		if (this.svid) {
			this.playVideoBySvid(this.svid);
		}
	}
};
