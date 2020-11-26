/**
 * @author：ww
 * @function: 对象深度拷贝
 * @pramas: obj 需要拷贝的对象 必填
 * 			newobj 拷贝生成的对象 非必填
 */
const deepCopy = function (source) {
	const result = Array.isArray(source) ? [] : {}
	for (const key in source) {
		if(typeof source[key] === 'object' && source[key] !== null){
			result[key] = deepCopy(source[key])
		}else{
			result[key] = source[key]
		}
    }
    return result;
}

/**
 * @author：px
 * @function: 对象合并操作
 */
const merge = function (dest, res) {
  return Object.assign({}, dest, res)
}
/**
 * @author：px
 * @function: 对象属性排序
 */
const objKeySort = function (arys, fn) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  const newkey = Object.keys(arys).sort(fn);
  const newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (let i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对
  }
  return newObj; //返回排好序的新对象
}
/**
 * @author：px
 * @function: 对象属性排序
 */
const objValSort = function (arys, fn) {
  const tmp = Object.assign({}, arys)
  for (const name in tmp) {
    if (tmp.hasOwnProperty(name)) {
      tmp[name]._name = name
    }
  }

  const newVal = fn ? Object.values(tmp).sort(fn) : Object.values(tmp).sort()

  const newObj = {}
  for (const val of newVal) {
    newObj[val._name] = val
  }
  return newObj; //返回排好序的新对象
}

const convert10To26 = function (num) {
  let code = '';
  const reg = /^\d+$/g;
  if (!reg.test(num)) {
    return code;
  }
  while (num > 0) {
    let m = num % 26
    if (m == 0) {
      m = 26;
    }
    code = String.fromCharCode(64 + parseInt(m)) + code;
    num = (num - m) / 26;
  }
  return code;
}

const convert26To10 = function (code) {
  let num = -1;
  const reg = /^[A-Z]+$/g;
  if (!reg.test(code)) {
    return num;
  }
  num = 0;
  for (let i = code.length - 1, j = 1; i >= 0; i-- , j *= 26) {
    num += (code[i].charCodeAt() - 64) * j;
  }
  return num;
}

const readerOnload = function (resolve) {
  return function (e) {
    resolve(e.target.result)
  }
}

const handleFile = function (input) {
  const promises = []
  const files = input.files
  for (let i = 0; i < files.length; ++i) {

    const promise = new Promise((resolve) => {
      const f = files[i]
      const reader = new FileReader()
      reader.onload = readerOnload(resolve)
      reader.readAsBinaryString(f)
    })
    promises.push(promise)
  }
  return Promise.all(promises)
}

/**
 * @author：ww
 * @function: 时间格式化
 * @pramas: 1."times": 可以为秒或者毫秒，必填
          2."formatStr": 返回时间格式 非必填 		   
  */
const dateFormat = function (times, formatStr) {
  let timestamp;
  if (/^\d{12,15}$/.test(times)) {
    timestamp = times;
  } else if (/^\d{9,11}$/.test(times)) {
    timestamp = times * 1000;
  } else {
    return times;
  }
  let format = formatStr || 'yyyy/MM/dd'
  const currentDate = new Date(parseInt(timestamp))
  const date = {
    "M+": currentDate.getMonth() + 1,
    "d+": currentDate.getDate(),
    "h+": currentDate.getHours(),
    "m+": currentDate.getMinutes(),
    "s+": currentDate.getSeconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (currentDate.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
/**
 * @author：qm
 * @function: 限制小数位
 * @pramas: 1.value  需校验的数值	
 * 			2._len  限制的小数位数
 */
const numberDigits = function (value, _len) {
  const len = _len || 2
  var n = parseFloat(value)
  return n.toFixed(len)
}

export default {
  deepCopy,
  merge,
  objKeySort,
  objValSort,
  convert10To26,
  convert26To10,
  handleFile,
  dateFormat,
  numberDigits
}