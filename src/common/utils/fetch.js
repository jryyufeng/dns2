/**
 * Created by qushuangru on 2018/1/10.
 * wiki: https://wiki.sankuai.com/pages/viewpage.action?pageId=1273106433
 */
import apiHost from './get-api-host';
import 'whatwg-fetch';

const defaultOpt = {
    method: 'GET',
    credentials: 'include',
    timeout: 6000,
    headers: {},
    withCredentials: true
};

function handleParams (v) {
    switch (typeof v) {
        case 'string':
            return v;
        case 'boolean':
            return v ? 'true' : 'false';
        case 'number':
            return isFinite(v) ? v : '';
        case 'object':
            return JSON.stringify(v);
        default:
            return v;
    }
}
function queryString (obj) {
    const params = [];
    for (let name in obj) {
        if (obj.hasOwnProperty(name)) {
            let val = handleParams(obj[name]);
            params.push(name + '=' + encodeURIComponent(val));
        }
    }
    return params.join('&');
}

function extend (target) {
    let i = 1;
    let len = arguments.length;
    while (i < len) {
        const source = arguments[i];
        for (let name in source) {
            if (source.hasOwnProperty(name)) {
                if (typeof source[name] === 'object' && typeof target[name] === 'object') {
                    extend(target[name], source[name]);
                } else {
                    target[name] = source[name];
                }
            }
        }
        i++;
    }
    return target;
}

// 自定义错误，方便后续识别来源
function APIError (message, name) {
    this.name = name || 'apiError';
    this.message = message;
    this.stack = (new Error()).stack;
}

APIError.prototype = new Error();

export function fetchApi (_url, _option, method) {
    let url = _url;
    let option = _option;
    if (typeof url === 'object') {
        option = url;
        url = option.url;
        delete option.url;
    }
    option = extend({}, JSON.parse(JSON.stringify(defaultOpt)), option);
    option.method = (method || option.method).toUpperCase();

    // 业务处理
    if (url.indexOf('//') < 0) {
        url = apiHost.localHost + url;
    }

    if (option.method === 'GET') {
        option.body = option.body || option.data || option.params;
        let sep = url.indexOf('?') > 0 ? '&' : '?';
        url = url + sep + queryString(option.body);
        delete option.body;
    } else if (option.method === 'POST') {
        option.body = option.body || option.data;
        if (option.params) {
            let sep = url.indexOf('?') > 0 ? '&' : '?';
            url = url + sep + queryString(option.params);
            delete option.params;
        }
        if (option.body) {
            let headers = option.headers;
            headers['Content-Type'] = headers['Content-Type'] || 'application/json';

            /* eslint-disable default-case */
            switch (headers['Content-Type']) {
                case 'application/json':
                    option.body = JSON.stringify(option.body);
                    break;
                case 'application/x-www-form-urlencoded':
                    option.body = queryString(option.body);
                    break;
                case 'multipart/form-data':
                    // option.body = new FormData(option.body);
                    delete option.headers['Content-Type'];
                    break;
            }
        }
    }

    let p = Promise.race([
        fetch(url, option),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(new APIError('request timeout')), option.timeout);
        })
    ]);

    return p
    /* eslint-disable consistent-return */
        .then(res => {
            if (res.ok) { // True if status is HTTP 2xx
                return res;
            }
            // 业务逻辑处理
            if (res.status === 401) {
                // console.log(res.status);
                alert('无权限'); // v1.0.1新增
            } else if (res.status === 403) {
                location.href = '/#/403';
            } else {
                throw new APIError(res.status + ':' + res.statusText);
            }
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.status === 0 || res.code === 200) {
                return res;
            }
            throw new APIError(res, 'businessError');
        })
        .catch(error => {
            // 错误接口上报
            if (error.name === 'businessError') {
                if (error.message && error.message.status === 401) {
                    // 后端返回的json里面的status为401，重定向到sso登入页。此时HTTP code为200
                    alert('无权限'); // v1.0.1新增
                }
                throw error.message;
            } else if (error.message && error.message === 'Failed to fetch' || error.response.status === 302) {
                throw new Error('网络错误');
            }
            throw new Error('网络错误');
        });
}

export function fetchGet (url, option) {
    return fetchApi(url, option);
}

export function fetchPost (url, option) {
    return fetchApi(url, option, 'POST');
}
