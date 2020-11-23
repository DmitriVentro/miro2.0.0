// pointA = undefined;
// pointB = undefined;
var fid;
var sid;
axios = require('axios');
var token = "Bearer 7c5ea6f9-8b19-41b3-96cf-e0c83ec7752b"
exports.Line = function (pointA, pointB, color) {
    this.data = {
        "type": "line",
        "startWidget": {
            "id": pointA
        },
        "endWidget": {
            "id": pointB
        },
        "style": {
            "borderColor": `${color}`,
            "borderStyle": "normal",
            "borderWidth": 1.0,
            "lineEndType": "opaque_block",
            "lineStartType": "opaque_block",
            "lineType": "orthogonal"
        }
    };
}
exports.Widget = function (x, y, text, backColor, textColor) {
    this.data = {
        "type": "shape",
        "x": x,
        "y": y,
        "width": 267.52997530771404,
        "rotation": 0.0,
        "height": 133.76499068195324,
        "text": `<p>${text}</p>`,
        "style": {
            "backgroundColor": `${backColor}`,
            "backgroundOpacity": 1.0,
            "borderColor": "#ffffff",
            "borderOpacity": 1.0,
            "borderStyle": "normal",
            "borderWidth": 2.0,
            "fontFamily": "IBM Plex Mono",
            "fontSize": 18,
            "shapeType": "rounded_rectangle",
            "textAlign": "center",
            "textAlignVertical": "middle",
            "textColor": `${textColor}`
        }
    }
}

//Legend
exports.Legend = function (x, y, text, backColor, textColor) {
    this.data = {
        "type": "shape",
        "x": x,
        "y": y,
        "width": 254.39521764925942,
        "rotation": 0.0,
        "height": 64.4420794822017,
        "text": `${text}`,
        "style": {
            "backgroundColor": `${backColor}`,
            "backgroundOpacity": 1.0,
            "borderColor": "#ffffff",
            "borderOpacity": 1.0,
            "borderStyle": "normal",
            "borderWidth": 2.0,
            "fontFamily": "IBM Plex Mono",
            "fontSize": 20,
            "shapeType": "rectangle",
            "textAlign": "center",
            "textAlignVertical": "middle",
            "textColor": `${textColor}`
        }
    }
}

exports.Color = {
    //в HEX коде:
    HEX:
    {
        Sales: '#418c00',
        BA: '#fac710',
        RFK_PK: '#808080',
        Process: '#000000',
        Dev: '#12cdd4',
        Client: '#f24726',
        Marketing: '#414bb2',
        Des: '#2d9bf0',
        RPorEmpty: '#d78f1c',
        DeadGreen: '#d9ead3',
        BLACK: '#000000',
        WHITE: '#ffffff'
    },
    //в виде RED GREEN BLUE:
    RGB:
    {
        Practice: '143, 209, 79',
        Provider: '224, 255, 102',
        Resource: '45, 155, 240',
        Process: '0, 0, 0',
        Product: '250, 199, 16',
        User: '149, 16, 172'
    }
};
exports.MiroConfig = function (data) {
    this.data = {
        method: 'post',
        url: 'https://api.miro.com/v1/boards/o9J_kp5pAx8=/widgets/',
        headers: { 'authorization': token },
        data: data
    }
}
/**
LegendBody = new this.Legend(0, 0, "some_text", this.Color.HEX.Client);
LegendConfig = new this.MiroConfig(LegendBody.data);
WidgetBody = new this.Widget(2000, 0, "Получить фотографии с марсохода Curiosity, полюбоваться, найти пасхалки-надписи на марсоходе(!)\nПолучить космическую картинку дня, посмотреть разные картинки в разные даты\nПолучить фотку Земли (EPIC), попробовать подобрать позиции для того, что увидеть N-нную страну\n", this.Color.HEX.Client);
WidgetConfig = new this.MiroConfig(WidgetBody.data);

axios(LegendConfig.data)
    .then((response) => { 
        fid = response.data.id; 
        console.log(response.data);
    })
    .then(() => {
        axios(WidgetConfig.data)
            .then((response) => {
                sid = response.data.id;
                console.log(response.data)
            })
            .then(() => {
                console.log(fid, ' - Первый', '\n', sid, ' - Второй\n');
                LineBody = new this.Line(fid, sid);
                LineConfig = new this.MiroConfig(LineBody.data);
                axios(LineConfig.data)
                .then((response) => {
                    console.log(response.data.type);
                })
            })
    })
    
 */