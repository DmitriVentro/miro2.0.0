var style = require("./Widgets/style_module.js");
// var miro_func = require("./miro2.js");
var axios = require('axios');
const { resolve } = require("path");
const { rejects } = require("assert");
exports.sendData = function (x, y, color, item, textColor, colorLine, preId) {
    var fId;
    if (colorLine == undefined && preId == undefined) {
        dataa = new style.Widget(x, y, item, color, textColor);
        dataaconfig = new style.MiroConfig(dataa.data);
        return axios(dataaconfig.data)
            .then(response => { return { response } })
            .catch(error => {  });
    }
    else {
        dataa = new style.Widget(x, y, item, color, textColor);
        dataaconfig = new style.MiroConfig(dataa.data);
        return axios(dataaconfig.data)
            .then(response => {
                fId = response.data.id;
                LineBody = new style.Line(preId, fId, colorLine);
                LineConfig = new style.MiroConfig(LineBody.data);
                axios(LineConfig.data);
                return { response } 
                })
            .catch(error => {  });
                
    }
}
