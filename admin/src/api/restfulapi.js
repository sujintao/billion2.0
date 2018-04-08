import urlUtil from './urlprofile'

function loginlimits(login, obj) {
    window.login = login
    if (obj) {
        window.localStorage.setItem('tokentime', obj.data.nowtime)
        window.localStorage.setItem('token', obj.data.token)
    }
}

function axiosLogin(httpdata) {
    let param = { login: true }
    let url = urlUtil(param)
    return new Promise(resolve => {
        axios.post(url, httpdata).then((obj) => {
            if (obj.status == 200 && obj.data && obj.data.code == 0) {
                loginlimits(true, obj)
            } else {
                loginlimits('')
            }
            resolve(obj.data)
        }).catch(function (error) {
        })
    })
}
function axiosHttp(way, param, httpdata) {
    let url = urlUtil(param)
    let token = window.localStorage.getItem('token')
    let tokentime = window.localStorage.getItem('tokentime')
    axios.defaults.headers.common['authorization'] = token
    axios.defaults.headers.common['authtime'] = tokentime
    return new Promise(resolve => {
        axios[way](url, httpdata).then((response) => {
            resolve(response.data)
        }).catch(function (response) {
            if (response.status == 401) {
                loginlimits('')
            }
        })
    })
}

export default {
    axiosHttp,
    axiosLogin
}