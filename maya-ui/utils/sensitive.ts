
export const namePrivate = (name:string):string=>{
	// 如果用户姓名为 2个字，则脱敏最后一个字； 李白 => 李*
	// 如果用户姓名为3个字 ，则脱敏中间的一个字 李小白 => 李*白
	// 如果用户姓名为3个字以上 的，则脱敏第二个和第三个字 欧阳李白 => 欧**白
		if(null != name && name != undefined) {
		  if(name.length == 2) {
		    return name.substring(0,1) + '*' // 截取name的第一个字符，第二个字符变成*
		  } else if(name.length == 3) {
		    return name.substring(0,1) + '*' + name.substring(2,3) // 截取name的第一个和第三个字符，第二个字符变成*
		  } else if(name.length > 3) {
		    return name.substring(0,1) + '*' + '*' + name.substring(3,name.length) //截取第一个和大于第4个字符
		  }
		} else {
		  return ''
		}
		
		// 脱敏二
		// const name = "李思思";
		// const str1 = "*" + name.substring(name.length - 2); // *思思
	}

export const emailPrivate =(email:string):string =>{
    return email.replace(/(.{0,3}).*@(.*)/, "$1***@$2")
		 //877880098@qq.com => 877***@qq.com
}

export const phonePrivate =(phone:string):string=>{
	return phone.replace(phone.substring(3,7),'****')
	// const phone = "13031325689";
	// const str1 = phone.slice(0, 3) + "****" + phone.slice(phone.length - 4); // 130****5689
	// const str2 = phone.substring(0, 3) + "****" + phone.substring(phone.length - 4); // 130****5689
	// const str3 = phone.replace(/(\d{3})\d*(\d{4})/, "$1****$2"); // 130****5689
	// const str4 = phone.replace(tel.substring(3,7),'****') //135****3345
}

export const idCardPrivate =(card:string|number):string|number=>{
	return card.replace(/(\w{6})\w*(\w{4})/,'$1********$2')
	// const card = "512326199102115645";
	// const str1 = card.replace(/^(.{4})(?:\w+)(.{4})$/, "$1****$2"); // 5123****5645
	// const str2 = card.slice(0, 4) + "****" + card.slice(card.length - 4); // "5123****5645"
}

export const bankCardPrivate =(card:string|number):string|number=>{
	return card.replace(/^(.{4})(?:\d+)(.{4})$/, "$1 **** **** $2");
	// return value.replace(/(?<=\d{4})\d+(?=\d{4})/," **** **** "); 
	// 6212 **** **** 8888
}

/**
 * @description 信息脱敏 sensitive
 */
export const desensitization =(type:string,value:string|number):string|number=>{
	
	// 手机号码
	if(type==='phone'){
		return phonePrivate(value)
	}
	
	// 邮箱
	if(type==='emall'){
		return emailPrivate(value)
	}
	
	// 身份证
	if(type==='idCard'){
		return idCardPrivate(value)
	}
	
	// 银行卡
	if(type==='bankCard'){
		return bankCardPrivate(value)
	}
	
	// 姓名
	if(type==='name'){
		return namePrivate(value)
	}
	
}