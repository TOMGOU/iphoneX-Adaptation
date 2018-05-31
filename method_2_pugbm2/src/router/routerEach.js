import { setReportTcss } from '@utils/report.js';

export default router => {
	// 路由切换成功进入激活阶段时被调用
	router.afterEach(to => {
		const {
			name,
			path
		} = to;
		let prePath = '/m/ingame/all';
		setTimeout(() => {
			setReportTcss({
				name,
				path: prePath + path
			});
		}, 200);
	});
};
