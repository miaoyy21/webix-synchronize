
/** WebIX CSS **/
// import "webix/skins/compact.css";
// import "webix/skins/contrast.css";
// import "webix/skins/flat.css";
// import "webix/skins/material.css";
import "webix/skins/mini.css";

import "@mdi/font/css/materialdesignicons.min.css";
import "../assets/phoenix.css";

import "../assets/goJs";
import _ from "underscore";

// import * as webix from "webix"; // Debug Version
import * as webix from "webix/webix.min.js";


// 全局可以使用工具库和组件库 webix md5
_.extend(global, { _, webix });

webix.env.printSizes = [
    { id: "a4", preset: "A4", width: 8.27, height: 11.7 },
];

// 组件库的相关配置
webix.env.cdn = "./";
webix.i18n.setLocale("zh-CN");

// 全局AJAX请求报错提示
webix.attachEvent("onAjaxError", function (xhr) {
    var text;
    try {
        var obj = JSON.parse(xhr.response);
        text = obj["error"];
    } catch (e) {
        text = xhr.responseText;
    } finally {
        webix.message({ type: "error", text: text, expire: 6000 });
    }
});

// 引入 ProtoUI 组件
require("./view/ace");
require("./view/tree");
require("./view/list");
require("./view/winmenu");
require("./diagram");

require("../assets/hcharts");

console.log(window);