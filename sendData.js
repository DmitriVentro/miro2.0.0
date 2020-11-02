var style = require("./Widgets/style_module.js");
var miro_func = require("./miro2.js");
exports.sendData = async function(tableData) {
    a = []
    for (let i = 0; i <= tableData.toSendDataUser.length; i++) {
        try { a.push(tableData.toSendDataUser[i].split(',')); }
        catch { a.push(tableData.toSendDataUser[i]); }
    }
    // console.log(a)
    //Точка отправки
    practices = miro_func.unique(tableData.toSendDataPractice);
    console.log(tableData)
}