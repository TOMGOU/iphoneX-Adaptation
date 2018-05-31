import { isHttps } from '@utils/http.js';

const _report = (params = {}) => {
	if (!window.EAS || !window.EAS.iu) return;
	let defaultOpts = {
		actionType: '', // 事件类型
		clickUrl: '', // 点击url
		adtag: '', // adtag
		contentId: '', // 点击id
		contentType: '', // 内容类型
		contentSource: '', // 内容来源
		contentCategory: '' // 内容分类
	};
	let config = Object.assign({}, defaultOpts, params);
	if (!config.adtag) config.adtag = '';
	return window.EAS.iu.click(config);
};
// reportPop:function(clickUrl,contentId,type,category,source,adtag,docid,algoid,recid){
// 单纯的曝光上报功能
export const reportPop = (params = {}) => {
	let defaultOpts = {
		contentSource: 'list',
		actionType: 'pop'
	};
	 _report(Object.assign({}, defaultOpts, params));
};
// reportV4:function(acType, url, id, tType, source, cType,adtag,docid,algoid,recid){
// v4原始pv和点击上报
export const reportV4 = (params = {}) => {
	 _report(Object.assign({}, params));
};
// v4原始pv和点击上报
export const reportClick = (params = {}) => {
	_report(Object.assign({ actionType: 'click' }, params));
};
// reportPageView:function(id,type,source,acType,adtag,docid,algoid,recid){
// v4pv上报，传入文章或者视频id，type类型
export const reportPageView = (params = {}) => {
	let defaultOpts = {
		actionType: 'pv', // 事件类型
		contentSource: 'detail'
	};
	 _report(Object.assign({}, defaultOpts, params));
};
// reportV4TimeLine:function(stayTime, url, id, tType, source, cType){
// v4页面停留时长上报
export const reportV4TimeLine = (params = {}) => {
	let defaultOpts = {
		actionType: 'timeline', // 事件类型
		stayTime: '' // 停留时长 /s
	};
	 _report(Object.assign({}, defaultOpts, params));
};

// 点击流pv/uv上报
export const setReportTcss = (opts) => {
	let tcssSrc = '//ossweb-img.qq.com/images/js/PTT/ping_tcss_tgideas_min.js';
	let tcssjs;
	if (isHttps) {
		tcssSrc = '//ossweb-img.qq.com/images/js/PTT/ping_tcss_tgideas_https_min.js';
	}
	window.setSite = {
		siteType: 'os',
		ingame: 1,
		stayTime: 0,
		pageType: opts.name,
		pageName: opts.name
	};
	if (typeof (pgvMain) === 'function') {
		//手动触发pv uv统计
		window.pgvMain({repeatApplay: 'true', virtualURL: opts.path});
	} else {
		tcssjs = document.createElement('script');
		tcssjs.onload = function() {
			//手动触发pv uv统计
			window.pgvMain({repeatApplay: 'true', virtualURL: opts.path});
		};
		tcssjs.src = tcssSrc;
		document.body.appendChild(tcssjs);
	}
};
