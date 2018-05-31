
// msdk javascript灏佽浠ｇ爜
var uniqueId = 1;
var msdkiOSHandler;

function log(message, data) {
	var log = document.getElementById('log');
	var el = document.createElement('div');
	el.className = 'logLine';
	el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
	if (log && log.children && log.children.length) {
		log.insertBefore(el, log.children[0]);
	} else if (log) {
		log.appendChild(el);
	}
}

window.onerror = function(err) {
	log('window.onerror: ' + err);
};

function connectWebViewJavascriptBridge(callback) {
	if (window.WebViewJavascriptBridge) {
		callback(window.WebViewJavascriptBridge);
	} else {
		document.addEventListener('WebViewJavascriptBridgeReady', function() {
			callback(window.WebViewJavascriptBridge)
		}, false);
	}
}

connectWebViewJavascriptBridge(function(bridge) {
	bridge.init(function(message, responseCallback) {
		log('JS got a message', message);
		var data = {
			'Javascript Responds': 'Wee!'
		};
		log('JS responding with', data);
		responseCallback(data);
	});
	msdkiOSHandler = bridge.callHandler;
});
// ---Js鎺ュ彛 START---
export const isiOS = () => {
	var agent = navigator.userAgent;
	return !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios缁堢
};

export const msdkShare = (data) => {
	if (isiOS()) {
		msdkiOSHandler('OpenShare', data, null);
	} else {
		prompt(data);
	}
};

export const msdkCall = (tag, data) => {
	if (isiOS()) {
		msdkiOSHandler(tag, data, null);
	} else {
		prompt(data);
	}
};

export const msdkCloseWebview = (data) => {
	if (isiOS()) {
		msdkiOSHandler('CloseMSDKWebview', data, null);
	} else {
		let data = '{"MsdkMethod": "CloseMSDKWebview"}';
		prompt(data);
	}
};
