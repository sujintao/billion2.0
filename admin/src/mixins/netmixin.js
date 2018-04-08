import restfulapi from '~/api/restfulapi'
import base64 from '~/api/base64.js'
import md5 from '~/api/md5.min.js'

export default {
    created: function () {
        this.base64 = base64
    },
    methods: {
        loginHttp(user, pwd) {
            let httpdata = {
                user: user,
                pwd: md5(pwd)
            }
            return restfulapi.axiosLogin(httpdata)
        },
        getPageHttp(db, tableName,page, prepage, filter) {
           return this.getHttp(db, tableName,null, page, prepage, filter)
        },
        getHttp(db, tableName, id, page, prepage, filter) {
            let way = 'get'
            let httpdata = ''
            let filterstr = ''

            let urlpage = page ? page : 0
            let urlprepage = prepage ? prepage : 10
            let urlfilter = filter ? filter : []
            filterstr = this.base64.encode(JSON.stringify(urlfilter))
            let urlhttp = {
                db: db,
                api: true,
                tableName: tableName,
                sid: id,
                url: '?page=' + urlpage + '&prepage=' + urlprepage + '&filter=' + filterstr
            }
            return restfulapi.axiosHttp(way, urlhttp, httpdata)
        },
        postHttp(db, tableName, httpdata) {
            let way = 'post'
            let urlhttp = {
                db: db,
                api: true,
                tableName: tableName,
            }
            return restfulapi.axiosHttp(way, urlhttp, httpdata)
        },
        putHttp(db, tableName, id, httpdata) {
            let way = 'put'
            let urlhttp = {
                db: db,
                api: true,
                tableName: tableName,
                sid: id
            }
            return restfulapi.axiosHttp(way, urlhttp, httpdata)
        },
        deleteHttp(db, tableName, id) {
            let way = 'delete'
            let httpdata = ''
            let urlhttp = {
                db: db,
                api: true,
                tableName: tableName,
                sid: id
            }
            return restfulapi.axiosHttp(way, urlhttp, httpdata)
        },
    }
}