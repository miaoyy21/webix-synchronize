function builder() {
    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: null, drag: false, editable: false, gravity: 3, data: [],
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "name", header: { text: "数据库表", css: { "text-align": "center" } }, width: 120 },
            { id: "primary_", header: { text: "主键", css: { "text-align": "center" } }, template(obj) { return _.size(obj["primary"]) ? obj["primary"].join(", ") : "" }, fillspace: true },
            { id: "rows", header: { text: "总行数", css: { "text-align": "center" } }, css: { "text-align": "right" }, width: 100 },
            { id: "columns_", header: { text: "字段数量", css: { "text-align": "center" } }, template(obj) { return _.size(obj["columns"]) }, css: { "text-align": "right" }, width: 80 },
            { id: "triggers_", header: { text: "触发器", css: { "text-align": "center" } }, template(obj) { return _.size(obj["triggers"]) ? obj["triggers"].join(", ") : "" }, fillspace: true },
        ],
        on: {
            onAfterLoad() { if (this.count() < 1) { $$(xGrid.id) && $$(xGrid.id).clearAll() } },
            onAfterSelect(selection) {
                var row = this.getItem(selection.id);

                $$(xGrid.id).clearAll();
                $$(xGrid.id).define("data", row["columns"]);
            },
        },
        pager: dPager.id
    });

    var xGrid = utils.protos.datatable({
        url: null, drag: false, editable: false, gravity: 2,
        data: [],
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "name", header: { text: "字段名称", css: { "text-align": "center" } }, fillspace: true },
            { id: "type", header: { text: "数据类型", css: { "text-align": "center" } }, fillspace: true },
            {
                id: "is_primary", header: { text: "主键", css: { "text-align": "center" } },
                template(policy) { return policy["is_primary"] === "1" ? "<span class='webix_icon phoenix_danger_icon mdi mdi-key-variant'></span>" : "<span/>" },
                css: { "text-align": "center" }, width: 60
            },
            {
                id: "is_identity", header: { text: "标识", css: { "text-align": "center" } },
                template(policy) { return policy["is_identity"] === "1" ? "<span class='webix_icon phoenix_danger_icon mdi mdi-check'></span>" : "<span/>" },
                css: { "text-align": "center" }, width: 60
            },
            {
                id: "is_nullable", header: { text: "为空", css: { "text-align": "center" } },
                template(policy) { return policy["is_nullable"] === "1" ? "<span class='webix_icon phoenix_danger_icon mdi mdi-check'></span>" : "<span/>" },
                css: { "text-align": "center" }, width: 60
            },
        ]
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [
                    {
                        view: "richselect", label: "数据库：", labelAlign: "right", labelWidth: 80, options: "/api/syn/md/database?action=all_options", width: 240,
                        on: {
                            onChange(newValue) {
                                $$(dGrid.id).clearAll();
                                $$(dGrid.id).define("url", "/api/syn/md/database_table?database=" + newValue);
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