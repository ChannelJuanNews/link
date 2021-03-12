function parseCookie(cookie) {
  return cookie.split(";").reduce((res, c) => {
    const [key, val] = c.trim().split("=").map(decodeURIComponent);
    const allNumbers = (str) => /^\d+$/.test(str);
    try {
      return Object.assign(res, {
        [key]: allNumbers(val) ? val : JSON.parse(val),
      });
    } catch (e) {
      return Object.assign(res, { [key]: val });
    }
  }, {});
}

export default parseCookie;
