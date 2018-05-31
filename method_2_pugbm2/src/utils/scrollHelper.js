/* iscroll-helper */
import Vue from 'vue';
// 异步加载iscroll.js
export const loadIScroll = () => import(/* webpackChunkName: "IScroll" */'@lib/iscroll-probe.js');
// 绑定resize事件
export const bindResize = (callback, name) => {
	let timer = null;
	name = name ? 'resize.' + name : 'resize';
	function handleScale() {
		clearTimeout(timer);
		timer = setTimeout(() => {
			let type;
			if (window.innerWidth >= window.innerHeight) {
				// 横屏
				type = 1;
			} else {
				// 竖屏
				type = 2;
			}
			if (typeof callback === 'function') {
				callback(type);
			}
		}, 116);
	}
	$(window).on(name, function() {
		handleScale();
	});
};
// handle, scrolEndCallback, direction, initCallback, lengthToBottom
export const iscrollToLoadMore = async (opts = {}, iscrollConfig = {}) => {
	let defaultOpts = {
		el: window, // 绑定iscroll元素
		direction: 'up', // up上拉
		lengthToBottom: 100, // 滚动触发距离
		scrollCallBack () {}
	};
	opts = Object.assign({}, defaultOpts, opts);
	let elType = toString.call(opts.el);
	if (elType && elType.indexOf('Element]') === -1) {
		console.error('------Init IScroll error. opts.el must be Element------');
		return;
	}
	let IScroll = await loadIScroll();
	return new Promise((resolve, reject) => {
		let instance;
		// 如果元素有注册iscroll直接返回不继续注册
		if (opts.el.IScrollInstance) return;
		setTimeout(() => {
			instance = new IScroll(opts.el, Object.assign({
				click: true,
				preventDefault: false,
				preventDefaultException: {
					tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
				},
				mouseWheel: true,
				scrollX: false,
				scrollY: true
			}, iscrollConfig));
			// 横竖屏改变了dom的高度，需要刷新iscroll
			// _this.bindResize(function(type) {
			// 	instance.refresh();
			// });
			// 向元素上挂载刷新iscroll方法
			opts.el.refresh = instance.refresh();
			opts.el.IScrollInstance = instance;
			instance.on('scrollEnd', function () {
				if (opts.direction !== 'up') {
				// 将要到底部或者顶部的时候就开始执行回调，提前加载数据
					if (opts.lengthToBottom + this.y >= 0) {
						opts.scrollCallBack && opts.scrollCallBack(instance);
					}
				} else {
					if (-1 * this.maxScrollY + this.y <= opts.lengthToBottom) {
						opts.scrollCallBack && opts.scrollCallBack(instance);
					}
				}
			});
			// 默认调用一次
			Vue.nextTick(resolve.bind(null, instance));
		}, 100);
	});
};
