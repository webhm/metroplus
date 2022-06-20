import Encrypt from '../../../models/encrypt';
import HeaderPrivate from '../../layout/header-private';
import SidebarAdm from '../sidebarAdm';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';



const iPedido = {

    view: (_data) => {
        return [
            m("p.mg-0.tx-18", [
                m("i.fas.fa-user.mg-r-5.text-secondary"),
                _data.attrs.PTE_MV,
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "HC: " + _data.attrs.HC_MV
                ),
            ]),
            m("p.mg-0", [
                m("div.tx-15.text-secondary.mg-r-5",
                    "N° Pedido MV: " + _data.attrs.NUM_PEDIDO_MV
                )
            ]),
        ];
    },

};

const PacientesAdmisiones = {
    pacientes: [],
    tipoBusqueda: "",
    searchField: "",
    fetchUltimasBusquedas: () => {

        $(".table-content").hide();
        $(".table-loader").show();

        // MOMMENT
        moment.lang("es", {
            months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
                "_"
            ),
            monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
                "_"
            ),
            weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
                "_"
            ),
            weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
            weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
        });

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-ultimas-busquedas").DataTable({
            "ajax": {
                url: "https://api.hospitalmetropolitano.org/t/v1/recetas-alta",
                dataSrc: "data",
                serverSide: true,
            },
            processing: true,
            serverSide: true,
            responsive: false,
            dom: 'ltp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Todavía no tienes resultados disponibles.",
                sEmptyTable: "Ningún dato disponible en esta tabla",
                sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
                sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
                sInfoPostFix: "",
                sUrl: "",
                sInfoThousands: ",",
                sLoadingRecords: "Cargando...",
                oPaginate: {
                    sFirst: "Primero",
                    sLast: "Último",
                    sNext: "Siguiente",
                    sPrevious: "Anterior",
                },
                oAria: {
                    sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                    sSortDescending: ": Activar para ordenar la columna de manera descendente",
                },
            },
            cache: false,
            order: false,
            columns: [{
                title: "ID:"
            }, {
                title: "HC"
            }, {
                title: "PACINTE"
            }, {
                title: "FECHA:"
            }, {
                title: "PACIENTE:"
            }, {
                title: "OPCIONES:"
            },],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: false,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.HC_MV;
                },
                visible: false,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.PTE_MV;

                },
                visible: false,
                aTargets: [2],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [3],
                width: "15%",

                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [4],
                width: "50%",
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [5],
                width: "35%",
                orderable: false,

            },
            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

            },
            drawCallback: function (settings) {

                $(".table-content").show();
                $(".table-loader").hide();

                settings.aoData.map(function (_i) {


                    m.mount(_i.anCells[3], {
                        view: function () {
                            return m("p.mg-0.tx-12", [
                                m("i.fas.fa-calendar.mg-r-5.text-secondary"),
                                _i._aData.DT_ATENDIMENTO
                            ])
                        }
                    });
                    m.mount(_i.anCells[4], { view: function () { return m(iPedido, _i._aData) } });
                    m.mount(_i.anCells[5], {
                        view: function () {

                            return m(".btn-group.wd-100p[role='group'][aria-label='Opciones']", [
                                m("a.btn.btn-xs.btn-primary", { href: _i._aData.URL, target: "_blank" }, [
                                    m("i.fas.fa-file-alt.mg-r-5"),
                                ], "Ver Receta de Alta"),

                            ])



                        }
                    });
                })




            },
        }).on('xhr.dt', function (e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').hide();
            $('.table-content').show();
            //   initDataPicker();
        }).on('page.dt', function (e, settings, json, xhr) {
            // Do some staff here...
            $('.table-loader').show();
            $('.table-content').hide();

        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });


        $('#button-buscar-t').click(function (e) {
            e.preventDefault();
            $('.table-loader').show();
            $('.table-content').hide();
            table.search($('#_dt_search_text').val()).draw();
        });
        $('#filtrar').click(function (e) {
            e.preventDefault();
            $('.table-loader').show();
            $('.table-content').hide();
            table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
        });

        $('#resetTable').click(function (e) {
            e.preventDefault();
            $('#_dt_search_text').val('');
            $('#desde').val('');
            $('#hasta').val('');
            table.search('').draw();
        });


        return table;
    },
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        PacientesAdmisiones.searchField = "";
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Pacientes de Admisiones | " + App.title;
        PacientesAdmisiones.fetchUltimasBusquedas();

    },
    view: () => {


        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm, { oncreate: SidebarAdm.setPage(7) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/admisiones" }, [
                                " Admisiones "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Pacientes de Admisiones"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Pacientes de Admisiones:"
                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [



                                m("div.col-sm-12.pd-b-10.mg-b-10", [
                                    m("label.nav-label.tx-semibold",
                                        "Búsqueda de Pacientes:"
                                    ),
                                    m("hr"),
                                    m('label.d-none', [
                                        m("i.fas.fa-info-circle.mg-r-2"),
                                        "Buscar por NHC o Nombres y Apellidos completos del Paciente"
                                    ]),
                                    m("div.mg-b-5.d-flex", [
                                        m("div.custom-control.custom-radio.mg-r-15", [
                                            m("input.custom-control-input[type='radio'][id='cc'][name='tipoBusqueda']"),
                                            m("label.custom-control-label[for='cc']",
                                                "Cédula"
                                            )
                                        ]),
                                        m("div.custom-control.custom-radio.mg-r-15", [
                                            m("input.custom-control-input[type='radio'][id='pte'][name='tipoBusqueda']"),
                                            m("label.custom-control-label[for='pte']",
                                                "Apellidos y Nombres completos"
                                            )
                                        ])
                                    ]),
                                    m("div.mg-t-15.input-group", [
                                        m("input.form-control.mg-b-20.wd-100p[placeholder='Buscar por NHC o Nombres y Apellidos completos del Paciente'][title='Buscar'][type='text']", {
                                            oninput: (e) => {
                                                PacientesAdmisiones.searchField = e.target.value;
                                            },
                                            value: PacientesAdmisiones.searchField
                                        }),
                                        m("div.input-group-append",
                                            m("button.btn.btn-outline-light[type='button']", {
                                                onclick: () => {
                                                    loadPacientes([{ "nhc": "dsdsd" }]);
                                                }
                                            }, [
                                                m("i.icon.ion-md-search"),
                                                " Buscar "
                                            ]),
                                            m("button.btn.btn-outline-light[id='resetTable'][type='button']", [
                                                m("i.icon.ion-md-close-circle"),
                                                " Borrar "
                                            ])
                                        )
                                    ])
                                ]


                                ),

                            ])
                        ),
                        m("div.col-12", [
                            m("label.nav-label.tx-semibold",
                                "Búsquedas Recientes:"
                            ),
                            m("hr"),
                            m("div.table-loader.wd-100p", {
                                style: { "display": "none" }
                            },
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-ultimas-busquedas'][width='100%']"),
                            )
                        ])
                    ]),
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Opciones Pacientes"
                ),
                m("nav.nav.flex-column[id='navSection']", [
                    m("table.table.table-sm[id='table-notificaciones'][width='100%']"),

                ]),
                m("label.nav-label.mg-t-20.tx-center.d-none", [
                    m(m.route.Link, { href: "/notificaciones-lab" }, [
                        "Ver Todo"
                    ])


                ],

                ),
            ])
        ];
    },

};



