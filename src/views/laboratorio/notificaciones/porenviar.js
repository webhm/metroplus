import SidebarLab from '../sidebarLab';
import Notificaciones from '../../../models/notificaciones';
import HeaderPrivate from '../../layout/header-private';
import qrcode from "qrcode";
import { prettyPrintJson } from 'pretty-print-json';


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


const tableNotificacionesPorEnviarLab = {
    oncreate: () => {
        NotificacionesPorEnviarLab.loadNotificacionesPorEnviarLab();
        if (NotificacionesPorEnviarLab.searchField.length !== 0) {
            var table = $('#table-notificaciones').DataTable();
            table.search(NotificacionesPorEnviarLab.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [

                        m("h5.mg-b-0",
                            'Notificaciones: ',
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                oncreate: (el) => {
                                    if (NotificacionesPorEnviarLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Por enviar Hoy';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Por enviar entre Fechas';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 3) {
                                        el.dom.innerHTML = 'Por enviar PCR';
                                    }


                                },
                                onupdate: (el) => {
                                    if (NotificacionesPorEnviarLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Por enviar Hoy';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Por enviar entre Fechas';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 3) {
                                        el.dom.innerHTML = 'Por enviar PCR';
                                    }
                                }

                            }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (NotificacionesPorEnviarLab.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (NotificacionesPorEnviarLab.idFiltro !== 1 ? moment(moment(NotificacionesPorEnviarLab.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesPorEnviarLab.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesPorEnviarLab.loader = true;
                                            NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                                            NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();
                                            m.route.set("/laboratorio/notificaciones/porenviar?idFiltro=" + NotificacionesPorEnviarLab.idFiltro + "&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta);
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
                                            el.dom.value = (NotificacionesPorEnviarLab.idFiltro !== 1 ? moment(moment(NotificacionesPorEnviarLab.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesPorEnviarLab.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesPorEnviarLab.loader = true;
                                            NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                                            NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();
                                            m.route.set("/laboratorio/notificaciones/porenviar?idFiltro=" + NotificacionesPorEnviarLab.idFiltro + "&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta);
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
                                    m("i.fas.fa-filter.tx-18.pd-5"),
                                    m("div.link-03", {
                                        title: "Filtros"
                                    },
                                        m(".tx-10.pd-r-0", {
                                            style: { "padding-top": "10px" }
                                        }, 'Filtros')
                                    ),
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/notificaciones/porenviar/?idFiltro=1" }, [
                                        "Notificaciones por Enviar de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/notificaciones/porenviar/?idFiltro=2&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta }, [
                                        "Notificaciones por Enviar entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/notificaciones/porenviar/?idFiltro=3&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta }, [
                                        "Notificaciones por Enviar PCR"
                                    ]),


                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (NotificacionesPorEnviarLab.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function (e) { NotificacionesPorEnviarLab.searchField = e.target.value; },
                                value: NotificacionesPorEnviarLab.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-notificaciones'][width='100%']"),


                ])
            ])
        ]);
    }
};

const NotificacionesPorEnviarLab = {
    notificaciones: [],
    NotificacionesPorEnviarLab: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    totalEnviadas: 0,
    totalPCR: 0,

    oninit: (_data) => {
        SidebarLab.page = "";

    },

    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-NotificacionesPorEnviarLab');
    },

    loadNotificacionesPorEnviarLab: () => {




        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-notificaciones").DataTable({
            data: NotificacionesPorEnviarLab.NotificacionesPorEnviarLab,
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
                orderable: false,
            },
            {
                mRender: function (data, type, full) {
                    return full.fechaExamen + ' ' + full.horaExamen;
                },
                visible: true,
                aTargets: [1],
                orderable: true,

            },
            {
                mRender: function (data, type, full) {
                    return full.sc;

                },
                visible: true,
                aTargets: [2],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.numeroHistoriaClinica;

                },
                visible: true,
                aTargets: [3],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.apellidosPaciente + ' ' + full.nombresPaciente;

                },
                visible: true,
                aTargets: [4],
                orderable: true,

            }, {
                mRender: function (data, type, full) {
                    return full.medico;

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
                            m("td.tx-13", {
                                class: (aData._PCR == 1 ? 'bg-danger' : 'bg-primary'),
                                style: { width: '1%' },
                                title: aData.origen

                            }, [
                                m("span.tx-12.badge.badge-pill", {
                                    class: (aData._PCR == 1 ? 'badge-danger' : 'badge-primary'),
                                },
                                    (aData._PCR == 1 ? 'U' : 'R'),
                                )

                            ]),
                            m("td.wd-20p.tx-13",
                                m('.d-inline.mg-r-5', 'Fecha Examen:'),
                                m('br'),
                                m('.d-inline.mg-r-5', aData.fechaExamen + ' ' + aData.horaExamen),
                                m('br'),
                                m('.d-inline.mg-r-5', 'Fecha Envío:'),
                                m('br'),
                                m('.d-inline.mg-r-5', (aData.fechaEnvio ? aData.fechaEnvio : 'N/D')),



                            ),
                            m("td.wd-5p.tx-center.tx-13", { "style": {} },
                                m("span.tx-semibold.tx-dark.tx-15.wd-100p.mg-b-1",
                                    aData.sc.slice(2)
                                ),
                            ),
                            m("td.wd-20p.tx-13", { "style": {} }, [
                                m('.d-inline.mg-r-5.tx-uppercase', aData.origen),
                                m('br'),
                                aData.apellidosPaciente + ' ' + aData.nombresPaciente,
                            ]

                            ),
                            m("td.wd-20p.tx-13",
                                aData.medico

                            ),



                            m("td.tx-center.tx-15.wd-15p",



                                m(".btn-group.btn-group-sm[role='group']", [
                                    m('button.btn.btn-secondary.tx-12', {
                                        onclick: () => {

                                            let modal = $('#modalViewLogs');
                                            modal.modal('show');

                                            let dataLog = {
                                                numeroHistoriaClinica: aData.numeroHistoriaClinica,
                                                apellidosPaciente: aData.apellidosPaciente,
                                                nombresPaciente: aData.nombresPaciente,
                                                sc: aData.sc,
                                                fechaExamen: aData.fechaExamen,
                                                horaExamen: aData.horaExamen,
                                                origen: aData.origen,
                                                servicio: aData.servicio,
                                                medico: aData.medico,
                                                motivo: aData.motivo,
                                                ultimaValidacion: aData.ultimaValidacion,
                                                ultimoFiltrado: aData.ultimoFiltrado,
                                                reglasFiltrosEnvio: aData.reglasFiltrosEnvio,
                                                correosElectronicos: aData.correosElectronicos,
                                                logsEnvio: aData.logsEnvio,














                                            };

                                            let elem = document.getElementById('logRes');
                                            elem.innerHTML = prettyPrintJson.toHtml(dataLog);


                                        }

                                    }, [
                                        " Ver Logs "
                                    ]),
                                    m('button.btn.btn-secondary.tx-12', {
                                        onclick: () => {

                                            let modal = $('#modalViewQR');
                                            modal.modal('show');

                                            let canvasElement = document.querySelector('canvas.qr');
                                            qrcode.toCanvas(canvasElement, aData.urlResultado);

                                        }

                                    }, [
                                        " Ver QR "
                                    ]),
                                    m(m.route.Link, {
                                        href: aData.urlResultado,
                                        class: 'button btn btn-secondary tx-12',
                                        target: '_blank',

                                    }, [
                                        " Link Resultado "

                                    ])



                                ])




                            )





                        ];
                    },
                });


            },
            drawCallback: function (settings) {


                NotificacionesPorEnviarLab.totalPCR = 0;
                settings.aoData.map(function (_v, _i) {
                    if (_v._aData._PCR == 1) {
                        NotificacionesPorEnviarLab.totalPCR++
                    }

                })

                NotificacionesPorEnviarLab.totalEnviadas = (settings.aoData.length - NotificacionesPorEnviarLab.totalPCR);
                m.redraw();

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
    fetchNotificacionesPorEnviarLab: () => {

        if (NotificacionesPorEnviarLab.idFiltro !== undefined) {


            NotificacionesPorEnviarLab.reloadData();

            let _queryString = '';

            if (NotificacionesPorEnviarLab.idFiltro == 1) {
                _queryString = '&idFiltro=' + NotificacionesPorEnviarLab.idFiltro;
            } else {
                _queryString = '&idFiltro=' + NotificacionesPorEnviarLab.idFiltro + '&fechaDesde=' + NotificacionesPorEnviarLab.fechaDesde + '&fechaHasta=' + NotificacionesPorEnviarLab.fechaHasta;
            }

            m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/nss/v1/listar/ordenes?type=porenviar" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
                .then(function (result) {
                    NotificacionesPorEnviarLab.loader = false;
                    if (result.data.length == 0) {
                        NotificacionesPorEnviarLab.error = 'No existe resultados.';
                    } else {
                        NotificacionesPorEnviarLab.error = '';
                        NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = result.data;
                    }
                })
                .catch(function (e) {
                    NotificacionesPorEnviarLab.error = e;
                });


        }


    },
    reloadData: () => {
        var table = $('#table-notificaciones').DataTable();
        table.clear();
        table.rows.add(NotificacionesPorEnviarLab.NotificacionesPorEnviarLab).draw();
    },

    view: (_data) => {

        return !NotificacionesPorEnviarLab.loader && NotificacionesPorEnviarLab.error.length !== 0 ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components", {
                style: { "margin-right": "0px" }
            },
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
                            "Notificaciones por Enviar"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones por Enviar"
                    ),
                    m("table", { "class": "table table-borderless table-sm tx-13 tx-nowrap mg-b-0" }, [
                        m("thead",
                            m("tr", { "class": "tx-10 tx-spacing-1 tx-color-03 tx-uppercase" }, [

                                m("th",
                                    "Enviadas"
                                ),
                                m("th", { "class": "text-right" },
                                    "Total"
                                ),

                                m("th", { "class": "text-right" },
                                    "ACTUALIZACIÓN EN"
                                )
                            ])
                        ),
                        m("tbody", [
                            m("tr", [

                                m("td", { "class": "tx-medium" },
                                    "CONSULTA EXTERNA"
                                ),
                                m("td", { "class": "text-right" },
                                    NotificacionesPorEnviarLab.totalEnviadas
                                ),

                                m("td[rowspan='2']", { "class": "text-right" },
                                    m(Stopwatch)
                                )
                            ]),
                            m("tr", [

                                m("td", { "class": "tx-medium" },
                                    "PCR"
                                ),
                                m("td", { "class": "text-right" },
                                    NotificacionesPorEnviarLab.totalPCR
                                ),



                            ]),

                        ])
                    ]),

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-20.mg-t-10", [

                        m("h5.mg-b-0",
                            'Notificaciones: ',
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                oncreate: (el) => {
                                    if (NotificacionesPorEnviarLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Por enviar Hoy';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Por enviar entre Fechas';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 3) {
                                        el.dom.innerHTML = 'Por enviar PCR';
                                    }


                                },
                                onupdate: (el) => {
                                    if (NotificacionesPorEnviarLab.idFiltro == 1) {
                                        el.dom.innerHTML = 'Por enviar Hoy';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 2) {
                                        el.dom.innerHTML = 'Por enviar entre Fechas';
                                    }

                                    if (NotificacionesPorEnviarLab.idFiltro == 3) {
                                        el.dom.innerHTML = 'Por enviar PCR';
                                    }
                                }

                            }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (NotificacionesPorEnviarLab.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (NotificacionesPorEnviarLab.idFiltro !== 1 ? moment(moment(NotificacionesPorEnviarLab.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesPorEnviarLab.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesPorEnviarLab.loader = true;
                                            NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                                            NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();
                                            m.route.set("/laboratorio/notificaciones/porenviar?idFiltro=" + NotificacionesPorEnviarLab.idFiltro + "&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta);
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
                                            el.dom.value = (NotificacionesPorEnviarLab.idFiltro !== 1 ? moment(moment(NotificacionesPorEnviarLab.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            NotificacionesPorEnviarLab.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            NotificacionesPorEnviarLab.loader = true;
                                            NotificacionesPorEnviarLab.NotificacionesPorEnviarLab = [];
                                            NotificacionesPorEnviarLab.fetchNotificacionesPorEnviarLab();
                                            m.route.set("/laboratorio/notificaciones/porenviar?idFiltro=" + NotificacionesPorEnviarLab.idFiltro + "&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta);
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
                                    m("i.fas.fa-filter.tx-18.pd-5"),
                                    m("div.link-03", {
                                        title: "Filtros"
                                    },
                                        m(".tx-10.pd-r-0", {
                                            style: { "padding-top": "10px" }
                                        }, 'Filtros')
                                    ),
                                ),
                                m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                    m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                        "FILTROS:"
                                    ),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/notificaciones/porenviar/?idFiltro=1" }, [
                                        "Notificaciones por Enviar de Hoy"
                                    ]),
                                    m(m.route.Link, {
                                        class: 'dropdown-item',
                                        href: "/laboratorio/notificaciones/porenviar/?idFiltro=2&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta,

                                    }, [
                                        "Notificaciones por Enviar entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/laboratorio/notificaciones/porenviar/?idFiltro=3&fechaDesde=" + NotificacionesPorEnviarLab.fechaDesde + "&fechaHasta=" + NotificacionesPorEnviarLab.fechaHasta }, [
                                        "Notificaciones por Enviar PCR"
                                    ]),


                                ])
                            ])
                        ])
                    ]),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [
                            m(".alert.alert-danger[role='alert']",
                                "No existe información disponible."
                            )


                        ])
                    ]),






                ])
            ),

        ] : !NotificacionesPorEnviarLab.loader && NotificacionesPorEnviarLab.NotificacionesPorEnviarLab.length !== 0 ? [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components", {
                style: { "margin-right": "0px" }
            },
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
                            "Notificaciones por Enviar"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones por Enviar"
                    ),
                    m("table", { "class": "table table-borderless table-sm tx-13 tx-nowrap mg-b-0" }, [
                        m("thead",
                            m("tr", { "class": "tx-10 tx-spacing-1 tx-color-03 tx-uppercase" }, [

                                m("th",
                                    "Enviadas"
                                ),
                                m("th", { "class": "text-right" },
                                    "Total"
                                ),

                                m("th", { "class": "text-right" },
                                    "ACTUALIZACIÓN EN"
                                )
                            ])
                        ),
                        m("tbody", [
                            m("tr", [

                                m("td", { "class": "tx-medium" },
                                    "CONSULTA EXTERNA"
                                ),
                                m("td", { "class": "text-right" },
                                    NotificacionesPorEnviarLab.totalEnviadas
                                ),

                                m("td[rowspan='2']", { "class": "text-right" },
                                    m(Stopwatch)
                                )
                            ]),
                            m("tr", [

                                m("td", { "class": "tx-medium" },
                                    "PCR"
                                ),
                                m("td", { "class": "text-right" },
                                    NotificacionesPorEnviarLab.totalPCR
                                ),



                            ]),

                        ])
                    ]),
                    m(tableNotificacionesPorEnviarLab)





                ])
            ),
            m(".modal.calendar-modal-event[id='modalViewQR'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-sm[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.bg-primary", [
                            m("h6.event-title", 'QR Resultado:'),
                            m("nav.nav.nav-modal-event", [
                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                    m("i[data-feather='x']")
                                )
                            ])
                        ]),
                        m("div.modal-body", [
                            m("div.row.row-sm", [
                                m("div.col-sm-12", [
                                    m("label.tx-11.tx-medium.tx-spacing-1.tx-color-03",
                                        "*Escanee con su teléfono para continuar."
                                    ),
                                    m("p.event-start-date.tx-center", [
                                        m('canvas.qr.wd-100p')
                                    ])
                                ]),

                            ]),

                        ])
                    ])
                )
            ),
            m(".modal.calendar-modal-event[id='modalViewLogs'][role='dialog'][aria-hidden='true']",
                m(".modal-dialog.modal-dialog-centered.modal-xl[role='document']",
                    m("div.modal-content", [
                        m("div.modal-header.bg-primary", [
                            m("h6.event-title", 'Logs Resultado:'),
                            m("nav.nav.nav-modal-event", [
                                m("a.nav-link[href='#'][data-dismiss='modal']",
                                    m("i[data-feather='x']")
                                )
                            ])
                        ]),
                        m("div.modal-body", [
                            m("div.row.row-sm", [
                                m("pre.json-container[id='logRes']"),
                            ]),

                        ])
                    ])
                )
            )


        ] : [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components", {
                style: { "margin-right": "0px" }
            },
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
                            "Notificaciones por Enviar"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Notificaciones por Enviar"
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
        ];


    },

};


export default NotificacionesPorEnviarLab;