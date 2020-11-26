var requestMiro = require('./sendData');
var styles = require('./Widgets/style_module');
module.exports.Widget = class Widget {
    constructor(
        tempData,
        X_DISTANCE = 400,
        Y_DISTANCE = 150,
        timeout = 7000,
        nameOf,
        indexItem,
        colorItem,
        colorTextItem,
        tempColorLine,
        prex,
        prey,
        preId) {
        this.data = tempData;
        this.X_DISTANCE = X_DISTANCE;
        this.Y_DISTANCE = Y_DISTANCE;
        this.timeout = timeout;
        this.nameOf = nameOf;
        this.index = indexItem;
        this.color = colorItem;
        this.textColor = colorTextItem;
        this.colorLine = tempColorLine;
        this.x = prex;
        this.y = prey;
        this.preId = preId;
    }
    processName(item) { //item - практика по индексу
        if (item == "Sales") {
            this.nameOf = "Sales";
            this.color = styles.Color.HEX.Sales;
            this.textColor = styles.Color.HEX.WHITE;
        }
        else if (item == "BA") {
            this.nameOf = "BA";
            this.color = styles.Color.HEX.BA;
            this.textColor = styles.Color.HEX.BLACK;
        }
        else if (item == "РФК производственной команды") {
            this.nameOf = "РФК производственной команды";
            this.color = styles.Color.HEX.RFK_PK;
            this.textColor = styles.Color.HEX.WHITE;
        }
        else if (item == "РП") {
            this.nameOf = "РП";
            this.color = styles.Color.HEX.RPorEmpty;
            this.textColor = styles.Color.HEX.BLACK;
        }
        else if (item == "Dev") {
            this.nameOf = "Dev";
            this.color = styles.Color.HEX.Dev;
            this.textColor = styles.Color.HEX.BLACK;
        }
        else if (item == "Des") {
            this.nameOf = "Des";
            this.color = styles.Color.HEX.Des;
            this.textColor = styles.Color.HEX.WHITE;
        }
        else {
            this.nameOf = "error!";
            this.color = styles.Color.HEX.DeadGreen;
            this.textColor = styles.Color.HEX.BLACK;
        }
    }
    async send(item, preId) {
        if (preId == undefined) {
            this.processName(item);
            var response = await requestMiro.sendData(0, 0, this.color, item, this.textColor)
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            this.colorLine = this.color;
            console.log(this.preId, this.x, this.y);
        }
        else {
            this.processName(item);
            // console.log(this.x, this.y);
            var response = await requestMiro.sendData(
                this.x + this.X_DISTANCE,
                this.y,
                this.color,
                item,
                this.textColor,
                this.colorLine,
                this.preId);

            this.colorLine = this.color;
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            console.log(preId, this.x, this.y);
        }
        return this.preId;
    }
}

// async function foo(Widget) {
//     a = new Widget([10, 10, 10]);
//     test = await a.send("РП");
//     test1 = await a.send("Sales", test);
//     test2 = await a.send("Dev", test1);
//     test3 = await a.send("Des", test2);
// }
// foo(this.Widget);