function builder() {
    var apiDs = "/api/syn/md/datasource";
    var apiDsSync = "/api/syn/exe/datasource_sync";
    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: apiDsSync, rightSplit: 1,
        save: { url: apiDsSync, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "src_ds_code", header: { text: "原始数据源", css: { "text-align": "center" } }, editor: "combo", options: apiDs + "?action=options", width: 120 },
            { id: "src_sql", header: { text: "原始数据SQL", css: { "text-align": "center" } }, editor: "text", minWidth: 360, fillspace: true },
            { id: "src_id_field", header: { text: "原始ID字段", css: { "text-align": "center" } }, editor: "text", width: 100 },
            { id: "dst_ds_code", header: { text: "目标数据源", css: { "text-align": "center" } }, editor: "combo", options: apiDs + "?action=options", width: 120 },
            { id: "dst_sql", header: { text: "目标数据SQL", css: { "text-align": "center" } }, editor: "text", minWidth: 360, fillspace: true },
            { id: "dst_table", header: { text: "目标数据库表", css: { "text-align": "center" } }, editor: "text", width: 120 },
            { id: "dst_id_field", header: { text: "目标ID字段", css: { "text-align": "center" } }, editor: "text", width: 100 },
            {
                id: "sync_status", header: { text: "运行状态", css: { "text-align": "center" } },
                template(obj) {
                    return obj["sync_status"] === "Stopped" ?
                        "<span class='webix_icon phoenix_danger_icon mdi mdi-stop-circle'></span>" :
                        obj["sync_status"] === "Waiting" ?
                            "<span class='webix_icon phoenix_primary_icon mdi mdi-gate-buffer'></span>" :
                            obj["sync_status"] === "Executing" ?
                                "<span class='webix_icon phoenix_warning_icon mdi mdi-run-fast'></span>"
                                : "<span/>"
                },
                css: { "text-align": "center" }, width: 80
            },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 140 },
            { id: "sync_at", header: { text: "执行时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 140 },
            {
                id: "buttons",
                width: 120,
                header: { text: "操作按钮", css: { "text-align": "center" } },
                tooltip: false,
                template(obj) {
                    return (obj["sync_status"] == "Stopped") ?
                        ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="执行日志" type="button" class="button_log webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-math-log"/> </button>
                                <button webix_tooltip="启动" type="button" class="button_start webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-gate-buffer"/> </button>
                                <button webix_tooltip="删除" type="button" class="button_remove webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_danger_icon mdi mdi-18px mdi-trash-can"/> </button>
                            </div>`:
                        obj["sync_status"] === "Waiting" ?
                            ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="执行日志" type="button" class="button_log webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-math-log"/> </button>
                                <button webix_tooltip="停止" type="button" class="button_stop webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_danger_icon mdi mdi-18px mdi-stop-circle"/> </button>
                            </div>`:
                            ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="执行日志" type="button" class="button_log webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-math-log"/> </button>
                            </div>`
                },
            }
        ],
        rules: {
            "src_ds_code": webix.rules.isNotEmpty,
            "src_sql": webix.rules.isNotEmpty,
            "src_id_field": webix.rules.isNotEmpty,
            "dst_ds_code": webix.rules.isNotEmpty,
            "dst_sql": webix.rules.isNotEmpty,
            "dst_table": webix.rules.isNotEmpty,
            "dst_id_field": webix.rules.isNotEmpty,
        },
        onClick: {
            button_log(e, item) {
                var row = this.getItem(item.row);
                webix.message({ type: "success", text: "TODO " + row["id"] });
            },
            button_start(e, item) {
                var row = this.getItem(item.row);

                row["sync_status"] = "Waiting";
                this.updateItem(item.row, row);
            },
            button_stop(e, item) {
                var row = this.getItem(item.row);

                row["sync_status"] = "Stopped";
                this.updateItem(item.row, row);
            },
        },
        pager: dPager.id
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [dGrid.actions.addLast(), dGrid.actions.refresh(), {}]
            },
            dGrid,
            dPager
        ]
    }
}

export { builder }