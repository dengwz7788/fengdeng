/**
 * @author：rj
 * @function: 设置cookie
 * @pramas: cookie名称,cookie值,有效时长秒
 */
const setCookie=function(name,value,date){
	const exp = new Date();
	exp.setTime(exp.getTime() + date*1000);
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}

/**
 * @author：px
 * @function: 获取cookie
 * @pramas: cookie名称
 */
const getCookie = function (name) {
  const data = document.cookie;
  const dataArray = data.split("; ");
  for (let i = 0; i < dataArray.length; i++) {
    const letName = dataArray[i].split("=");
    if (letName[0] == name) {
      return decodeURI(letName[1]);
    }
  }
}
/**
 * @author：px
 * @function: 删除全部cookie
 */
const delAllCookie = function () {
  const myDate = new Date();
  myDate.setTime(-1000);//设置时间
  const data = document.cookie;
  const dataArray = data.split("; ");
  for (let i = 0; i < dataArray.length; i++) {
    const letName = dataArray[i].split("=");
    document.cookie = letName[0] + "=''; expires=" + myDate.toGMTString();
  }
}

export default {
	setCookie,
	getCookie,
	delAllCookie
}