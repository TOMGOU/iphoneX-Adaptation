import Vue from 'vue';
import router from './router/index.js';
import './vue-init/index.js';
import '@assets/js/zepto.pjax.min.js';
import '@assets/js/common.js';
import Autolandacr from '@assets/js/prompt.js';
import '@css/common.css';

import Comment from '@tencent/comment';

Vue.use(Comment);
const comment = new Comment({
	options: {
		gameid: 'pubgm',
		moduleId: 'video_mobile'
	},
	// replyMode: 'button',
	infinite: 'click',
	theme: 'dark'
});
localStorage.setItem('version', process.env.VERSION);
new Vue({
	el: '#app',
	router,
	comment,
	data: {
		width: '',
		height: ''
	},
	mounted() {
		this.width = document.documentElement.clientWidth;
		this.height = document.documentElement.clientHeight;
	}
});

window.pageControl = () => {};
// webpack处理, 当html有更改的时候触动自动刷新页面 打包的时候会自动被删除掉
// if (process.env.NODE_ENV === 'development') {
// 	require('./index.html');
// }

Autolandacr({
	id: 'autots', // 注入父级ID..
	dir: '0' // 填入1\0;  1代表横屏提示.0代表竖屏提示.默认带横竖屏input.空白默认为1
});
