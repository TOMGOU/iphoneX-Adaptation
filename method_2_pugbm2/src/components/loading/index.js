import Vue from 'vue';
// 引入该js , 可以以指令形式使用, 也可以js全局使用
// 方式1: 在元素上v-loading="show"(默认插入写该指令的元素里面) 可选修饰词 .body v-loading.body(节点插入body)
// 方式2: js调用使用(默认插入body)  this.$indicator.open()或者window.Indicator.open()=显示  this.$indicator.close()或者window.Indicator.close()=关闭
const _load = async () => {
	let Loading = await import(/* webpackChunkName: "loading" */'./loading.vue');
	// 兼容webpack2 3 处理
	Loading = Loading.default || Loading;
	Loading = Vue.extend(Loading);
	return new Loading({el: document.createElement('div')});
};

const _init = async (target, instance) => {
	if (target.installed === true) return;
	target.loadingInstance = instance;
	target.installed = true;
	target.appendChild(instance.$el);
};

const _toggle = async (target, visibel) => {
	let instance = await _load();
	_init(target, instance);
	Vue.nextTick(() => {
		target.loadingInstance.visibel = visibel;
	});
};

Vue.directive('loading', {
	update (el, { value, oldValue, modifiers }) {
		if (value === oldValue) return;
		let target = el;
		if (modifiers.body === true) {
			target = document.body;
		}
		_toggle(target, value);
	},
	bind (el, { value, modifiers }) {
		let target = el;
		if (modifiers.body === true) {
			target = document.body;
		}
		_toggle(target, value);
	}
});

const _indicator = {
	open () {
		_toggle(document.body, true);
	},
	close () {
		_toggle(document.body, false);
	}
};

Vue.prototype.$indicator = window.Indicator = _indicator;
