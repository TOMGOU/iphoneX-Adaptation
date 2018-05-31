import IScroll from '@lib/iscroll-probe.js';

export default {
	name: 'myScroll-view',
	props: {
	    myScrollConfig: {
	        type: Object,
	        default: () => {}
	    },
	    canLoadMore: {
	        type: Boolean,
	        default: false
	    },
	    loadMoreConfig: {
	        type: Object,
	        default: () => {}
		},
		styleObj: {
			type: Object,
			default: () => {
				return {
					height: '100%'
				};
			}
		},
		wrapperStyle: {
			type: Object,
			default: () => {
				return {
					minHeight: '100%'
				};
			}
		}
	},
	template: `<div ref="iscroll" style="overflow: hidden; width: 100%" :style="styleObj">
					<div class="wrapper" :style="wrapperStyle">
						<slot></slot>
					</div>
				</div>`,
	mounted() {
	    // 初始化IScroll
	    this.myScroll = new IScroll(this.$refs.iscroll, Object.assign({
	        click: true,
	        touch: true,
	        preventDefault: false,
	        preventDefaultException: {
	            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
	        },
	        mouseWheel: true,
	        scrollX: false,
			scrollY: true,
			bounce: false
	        // probeType: 3
		}, this.myScrollConfig));

	    this.myScroll.on('scrollStart', () => {
	        //滚动开始时，刷新滚动视图
	        this.$emit('scrollStart', this.myScroll);
			this.myScroll.refresh();
	    });
	    this.myScroll.on('scroll', () => {
	        this.$emit('scroll', this.myScroll);
	    });
	    if (this.canLoadMore) {
	        this.myScrollToLoadMore(this.loadMoreConfig);
	    } else {
	        this.myScroll.on('scrollEnd', () => {
	            this.$emit('scrollEnd', this.myScroll);
	        });
		}
	},
	methods: {
	    bindResize(name) {
	        let timer = null;
	        name = name ? 'resize.' + name : 'resize';
	        window.addEventListener(name, () => {
	            this.handleScale(timer);
			});
			this.handleScale(timer);
		},
		handleScale(timer) {
			clearTimeout(timer);
			timer = setTimeout(() => {
				let type;
				if (window.innerWidth >= window.innerHeight) {
					// 横屏
					type = 1;
				} else {
					// 竖屏
					type = 2;
				}
				this.$emit('ISResize', type);
			}, 116);
		},
	    myScrollToLoadMore(opts = {}) {
	        let defaultOpts = {
	            direction: 'up', // up上拉
	            lengthToBottom: 100 // 滚动触发距离
	        };
	        opts = Object.assign({}, defaultOpts, opts);
	        this.myScroll.on('scrollEnd', () => {
	            if (opts.direction !== 'up') {
	            // 将要到底部或者顶部的时候就开始执行回调，提前加载数据
	                if (opts.lengthToBottom + this.myScroll.y >= 0) {
	                    this.$emit('loadMore', this.myScroll);
	                }
	            } else {
	                if (-1 * this.myScroll.maxScrollY + this.myScroll.y <= opts.lengthToBottom) {
	                    this.$emit('loadMore', this.myScroll);
	                }
	            }
	        });
	    },
	    // 滚动到指定位置
	    scrollTo(posY = 0, time = 0, posX = 0) {
	        this.myScroll.scrollTo(posX, posY, time);
	    }
	},
	beforeDestroy() {
		this.myScroll.destroy();
	}
};
