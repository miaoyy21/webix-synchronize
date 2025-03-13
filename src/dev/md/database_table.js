function builder() {
    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: null, drag: false, editable: false, gravity: 2, data: [],
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "name", header: { text: "数据库表", css: { "text-align": "center" } }, width: 120 },
            { id: "primary_", header: { text: "主键", css: { "text-align": "center" } }, template(obj) { return !_.isEmpty(obj["primary"]) ? webix.template("【#!name#】#!type#")(obj["primary"]) : "" }, fillspace: true },
            { id: "columns_", header: { text: "字段数量", css: { "text-align": "center" } }, template(obj) { return _.size(obj["columns"]) }, css: { "text-align": "right" }, width: 80 },
            { id: "triggers_", header: { text: "触发器", css: { "text-align": "center" } }, template(obj) { return _.size(obj["triggers"]) ? "【" + _.size(obj["triggers"]) + "】" + obj["triggers"].join(" | ") : "" }, fillspace: true },
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
        url: null, drag: false, editable: false,
        data: [],
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "name", header: { text: "字段名称", css: { "text-align": "center" } }, fillspace: true },
            { id: "type", header: { text: "数据类型", css: { "text-align": "center" } }, fillspace: true },
        ]
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [
                    {
                        view: "richselect", label: "数据库：", labelAlign: "right", labelWidth: 80, options: "/api/md/database?action=options", width: 240,
                        on: {
                            onChange(newValue) {
                                $$(dGrid.id).clearAll();
                                $$(dGrid.id).define("url", "/api/md/database_table?database=" + newValue);
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