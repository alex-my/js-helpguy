/**
 * 当前时间戳(秒)
 * @returns {number}
 * @example
 *
 * now()
 * // => 1536911609
 */
const now = () => parseInt(new Date().getTime() / 1000, 10);

/**
 * 当前时间戳(耗秒)
 * @returns {number}
 * @example
 *
 * ms()
 * // => 1536911609
 */
const ms = () => parseInt(new Date() / 1000, 10);

/**
 * 获取指定时间后的时间戳
 * @param {number} day
 * @param {number} hour
 * @param {number} min
 * @param {number} sec
 * @returns {number}
 * @example
 *
 * 假设现在是 2018/9/14 16:30:6
 * time(1, 1, 1, 1)
 * // =>
 */
const time = (day, hour, min, sec) => {
    const cur = new Date();
    const lastDay = day || 0;
    const lastHour = cur.getHours() + hour + lastDay * 24;
    const lastMinute = cur.getMinutes() + min;
    const lastSecond = cur.getSeconds() + sec;
    return parseInt(cur.setHours(lastHour, lastMinute, lastSecond) / 1000, 10);
};

/**
 * 获取本地时间
 * @param {number} timestamp 时间戳
 * @returns {string}
 * @example
 *
 * toLocalTime()
 * // => 2018-9-14 15:53:29
 *
 * toLocalTime(1536911609)
 * // => 2018-9-14 15:53:29
 */
const toLocalTime = (timestamp) => {
    const t = timestamp || now();
    return new Date(parseInt(t, 10) * 1000).toLocaleString();
};

/**
 * 获取今日 00:00:00 的时间戳
 * 今天凌晨的时间
 * @returns {number}
 * @example
 *
 * 假设现在是 2019-01-02 12:23:13，得到的是 2019-01-02 00:00:00 对应的时间戳
 * todayZero()
 * // => 1546358400
 */
const todayZero = () => {
    return parseInt(new Date().setHours(0, 0, 0) / 1000, 10);
};

/**
 * 获取明日 00:00:00 的时间戳
 * @returns {number}
 * @example
 *
 * 假设现在是 2019-01-02 12:23:13，得到的是 2019-01-03 00:00:00 对应的时间戳
 * tomorrowZero()
 * // => 1546444800
 */
const tomorrowZero = () => {
    return parseInt(new Date().setHours(24, 0, 0) / 1000, 10);
};

/**
 * 获取日期，形如 20190101
 * @returns {string}
 * @example
 *
 * day()
 * // => 20190101
 */
const day = () => {
    const d = new Date();
    return `${d.getFullYear()}${d.getMonth() + 1}${d.getDate()}`;
};

export default {
    now,
    ms,
    time,
    toLocalTime,
    todayZero,
    tomorrowZero,
    day
};
