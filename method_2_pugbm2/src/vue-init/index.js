import Vue from 'vue';
import filter from './filter.js';
import tokenParams from '@utils/tokenParams';
import scrollHelper from '@comps/scrollHelper/index.js';

Vue.prototype.$tokenParams = tokenParams;
// Vue.prototype.$center = new Vue();
for (let key in filter) {
	Vue.filter(key, filter[key]);
}
Vue.component('scrollHelper', scrollHelper);

if (process.env.NODE_ENV === 'production') {
	window.addEventListener('load', () => {
		if (typeof (window.pgvMain) === 'function') {
			window.pgvMain();
		}
	}, false);
}

// 禁用原生滚动
document.ontouchmove = (e) => {
	e.preventDefault();
};
