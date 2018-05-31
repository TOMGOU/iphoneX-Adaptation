import axios from 'axios';
import Jsonp from 'jsonp';
export const ajax = async (params = {}) => {
	let { data } = await axios(params);
	return data;
};

export const isHttps = location.protocol.toLowerCase().indexOf('https') > -1;

export const toUrl = (obj) => {
	let str = '';
	Object.keys(obj).map(item => {
		str += `${item}=${obj[item]}&`;
	});
	return str.slice(0, -1);
};
// params = { url参数对象 }
// config = {param: '后台取方法的key', name: '回调方法名'}
export const jsonp = ({ url, params = {}, config = { param: 'callback' } }) => {
	return new Promise((resolve, reject) => {
		url += (~url.indexOf('?') ? '&' : '?') + toUrl(params);
		Jsonp(url, params, (status, res) => {
			if (status) reject(status);
			resolve(res);
		});
	});
};

export const json = (params = {}) => {
	return ajax(Object.assign({ methods: 'get' }, params));
};

export const get = (params = {}) => {
	return ajax(Object.assign({ methods: 'get' }, params));
};

export const post = (params = {}) => {
	return ajax(Object.assign({ methods: 'post' }, params));
};

export const script = (opts = { }) => {
	let options = {
	  url: '',
	  params: {},
	  loadRemove: true
	};
	options = Object.assign(true, options, opts);
	// 请求参数
	let queryStr = '',
		script = document.createElement('script');
	script.async = 'async';
	for (let query in options.params) {
	  queryStr += `${query}=${options.params[query]}&`;
	}
	if (queryStr) {
	  queryStr = queryStr.slice(0, -1);
	  if (options.url.lastIndexOf('&') === options.url.length - 1) {
			options.url += queryStr;
	  } else {
			options.url += '&' + queryStr;
	  }
	}
	script.src = options.url;
	return new Promise((resolve, reject) => {
		let headEl = document.getElementsByTagName('head')[0];
		script.onload = script.onreadystatechange = function (event) {
			if ([undefined, 'loaded', 'complete'].indexOf(this.readyState) > -1) {
				if (options.loadRemove) {
					script.onload = null;
					headEl.removeChild(script);
				}
				script.onreadystatechange = null;
				resolve();
				return;
			}
			reject(new Error(event));
		};
	  script.onerror = reject;
	  headEl.appendChild(script);
	});
};
