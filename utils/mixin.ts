import { getSystemDict } from '@/api/common';


/** 查看图片
* @param {Object || String} imgs 图片地址
*/
const viewImage=(imgs)=> {
  uni.previewImage({
    urls: [imgs]
  });
}

// 数据字典
const getSystemDictData =(type)=> {
  return new Promise((resolve, reject) => {
    getSystemDict(type).then(res => {
      if(res.data) {
        resolve(res.data);
      }
    })
  })
}

	// 数据字典-过滤器
  const turnSystemDict =(dictValue, dictList, id, name) =>{
    for(var i = 0; i < dictList.length; i++) {
      if(id && name) {
        if(dictList[i][id] == dictValue) {
          return dictList[i][name]
        }
      } else {
        if(dictList[i].dictValue == dictValue) {
          return dictList[i].dictLabel
        }
      }
      
    }
  }

  export const formatDict = (value, dictData) => {
    if (dictData) {
      let dicts = dictData.filter(dict => dict.dictValue == value);
      if (dicts && dicts.length > 0) {
        return dicts[0].dictLabel
      }
    }
    return ''
  }


/** 地址栏中get参数并放入对象中
 * @param {Object} url 地址栏
 */
export const serilizeUrl=(url:string) =>{
  if (/\?/.test(url)) {
    let urlStr = url.substring(url.indexOf('?') + 1)
    let urlArr = urlStr.split('&')

    return urlArr.reduce((acc, cur) => {
      let item = cur.split('=')
      acc[item[0]] = item[1]
      return acc
    }, {})
  }
}

