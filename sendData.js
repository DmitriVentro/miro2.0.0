var style = require("./Widgets/style_module.js");
var miro_func = require("./miro2.js");
var axios = require('axios');
const { resolve } = require("path");
const { rejects } = require("assert");
exports.sendData = async function(tableData) {
    
    /*
    a = []
    for (let i = 0; i <= tableData.toSendDataUser.length; i++) {
        try { a.push(tableData.toSendDataUser[i].split(',')); }
        catch { a.push(tableData.toSendDataUser[i]); }
    }
    */
    // console.log(a);
    //Точка отправки
    promise = new Promise((resolve, reject) => {
        practices = miro_func.unique(tableData.Practice);
        dataa = new style.Widget(0, 0, tableData.Practice[3], style.Color.HEX.BA);
        resolve(dataaconfig = new style.MiroConfig(dataa.data));
    })
    promise.then(() => {
        console.log(dataaconfig.data);
        axios(dataaconfig.data)
        .then((response)=>{
            console.log(response.data.id)
            console.log(response.data.x)
            console.log(response.data.y)
            
        })
    })
    return []
}
this.sendData();