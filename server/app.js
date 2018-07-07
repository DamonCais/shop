const path = require('path')
const Koa = require('koa')
const static = require('koa-static')

var cors = require('koa-cors');

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const redis = require('redis')
const client = redis.createClient(6379, 'localhost')

const koaBody = require('koa-body');
// app.use(koaBody({ multipart: true }));


// app.use(koaBody());
app.use(koaBody({
    multipart: true,
    formidable: {
        uploadDir: '../dist/uploadDir', // 上传的文件存储的路径 
        keepExtensions: true //  保存图片的扩展名
    }
}));
// const staticPath = './dist'
app.use(bodyParser());
const staticPath = '../dist'
app.use(static(
    path.join(__dirname, staticPath)
))

app.use(cors());


app.use(async(ctx, next) => {

    try {
        ctx.error = (code, message) => {
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
        };
        let at = await getToken();
        console.log(at);
        console.log(ctx.request.header['access-token'])
        if (ctx.request.header['access-token'] !== at && ctx.request.url !== '/login') {
            ctx.throw(401);
        }
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
router.get('/media.get', require('./getMedia')());

app.use(router.routes());

app.listen(8081, () => {
    console.log('[demo] jsonp is starting at port 8081')
})

function getToken() {
    return new Promise((resolve, reject) => {
        client.get('access_token', (err, res) => {
            resolve(res)
        })

    })
}