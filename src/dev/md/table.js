function builder() {
    var dPager = utils.protos.pager();
    var dGrid = utils.protos.datatable(
        {
            url: null,
            data: [{}, {}, {}, {}, {}],
            columns: [
                { id: "index", header: { text: "№", css: { "text-align": "center" } }, css: { "text-align": "center" }, width: 60 },
                { id: "varchar_32_", header: [{ text: "Text", css: { "text-align": "center" } }, { content: "serverFilter" }], editor: "text", adjust: true, minWidth: 120 },
                { id: "varchar_256_", header: [{ text: "Options", css: { "text-align": "center" } }, { content: "serverFilter" }], sort: "server", options: [{ id: "SC", value: "生产制造部" }, { id: "WZ", value: "物资采购部" }, { id: "RL", value: "人力资源部" }], adjust: true, minWidth: 100 },
                { id: "varchar_4096_", header: { text: "Popup", css: { "text-align": "center" } }, editor: "popup", sort: "server", minWidth: 240, maxWidth: 480 },
                { id: "varchar_3_", header: { text: "Checkbox Editable", css: { "text-align": "center" } }, template: "{common.checkbox()}", checkValue: "Yes", uncheckValue: "No", tooltip: false, css: { "text-align": "center" }, adjust: true, minWidth: 80 },
                {
                    id: "varchar_4_", header: { text: "Checkbox Readonly", css: { "text-align": "center" } }, template: function (obj, common, value, config) {
                        if (value == config.checkValue) {
                            return "<span class='webix_icon phoenix_primary_icon mdi mdi-checkbox-marked' />"
                        }

                        return "<span class='webix_icon mdi mdi-checkbox-blank-outline' />"
                    }, checkValue: "Yes", uncheckValue: "No", tooltip: false, css: { "text-align": "center" }, adjust: true, minWidth: 80
                },
                {
                    id: "int_", header: { text: "Integer", css: { "text-align": "center" } }, editor: "text",
                    format: utils.formats.int.format,
                    editParse: utils.formats.int.editParse,
                    editFormat: utils.formats.int.editFormat,
                    css: { "text-align": "right" }, adjust: true, minWidth: 100
                },
                {
                    id: "numeric_13_2_", header: { text: "Numeric(13,2)", css: { "text-align": "center" } }, editor: "text",
                    format: (value) => utils.formats.number.format(value, 2),
                    editParse: (value) => utils.formats.number.editParse(value, 2),
                    editFormat: (value) => utils.formats.number.editFormat(value, 2),
                    css: { "text-align": "right" }, adjust: true, minWidth: 100
                },
                {
                    id: "numeric_18_4_", header: { text: "Numeric(18,4)", css: { "text-align": "center" } }, editor: "text",
                    format: (value) => utils.formats.number.format(value, 4),
                    editParse: (value) => utils.formats.number.editParse(value, 4),
                    editFormat: (value) => utils.formats.number.editFormat(value, 4),
                    css: { "text-align": "right" }, adjust: true, minWidth: 100
                },
                {
                    id: "numeric_1_", header: { text: "Numeric Price(13,2)", css: { "text-align": "center" } }, editor: "text",
                    format: (value) => utils.formats.price.format(value, 2),
                    editParse: (value) => utils.formats.price.editParse(value, 2),
                    editFormat: (value) => utils.formats.price.editFormat(value, 2),
                    css: { "text-align": "right" }, adjust: true
                },
                {
                    id: "date_", header: { text: "Date", css: { "text-align": "center" } }, editor: "date",
                    format: utils.formats.date.format,
                    editParse: utils.formats.date.editParse,
                    editFormat: utils.formats.date.editFormat,
                    css: { "text-align": "center" }, width: 80
                },
                { id: "create_at_", header: { text: "Date Readonly", css: { "text-align": "center" } }, format: utils.formats.date.format, css: { "text-align": "center" }, adjust: true, minWidth: 80 },
                { id: "update_at_", header: { text: "DateTime Readonly", css: { "text-align": "center" } }, format: utils.formats.datetime.format, css: { "text-align": "center" }, adjust: true, minWidth: 160 },
                {
                    id: "buttons",
                    width: 120,
                    header: { text: "操作按钮", css: { "text-align": "center" } },
                    tooltip: false,
                    template: ` <div class="webix_el_box" style="padding:0px; text-align:center"> 
                                <button webix_tooltip="复制" type="button" class="button_copy webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_primary_icon mdi mdi-18px mdi-file-multiple"/> </button>
                                <button webix_tooltip="删除" type="button" class="button_remove webix_icon_button" style="height:30px;width:30px;"> <span class="phoenix_danger_icon mdi mdi-18px mdi-trash-can"/> </button>
                            </div>`,
                    minWidth: 120,
                }
            ],
            pager: dPager.id
        }
    );

    return {
        rows: [
            {
                view: "toolbar",
                cols: [
                    dGrid.actions.refresh(),
                    {
                        view: "button", label: "保存", autowidth: true, css: "webix_primary", type: "icon", icon: "mdi mdi-18px mdi-content-save-outline",
                        click() { }
                    },
                    {}
                ]
            },
            dGrid,
            dPager
        ]
    }
}

export { builder }