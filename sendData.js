var style = require("./Widgets/style_module.js");
// var miro_func = require("./miro2.js");
var axios = require('axios');
const { resolve } = require("path");
const { rejects } = require("assert");
exports.sendData = function (x, y, color, item, textColor, colorLine, preId) {
    var fId;
    if (preId == undefined) {
        console.log(preId)
        // console.log("sendData - if");
        let dataa = new style.Widget(x, y, item, color, textColor);
        let dataaconfig = new style.MiroConfig(dataa.data);
        return axios(dataaconfig.data)
            .then(response => { return { response } })
            .catch(error => {
                console.log(error.response.data)
            });
    }
    else {
        // console.log("sendData - else");
        let dataa = new style.Widget(x, y, item, color, textColor);
        let dataaconfig = new style.MiroConfig(dataa.data);
        return axios(dataaconfig.data)
            .then(response => {
                fId = response.data.id;
                LineBody = new style.Line(preId, fId, colorLine);
                LineConfig = new style.MiroConfig(LineBody.data);
                axios(LineConfig.data);
                return { response } 
                })
            .catch(error => { console.log(error.response.data) })
                
    }
}
