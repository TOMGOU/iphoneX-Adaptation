export const txPlayerEvents = [
	'smallWindowModeChange',
	'windowFullscreenChange',
	'ready',
	'error',
	'volumeChange',
	'timeupdate',
	'playStateChange',
	'definitionChange',
	'vidChange',
	'showUIVipGuide',
	'windowFullscreenChange',
	'adStart',
	'adEnd',
	'languageSet',
	'showLoginGuide'
];

export default function (player) {
	if (!player || !player.on) return;
	txPlayerEvents.map(name => {
		player.on(name, (eventName => event => {
			this.$emit(eventName.replace(/([A-Z])/g, '-$1').toLowerCase(), event);
		})(name));
	});
}
