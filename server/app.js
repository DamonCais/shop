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
        let whiteList = ['/login', '/page.get', '/product.get'];
        let url = ctx.request.url.split('?')[0]
        if (ctx.request.header['access-token'] !== at && whiteList.indexOf(url) === -1) {
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
router.post('/logout', require('./logout')());

router.post('/media.add', require('./media').mediaAdd());
router.get('/media.get', require('./media').mediaGet());

router.post('/product.add', require('./product').productAdd());
router.post('/product.del', require('./product').productDel());
router.get('/product.get', require('./product').productGet());


router.post('/page.add', require('./page').pageAdd());
router.post('/page.del', require('./page').pageDel());
router.get('/page.get', require('./page').pageGet());
router.post('/page.update', require('./page').pageUpdate());



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