/**
 * 参数处理
 * @param params 参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName]
		var part = encodeURIComponent(propName) + "="
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']'
						var subPart = encodeURIComponent(params) + "="
						result += subPart + encodeURIComponent(value[key]) + "&"
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&"
			}
		}
	}
	return result
}

  // 时间转时间戳
  const turnTimeNumber=(val)=> {
    if(val) {
      return new Date(val).getTime()
    }
  }
  // 时间转换
  const formatTime=(date, type)=> {
    // 判断传入值date是否存在
    if (!date) return false
    // 将date时间戳转换为标准时间
    if (typeof date == 'string') {
      date = date.replace(/-/g, '/');
      if (date.indexOf('T') > -1) {
        date = date.replace(/T/g, ' ');
        var index = date.indexOf('.');
        date = date.substr(0, index);
      }
    }
    var time = new Date(date)
    // 提取年月日
    var Y = time.getFullYear()
    var M = time.getMonth() + 1
    var D = time.getDate()
    // 提取星期
    var W = time.getDay()
    // 提取时分秒
    var h = time.getHours()
    var m = time.getMinutes()
    var s = time.getSeconds()
    // 不足10的填充0
    M = M >= 10 ? M : '0' + M
    D = D >= 10 ? D : '0' + D
    h = h >= 10 ? h : '0' + h
    m = m >= 10 ? m : '0' + m
    s = s >= 10 ? s : '0' + s
    // 输出时间格式
    if (type === 1) {
      var weekDay = ['一', '二', '三', '四', '五', '六', '天']
      return Y + '-' + M + '-' + D + ' 星期' + weekDay[W] + ' ' + h + ' : ' + m + ' : ' + s // YYYY/MM/DD  W  hh:mm:ss
    } else if (type === 2) {
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s // YYYY/MM/DD  hh:mm:ss
    } else if (type === 3) {
      return Y + '-' + M // YYYY/MM
    } else if (type === 4) {
      return Y + '-' + M + '-' + D + ' ' + h + ':' + m // YYYY/MM/DD  hh:mm
    }else if (type === 5) {
      return Y + '年' + M + '月'  // YYYY年MM月
    }else if (type === 6) {
      const Month = time.getMonth() + 1
      const Date = time.getDate()
      return Y + '年' + Month + '月'+ Date + '日'  // YYYY年MM月DD日 小于10不进行补0
    }else if (type === 7) {
      return h + ':' + m + ':' + s  // hh:mm:ss
    }else {
      return Y + '-' + M + '-' + D // YYYY/MM/DD
    }
  }

// 下载
const downLoadFile=(filePath) =>{
  //下载文件，生成临时地址
  uni.showLoading({
    title: '下载中...',
  })
  uni.downloadFile({
    url: filePath,//下载地址接口返回
    success: (data) => {
      if (data.statusCode === 200) {
        //文件保存到本地
        uni.saveFile({
          tempFilePath: data.tempFilePath, //临时路径
          success: function(res) {
            //打开文档查看
            uni.openDocument({
              filePath: res.savedFilePath,
              success: function(res) {
                uni.hideLoading()
              },
              fail: (err) => {
                uni.hideLoading()
                uni.showToast({
                  icon: 'none',
                  title: '打开文件'
                });
              }
            });
          },
          fail: (err) => {
            uni.hideLoading()
            uni.showToast({
              icon: 'none',
              title: '保存失败'
            });
          }
        });
      }
    },
    fail: (err) => {
      uni.hideLoading()
      uni.showToast({
        icon: 'none',
        title: '下载失败'
      });
    }
  });
}

const downLoadFile2 = (id, fileName) =>{
  uni.showLoading({
    title:"正在请求数据"
  });
  uni.request({
    url: DownloadFileUrl(id), //获取文件流的请求路径
    method: 'GET',
    header: {
      'Authorization': uni.getStorageSync('token') || null
    },
    responseType: "arraybuffer",  
    success(response) {
      uni.hideLoading();
      if(!response){
        uni.showToast({
          title:"下载失败",
          duration:2000
        });
      }
      console.log(response)
      
      let blob = new Blob([response.data]);
      let downloadElement = document.createElement("a");
      let href = window.URL.createObjectURL(blob); //创建下载的链接
      downloadElement.href = href;
      if (fileName) {
        downloadElement.download = fileName; //下载后文件名
      } else {
        var fileNameEncode =
        response.header['content-disposition'].split('=')[1]
        // 解码
        var fileName2 = decodeURI(fileNameEncode)
        downloadElement.download = fileName2; //下载后文件名
      }
      document.body.appendChild(downloadElement);
      downloadElement.click(); //点击下载
      document.body.removeChild(downloadElement); //下载完成移除元素
      window.URL.revokeObjectURL(href); //释放掉blob对象
    },
    fail(res) {
      // 是否隐藏加载
      uni.hideLoading();
      uni.showToast({
        title: '请求失败,请稍后再试',
        icon: 'none',
        duration: 2000
      }); //success loading none
    }
  })
}

// 列表便签背景
const turnStatusClass = (status, statusTypeList) =>{
  if(statusTypeList && statusTypeList.length > 0) {
    for(var i = 0; i < statusTypeList.length; i++) {
      if(String(status) === statusTypeList[i].dictValue) {
        var className = statusTypeList[i].listClass
        var classApp = ''
        if(className == 'default') {
          classApp = 'defaultTag'
        } else if(className == 'primary') {
          classApp = 'blueTag'
        } else if(className == 'success') {
          classApp = 'greenTag'
        } else if(className == 'info') {
          classApp = 'infoTag'
        } else if(className == 'warning') {
          classApp = 'yellowTag'
        } else if(className == 'danger') {
          classApp = 'redTag'
        }
        return classApp
      }
    }
  }
}


/*
 * 转换金额显示格式的函数
 *  s : 需要转换的金额
 *  n : 小数点后几位
 * */
export function turnMoney(s, n) {
	if (!s) {
		s = 0
	}
	var minus = s < 0 ? ('' + s).slice(0, 1) : '' // 如果是负数；先截取负号

	if (minus) {
		s = ('' + s).slice(1)
	}

	n = n > 0 && n <= 20 ? n : 2
	s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
	var l = s.split('.')[0].split('').reverse()
	var r = s.split('.')[1]
	var t = ''

	for (var i = 0; i < l.length; i++) {
		t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')
	}
	return minus + t.split('').reverse().join('') + '.' + r
}

/*
 *  为空显示'/'
 * */
export function turnEmptyShow(value) {
	if (value === '' || value === null || value === undefined) return '/'
	else return value;

}
/*
 *  为空显示'--'
 * */
export function turnEmptyShowLine(value) {
	if (value === '' || value === null || value === undefined) return '--'
	else return value;

}
/* 
 *计算日期日期差
 */
