function builder() {
    var api = "/api/syn/md/database";
    var options = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: api, drag: false,
        save: { url: api, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "dst_db", header: { text: "目标数据库", css: { "text-align": "center" } }, editor: "text", fillspace: true },
            { id: "dst_flag", header: { text: "目标标识符", css: { "text-align": "center" } }, editor: "combo", options: options, fillspace: true },
            { id: "src_db", header: { text: "原始数据库", css: { "text-align": "center" } }, editor: "text", fillspace: true },
            { id: "src_flag", header: { text: "原始标识符", css: { "text-align": "center" } }, editor: "combo", options: options, fillspace: true },
            {
                id: "buttons",
                width: 160,
                header: { text: "操作按钮", css: { "text-align": "center" } },
                tooltip: false,
                template: ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="重新加载原始和目标数据库表" type="button" class="button_reload webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-reload"/> </button>
                                <button webix_tooltip="对原始和目标数据库对比分析" type="button" class="button_compare webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-compare"/> </button>
                                <button webix_tooltip="删除" type="button" class="button_remove webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_danger_icon mdi mdi-18px mdi-trash-can"/> </button>
                            </div>`,
            }
        ],
        rules: {
            "dst_db": webix.rules.isNotEmpty,
            "dst_flag": webix.rules.isNotEmpty,
            "src_db": webix.rules.isNotEmpty,
            "src_flag": webix.rules.isNotEmpty,
        },
        onClick: {
            button_reload(e, item) {
                var row = this.getItem(item.row);

                this.showProgress({ type: "bottom" });
                webix.ajax().post(api, _.extend({}, row, { "operation": "reload" }))
                    .then((res) => {
                        webix.message({ type: "success", text: "重新加载原始和目标数据库成功！" });
                    })
                    .finally(() => { this.hideProgress() });
            },
            button_compare(e, item) {
                this.showProgress({ type: "bottom" });
                webix.ajax().post(api, { "operation": "compare", "id": item.row })
                    .then((res) => {
                        webix.message({ type: "success", text: "对比分析完成！" });
                    })
                    .finally(() => { this.hideProgress() });
            },
        },
        pager: dPager.id
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [dGrid.actions.add(), dGrid.actions.refresh(), {}]
            },
            dGrid,
            dPager
        ]
    }
}

export { builder }