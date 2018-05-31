import { script } from '@utils/http.js';

export default {
	props: {
		config: { // txvlive参数配置
			type: Object,
			default: () => {}
		},
		vid: { // 直播流视频
			type: [String, Number],
			default: ''
		}
	},
	data() {
		return {
			defaultConfig: {
				autoplay: true,
				height: '100%',
				width: '100%',
				containerId: 'vlive', // 容器id名 (必填)
				vid: '' // 直播id
			}
		};
	},
	watch: {
		vid (id) {
			this._play(id);
		}
	},
	methods: {
		async _getTxvLiveJs () {
			if (window.TxvLive) return window.TxvLive;
			await script({
				url: '//vm.gtimg.cn/tencentvideo/txvlive/2017/txvlive.js',
				loadRemove: false
			});
			return window.TxvLive;
		},
		async _play (vid) {
			Object.assign(this.defaultConfig, this.config);
			if (!vid) {
				console.error(new Error('vid is undefined. init video error'));
				return;
			}
			this.defaultConfig.vid = vid;

			if (!window.TxvLive) {
				await this._getTxvLiveJs();
			}
			window.__txvlive = new window.TxvLive(this.defaultConfig);
		}
	},
	template: `<div id='vlive' class="tx-player">
				</div>`,
	mounted() {
		this._play(this.vid);
	}
};
