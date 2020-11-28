function isBlank (lastRow, data) {
    var tempArray = [];

    for (var Jungle = 0; Jungle < lastRow; Jungle++) {
        if (data[Jungle] == null || data[Jungle] == '' || data[Jungle] == undefined) { tempArray.push(false); }
        else { tempArray.push(true); }
    }
    return tempArray;
}
exports.isBlank = function (lastRow, data) {
    var tempArray = [];

    for (var Jungle = 0; Jungle < lastRow; Jungle++) {
        if (data[Jungle] == null || data[Jungle] == '' || data[Jungle] == undefined) { tempArray.push(false); }
        else { tempArray.push(true); }
    }
    return tempArray;
}
exports.milestoneTitleCount = function (lastRow, dataMilestone) {
    var tempArray = [];
    milestoneBlanks = isBlank(lastRow, dataMilestone);
    for (var Jungle = 0; Jungle < lastRow; Jungle++) {
        if (milestoneBlanks[Jungle] == true) { tempArray.push(Jungle); }
    }
    return tempArray;
}
exports.milestoneTitle = function (data, lastRow) {
    var tempArray = [];
    milestoneBlanks = isBlank(lastRow, data);
    for (var Jungle = 0; Jungle < lastRow; Jungle++) {
        if (milestoneBlanks[Jungle] == true) { tempArray.push(data[Jungle]); }
    }
    return tempArray;
}
exports.getTitlesCountsProcess = function (lastRow, SubProcessItem) {
    var tempArray = [];
    for (let n = 0; n < lastRow; n++) {
        if (SubProcessItem.ColorProcess[n] == '#d9ead3') { tempArray.push(n); }
    }
    return tempArray;
}
exports.getTitlesProcess = function (lastRow, SubProcessItem) {
    var tempArray = [];
    for (let n = 0; n < lastRow; n++) {
        if (SubProcessItem.ColorProcess[n] == '#d9ead3'
            && SubProcessItem.isProcessBlank[n] == true) { tempArray.push(SubProcessItem.Name[n]); console.log(tempArray[n]) }
    }
    return tempArray;
}
exports.getTitlesCountsProcessOnlyEnd = function (lastRow, SubProcessItem) {
    var tempArray = [];
    for (let n = 0; n < lastRow; n++) {
        if (SubProcessItem.ColorProcess[n] == '#d9ead3'
            && SubProcessItem.isProcessBlank[n] == false) { tempArray.push(n) }
    }
    return tempArray;
}
exports.unique = function (arr) {
    let result = [];

    for (let str of arr) {
        if (!result.includes(str) && str != undefined) {
            result.push(str);
        }
    }

    return result;
}