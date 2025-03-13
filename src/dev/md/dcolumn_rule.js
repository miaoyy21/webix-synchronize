function builder() {
    var api = "/api/md/column_rule";

    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable({
        url: api, drag: false,
        save: { url: api, operationName: "operation" },
        columns: [
            { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 80 },
            { id: "src_column_type", header: { text: "转换前数据类型", css: { "text-align": "center" } }, fillspace: true },
            { id: "dst_column_type", header: { text: "转换后数据类型", css: { "text-align": "center" } }, fillspace: true },
            { id: "is_ignore", header: { text: "忽略类型转换", css: { "text-align": "center" } }, template: "{common.checkbox()}", checkValue: "1", uncheckValue: "0", tooltip: false, css: { "text-align": "center" }, fillspace: true },
            { id: "create_at", header: { text: "创建时间", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 160 },
        ],
        pager: dPager.id
    });

    return {
        rows: [
            {
                view: "toolbar",
                cols: [dGrid.actions.refresh(), {}]
            },
            dGrid,
            dPager
        ]
    }
}

export { builder }