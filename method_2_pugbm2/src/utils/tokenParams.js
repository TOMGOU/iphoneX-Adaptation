import { parseUrlObj } from '@utils/urlHelper.js';
import { setSession, getSession } from '@utils/storage.js';
const TOKEN = '_searchParams';
let searchObj = getSession(TOKEN) || {},
	search = location.search || location.hash;

// 首次加载取不到值
if (Object.keys(searchObj).length === 0) {
	search = search.slice(search.indexOf('?')).slice(1);
	searchObj = parseUrlObj(search) || {};
	searchObj.tokenStr = '?' + search;
	setSession('tokenParams', searchObj.tokenStr);
}
searchObj = Object.assign({
	// openId
	openid: '',
	// 登录来源
	channel: [1, 2].indexOf(searchObj.area) > -1 ? 'qq' : 'weixin',
	// 登录状态
	partition: '',
	agent: !navigator.userAgent.match(/iPad|iPhone|iPod/) ? 'android' : 'ios',
	sig: '',
	msdkEncodeParam: '',
	// APPID
	appid: '',
	version: '',
	tokenStr: '' // app的token
}, searchObj, parseUrlObj(getSession('tokenParams')));

setSession(TOKEN, searchObj);

export default searchObj;
