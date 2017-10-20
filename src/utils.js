import moment from 'moment';
import { message } from 'antd';
moment.defineLocale('zh-cn', {
	months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
	longDateFormat: {
		LT: 'HH:mm',
		LTS: 'HH:mm:ss',
		L: 'YYYY年MMMD日',
		LL: 'YYYY年MMMD日',
		LLL: 'YYYY年MMMD日Ah点mm分',
		LLLL: 'YYYY年MMMD日ddddAh点mm分',
		l: 'YYYY年MMMD日',
		ll: 'YYYY年MMMD日',
		lll: 'YYYY年MMMD日 HH:mm',
		llll: 'YYYY年MMMD日dddd HH:mm'
	},
	meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	meridiemHour: function (hour, meridiem) {
		if (hour === 12) {
			hour = 0;
		}
		if (meridiem === '凌晨' || meridiem === '早上' ||
			meridiem === '上午') {
			return hour;
		} else if (meridiem === '下午' || meridiem === '晚上') {
			return hour + 12;
		} else {
			return hour >= 11 ? hour : hour + 12;
		}
	},
	meridiem: function (hour, minute, isLower) {
		var hm = hour * 100 + minute;
		if (hm < 600) {
			return '凌晨';
		} else if (hm < 900) {
			return '早上';
		} else if (hm < 1130) {
			return '上午';
		} else if (hm < 1230) {
			return '中午';
		} else if (hm < 1800) {
			return '下午';
		} else {
			return '晚上';
		}
	},
	calendar: {
		sameDay: '[今天]LT',
		nextDay: '[明天]LT',
		nextWeek: '[下]ddddLT',
		lastDay: '[昨天]LT',
		lastWeek: '[上]ddddLT',
		sameElse: 'L'
	},
	dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
	ordinal: function (number, period) {
		switch (period) {
			case 'd':
			case 'D':
			case 'DDD':
				return number + '日';
			case 'M':
				return number + '月';
			case 'w':
			case 'W':
				return number + '周';
			default:
				return number;
		}
	},
	relativeTime: {
		future: '%s内',
		past: '%s前',
		s: '几秒',
		m: '1 分钟',
		mm: '%d 分钟',
		h: '1 小时',
		hh: '%d 小时',
		d: '1 天',
		dd: '%d 天',
		M: '1 个月',
		MM: '%d 个月',
		y: '1 年',
		yy: '%d 年'
	},
	week: {
		dow: 1,
		doy: 4
	}
});
import update, { updateChain } from 'immutability-helper-x';

const Utils = {

	/**
	 * immutability 单项修改数据 https://github.com/ProtoTeam/immutability-helper-x
	 *
	 * @param {any} time
	 * @returns
	 */
	update: update,

	/**
	 * immutability 链式修改数据 https://github.com/ProtoTeam/immutability-helper-x
	 *
	 * @param {any} time
	 * @returns
	 */
	updateChain: updateChain,

	/**
	 * 明文传参跳转
	 *
	 * @param {any} that
	 * @param {any} path
	 * @param {any} payload
	 */
	redirect: (that, path, payload) => {
		let myString = '';
		for (const item in payload) {
			myString += `/${payload[item]}`;
		}

		const next = `${path}${myString}`;
		that.props.history.push(next);
		console.log(that.props.history)
	},

	/**
	 * 获取明文传参跳转参数
	 *
	 * @param {any} that
	 * @returns
	 */
	getRedirect: (that) => {
		console.log(that.props.match.params)
		return that.props.match.params;
	},

	/**
	 * 隐藏传参跳转
	 *
	 * @param {any} that
	 * @param {any} path
	 * @param {any} payload
	 */
	jump: (that, path, payload) => {
		const next = {
			pathname: path,
			state: payload
		}
		that.props.history.push(next);
	},

	/**
	 * 获取隐藏传参跳转参数
	 *
	 * @param {any} that
	 * @returns
	 */
	getJump: (that) => {
		return that.props.location.state;
	},
	/**
	 * 调用接口正常状态码校验
	 *
	 * @param {any} that
	 * @param {any} res
	 */
	parseCheck(that, res) {
		if (res.data.result.errcode !== 0) {
			throw {
				code: res.data.result.errcode,
				message: res.data.result.cn_info
			};
		} else {
			Utils.redirect(that, '');
		}
	},
	/**
  * 调用接口 catch 错误处理
  *
  * @param {any} that
  * @param {any} err
  */
	parseError(that, err) {
		if (err.code === -2) {
			;
		}
		else {
			message.error(err.message)

		}
	},
	/**
	 * 时间格式化
	 *
	 * @param {any} time
	 * @returns
	 */
	moment: moment
}

export default Utils;

