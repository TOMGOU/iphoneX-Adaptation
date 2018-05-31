/* eslint-disable */
const _local = 'local',
  _session = 'session';

// 本地存储操作
const _setStorage = (type, key, val) => {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  window[`${type}Storage`].setItem(key, val);
};

// 存储获取
const _getStorage = (type, key) => {
  let str = window[`${type}Storage`].getItem(key) || '',
    data = '';
  try {
    data = JSON.parse(str);
  } catch (error) {
    data = str;
  }
  return data;
};

// 删除本地存储
const _remove = (type, key) => {
  window[`${type}Storage`].removeItem(key);
};

// 获取session本地存储
export const setSession = (key, val) => {
  console.warn(
    `Session更新key:${key} > 值: ${JSON.stringify(val).slice(0, 100)}...`
  );
  return _setStorage(_session, key, val);
};

// 设置local本地存储
export const setLocal = (key, val) => _setStorage(_local, key, val);

// 获取session本地存储
export const getSession = key => _getStorage(_session, key);

// 获取local本地存储
export const getLocal = key => _getStorage(_local, key);

// 删除session本地存储
export const removeSession = key => _remove(_session, key);

// 删除local本地存储
export const removeLocal = key => _remove(_local, key);
