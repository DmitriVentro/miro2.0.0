
// exports.Widget = {
//     X_DISTANCE: 150,
//     Y_DISTANCE: 150,
//     data: [],
//     constructor(tempData)
//     {
//         this.data = tempData;
//         console.log(data);
//     }
// }
var requestMiro = require('./sendData');
var styles = require('./Widgets/style_module');
module.exports.Widget = class Widget {
    constructor(
        tempData,
        X_DISTANCE = 150,
        Y_DISTANCE = 150,
        timeout = 7000,
        nameOf,
        indexItem,
        colotItem) {
        this.data = tempData;
        this.X_DISTANCE = X_DISTANCE;
        this.Y_DISTANCE = Y_DISTANCE;
        this.timeout = timeout;
        this.nameOf = nameOf;
        this.index = indexItem;
        this.color = colotItem;
    }
    processName(item) { //item - практика по индексу
        if (item == "Sales") {
            this.nameOf = "Sales";
            this.color = styles.Color.HEX.Sales;
        }
        else if (item == "BA") {
            this.nameOf = "BA";
            this.color = styles.Color.HEX.BA;
        }
        else if (item == "РФК производственной команды") {
            this.nameOf = "РФК производственной команды";
            this.color = styles.Color.HEX.RFK_PK;
        }
        else if (item == "РП") {
            this.nameOf = "РП";
            this.color = styles.Color.HEX.RPorEmpty;
        }
        else if (item == "Dev") {
            this.nameOf = "Dev";
            this.color = styles.Color.HEX.Dev;
        }
        else if (item == "Des") {
            this.nameOf = "Des";
            this.color = styles.Color.HEX.Des;
        }
        else {
            this.nameOf = "error!";
            this.color = styles.Color.HEX.DeadGreen;
        }
    }
    send(preId, item) {
        if (preId == undefined) {
            this.processName(item);
            requestMiro.sendData(this.color, item)
        }
        else {

        }
    }

}
// a = new this.Widget([10, 10, 10]);
// a.foo();