export const timeDifc=(start, end, type)=> {
	if (!start || !end) {
		return '/'
	}
	let starts = new Date(turnAppTime(start)),
		ends = new Date(end),
		message = '';
	if (type == 1) {
		if (starts.getTime() > ends.getTime())
			return message = "现在的时间小于以前的时间!";
		if ((ends.getTime() - starts.getTime()) / (1000 * 60) < 1)
			return message = "刚刚";
		if (ends.getFullYear() > starts.getFullYear() && ends.getMonth() >= starts.getMonth())
			message += ends.getFullYear() - starts.getFullYear() + "年";
		if (ends.getMonth() > starts.getMonth() && ends.getDate() >= starts.getDate())
			message += ends.getMonth() - starts.getMonth() + "个月";
		if (ends.getDate() > starts.getDate() && ends.getHours() >= starts.getHours())
			message += ends.getDate() - starts.getDate() + "天";
		if (ends.getHours() > starts.getHours() && ends.getMinutes() >= starts.getMinutes())
			message += ends.getHours() - starts.getHours() + "小时";
		if (ends.getMinutes() > starts.getMinutes())
			message += ends.getMinutes() - starts.getMinutes() + "分钟";
		return message;
	} else if (type == 2) {
		var year = 0;
		var month = 0;
		year = ends.getFullYear() - starts.getFullYear();
		month = ends.getMonth() - starts.getMonth();
		if(month < 0) {
			year = year - 1;
			month = 12 + month;
		}
		if (year && month) {
			return '<text class="search-detail-num Gobold">' + year + '</text>年<text class="search-detail-num Gobold">' + month +
				'</text>个月';
		} else if (year && !month) {
			return '<text class="search-detail-num Gobold">' + year + '</text>年';
		} else if (!year && month) {
			return '<text class="search-detail-num Gobold">' + month + '</text>个月';
		}
	} else if (type == 3) {
		var days = Math.floor((ends.getTime() - starts.getTime()) / (1000 * 60 * 60 * 24));
		return '<text class="search-detail-num Gobold">' + days + '</text>天';
	}
};
/**
 * JS 计算两个时间间隔多久（时分秒）
 * @param startTime "1684547202000", // 开始时间
 * @param endTime "1684552048689", // 结束时间
 * @return 1天2时3分5秒
 */
export const twoTimeInterval=(startTime,endTime) =>{
    var dateBegin = new Date(startTime) // 时间
    var dateEnd = new Date(endTime);//获取当前时间
		
		//时间差的毫秒数
    var dateDiff = dateEnd.getTime() - dateBegin.getTime();
		
		//计算出相差天数
    var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
		
		//计算出小时数
    var leave1 = dateDiff % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000)) //计算出小时数
		
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000)) //计算相差分钟数
		
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000)
		
		// console.log(`相差${dayDiff}天${hours}小时${minutes}分钟${seconds}秒`);
    // console.log(dateDiff+"时间差的毫秒数",dayDiff+"计算出相差天数",leave1+"计算天数后剩余的毫秒数",hours+"计算出小时数",minutes+"计算相差分钟数",seconds+"计算相差秒数");
		
		return {dayDiff,hours,minutes,seconds}
}

/*
 * 状态
 *  val
 * */
export function turnInspectionState(val) {
  let map = { 
    '0':'未开始', 
    '1':'进行中',
    '2':'已结束',
    '3':'已完成' 
  }
  return map[val]
}

/*
 * gps转为百度地图坐标
 *  lat纬度
 *  lng经度
 * */
export const MapabcEncryptToBdmap=(lat, lng) =>{
	var point = {}
	var x_pi = 3.14159265358979324 * 3000.0 / 180.0
	var x = Number(lng)
	var y = Number(lat)
	var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi)
	var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi)
	var bd_lon = z * Math.cos(theta) + 0.0065
	var bd_lat = z * Math.sin(theta) + 0.006
	point.lng = bd_lon
	point.lat = bd_lat
	return point
}

// 计划距离
export const getDistance=(la1, lo1, la2, lo2) =>{  
	var La1 = la1 * Math.PI / 180.0;  
	var La2 = la2 * Math.PI / 180.0;  
	var La3 = La1 - La2;  
	var Lb3 = lo1 * Math.PI / 180.0 - lo2 * Math.PI / 180.0;  
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(La3 / 2), 2) + Math.cos(La1) * Math.cos(La2) * Math.pow(Math.sin(Lb3 / 2), 2)));  
	s = s * 6378.137;//地球半径  
	s = Math.round(s * 10000) / 10;  
	console.log("计算结果",s,'m');   
	return parseInt(s)
}
/*
 *  转化字节
 * */
export const bytesToSize=(bytes)=> {
	if (bytes === 0) return '0 B'
	var k = 1024
	var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
	var i = Math.floor(Math.log(bytes) / Math.log(k))

	return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i]
}
/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export const handleTree=(data, id, parentId, children)=> {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId];
    if (childrenListMap[parentId] == null) {
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d;
    childrenListMap[parentId].push(d);
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) {
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}