function loadPacientes(pacientes = []) {

    $(".table-content").hide();
    $(".table-loader").show();

    // MOMMENT
    moment.lang("es", {
        months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
            "_"
        ),
        monthsShort: "Enero._Feb._Mar_Abr._May_Jun_Jul._Ago_Sept._Oct._Nov._Dec.".split(
            "_"
        ),
        weekdays: "Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado".split(
            "_"
        ),
        weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
        weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_"),
    });

    $.fn.dataTable.ext.errMode = "none";
    var table = $("#table-pacientes").DataTable({
        data: pacientes,
        responsive: false,
        dom: 'ltp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Todavía no tienes resultados disponibles.",
            sEmptyTable: "Ningún dato disponible en esta tabla",
            sInfo: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            sInfoEmpty: "Mostrando registros del 0 al 0 de un total de 0 registros",
            sInfoFiltered: "(filtrado de un total de _MAX_ registros)",
            sInfoPostFix: "",
            sUrl: "",
            sInfoThousands: ",",
            sLoadingRecords: "Cargando...",
            oPaginate: {
                sFirst: "Primero",
                sLast: "Último",
                sNext: "Siguiente",
                sPrevious: "Anterior",
            },
            oAria: {
                sSortAscending: ": Activar para ordenar la columna de manera ascendente",
                sSortDescending: ": Activar para ordenar la columna de manera descendente",
            },
        },
        cache: false,
        order: false,
        columns: [{
            title: "ID:"
        }, {
            title: "HC"
        },],
        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            },
            visible: false,
            aTargets: [0],
            orderable: false,
        },
        {
            mRender: function (data, type, full) {
                return full.nhc;
            },
            visible: true,
            aTargets: [1],
            orderable: false,

        },

        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

        },
        drawCallback: function (settings) {

            $(".table-content").show();
            $(".table-loader").hide();





        },
    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#button-buscar-t').click(function (e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function (e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function (e) {
        e.preventDefault();
        $('#_dt_search_text').val('');
        $('#desde').val('');
        $('#hasta').val('');
        table.search('').draw();
    });


    return table;



}



export default PacientesAdmisiones;