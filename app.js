/**
 * Created by mosaic101 on 2016/7/11.
 */
import Koa from 'koa';
import convert from 'koa-convert';
import json from 'koa-json';
import Bodyparser from 'koa-bodyparser';
import logger from 'koa-logger';
import mongoose from 'mongoose';
//import loggers from './libs/logger'

//const app = new Koa();
//const router = require('koa-router')();
//const views = require('koa-views');
//const co = require('co');
//const convert = require('koa-convert');
//const json = require('koa-json');
//const onerror = require('koa-onerror');
//const bodyparser = require('koa-bodyparser')();
//const logger = require('koa-logger');
////const loggers = require('./log/logger');

//the index of router
const index = require('./routes/index');

const app = new Koa();
const bodyparser = Bodyparser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

//static file
//app.use(convert(require('koa-static')(__dirname + '/public')));

//app.use(views(__dirname + '/views', {
//  extension: 'jade'
//}));

//connect mongodb's database
// mongoose.connect('mongodb://dev:root@112.124.36.12:27017/atvillage', function(err) {
mongoose.connect('mongodb://localhost/blog', function(err) {
  if (err) throw err;
  console.log("connect mongodb's database success!!!!");
});

// logger
app.use(async (ctx, next) => {
  //将logger方法绑到ctx上
  //ctx.logger = loggers;
  console.log("...");
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

//router.use('/', index.routes(), index.allowedMethods());
//router.use('/users', users.routes(), users.allowedMethods());

//app.use(router.routes(),router.allowedMethods());

app.use(index.routes(),index.allowedMethods());

// response
app.on('error', function(err, ctx){
  console.error(err);
  logger.error('server error', err, ctx);
});


export default app;