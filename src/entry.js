import "./install";

import { dev } from "./dev";
import { utils } from "./utils";

webix.debug = false;
_.extend(global, { utils });


var menu_data = [
    {
        id: "syn_md", icon: "mdi mdi-view-dashboard", value: "基础数据维护", data: [
            { id: "syn_md_database", icon: "mdi mdi-medication", value: "数据库映射" },
            { id: "syn_md_database_table", icon: "mdi mdi-medication", value: "数据库表结构" },
            { id: "syn_md_column_rule", icon: "mdi mdi-medication", value: "数据类型转换规则" },
            { id: "syn_md_replace_code", icon: "mdi mdi-medication", value: "替换编码维护" },
            { id: "syn_md_column_policy", icon: "mdi mdi-medication", value: "字段更新策略" },
            { id: "syn_md_src_table_policy", icon: "mdi mdi-medication", value: "原始表策略设置" },
            { id: "syn_md_datasource", icon: "mdi mdi-medication", value: "数据源配置" },
        ]
    },
    {
        id: "sync", icon: "mdi mdi-puzzle", value: "数据迁移同步", data: [
            { id: "syn_exe_datasource_sync", icon: "mdi mdi-medication", value: "数据同步" },
            { id: "syn_exe_table_sync", icon: "mdi mdi-view-column", value: "数据库表结构同步" },
            { id: "syn_exe_sql_sync", icon: "mdi mdi-view-column", value: "数据库表数据迁移" },
        ]
    },
];

webix.ready(function () {
    webix.ui({
        rows: [
            {
                view: "toolbar", css: { "background": "#e0ffff" }, elements: [
                    { view: "icon", icon: "mdi mdi-menu", click() { $$("home_sidebar_id").toggle() } },
                    { view: "label", label: "数据迁移同步 V1.0" },
                    {},
                ]
            },
            {
                cols: [
                    {
                        id: "home_sidebar_id",
                        view: "sidebar",
                        data: menu_data,
                        on: {
                            onAfterSelect(id) { onMenuSelect(this.getItem(id)) }
                        }
                    },
                    { view: "resizer" },
                    {
                        rows: [
                            {
                                id: "home_tabbar_id",
                                view: "tabbar",
                                multiview: true,
                                multipleOpen: true,
                                options: [
                                    { id: "home-page", value: "<span style='font-size:12px'>首页</span>" }
                                ],
                                optionWidth: 150,
                                height: 28,
                                on: {
                                    onOptionRemove(id) { $$("home_view_id").removeView(id) },
                                    onChange: onTabChange
                                },
                            },
                            {
                                id: "home_view_id",
                                animate: false,
                                cells: [
                                    { id: "home-page", template: "首页 TODO..." }
                                ]
                            },
                        ]
                    },
                    { width: 8 }
                ]
            },
            { height: 8 }
        ]
    });
});

// 选择功能菜单
function onMenuSelect(item) {
    if (!$$(item.id)) {
        $$("home_view_id").addView(_.extend(dev[item["id"]].builder(), { id: item.id, css: { "border-left": "none", "border-top": "none" } }));
        $$("home_tabbar_id").addOption({ id: item.id, close: true, value: "<span style='font-size:12px'>" + item.value.trim() + "</span>" }, true);

        return;
    }

    $$("home_tabbar_id").setValue(item.id);
}

// Tab页切换
function onTabChange(newid, oldid) {

    // 取消选中原菜单
    if (!newid || newid === "home-page") {
        return $$("home_sidebar_id").unselect(oldid);
    }

    // 寻找当前菜单的路径
    var path = findPath(newid);
    _.forEach(path, (id) => $$("home_sidebar_id").open(id, true));

    // 设置选中菜单
    $$("home_sidebar_id").select(newid);
}

function findPath(id) {
    var path = [];
    var fn = function (cid) {
        var pid = $$("home_sidebar_id").getParentId(cid);
        if (pid) {
            path.push(pid);
            fn(pid);
        }
    }

    fn(id);

    return path;
}