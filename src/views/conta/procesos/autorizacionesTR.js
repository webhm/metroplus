import SidebarTR from './sidebarTRoja';
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


const tableAutorizacionesTR = {
    oncreate: () => {
        AutorizacionesTR.loadAutorizacionesTR();
        if (AutorizacionesTR.searchField.length !== 0) {
            var table = $('#table-AutorizacionesTR').DataTable();
            table.search(AutorizacionesTR.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Tarjeta Roja:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                oncreate: (el) => {
                                    if (AutorizacionesTR.idFiltro == 1) {
                                        el.dom.innerHTML = 'Autorizaciones de Hoy';
                                    }
                                    if (AutorizacionesTR.idFiltro == 2) {
                                        el.dom.innerHTML = 'Autorizaciones Pendientes';
                                    }
                                    if (AutorizacionesTR.idFiltro == 3) {
                                        el.dom.innerHTML = 'En Revisión Técnica';
                                    }
                                    if (AutorizacionesTR.idFiltro == 4) {
                                        el.dom.innerHTML = 'En Revisión CT';
                                    }
                                    if (AutorizacionesTR.idFiltro == 5) {
                                        el.dom.innerHTML = 'En Revisión GC';
                                    }

                                },
                                onupdate: (el) => {
                                    if (AutorizacionesTR.idFiltro == 1) {
                                        el.dom.innerHTML = 'Autorizaciones de Hoy';
                                    }
                                    if (AutorizacionesTR.idFiltro == 2) {
                                        el.dom.innerHTML = 'Autorizaciones Pendientes';
                                    }
                                    if (AutorizacionesTR.idFiltro == 3) {
                                        el.dom.innerHTML = 'En Revisión Técnica';
                                    }
                                    if (AutorizacionesTR.idFiltro == 4) {
                                        el.dom.innerHTML = 'En Revisión CT';
                                    }
                                    if (AutorizacionesTR.idFiltro == 5) {
                                        el.dom.innerHTML = 'En Revisión GC';
                                    }
                                }
                            }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (AutorizacionesTR.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (AutorizacionesTR.idFiltro !== 1 ? moment(moment(AutorizacionesTR.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            AutorizacionesTR.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            AutorizacionesTR.loader = true;
                                            AutorizacionesTR.pedidos = [];
                                            AutorizacionesTR.fetch();
                                            m.route.set("/laboratorio/autorizaciones?idFiltro=" + AutorizacionesTR.idFiltro + "&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta);
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
                                            el.dom.value = (AutorizacionesTR.idFiltro !== 1 ? moment(moment(AutorizacionesTR.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            AutorizacionesTR.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            AutorizacionesTR.loader = true;
                                            AutorizacionesTR.pedidos = [];
                                            AutorizacionesTR.fetch();
                                            m.route.set("/laboratorio/AutorizacionesTR?idFiltro=" + AutorizacionesTR.idFiltro + "&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/autorizaciones/?idFiltro=1" }, [
                                        "Autorizaciones de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/autorizaciones/?idFiltro=2&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta }, [
                                        "Autorizaciones Pendientes"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/autorizaciones/?idFiltro=3&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta }, [
                                        "En Revisión Técnica"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/autorizaciones/?idFiltro=4&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta }, [
                                        "En Revisión CT"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/contabilidad/proceso/tarjeta-roja/autorizaciones/?idFiltro=4&fechaDesde=" + AutorizacionesTR.fechaDesde + "&fechaHasta=" + AutorizacionesTR.fechaHasta }, [
                                        "En Revisión GC"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (AutorizacionesTR.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function (e) { AutorizacionesTR.searchField = e.target.value; },
                                value: AutorizacionesTR.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-AutorizacionesTR'][width='100%']"),


                ])
            ])
        ]);
    }
};

const AutorizacionesTR = {
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

        SidebarTR.page = "";

        if (AutorizacionesTR.pedidos.length == 0) {

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



            AutorizacionesTR.fechaDesde = moment().subtract(1, 'days').format('DD-MM-YYYY');
            AutorizacionesTR.fechaHasta = moment().format('DD-MM-YYYY');
            AutorizacionesTR.loader = true;
            AutorizacionesTR.pedidos = [];
            AutorizacionesTR.fetch();

        }

    },
    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-TR');
    },
    loadAutorizacionesTR: () => {

        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-AutorizacionesTR").DataTable({
            data: AutorizacionesTR.pedidos,
            dom: 'ltp',
            responsive: true,
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
                [0, "Desc"]
            ],
            destroy: true,
            columns: [{
                title: "N°:",
            },
            {
                title: "Fecha:",
            },
            {
                title: "Motivo de Baja:",
            },
            {
                title: "Usuario:",
            },
            {
                title: "Status:",
            },
            {
                title: "Opciones:",
            },


            ],
            aoColumnDefs: [{
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.fecha;
                },
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.motivo_baja;
                },
                visible: true,
                aTargets: [2],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.usuario;
                },
                visible: true,
                aTargets: [3],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [4],
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return 'OPCIONES';

                },
                visible: true,
                aTargets: [5],
                orderable: false,
            },


            ],
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {

                m.mount(nRow, {
                    view: () => {
                        return [
                            m("td", {
                                class: 'bg-danger'
                            }, [

                                m("span.badge.badge-pill.badge-danger.wd-100p.mg-b-1",
                                    iDisplayIndexFull + 1
                                )


                            ]),
                            m("td", { "style": {} },
                                aData.fecha
                            ),
                            m("td", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.motivo_baja
                                ),
                            ),
                            m("td", { "style": {} }, [
                                aData.usuario

                            ]

                            ),



                            (aData.status == 1 ? [
                                m("td.tx-white.tx-semibold.tx-center", {
                                    style: { "background-color": "#ffc107" }
                                },
                                    "Pendiente"
                                )
                            ] : [
                                m("td.tx-white.tx-semibold.tx-center", {
                                    style: { "background-color": "#0d9448" }
                                },
                                    "Gestionando"
                                )
                            ]),


                            m("td.tx-center", {
                                onclick: () => {
                                    m.route.set("/contabilidad/proceso/tarjeta-roja/id/", {
                                        tr: aData.id.padStart(5, '0'),
                                        track: "view",
                                    });
                                },
                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                            },
                                " Ver Detalle "

                            )




                        ];
                    },
                });
            },
            drawCallback: function (settings) {

                AutorizacionesTR.loader = false;


            },
        });

        $('.dataTables_length select').select2({
            minimumResultsForSearch: Infinity
        });

        $('#searchField').keyup(function (e) {

            table.search($('#searchField').val()).draw();
        });

        return table;
    },
    fetch: () => {

        let _queryString = '';

        if (AutorizacionesTR.idFiltro == 1) {
            _queryString = '?idFiltro=' + AutorizacionesTR.idFiltro;
        } else {
            _queryString = '?idFiltro=' + AutorizacionesTR.idFiltro + '&fechaDesde=' + AutorizacionesTR.fechaDesde + '&fechaHasta=' + AutorizacionesTR.fechaHasta;
        }

        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr" + _queryString,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                AutorizacionesTR.loader = false;
                AutorizacionesTR.pedidos = result.data;
            })
            .catch(function (e) {
                setTimeout(function () { AutorizacionesTR.fetch(); }, 2000);
            });


    },

    reloadData: () => {
        var table = $('#table-AutorizacionesTR').DataTable();
        table.clear();
        table.rows.add(AutorizacionesTR.pedidos).draw();
    },
    view: (_data) => {

        return AutorizacionesTR.loader ? [
            m(SidebarTR, { oncreate: SidebarTR.setPage(33) }),
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
                            m(m.route.Link, { href: "/contabilidad" }, [
                                " Contabilidad "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad/proceso/tarjeta-roja" }, [
                                " Tarjeta Roja "
                            ])

                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Autorizaciones:"
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
        ] : AutorizacionesTR.error.length !== 0 ? [
            m(SidebarTR, { oncreate: SidebarTR.setPage(33) }),
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
                            m(m.route.Link, { href: "/contabilidad" }, [
                                " Contabilidad "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad/proceso/tarjeta-roja" }, [
                                " Tarjeta Roja "
                            ])

                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Autorizaciones;"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe información.')
                    ]),





                ])
            ),

        ] : !AutorizacionesTR.loader && AutorizacionesTR.pedidos.length !== 0 ? [
            m(SidebarTR, { oncreate: SidebarTR.setPage(33) }),
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
                            m(m.route.Link, { href: "/contabilidad" }, [
                                " Contabilidad "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad/proceso/tarjeta-roja" }, [
                                " Tarjeta Roja "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Autorizaciones:"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Autorizaciones:"
                    ),
                    m(tableAutorizacionesTR)





                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Pedidos Ingresados"
                ),
                m("div.mg-t-10.bg-white", {

                },

                    m("div.mg-t-10.bg-white",
                        m("div.card-header.pd-t-20.pd-b-0.bd-b-0", [
                            m("h6.lh-5.mg-b-5",
                                "Autorizaciones"
                            ),

                        ]),
                        m("div.card-body.pd-0", [
                            m("div.pd-t-10.pd-b-0.pd-x-20.d-flex.align-items-baseline", [
                                m("h1.tx-normal.tx-rubik.mg-b-0.mg-r-5",
                                    AutorizacionesTR.pedidos.length
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

        ] : !AutorizacionesTR.loader && AutorizacionesTR.pedidos.length == 0 ? [
            m(SidebarTR, { oncreate: SidebarTR.setPage(33) }),
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
                            m(m.route.Link, { href: "/contabilidad" }, [
                                " Contabilidad "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad/proceso/tarjeta-roja" }, [
                                " Tarjeta Roja "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Autorizaciones:"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Autorizaciones"
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
            m(SidebarTR, { oncreate: SidebarTR.setPage(33) }),
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
                            m(m.route.Link, { href: "/contabilidad" }, [
                                " Contabilidad "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/contabilidad/proceso/tarjeta-roja" }, [
                                " Tarjeta Roja "
                            ])

                        ),

                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Autorizaciones:"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Autorizaciones"
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


export default AutorizacionesTR;