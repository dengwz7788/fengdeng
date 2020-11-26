import axios from 'axios'
import cookieUtil from '../util/cookie'

let jumpFlag = true

const action = function (url, method, dat, opt) {
	const data = dat || {}
	const option = opt || {}
	option.headers = option.headers || {}
	//window.sessionStorage.setItem('lang',"zh-CN")
	/*option.headers['SfopenReferer'] ='99999988'*/
	//option.headers['lang'] = window.sessionStorage.getItem('lang')
	/*option.headers['systemKey'] = '99999988'*/
	option.withCredentials = true
	const promise = new Promise((resolve, reject) => {
		let req
		if (/^p/.test(method)) {
			req = axios[method](url, data, option)
		} else {
			option.params = data
			req = axios[method](url, option)
		}
		req.then((response) => { // NOSONAR	
			let tmp = response.data
			if (typeof (tmp) === 'string') {
				try {
					tmp = JSON.parse(tmp)
				} catch (e) {
				}
			}
			if(!tmp.succ){
				var result={
					succ:'fail',
					msg:tmp.errorMessage,
				}
				reject(result)
				return
			}else if (tmp.succ.toLowerCase() === "ok") {
				resolve(tmp)
			} else if (tmp.succ.toLowerCase() === "jump") {
				if (jumpFlag && tmp.result.redirect) {
					jumpFlag = false;
					window.location.href = tmp.result.redirect;
				}
			}else if (tmp.succ.toLowerCase() === "logout") {
				if (jumpFlag && tmp.result.logout && tmp.result.login) {
					jumpFlag = false;
					new Image().src = tmp.result.logout
					setTimeout(function () {
						cookieUtil.delAllCookie()
						window.location.href = tmp.result.login
					}, 100)
				}
			}else{
				reject(tmp)
			}
		}, (response) => {
			if(response.message==='cancelToken'){
				reject({succ:response.message})
				return
			}
			let tmp = response.response.data 
			if (typeof (tmp) === 'string') {
				try {
					tmp = JSON.parse(tmp)
				} catch (e) {
				}
			}
			if(tmp.errorCode){
				var arr1={'09020000':'程序出现异常，请稍后重试','09020101':'访问需要登录认证的接口时在请求头中没有设置token',
				'09020102':'账号异地登录，请重新登录','09020103':'账号信息异常，请重新登录','09020110':'APP校验异常，请重新登录','09020201':'未绑定接口，禁止访问',
				'09020202':'内部接口，禁止访问','09020301':'访问过于频繁，请稍后重试','09020401':'网关根据header中设置的session-id找不到密钥',
				'09020402':'没有在header中设置session-id','09020403':'网关使用session-id关联的密钥不能解密请求体','09020501':'网关没有该API的路由信息',
				'09020502':'后台的微服务响应超时，默认20s','09020601':'登录时没有deviceid参数','09020701':'数据错误，请重试','09020801':'不支持的业务类型，请重试'}
				
				var arr2={'09020000':'The program encountered an exception. Please try again later.','09020101':'No token is set in the request header when accessing the interface requiring login authentication',
				'09020102':'Account is logged in from another place, please login again','09020103':'Account information is abnormal. Please log in again','09020110':'App check exception, please log in again',
				'09020201':'Unbound interface, access prohibited','09020202':'Internal interface, no access','09020301':'Visits are too frequent. Please try again later.','09020401':'The gateway cannot find the key based on session-id setted in header',
				'09020402':'No session-id has beed setted in header','09020403':'Gateway cannot decrypt requester using key that the session-id is associated with','09020501':'Gateway does not have routing information about this API',
				'09020502':'Background response timeout，default 20s','09020601':'There is no device ID parameter when logining in','09020701':'Data error, please try again','09020801':'Unsupported business types, please try again'}
				
				reject({ msg: (window.sessionStorage.getItem('lang') == 'zh-CN')? arr1[tmp.errorCode]: arr2[tmp.errorCode]})
			}else{
				reject({ msg: (window.sessionStorage.getItem('lang') == 'zh-CN')? '网络异常，请刷新页面或者联系系统管理员！':'Network exception, please refresh the page or contact the system administrator!' })
			}
			reject({ msg: (window.sessionStorage.getItem('lang') == 'zh-CN')? '网络异常，请刷新页面或者联系系统管理员！':'Network exception, please refresh the page or contact the system administrator!' })
		})

	})
	return promise
}

const httpExt = {
	put(url, data, option) {
		return action(url, 'put', data, option)
	},
	putForm(url, data, option) {
		const opt = option || {}
		opt.headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
		opt.emulateJSON = true
		return action(url, 'put', data, opt)
	},
	post(url, data, option) {
		return action(url, 'post', data, option)
	},
	postJson(url, data, option) {
		return action(url, 'post', data, option)
	},
	postForm(url, data, option) {
		const opt = option || {}
		opt.headers = {
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		}
		opt.emulateJSON = true
		return action(url, 'post', data, opt)
	},
	get(url, data, option) {
		/**添加时间戳,防止ie有缓存*/
		const data2 = data ? Object.assign(data, { time: new Date().getTime() }) : data;
		
		return action(url, 'get', data2, option)
	},
	delete(url, data, option) {
		return action(url, 'delete', data, option)
	}
}

export default {
	install(Vue) {
		Vue.prototype.$axios = axios
		Vue.prototype.$httpExt = function () {
			return httpExt
		}
	},
	httpExt
}