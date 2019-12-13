export default class Helper {
    /**
     * 获取cookie
     * @param {string} name cookie 名称
     */
    static getCookie(name) {
        name += "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return null;
    }
    /**
     * 设置cookie
     * @param {string} name cookie 名称
     * @param {string} value cookie 值
     * @param {number} expire s 默认2592000s = 30 天
     */
    static setCookie(name, value, expire = 2592000) {
        let date = new Date()
        date.setSeconds(date.getSeconds() + expire)
        document.cookie = name + "=" + value + "; expires=" + date.toGMTString()
    }
    /**
     * 移除cookie
     * @param {string} name cookie 名称
     */
    static removeCookie(name) {
        this.setCookie(name, "", -1)
    }
}