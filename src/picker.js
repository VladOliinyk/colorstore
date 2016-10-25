var global_hsv;
var global_rgb;
var global_hex;

function updateGlobalValues() {
    updateValues(global_hsv, global_rgb, global_hex);
}

function updateValues(hsv, rgb, hex) {
    global_hsv = hsv;
    global_rgb = rgb;
    global_hex = hex;
    updateLabels(global_hsv, global_rgb, global_hex);
    calculateColorScheme(global_hsv, global_rgb, global_hex);
}

var params = [0];

function setRange(range) {
    params[0] = parseInt(range);
}


function calculateColorScheme(hsv, rgb, hex) {
    var color1hsv = findNew1color(hsv, params);
    var color1rgb = convert.hsv_rgb(color1hsv[0], color1hsv[1], color1hsv[2]);
    var color1hex = convert.rgb_hex(color1rgb[0], color1rgb[1], color1rgb[2]);

    var color2hsv = findNew2color(hsv, params);
    var color2rgb = [];
    color2rgb[0] = (color2hsv[0] > 255) ? 255 : color2hsv[0];
    color2rgb[1] = (color2hsv[1] > 255) ? 255 : color2hsv[1];
    color2rgb[2] = (color2hsv[2] > 255) ? 255 : color2hsv[2];
    color2hsv = convert.rgb_hsv(color2rgb[0], color2rgb[1], color2rgb[2]);
    var color2hex = convert.rgb_hex(color2rgb[0], color2rgb[1], color2rgb[2]);

    var color3hsv = findNew3color(hsv, params);
    var color3rgb = convert.hsv_rgb(color3hsv[0], color3hsv[1], color3hsv[2]);
    var color3hex = convert.rgb_hex(color3rgb[0], color3rgb[1], color3rgb[2]);

    var color4hsv = findNew4color(hsv, params);
    var color4rgb = convert.hsv_rgb(color4hsv[0], color4hsv[1], color4hsv[2]);
    var color4hex = convert.rgb_hex(color4rgb[0], color4rgb[1], color4rgb[2]);


    var color1 = document.getElementById("cs11");
    color1.style.backgroundColor = "rgb(" + color1rgb + ")";

    var cs11text = document.getElementsByClassName("cs11text");
    changeTextColorToContrast(cs11text, color1rgb[0], color1rgb[1], color1rgb[2]);
    document.getElementById("cs11-rgb-r").value = color1rgb[0];
    document.getElementById("cs11-rgb-g").value = color1rgb[1];
    document.getElementById("cs11-rgb-b").value = color1rgb[2];
    document.getElementById("cs11-hsv-h").value = color1hsv[0];
    document.getElementById("cs11-hsv-s").value = color1hsv[1];
    document.getElementById("cs11-hsv-v").value = color1hsv[2];
    document.getElementById("cs11-hex").value = color1hex;

    var color2 = document.getElementById("cs12");
    color2.style.backgroundColor = "rgb(" + color2rgb + ")";
    var cs12text = document.getElementsByClassName("cs12text");
    changeTextColorToContrast(cs12text, color2rgb[0], color2rgb[1], color2rgb[2]);
    document.getElementById("cs12-rgb-r").value = color2rgb[0];
    document.getElementById("cs12-rgb-g").value = color2rgb[1];
    document.getElementById("cs12-rgb-b").value = color2rgb[2];
    document.getElementById("cs12-hsv-h").value = color2hsv[0];
    document.getElementById("cs12-hsv-s").value = color2hsv[1];
    document.getElementById("cs12-hsv-v").value = color2hsv[2];
    document.getElementById("cs12-hex").value = color2hex;

    var color3 = document.getElementById("cs13");
    color3.style.backgroundColor = "rgb(" + color3rgb + ")";
    var cs13text = document.getElementsByClassName("cs13text");
    changeTextColorToContrast(cs13text, color3rgb[0], color3rgb[1], color3rgb[2]);
    document.getElementById("cs13-rgb-r").value = color3rgb[0];
    document.getElementById("cs13-rgb-g").value = color3rgb[1];
    document.getElementById("cs13-rgb-b").value = color3rgb[2];
    document.getElementById("cs13-hsv-h").value = color3hsv[0];
    document.getElementById("cs13-hsv-s").value = color3hsv[1];
    document.getElementById("cs13-hsv-v").value = color3hsv[2];
    document.getElementById("cs13-hex").value = color3hex;

    var color4 = document.getElementById("cs14");
    color4.style.backgroundColor = "rgb(" + color4rgb + ")";
    var cs14text = document.getElementsByClassName("cs14text");
    changeTextColorToContrast(cs14text, color4rgb[0], color4rgb[1], color4rgb[2]);
    document.getElementById("cs14-rgb-r").value = color4rgb[0];
    document.getElementById("cs14-rgb-g").value = color4rgb[1];
    document.getElementById("cs14-rgb-b").value = color4rgb[2];
    document.getElementById("cs14-hsv-h").value = color4hsv[0];
    document.getElementById("cs14-hsv-s").value = color4hsv[1];
    document.getElementById("cs14-hsv-v").value = color4hsv[2];
    document.getElementById("cs14-hex").value = color4hex;


    function changeTextColorToContrast(csXXtext, R, G, B) {
        if ((R & 255 ) + ( G & 255 ) + ( B & 255 ) > 3 * 256 / 2) {
            for (var i = 0; i < 3; i++) {
                csXXtext[i].style.color = "#000000";
            }
        } else {
            for (var i = 0; i < 3; i++) {
                csXXtext[i].style.color = "#ededed";
            }
        }
    }
}

