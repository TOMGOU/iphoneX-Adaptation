
import Vue from 'vue';
import VueRouter from 'vue-router';
import regRouterEach from '@/router/routerEach.js';
Vue.use(VueRouter);

const routes = [
	{
		path: '/index',
		name: 'index',
		component: () => import(/* webpackChunkName: "index" */'@views/match/index.vue')
	},
	{
		path: '/video',
		name: 'video',
		component: () => import(/* webpackChunkName: "video" */'@views/video/video.vue')
	},
	{
		path: '/guess',
		name: 'guess',
		component: () => import(/* webpackChunkName: "guess" */'@views/guess/guess.vue')
	},
	{
		path: '/more',
		name: 'more',
		component: () => import(/* webpackChunkName: "more" */'@views/more/more.vue')
	},
	{
		path: '/index/matchInfo',
		name: 'matchInfo',
		component: () => import(/* webpackChunkName: "matchInfo" */'@views/match/matchInfo.vue')
	},
	{
		path: '/index/detail/:id',
		name: 'detail',
		component: () => import(/* webpackChunkName: "detail" */'@views/match/detail.vue')
	},
	{
		path: '/video/vdetail/:id',
		name: 'vdetail',
		component: () => import(/* webpackChunkName: "vdetail" */'@views/video/vdetail.vue')
	},
	{
		path: '*',
		redirect: '/index'
	}
];

let router = new VueRouter({ routes });

regRouterEach(router);

export default router;
