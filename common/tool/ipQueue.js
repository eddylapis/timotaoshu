let async;
if(global.timotaoApi) {
    async = global.timotaoApi.async;
} else {
    async = require("async");
}
let ipQueue = async.queue(function (obj, cb) {
    obj.pro.apply(this, obj.params).then((data) => {
        obj.result && obj.result.apply(this, data);
        cb();
    }).catch((err) => {
        console.log("报错啦");
        console.log(err);
        obj.error && obj.error(err);
        cb(err);
    });
}, 100);

ipQueue.empty = function() {
    // console.log("当最后一个任务交给worker执行时，会调用empty函数");
    // console.log("开始最后一个ip检查");
}
ipQueue.saturated = function() {
    // console.log("worker数量将用完时，会调用saturated函数");

}
ipQueue.drain = function() {
    // console.log("哭泣")
    // console.log("当所有任务都执行完时，会调用drain函数");
}


module.exports = ipQueue;