function findNew1color(color1hsv, params) {
    var h, s, v;
    var p = params[0];
    var h0 = color1hsv[0];
    var s0 = color1hsv[1];
    var v0 = color1hsv[2];
    h = h0 + p;
    h = (h > 360) ? 359 : h;
    h = (h < 0) ? 0 : h;

    s = s0 + p;
    s = (s > 100) ? 100 : s;
    s = (s < 0) ? 0 : s;

    v = v0 + (p * 0.5);
    v = (v > 100) ? 100 : v;
    v = (v < 0) ? 0 : v;


    return [parseInt(h), parseInt(s), parseInt(v)];
}

function findNew2color(color2hsv, params) {
    return [color2hsv[0], color2hsv[1], color2hsv[2]];
}

/* // similar colors
function findNew2color(color2hsv, params) {
    var red = (convert.hsv_rgb(color2hsv[0], color2hsv[1], color2hsv[2]))[0];
    return [red, color2hsv[1], color2hsv[2]];
} */

function findNew3color(color3hsv, params) {
    var h, s, v;
    var h0 = color3hsv[0];
    var s0 = color3hsv[1];

    h = h0;
    s = 6 + (s0 / 6);
    v = 7;

    return [parseInt(h), parseInt(s), parseInt(v)];
}

function findNew4color(color4hsv, params) {
    var h, s, v;
    var p = params[0] / 3;
    var h0 = color4hsv[0];
    var v0 = color4hsv[2];

    h = h0;
    s = 0;
    v = 100 - (v0 / 10);

    return [0, parseInt(s), parseInt(v)];
}

function updateLabels(hsv, rgb, hex) {
    document.getElementById("cl-rgb-r").value = rgb[0];
    document.getElementById("cl-rgb-g").value = rgb[1];
    document.getElementById("cl-rgb-b").value = rgb[2];

    document.getElementById("cl-hsv-h").value = hsv[0];
    document.getElementById("cl-hsv-s").value = hsv[1];
    document.getElementById("cl-hsv-v").value = hsv[2];

    document.getElementById("cl-hex").value = "" + hex;
}

function changeColorView(field) {
    console.log("changeColorView()");
    if (field.id == "cl-hex") {
        if (field.value.length > 6) {
            field.value = field.value[0] +
                field.value[1] +
                field.value[2] +
                field.value[3] +
                field.value[4] +
                field.value[5];
        }
        for (var i = 0; i < 6; i++) {
            field.value = field.value.replace(/[g-zG-Z]+/, '');
        }
        if (field.value.length < 6) {
            while (field.value.length < 6) {
                field.value += "f";
            }
        }
        // /[0-9a-fA-F]{6}/
    }
    updateCircle(field);
}

