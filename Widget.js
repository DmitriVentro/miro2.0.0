var requestMiro = require('./sendData');
var styles = require('./Widgets/style_module');
module.exports.Widget = class Widget {
    constructor(
        tempData,
        X_DISTANCE = 700,
        Y_DISTANCE = 700,
        timeout = 7000,
        nameOf,
        indexItem,
        colorItem,
        colorTextItem,
        tempColorLine,
        prex,
        prey,
        preId,
        titleProcess) {
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
        this.titleProcess = titleProcess;
        this.numberWidget = 0;
        // console.log(this.data.Practice);
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

    async sortStructure() {
        let nestedWidgets;
        for (this.numberWidget; this.numberWidget < this.data.Name.length; this.numberWidget++) {
            if (this.data.ColorProcess[this.numberWidget] == styles.Color.HEX.DeadGreen) {
                // await this.send(this.data.Name[index], this.data.Practice, this.preId);
                while (this.data.ColorProcess[this.numberWidget + 1] != styles.Color.HEX.DeadGreen) {
                    if (this.data.User[this.numberWidget + 1] != undefined) {
                        try {
                            nestedWidgets = this.data.User[this.numberWidget + 1][0].split(', ');

                            await this.send(
                                this.data.Practice[this.numberWidget + 1],
                                this.data.Name[this.numberWidget + 1],
                                nestedWidgets,
                                this.preId);

                        } catch (error) { }
                    }
                    this.numberWidget++;
                }
            }
        }
    }

    nestedAlgorithm(nestedWidget) {
        if (nestedWidget == 'Аналитик') {
            let res = this.data.Practice.indexOf('BA', this.numberWidget + 1);
            console.log('BA - ', res);
            return res;
        }
        else if (nestedWidget == 'Sales') {
            let res = this.data.Practice.indexOf('Sales', this.numberWidget + 1);
            console.log('Sales - ', res);
            return res;
        }
        else if (nestedWidget == 'Dev') {
            let res = this.data.Practice.indexOf('Dev', this.numberWidget + 1);
            console.log('Dev - ', res);
            return res;
        }
        else if (nestedWidget == 'РФК Sales') {
            let res = this.data.Practice.indexOf('РФК производственной команды', this.numberWidget + 1);
            console.log('РФК производственной команды - ', res);
            return res;
        }
        else if (nestedWidget == 'РФК Sales') {
            let res = this.data.Practice.indexOf('РФК производственной команды', this.numberWidget + 1);
            console.log('РФК производственной команды - ', res);
            return res;
        }
    }

    async send(item, text, nestedWidgets, nestX, nestY) {

        if (nestedWidgets != undefined) {
            // console.log("if nestedWidget != undefined");
            if (this.preId == undefined) {
                // console.log("this.preId == undefined");
                this.processName(item);
                var response = await requestMiro.sendData(0, 0, this.color, text, this.textColor, text)
                this.preId = response.response.data.id;
                this.x = response.response.data.x;
                this.y = response.response.data.y;
                this.colorLine = this.color;
                for (let index = 0; index < nestedWidgets.length; index++) {
                    var nestedIndex = this.nestedAlgorithm(nestedWidgets[index], index);
                    console.log('nestedIndex ', nestedIndex);

                    if (nestedIndex != undefined) {
                        var response = await this.sendNested(
                            this.data.Practice[nestedIndex],
                            this.data.Name[nestedIndex],
                            this.x,
                            this.y + this.Y_DISTANCE);
                    }
                }
                this.x += this.X_DISTANCE;
                this.y = response.response.data.y;
            }
            // this.send(this.data.Practice[res], this.data.Name[res], this.preId)

            else {
                // console.log("'if nested !=' else?")
                this.processName(item);
                // console.log(item);
                var response = await requestMiro.sendData(
                    this.x + this.X_DISTANCE,
                    this.y,
                    this.color,
                    text,
                    this.textColor,
                    this.colorLine,
                    this.preId);
                this.colorLine = this.color;
                this.preId = response.response.data.id;
                this.x = response.response.data.x;
                this.y = response.response.data.y;
                // console.log(preId, this.x, this.y);
                for (let index = 0; index < nestedWidgets.length; index++) {
                    var nestedIndex = this.nestedAlgorithm(nestedWidgets[index], index);
                    console.log('nestedIndex ', nestedIndex);
                    if (nestedIndex != undefined) {
                        var response = await this.sendNested(
                            this.data.Practice[nestedIndex],
                            this.data.Name[nestedIndex],
                            this.x,
                            this.y + this.Y_DISTANCE);
                    }
                }
                this.x += this.X_DISTANCE;
                this.y = response.response.data.y;
            }
        }
    }
    async sendNested(item, text, nestX, nestY) {
        if (this.preId == undefined) {
            // console.log("else if (this.preId == undefined)");
            this.processName(item);
            var response = await requestMiro.sendData(nestX, nestY, this.color, text, this.textColor, text)
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            this.colorLine = this.color;

            // console.log(this.preId, this.x, this.y);
        }
        else {
            // console.log("last else")
            this.processName(item);
            // console.log(item);
            var response = await requestMiro.sendData(
                nestX,
                nestY,
                this.color,
                text,
                this.textColor,
                this.colorLine,
                this.preId);

            this.colorLine = this.color;
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            // console.log(preId, this.x, this.y);
        }
    }
}

// async function foo(Widget) {
//     nestedWidgets = new Widget([10, 10, 10]);
//     test = await nestedWidgets.send("РП");
//     test1 = await nestedWidgets.send("Sales", test);
//     test2 = await nestedWidgets.send("Dev", test1);
//     test3 = await nestedWidgets.send("Des", test2);
// }
// foo(this.Widget);