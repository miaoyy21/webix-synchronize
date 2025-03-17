function builder() {
    var script = utils.UUID();
    var api = "/api/syn/md/src_table";

    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: null, drag: false, data: [],
        save: { url: api, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "table_name", header: { text: "数据库表", css: { "text-align": "center" } }, width: 120 },
            { id: "is_sync", header: { text: "迁移同步", css: { "text-align": "center" } }, template: "{common.checkbox()}", checkValue: "1", uncheckValue: "0", tooltip: false, css: { "text-align": "center" }, width: 80 },
            { id: "description", header: { text: "描述", css: { "text-align": "center" } }, editor: "text", fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 160 },
            {
                id: "buttons",
                width: 120,
                header: { text: "操作按钮", css: { "text-align": "center" } },
                tooltip: false,
                template: ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="生成SQL脚本" type="button" class="button_sql webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-script-text"/> </button>
                            </div>`,
            }
        ],
        onClick: {
            button_sql(e, item) {
                var row = this.getItem(item.row);

                console.log(row);
                $$(script).setValue("SELECT * FROM users;");
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
                        view: "richselect", label: "原始数据库：", labelAlign: "right", labelWidth: 100, options: "/api/syn/md/database?action=src_options", width: 240,
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
                            $$(script).setValue("SELECT * FROM users;");
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