function updateCircle(field) {
    if (field.id == "cl-rgb-r") {
        circle = document.getElementById("circle");
        circleX = circle.style.left;
        circleY = circle.style.top;
        circle.style.top = 150 + "px";
        Block.cPos(1);
        console.log(circleX + " " + circleY);
    }
}

var picker = {
    V: 100,
    S: 100,
    status: false,

    init: function () {
        var id_elements = {
            primary: "primary_block",
            arrows: "arrows",
            block: "block_picker",
            circle: "circle",
            line: "line"
        };

        var s = {h: 180, w: 20, th: id_elements.arrows, bk: id_elements.block, line: id_elements.line};
        /*
         Параметры передаваемые через обьект "s" обьекту "Line"
         h - высота линни Hue
         w - ширина линни Hue
         th - id для елмента в котором находяться стрелки || ползунок для управление шкалой Hue
         bk - id блока главного блока с изображение и изменяемым фоном
         */
        Line.init(s);//отрисовка линий hue и привязка событий

        var b = {block: id_elements.block, circle: id_elements.circle};
        /*
         Параметры передаваемые через обьект "b" обьекту "Block"
         id - id блока выбора цвета (основной блок)
         c - круг для перемещения по основнoму блоку(для выбора цвета)
         */
        Block.init(b);// привязка событий к блоку и кругу для управления

        picker.out_color = document.getElementById("out_color");

    }
};

