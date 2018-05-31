// 将url中的query部分转成对象形式
export const parseUrlObj = (url) => {
	if (!url) {
		console.error(new Error('url is empty. parse error.'));
		return {};
	}
	if (url.indexOf('?') === 0) url = url.slice(1);
	let obj = {}, reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
	while (reg.exec(url)) {
		obj[RegExp.$1] = RegExp.$2;
	}
	return obj;
};
// 获取url中指定key对应的值
export const parseUrlValue = (url, key) => parseUrlObj(url)[key] || '';
