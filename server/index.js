const Koa = require('koa')
// const koaStatic = require('koa-static')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import httpProxy from 'http-proxy-middleware'
import k2c from 'koa2-connect'
import dbConfig from './dbs/config'
import passport from './interface/utils/passport'
import users from './interface/users'
import geo from './interface/geo'
import search from './interface/search'
// const history = require('connect-history-api-fallback');


const app = new Koa()
  app.use(async(ctx, next) => {
    if(ctx.url.startsWith('api')) {
      ctx.respond = false
      await k2c(httpProxy({
        target: 'http://api.map.baidu.com',
        changeOrigin: true,
        secure: false
      }))(ctx,next)
    }
    await next()
  })
  // session有关
  app.keys = ['mt', 'keyskeys']
  app.proxy = true
  app.use(session({
    key: 'mt', //session前缀
    prefix: 'mt:uid',
    store: new Redis() // 借助redis存储
  }))
  app.use(bodyParser({
    extendTypes: ['json', 'from', 'text']
  }))
  app.use(json())

  mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
  })
  app.use(passport.initialize())
  app.use(passport.session())

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
      .then(res => {
        console.log('nuxt服务器已经启动')
      })
      .catch(err => {
        // logger.warn(err)
        console.log('nuxt服务器已停止')
      })
  } else {
    await nuxt.ready()
  }
  app.use(users.routes()).use(users.allowedMethods())
  app.use(geo.routes()).use(geo.allowedMethods())
  app.use(search.routes()).use(search.allowedMethods())
  app.use(ctx => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })
 
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
