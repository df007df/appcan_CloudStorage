/**
 * 设置或读取localstorage
 *
 * @param {}
 *            key 只有key的时候，取值
 * @param {}
 *            value 设置值
 * @return {}
 */
function localCache(key, value){
    if (window.localStorage) {
        if (arguments.length == 1) {
            var value = localStorage.getItem(arguments[0])
            return value;
        }
        else {
            if (arguments.length == 2) {
                localStorage.removeItem(arguments[0]);
                return localStorage.setItem(arguments[0], arguments[1]);
            }
        }
    }
    else {
        alert('不支持localStorage');
    }
}


/**
 * 设置或读取sessionStorage
 *
 * @param {}
 *            key 只有key的时候，取值
 * @param {}
 *            value  设置值
 * @return {}
 */
function sessionCache(key, value){
    if (window.sessionStorage) {
        if (arguments.length == 1) {
            var value = sessionStorage.getItem(arguments[0]);
            return value;
        }
        else {
            if (arguments.length == 2) {
                sessionStorage.removeItem(arguments[0]);
                var r = sessionStorage.setItem(arguments[0], arguments[1]);
                return r;
            }
        }
    }
    else {
        alert('不支持sessionStorage');
    }
}

/**
 * 删除localStorage
 *
 * @param {}
 *            key 为空则删除所有
 * @return {}
 */
function delLocalCache(key){
    if (window.localStorage) {
        if (key) {
            return localStorage.removeItem(key);
        }
        else {
            localStorage.clear();
        }
    }
    else {
        alert('不支持localStorage');
    }
}
