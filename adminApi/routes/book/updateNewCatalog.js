var express = require('express');
var router = express.Router();
const { oauth, tool, db, log, fs, path } = require("../../tool/require");
const updateNewCatalog = require("../../reptileTool/updateNewCatalog");


router.use('', oauth(1204),  async function(req, res, next) {

    let bookId = tool.getParams(req, 'bookId');
    let bookName = tool.getParams(req, 'bookName');
    if(!bookId) {
        res.send(tool.toJson(null, 'bookId不能为空', 1002));
        return;
    }
    if(!bookName) {
        res.send(tool.toJson(null, 'bookName不能为空', 1002));
        return;
    }

    let bookList = await db.query(`select * from book where id=${bookId} and name='${bookName}'`);

    let arr = [];
    let i = 0, length = bookList.length;
    for(i; i<length; i++) {
        let sqlbook = bookList[i];
        arr.push(await updateNewCatalog(sqlbook));
    }

    res.send(tool.toJson(arr, null, 1000));
});

module.exports = router;
