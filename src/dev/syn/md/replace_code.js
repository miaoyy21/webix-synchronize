function builder() {
    var api = "/api/syn/md/replace_code";
    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: api,
        save: { url: api, updateFromResponse: true, trackMove: true, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 60 },
            { id: "code", header: { text: "替换编码", css: { "text-align": "center" } }, editor: "text", width: 120 },
            { id: "name", header: { text: "替换名称", css: { "text-align": "center" } }, editor: "text", width: 160 },
            { id: "description", header: { text: "更新策略描述", css: { "text-align": "center" } }, editor: "text", minWidth: 160, fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 140 },
            {
                id: "buttons",
                width: 100,
                header: { text: "操作按钮", css: { "text-align": "center" } },
                tooltip: false,
                template: ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="删除" type="button" class="button_remove webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_danger_icon mdi mdi-18px mdi-trash-can"/> </button>
                            </div>`,
            }
        ],
        rules: {
            "code": webix.rules.isNotEmpty,
            "name": webix.rules.isNotEmpty,
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