
const filter = {
	distanceTime(val) {
		if (!val) return val;
		val = val.replace(/-/g, '/');
	    var now = new Date();
	    var d = new Date(val);
	    var distance = now.getTime() - d.getTime();
	    var diff = Math.floor(distance / (24 * 60 * 60 * 1000));
	    if (diff > 0) return diff + '天前';
	    diff = Math.floor(distance / (60 * 60 * 1000));
	    if (diff > 0) return diff + '小时前';
	    diff = Math.floor(distance / (60 * 1000));
	    return diff + '分钟前';
	}
};
export default filter;
