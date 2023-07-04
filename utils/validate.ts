/**
   *校验手机号
   * @param {Number} str 要验证的手机号码
	 * @example isMobile('8684868152')
   * @return Boolean true | false
   */
  export const isMobile = (str:string):boolean=> {
    return /^1[3-9]\d{9}$/.test(str);
  }

  /**
   * 校验邮箱
   * @param {String} str 要验证的邮箱
	 * @example isEmail('877880098@qq.com')
   * @return Boolean true | false
   */
  export const isEmail = (str:string):boolean=> {
    return /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(str);
  }
