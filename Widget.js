var requestMiro = require('./sendData');
var styles = require('./Widgets/style_module');
var fs = require('fs');
module.exports.Widget = class Widget {
    constructor(
        tempData,
        X_DISTANCE = 700,
        Y_DISTANCE = 700,
        timeout = 7000) {
        this.data = tempData;
        this.X_DISTANCE = X_DISTANCE;
        this.Y_DISTANCE = Y_DISTANCE;
        this.timeout = timeout;
        this.nameOf = undefined;
        this.index = undefined;
        this.color = undefined;
        this.textColor = undefined;
        this.colorLine = undefined;
        this.x = undefined;
        this.y = undefined;
        this.preId = undefined;
        this.titleProcess = undefined;
        this.numberWidget = 0;
        this.widgetStructure = [];
        this.widgetInfo = [];
    }

    printExclamatory() {

    }

    sortStructure() {
        for (this.numberWidget; this.numberWidget < this.data.Name.length; this.numberWidget++) {
            if (this.data.ColorProcess[this.numberWidget] == styles.Color.HEX.DeadGreen) {
                // await this.send(this.data.Name[index], this.data.Practice, this.preId);
                while (this.data.ColorProcess[this.numberWidget + 1] != styles.Color.HEX.DeadGreen) {
                    if (this.data.User[this.numberWidget + 1] != undefined) {
                        try {
                            let nestedWidgets = this.data.User[this.numberWidget + 1][0].split(', ');
                            // console.log(this.numberWidget);
                            // await this.send(
                            //     this.data.Practice[this.numberWidget + 1],
                            //     this.data.Name[this.numberWidget + 1],
                            //     nestedWidgets);
                            for (let nestedIndex = 0; nestedIndex < nestedWidgets.length; ++nestedIndex) {
                                let yourIndex = this.nestedAlgorithm(nestedWidgets[nestedIndex], this.numberWidget);
                                if (yourIndex != -1 && yourIndex != undefined) 
                                { console.log(this.data.Name[yourIndex]); }
                            }
                        } catch (error) {  }
                    }
                    this.numberWidget++;
                }
            }
        }
        this.widgetStructure.push(this.widgetInfo);
        fs.writeFileSync("log.json", JSON.stringify(this.widgetStructure));
    }

    async send(item, text, nestedWidgets, tempX, tempY) {
        if (this.preId == undefined) {
            this.processName(item);
            let response = await requestMiro.sendData(
                0,
                0,
                this.color,
                text,
                this.textColor)
            this.pushInfoWidget(response);
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            this.colorLine = this.color;
        }
        else {
            this.processName(item);
            let response = await requestMiro.sendData(
                this.x + this.X_DISTANCE,
                this.y,
                this.color,
                text,
                this.textColor,
                this.colorLine,
                this.preId)
            this.pushInfoWidget(response);
            this.preId = response.response.data.id;
            this.x = response.response.data.x;
            this.y = response.response.data.y;
            this.colorLine = this.color;
        }
    }

    pushInfoWidget(response) {
        this.widgetInfo.push({
            id: response.response.data.id,
            text: response.response.data.text,
            x: response.response.data.x,
            y: response.response.data.y,
            color: response.response.data.style.backgroundColor,
            colorText: response.response.data.style.textColor
        })
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

    nestedAlgorithm(nestedWidget, index) {
        if (nestedWidget == 'Аналитик') {
            let res = this.data.Practice.indexOf((practice) => {practice == 'BA'});
            return res;
        }
        else if (nestedWidget == 'Sales') {
            let res = this.data.Practice.indexOf('Sales', this.numberWidget);
            return res;
        }
        else if (nestedWidget == 'Dev') {
            let res = this.data.Practice.indexOf('Dev', this.numberWidget);
            return res;
        }
        else if (nestedWidget == 'РФК Sales') {
            let res = this.data.Practice.indexOf('РФК производственной команды', this.numberWidget);
            return res;
        }

    }
}