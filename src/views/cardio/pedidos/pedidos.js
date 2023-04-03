import sidebarCardio from '../sidebarCardio';
import Notificaciones from '../../../models/notificaciones';
import m from 'mithril';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 100,
        isPaused: false
    };
}

const actions = {
    showFilter: true,
    showSearch: true,
    show: false,
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            window.location.reload();
        }
        m.redraw();
    },

    start(model) {
        model.interval = setInterval(actions.increment, 1000, model);
    },
    stop(model) {
        model.interval = clearInterval(model.interval);
    },
    reset(model) {
        model.seconds = 100;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        } else {
            actions.stop(model);
        }
        model.isPaused = !model.isPaused;
    }
};

function Stopwatch() {
    const model = stopwatchModel();
    actions.start(model);
    return {
        view() {
            return [
                m("div.mg-b-0", [
                    m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                        m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                            "Actualización en:"
                        ),

                    ]),
                    m("div.d-flex.justify-content-between.mg-b-5", [
                        m("h5.tx-normal.tx-rubik.mg-b-0",
                            model.seconds + "s."
                        ),
                        m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-15",
                                (model.isPaused ? [m("i.fas.fa-play.pd-2", {
                                    title: "Start",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }
                                })] : [m("i.fas.fa-pause.pd-2", {
                                    title: "Pause",
                                    onclick() {
                                        actions.toggle(model);
                                    },
                                    style: { "cursor": "pointer" }

                                })]),


                            ),



                        ),


                    ]),
                    m("div.progress.ht-4.mg-b-0.op-5",
                        m(".progress-bar.bg-primary.[role='progressbar'][aria-valuenow='" + model.seconds + "'][aria-valuemin='0'][aria-valuemax='60']", {
                            oncreate: (el) => {
                                el.dom.style.width = "100%";

                            },
                            onupdate: (el) => {
                                el.dom.style.width = model.seconds + "%";

                            },

                        })
                    )
                ]),

            ];



        },
        onremove() {
            actions.stop(model);
        },

    };
};

