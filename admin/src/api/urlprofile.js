const appurl = 'http://app.bullstech.cn/'

const param = []
param.push({ flag: 'login', text: 'login' })
param.push({ flag: 'db' })
param.push({ flag: 'api', text: 'api' })
param.push({ flag: 'apis', text: 'apis' })
param.push({ flag: 'deletes', text: 'deletes' })
param.push({ flag: 'count', text: 'count' })
param.push({ flag: 'id', text: 'id' })
param.push({ flag: 'upload', text: 'upload' })
param.push({ flag: 'tableName' })
param.push({ flag: 'sid' })
param.push({ flag: 'url', noend: true })

function UrlAll(urlparam) {
    let url = appurl
    param.forEach(item => {
        if (urlparam[item.flag]) {
            let end = '/'
            if (item.noend) {
                end = ''
            }
            if (item.text) {
                url += item.text + end
            } else {
                url += urlparam[item.flag] + end
            }
        }
    })
    return url
}
export default UrlAll