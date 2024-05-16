"use strict";
const isMobile = (str) => {
  return /^1[3-9]\d{9}$/.test(str);
};
const isEmail = (str) => {
  return /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/.test(str);
};
exports.isEmail = isEmail;
exports.isMobile = isMobile;
