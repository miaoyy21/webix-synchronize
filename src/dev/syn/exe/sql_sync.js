function builder() {
    var script = utils.UUID();
    var database = utils.UUID();
    var api = "/api/syn/md/src_table";

    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: null, drag: false, data: [], editable: false,
        save: { url: api, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 60 },
            { id: "table_name", header: { text: "数据库表", css: { "text-align": "center" } }, width: 140 },
            { id: "rows", header: { text: "行数", css: { "text-align": "center" } }, css: { "text-align": "right" }, width: 80 },
            utils.protos.checkbox({ id: "is_sync", header: { text: "迁移同步", css: { "text-align": "center" } }, editable: false, width: 80 }),
            { id: "description", header: { text: "描述", css: { "text-align": "center" } }, minWidth: 240, fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 140 },
        ],
        on: {
            onAfterSelect(selection) {
                var row = this.getItem(selection.id);
                webix.ajax().get("/api/syn/exe/sql_sync", row)
                    .then((res) => {
                        $$(script).setValue(res.text());
                    })
            },
        },
        pager: dPager.id
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [
                    {
                        id: database, view: "richselect", label: "原始数据库：", labelAlign: "right", labelWidth: 100, options: "/api/syn/md/database?action=src_options", width: 240,
                        on: {
                            onChange(newValue) {
                                $$(dGrid.id).clearAll();
                                $$(dGrid.id).define("url", api + "?database=" + newValue);
                            }
                        }
                    },
                    {
                        view: "button", label: "生成SQL脚本", css: "webix_primary", autowidth: true, type: "icon", icon: "mdi mdi-18px mdi-script-text",
                        click: () => {
                            $$(dGrid.id).showProgress({ type: "top" });
                            webix.ajax().get("/api/syn/exe/sql_sync", { "database_name": $$(database).getValue() })
                                .then((res) => {
                                    $$(dGrid.id).unselectAll();
                                    $$(script).setValue(res.text());
                                })
                                .finally(() => { $$(dGrid.id).hideProgress() });
                        },
                    },
                    dGrid.actions.refresh(),
                    {}
                ]
            },
            {
                cols: [
                    dGrid,
                    { view: "resizer" },
                    { id: script, view: "ace-editor", mode: "sqlserver" },
                ]
            },
            dPager
        ]
    }
}

export { builder }