/**
 * Created by mosaic101 on 2016/7/14.
 * intro： controller of user
 */
var User = require("../DAO/userDAO");

/**
 * index
 * @param ctx
 * @param next
 */
exports.index = (ctx, next) => {
    "use strict";
    ctx.body = '/users/ response!';
};

/**
 * login
 * @param ctx
 * @param next
 */
exports.login = (ctx, next) => {
    "use strict";

    var user = new User({
        email: "mosaic101@foxmail.com",
        password: 123456,
        nickname: "mosaic",
        portrait: '/atvillage/default/portraits/0_1.jpg',
        thumbnail: '/atvillage/default/portraits/0_1.jpg',
        fans: 0,
        follow: 0,
        description: '暂无简介'
    });

    user.save(function(err) {
        if (err) {
            console.log(err);
            // callback(err);
        } else {
            // callback(null);
        }
    });
    ctx.body = '/users/login response!';
};