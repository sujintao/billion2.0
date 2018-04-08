import Koa from "koa"
import serve from "koa-static2"
import logger from "koa-logger"
import Router from "koa-router"
import jwt from 'koa-jwt'
import cors from 'koa2-cors'
import koaBody from 'koa-body'
import dbcontroller from "./db/dbcontroller"
import path from "path"
import alipay from "./alipay/alipay"
// 短信
import sms from './sms/sms'
import alisms from './sms/alisms'
//微信
import wx from './wx/wxandroid'
import upyun from './upyun/sign'

const app = new Koa()
const router = new Router()

app.use(cors())
// 鉴权
/*
app.use(function (ctx, next) {
    return next().catch((err) => {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        } else {
            throw err;
        }
    });
});
*/
// Unprotected middleware
// app.use(function (ctx, next) {
//     if (ctx.url.match(/^\/public/)) {
//         return next()
//     } else {
//         return next()
//     }
// })

// Middleware below this line is only reached if JWT token is valid
// app.use(jwt({ secret: 'nanguo' }))

app.use(koaBody())
app.use(logger())
app.use(serve("", path.join(__dirname, 'public')))

//login
router.get('/:db/api/:table', dbcontroller.all)
// 多表查询筛选接口
router.get('/apis/', dbcontroller.allmore)

router.post('/:db/api/:table', dbcontroller.add)
router.put('/:db/api/:table/:id', dbcontroller.modify)
router.delete('/:db/api/:table/:id', dbcontroller.remove)
router.get('/:db/deletes/:table/', dbcontroller.deletes)
router.get('/:db/count/:table/', dbcontroller.count)
router.post('/login/', dbcontroller.login)
router.get('/loginuser/', dbcontroller.loginuser)

//阿里支付
router.post('/alipay/', alipay.alipay)
router.post('/alipaynotify/', alipay.alipaynotify)

//短信
router.post('/sms/', alisms.alisms)
router.post('/checksms/', alisms.alichecksms)
router.post('/:db/sms/', sms.smssend)
router.get('/getsmssend/', sms.getsmssend)

//微信
router.post('/wxandroid/', wx.wxauth)

router.post('/upaiyunsign/', upyun.getHeaderSign)

app.use(router.routes())
app.listen(8899)
console.log('listen:8899')
