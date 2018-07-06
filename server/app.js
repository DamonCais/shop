const path = require('path')
const Koa = require('koa')
const static = require('koa-static')

var cors = require('koa-cors');

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()

const koaBody = require('koa-body');
app.use(koaBody({ multipart: true }));
// app.use(koaBody());
app.use(cors());
const staticPath = '../dist'
app.use(bodyParser());
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(async (ctx, next) => {
    try {
        ctx.error = (code, message) => {
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
        };
        await next();
    } catch (e) {
        console.log(e);
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        ctx.response.status = status
        ctx.response.body = { message }

    }
});

let router = new Router();

router.post('/login', require('./login')());
router.post('/product.add', require('./addProduct')());
router.post('/media.add', require('./addMedia')());

app.use(router.routes());
app.listen(8081, () => {
    console.log('[demo] jsonp is starting at port 8081')
})