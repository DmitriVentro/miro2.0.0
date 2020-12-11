const fs = require('fs');
const { exit } = require('process');
let Widget = require("./Widget");
let data = fs.readFileSync('tableStructure.json', { encoding: 'utf8', flag: 'r' });
// console.log(JSON.parse(data));
let tempWidget;
try { tempWidget = new Widget.Widget(JSON.parse(data)) } 
catch { console.log("Внутри файла скорее всего ничего нет"); exit(); };
tempWidget.sortStructure();

