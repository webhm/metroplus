import SidebarLab from '../sidebarLab';
import Notificaciones from '../../../models/notificaciones';
import HeaderPrivate from '../../layout/header-private';


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


const tableNotificacionesEnviadasLab = {
    oncreate: () => {
        NotificacionesEnviadasLab.loadNotificacionesEnviadasLab();
        if (NotificacionesEnviadasLab.searchField.length !== 0) {
            var table = $('#table-NotificacionesEnviadasLab').DataTable();
            table.search(NotificacionesEnviadasLab.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "Notificaciones Enviadas:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                oncreate: (el) => {
                                    if (NotificacionesEnviadasLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Notificaciones Enviadas de Hoy';
                                    }
                                    if (NotificacionesEnviadasLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Notificaciones Enviadas entre Fechas';
                                    }

                                },
                                onupdate: (el) => {
                                    if (NotificacionesEnviadasLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Notificaciones Enviadas de Hoy';
                                    }
                                    if (NotificacionesEnviadasLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Notificaciones Enviadas entre Fechas';
                                    }

                                }
                            }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (NotificacionesEnviadasLab.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (NotificacionesEnviadasLab.idFiltro !== 1 ? moment(moment(NotificacionesEnviadasLab.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesEnviadasLab.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesEnviadasLab.loader = true;
                                            NotificacionesEnviadasLab.NotificacionesEnviadasLab = [];
                                            NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab();
                                            m.route.set("/imagen/NotificacionesEnviadasLab?idFiltro=" + NotificacionesEnviadasLab.idFiltro + "&fechaDesde=" + NotificacionesEnviadasLab.fechaDesde + "&fechaHasta=" + NotificacionesEnviadasLab.fechaHasta);
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
                                            el.dom.value = (NotificacionesEnviadasLab.idFiltro !== 1 ? moment(moment(NotificacionesEnviadasLab.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesEnviadasLab.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesEnviadasLab.loader = true;
                                            NotificacionesEnviadasLab.NotificacionesEnviadasLab = [];
                                            NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab();
                                            m.route.set("/imagen/NotificacionesEnviadasLab?idFiltro=" + NotificacionesEnviadasLab.idFiltro + "&fechaDesde=" + NotificacionesEnviadasLab.fechaDesde + "&fechaHasta=" + NotificacionesEnviadasLab.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/imagen/NotificacionesEnviadasLab/?idFiltro=1" }, [
                                        "Notificaciones de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/imagen/NotificacionesEnviadasLab/?idFiltro=2&fechaDesde=" + NotificacionesEnviadasLab.fechaDesde + "&fechaHasta=" + NotificacionesEnviadasLab.fechaHasta }, [
                                        "Notificaciones entre Fechas"
                                    ]),


                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (NotificacionesEnviadasLab.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function (e) { NotificacionesEnviadasLab.searchField = e.target.value; },
                                value: NotificacionesEnviadasLab.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-NotificacionesEnviadasLab'][width='100%']"),


                ])
            ])
        ]);
    }
};

const NotificacionesEnviadasLab = {
    notificaciones: [],
    NotificacionesEnviadasLab: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        SidebarLab.page = "";

        if (NotificacionesEnviadasLab.NotificacionesEnviadasLab.length == 0) {

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



            NotificacionesEnviadasLab.fechaDesde = moment().subtract(2, 'days').format('DD-MM-YYYY');
            NotificacionesEnviadasLab.fechaHasta = moment().format('DD-MM-YYYY');
            NotificacionesEnviadasLab.loader = true;
            NotificacionesEnviadasLab.NotificacionesEnviadasLab = [];
            NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab();

        }

    },

    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-NotificacionesEnviadasLab');
    },

    loadNotificacionesEnviadasLab: () => {




        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-NotificacionesEnviadasLab").DataTable({
            data: NotificacionesEnviadasLab.NotificacionesEnviadasLab,
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
                [0, "Desc"]
            ],
            destroy: true,
            columns: [{
                title: "Tipo: ",
            },
            {
                title: "Fecha y Hora: ",
            },
            {
                title: "Pedido N°: ",
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
                mRender: function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
                orderable: true,
            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PRE_MED;
                },
                visible: true,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function (data, type, full) {
                    return full.CD_PACIENTE;

                },
                visible: true,
                aTargets: [2],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return full.NM_PACIENTE;

                },
                visible: true,
                aTargets: [3],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return full.MED_MV;

                },
                visible: true,
                aTargets: [4],
                orderable: false,

            }, {
                mRender: function (data, type, full) {
                    return "";

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
                            m("td.wd-5p", {
                                class: 'bg-primary',
                                title: aData.origen

                            }, [
                                m("span.badge.badge-pill.badge-primary.mg-b-1",
                                    'R'
                                )

                            ]),
                            m("td.wd-15p",

                                m('.d-inline.mg-r-5', aData.fechaExamen + ' ' + aData.horaExamen),

                            ),
                            m("td.tx-center", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.sc
                                ),
                            ),
                            m("td", { "style": {} }, [
                                m('.d-inline.mg-r-5.tx-uppercase', aData.origen),
                                m('br'),
                                'PTE: ' + aData.apellidosPaciente + ' ' + aData.nombresPaciente,
                            ]

                            ),
                            m("td",
                                'MED: ' + aData.medico

                            ),



                            m("td.tx-center.tx-15", {
                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" }
                            },

                                m(m.route.Link, {
                                    href: aData.urlfile,
                                    class: 'tx-dark',
                                    target: '_blank',

                                }, [
                                    " Ver Log "

                                ]),




                            )





                        ];
                    },
                });


            },
            drawCallback: function (settings) {

                NotificacionesEnviadasLab.loader = false;

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
    fetchNotificacionesEnviadasLab: () => {

        let _queryString = '';

        if (NotificacionesEnviadasLab.idFiltro == 1) {
            _queryString = '&idFiltro=' + NotificacionesEnviadasLab.idFiltro;
        } else {
            _queryString = '&idFiltro=' + NotificacionesEnviadasLab.idFiltro + '&fechaDesde=' + NotificacionesEnviadasLab.fechaDesde + '&fechaHasta=' + NotificacionesEnviadasLab.fechaHasta;
        }

        m.request({
            method: "GET",
            url: "https://api.hospitalmetropolitano.org/nss/v1/listar/ordenes?type=enviadas" + _queryString,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                NotificacionesEnviadasLab.loader = false;
                NotificacionesEnviadasLab.NotificacionesEnviadasLab = result.data;
            })
            .catch(function (e) {
                setTimeout(function () { NotificacionesEnviadasLab.fetchNotificacionesEnviadasLab(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-NotificacionesEnviadasLab').DataTable();
        table.clear();
        table.rows.add(NotificacionesEnviadasLab.NotificacionesEnviadasLab).draw();
    },

    view: (_data) => {

        return NotificacionesEnviadasLab.loader ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas"
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

        ] : NotificacionesEnviadasLab.error.length !== 0 ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m('p', 'No existe infrmac dd ncin')
                    ]),





                ])
            ),

        ] : !NotificacionesEnviadasLab.loader && NotificacionesEnviadasLab.NotificacionesEnviadasLab.length !== 0 ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas"
                    ),
                    m(tableNotificacionesEnviadasLab)





                ])
            ),


        ] : !NotificacionesEnviadasLab.loader && NotificacionesEnviadasLab.NotificacionesEnviadasLab.length == 0 ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),


                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas"
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
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio/notificaciones" }, [
                                " Notificaciones de Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones Enviadas"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones Enviadas"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("p", " Error interno."

                            ),


                        ])
                    ]),






                ])),
        ];


    },

};


export default NotificacionesEnviadasLab;