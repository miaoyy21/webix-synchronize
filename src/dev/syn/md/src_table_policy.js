function builder() {
    var apiTable = "/api/syn/md/src_table";
    var apiPolicy = "/api/syn/md/src_policy";

    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: null, drag: false, data: [],
        save: { url: apiTable, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "table_name", header: { text: "数据库表", css: { "text-align": "center" } }, width: 120 },
            { id: "is_sync", header: { text: "迁移同步", css: { "text-align": "center" } }, template: "{common.checkbox()}", checkValue: "1", uncheckValue: "0", tooltip: false, css: { "text-align": "center" }, width: 80 },
            { id: "description", header: { text: "描述", css: { "text-align": "center" } }, editor: "text", fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 160 },
        ],
        on: {
            onAfterLoad() { if (this.count() < 1) { $$(xGrid.id) && $$(xGrid.id).clearAll() } },
            onAfterSelect(selection) {
                var row = this.getItem(selection.id);

                $$(xGrid.id).clearAll();
                $$(xGrid.id).define("url", apiPolicy + "?database_name=" + row["database_name"] + "&table_name=" + row["table_name"]);
            },
        },
        pager: dPager.id
    });

    var xGrid = utils.protos.datatable({
        url: null, drag: false, data: [],
        save: { url: apiPolicy, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "column_name", header: { text: "字段名称", css: { "text-align": "center" } }, fillspace: true },
            { id: "column_type", header: { text: "数据类型", css: { "text-align": "center" } }, fillspace: true },
            {
                id: "is_primary", header: { text: "主键", css: { "text-align": "center" } },
                template(policy) { return policy["is_primary"] === "1" ? "<span class='webix_icon phoenix_danger_icon mdi mdi-key-variant'></span>" : "<span/>" },
                css: { "text-align": "center" }, width: 80
            },
            { id: "column_policy", header: { text: "更新策略", css: { "text-align": "center" } }, editor: "combo", options: "/api/syn/md/column_policy?action=options", fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 160 },
        ]
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [
                    {
                        view: "richselect", label: "原始数据库：", labelAlign: "right", labelWidth: 100, options: "/api/syn/md/database?action=src_options", width: 240,
                        on: {
                            onChange(newValue) {
                                $$(dGrid.id).clearAll();
                                $$(dGrid.id).define("url", apiTable + "?database=" + newValue);
                            }
                        }
                    },
                    dGrid.actions.refresh(),
                    {}
                ]
            },
            { cols: [dGrid, { view: "resizer" }, xGrid] },
            dPager
        ]
    }
}

export { builder }