const tablePedidosCardio = {
    oncreate: () => {
        PedidosCardio.loadPedidos();
        if (PedidosCardio.searchField.length !== 0) {
            var table = $('#table-pedidos').DataTable();
            table.search(PedidosCardio.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Pedidos de Cardiología:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (PedidosCardio.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosCardio.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos entre Fechas';
                                        }
                                        if (PedidosCardio.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PedidosCardio.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa';
                                        }
                                        if (PedidosCardio.idFiltro == 5) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (PedidosCardio.idFiltro == 1) {
                                            el.dom.innerHTML = 'Pedidos de Hoy';
                                        }
                                        if (PedidosCardio.idFiltro == 2) {
                                            el.dom.innerHTML = 'Pedidos entre Fechas';
                                        }
                                        if (PedidosCardio.idFiltro == 3) {
                                            el.dom.innerHTML = 'Pedidos de Emergencia';
                                        }
                                        if (PedidosCardio.idFiltro == 4) {
                                            el.dom.innerHTML = 'Pedidos de C. Externa';
                                        }
                                        if (PedidosCardio.idFiltro == 5) {
                                            el.dom.innerHTML = 'Pedidos de Hospitalización';
                                        }
                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (PedidosCardio.idFiltro == 1 ? 'd-none' : 'd-flex')
                            }, [
                                m("div.link-03", {
                                        title: "Desde"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Desde:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Desde"
                                    },

                                    m("input.tx-light.pd-4[type='date'][id='desde']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PedidosCardio.idFiltro !== 1 ? moment(moment(PedidosCardio.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosCardio.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosCardio.loader = true;
                                            PedidosCardio.pedidos = [];
                                            PedidosCardio.fetchPedidos();
                                            m.route.set("/terapia-respiratoria/pedidos?idFiltro=" + PedidosCardio.idFiltro + "&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                ),
                                m("div.link-03", {
                                        title: "Hasta"
                                    },
                                    m(".tx-10.pd-r-0", {
                                        style: { "padding-top": "10px" }
                                    }, 'Hasta:')
                                ),
                                m("div.link-03", {
                                        style: { "cursor": "pointer" },
                                        title: "Hasta"
                                    },
                                    m("input.tx-light.pd-4[type='date'][id='hasta']", {
                                        oncreate: (el) => {
                                            el.dom.value = (PedidosCardio.idFiltro !== 1 ? moment(moment(PedidosCardio.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            PedidosCardio.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            PedidosCardio.loader = true;
                                            PedidosCardio.pedidos = [];
                                            PedidosCardio.fetchPedidos();
                                            m.route.set("/terapia-respiratoria/pedidos?idFiltro=" + PedidosCardio.idFiltro + "&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta);
                                        },
                                        style: {
                                            "border": "transparent"
                                        }
                                    })
                                )
                            ]),
                            m("div.dropdown.dropleft", [
                                m("div.link-03.lh-0.mg-l-5[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                        style: { "cursor": "pointer" },
                                        title: "Filtrar"
                                    },
                                    m("i.fas.fa-filter.tx-18.pd-5")
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/terapia-respiratoria/pedidos/?idFiltro=1" }, [
                                        "Pedidos de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/terapia-respiratoria/pedidos/?idFiltro=2&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta }, [
                                        "Pedidos entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=3&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta }, [
                                        "Pedidos de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=4&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta }, [
                                        "Pedidos de C. Externa"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/terapia-respiratoria/pedidos/?idFiltro=5&fechaDesde=" + PedidosCardio.fechaDesde + "&fechaHasta=" + PedidosCardio.fechaHasta }, [
                                        "Pedidos de Hospitalización"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (PedidosCardio.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { PedidosCardio.searchField = e.target.value; },
                                value: PedidosCardio.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-pedidos'][width='100%']"),


                ])
            ])
        ]);
    }
};

const PedidosCardio = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        sidebarCardio.page = "";

        if (PedidosCardio.pedidos.length == 0) {


            PedidosCardio.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            PedidosCardio.fechaHasta = moment().format('DD-MM-YYYY');
            PedidosCardio.loader = true;
            PedidosCardio.pedidos = [];
            PedidosCardio.fetchPedidos();

        }

    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Terapia-Fisica');
    },
    loadPedidos: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-pedidos").DataTable({
            data: PedidosCardio.pedidos,
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
            order: [
                [1, "Desc"]
            ],
            destroy: true,
            columns: [{
                    title: "Tipo: ",
                },
                {
                    title: "Fecha y Hora: ",
                },
                {
                    title: "Prescripción N°: ",
                },
                {
                    title: "Paciente: ",
                },
                {
                    title: "Médico: ",
                },
                {
                    title: "Opciones: ",
                },


            ],
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: true,
                    aTargets: [0],
                    orderable: false,
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PRE_MED;
                    },
                    visible: true,
                    aTargets: [1],
                    orderable: true,

                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PACIENTE;

                    },
                    visible: true,
                    aTargets: [2],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.NM_PACIENTE;

                    },
                    visible: true,
                    aTargets: [3],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return full.MED_MV;

                    },
                    visible: true,
                    aTargets: [4],
                    orderable: true,

                }, {
                    mRender: function(data, type, full) {
                        return "";

                    },
                    visible: true,
                    aTargets: [5],
                    orderable: false,

                },


            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td.wd-5p", {
                                class: (aData.SECTOR == 'EMERGENCIA' ? 'bg-danger' : 'bg-primary'),
                                title: (aData.SECTOR == 'EMERGENCIA' ? 'Emergencia' : 'Hospitalización')

                            }, [

                                (aData.SECTOR == 'EMERGENCIA' ? m("span.badge.badge-pill.badge-danger.mg-b-1",
                                    'U'
                                ) : m("span.badge.badge-pill.badge-primary.mg-b-1",
                                    'H'
                                ))


                            ]),
                            m("td.wd-15p", { "style": {} },

                                m('.d-inline.mg-r-5', {}, aData.FECHA_PEDIDO + ' ' + aData.HORA_PEDIDO),

                            ),
                            m("td.tx-center", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.CD_PRE_MED
                                ),
                            ),
                            m("td", { "style": {} }, [
                                    m('.d-inline.mg-r-5', {
                                        class: (aData.SECTOR == 'EMERGENCIA' ? "tx-danger" : "tx-primary")
                                    }, aData.SECTOR),
                                    m('br'),
                                    aData.NM_PACIENTE,
                                ]

                            ),
                            m("td", { "style": {} },
                                aData.MED_MV

                            ),


                            m("td.tx-center", {
                                    onclick: () => {
                                        m.route.set("/cardiologia/pedido/", {
                                            numeroHistoriaClinica: aData.CD_PACIENTE,
                                            numeroAtencion: aData.AT_MV,
                                            numeroPedido: aData.CD_PRE_MED,
                                            track: "view",
                                        });
                                    },
                                    "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                                },
                                " Ver Pedido "

                            )





                        ];
                    },
                });

            },
            drawCallback: function(settings) {

                PedidosCardio.loader = false;

            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function(e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    },
    fetchPedidos: () => {

        let _queryString = '';

        if (PedidosCardio.idFiltro == 1) {
            _queryString = '?idFiltro=' + PedidosCardio.idFiltro;
        } else {
            _queryString = '?idFiltro=' + PedidosCardio.idFiltro + '&fechaDesde=' + PedidosCardio.fechaDesde + '&fechaHasta=' + PedidosCardio.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/cardiologia/pedidos" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                PedidosCardio.loader = false;
                PedidosCardio.pedidos = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { PedidosCardio.fetchPedidos(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-pedidos').DataTable();
        table.clear();
        table.rows.add(PedidosCardio.pedidos).draw();
    },
    view: (_data) => {

        return PedidosCardio.loader ? [
            m(sidebarCardio, { oncreate: sidebarCardio.setPage(42) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/cardiologia" }, [
                                " Cardiología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]


                            ),


                        ])
                    ]),






                ])
            ),

        ] : PedidosCardio.error.length !== 0 ? [
            m(sidebarCardio, { oncreate: sidebarCardio.setPage(42) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/cardiologia" }, [
                                " Cardiología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe infrmac dd ncin')
                    ]),





                ])
            ),

        ] : !PedidosCardio.loader && PedidosCardio.pedidos.length !== 0 ? [
            m(sidebarCardio, { oncreate: sidebarCardio.setPage(42) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/cardiologia" }, [
                                " Cardiología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m(tablePedidosCardio)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "RECEPCIÓN DE PEDIDOS"
                ),
                m("div.mg-t-10.bg-white", {

                    },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "N° de Pedidos:"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    PedidosCardio.pedidos.length
                                ),
                                m("div.tx-18", [

                                    m("divv.lh-0.tx-gray-300", 'Pedido(s)')
                                ])

                            ]),

                        ])
                    ),
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                ),

            ])

        ] : !PedidosCardio.loader && PedidosCardio.pedidos.length == 0 ? [
            m(sidebarCardio, { oncreate: sidebarCardio.setPage(42) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/cardiologia" }, [
                                " Cardiología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),
        ] : [
            m(sidebarCardio, { oncreate: sidebarCardio.setPage(42) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/cardiologia" }, [
                                " Cardiología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Recepción de Pedidos:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("p", " Error interno."

                            ),


                        ])
                    ]),






                ])
            ),
        ];


    },

};


export default PedidosCardio;