var Line = {

    Hue: 0,

    init: function (elem) {

        var canvaLine, cAr, pst, bk, t = 0;

        canvaLine = Line.create(elem.h, elem.w, elem.line, "cLine");

        cAr = document.getElementById(elem.th);
        bk = document.getElementById(elem.bk);

        Line.posit = function (e) {
            var top;

            top = mouse.pageY(e) - pst;
            top = (top < 0 ) ? 0 : top;
            top = (top > elem.h - 1 ) ? elem.h : top;

            cAr.style.top = top - 2 + "px";
            t = Math.round(top / (elem.h / 360));
            t = Math.abs(t - 360);
            //t = (t == 360) ? 0 : t;
            t = (t >= 360) ? 359 : t;
            t = (t <= 0) ? 1 : t;

            Line.Hue = t;

            var hsv = [t, picker.S, picker.V];
            var rgb = convert.hsv_rgb(hsv[0], hsv[1], hsv[2]);
            var hex = convert.rgb_hex(rgb[0], rgb[1], rgb[2]);
            updateValues(hsv, rgb, hex);
            bk.style.backgroundColor = "rgb(" + convert.hsv_rgb(t, 100, 100) + ")";
            picker.out_color.style.backgroundColor = "rgb(" + rgb + ")";

        }
// события перемещения по линии
        cAr.onmousedown = function () {

            pst = Obj.positY(canvaLine);

            document.onmousemove = function (e) {
                Line.posit(e);
            }
        }

        cAr.onclick = Line.posit;

        canvaLine.onclick = function (e) {
            Line.posit(e)
        };

        canvaLine.onmousedown = function () {

            pst = Obj.positY(canvaLine);

            document.onmousemove = function (e) {
                Line.posit(e);
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            cAr.onmousemove = null;

        }
    },


    create: function (height, width, line, cN) {
        var canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        canvas.className = cN;

        document.getElementById(line).appendChild(canvas);

        Line.grd(canvas, height, width);

        return canvas;
    },

    grd: function (canva, h, w) {
        var gradient, hue, color, canva, gradient1;

        canva = canva.getContext("2d");

        gradient = canva.createLinearGradient(w / 2, h, w / 2, 0);

        hue = [[255, 0, 0], [255, 255, 0], [0, 255, 0], [0, 255, 255], [0, 0, 255], [255, 0, 255], [255, 0, 0]];

        for (var i = 0; i <= 6; i++) {

            color = 'rgb(' + hue[i][0] + ',' + hue[i][1] + ',' + hue[i][2] + ')';

            gradient.addColorStop(i * 1 / 6, color);

        }
        ;
        canva.fillStyle = gradient;
        canva.fillRect(0, 0, w, h);
    }
};

var Block = {

    init: function (elem) {
        var circle, block, colorO, bPstX, bPstY, bWi, bHe, cW, cH, pxY, pxX;

        circle = document.getElementById(elem.circle);
        block = document.getElementById(elem.block);
        cW = circle.offsetWidth;
        cH = circle.offsetHeight;
        bWi = block.offsetWidth - cW;
        bHe = block.offsetHeight - cH;
        pxY = bHe / 100;
        pxX = bWi / 100;

        Block.cPos = function (e) {
            var top, left, S, V;

            document.ondragstart = function () {
                return false;
            }

            document.body.onselectstart = function () {
                return false;
            }

            left = mouse.pageX(e) - bPstX - cW / 2;
            left = (left < 0) ? 0 : left;
            left = (left > bWi  ) ? bWi : left;

            circle.style.left = left + "px";

            S = Math.ceil(left / pxX);

            top = mouse.pageY(e) - bPstY - cH / 2;
            top = (top > bHe  ) ? bHe : top;

            top = (top < 0) ? 0 : top;

            circle.style.top = top + "px";

            V = Math.ceil(Math.abs(top / pxY - 100));

            if (V < 50) {
                circle.style.borderColor = "#fff";
            } else {
                circle.style.borderColor = "#000";
            }

            picker.S = S;
            picker.V = V;

            picker.out_color.style.backgroundColor = "rgb(" + convert.hsv_rgb(Line.Hue, S, V) + ")";

            var _hsv = [Line.Hue, S, V];
            var _rgb = convert.hsv_rgb(Line.Hue, S, V);
            var _hex = convert.rgb_hex(_rgb[0], _rgb[1], _rgb[2]);
            updateValues(_hsv, _rgb, _hex);
        }


        block.onmousedown = function (e) {
            bPstX = Obj.positX(block);
            bPstY = Obj.positY(block);
            Block.cPos(e);

            document.onmousemove = function (e) {
                bPstX = Obj.positX(block);
                bPstY = Obj.positY(block);
                Block.cPos(e);
            };
        }

        document.onmouseup = function () {
            document.onmousemove = null;
        }
    }

};

var convert = {

    hsv_rgb: function (H, S, V) {

        var f, p, q, t, lH;

        S /= 100;
        V /= 100;

        lH = Math.floor(H / 60);

        f = H / 60 - lH;
        p = V * (1 - S);
        q = V * (1 - S * f);
        t = V * (1 - (1 - f) * S);

        switch (lH) {

            case 0:
                R = V;
                G = t;
                B = p;
                break;
            case 1:
                R = q;
                G = V;
                B = p;
                break;
            case 2:
                R = p;
                G = V;
                B = t;
                break;
            case 3:
                R = p;
                G = q;
                B = V;
                break;
            case 4:
                R = t;
                G = p;
                B = V;
                break;
            case 5:
                R = V;
                G = p;
                B = q;
                break;
        }

        return [parseInt(R * 255), parseInt(G * 255), parseInt(B * 255)];
    },

    rgb_hex: function (R, G, B) {

        return "" + componentToHex(R) + componentToHex(G) + componentToHex(B);
    },

    rgb_hsv: function (R, G, B) {
        var rr, gg, bb,
            r = R / 255,
            g = G / 255,
            b = B / 255,
            h, s,
            v = Math.max(r, g, b),
            diff = v - Math.min(r, g, b),
            diffc = function (c) {
                return (v - c) / 6 / diff + 1 / 2;
            };

        if (diff == 0) {
            h = s = 0;
        } else {
            s = diff / v;
            rr = diffc(r);
            gg = diffc(g);
            bb = diffc(b);

            if (r === v) {
                h = bb - gg;
            } else if (g === v) {
                h = (1 / 3) + rr - bb;
            } else if (b === v) {
                h = (2 / 3) + gg - rr;
            }
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
        return [Math.round(h * 360), Math.round(s * 100), Math.round(v * 100)];

    }
};

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

