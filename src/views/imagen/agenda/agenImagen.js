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


const tableAgendaImagen = {
    oncreate: () => {
        AgendaImagen.loadAgendaImagen();
        if (AgendaImagen.searchField.length !== 0) {
            var table = $('#table-agenda').DataTable();
            table.search(AgendaImagen.searchField).draw();
        }

    },

    view: () => {
        return m("div.row.animated.fadeInUp", {}, [

            m("div.col-12", [



                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                    m("div.d-flex.align-items-center.justify-content-between.mg-b-80.mg-t-10", [
                        m("h5.mg-b-0",
                            "AgendaImagen de Imagen:",
                            m("span.badge.badge-primary.tx-semibold.pd-l-10.pd-r-10.mg-l-5.tx-15", {
                                    oncreate: (el) => {
                                        if (AgendaImagen.idFiltro == 1) {
                                            el.dom.innerHTML = 'AgendaImagen de Hoy';
                                        }
                                        if (AgendaImagen.idFiltro == 2) {
                                            el.dom.innerHTML = 'AgendaImagen entre Fechas';
                                        }
                                        if (AgendaImagen.idFiltro == 3) {
                                            el.dom.innerHTML = 'AgendaImagen de Emergencia';
                                        }
                                        if (AgendaImagen.idFiltro == 4) {
                                            el.dom.innerHTML = 'AgendaImagen de C. Externa';
                                        }
                                        if (AgendaImagen.idFiltro == 5) {
                                            el.dom.innerHTML = 'AgendaImagen de Hospitalización';
                                        }
                                    },
                                    onupdate: (el) => {
                                        if (AgendaImagen.idFiltro == 1) {
                                            el.dom.innerHTML = 'AgendaImagen de Hoy';
                                        }
                                        if (AgendaImagen.idFiltro == 2) {
                                            el.dom.innerHTML = 'AgendaImagen entre Fechas';
                                        }
                                        if (AgendaImagen.idFiltro == 3) {
                                            el.dom.innerHTML = 'AgendaImagen de Emergencia';
                                        }
                                        if (AgendaImagen.idFiltro == 4) {
                                            el.dom.innerHTML = 'AgendaImagen de C. Externa';
                                        }
                                        if (AgendaImagen.idFiltro == 5) {
                                            el.dom.innerHTML = 'AgendaImagen de Hospitalización';
                                        }
                                    }
                                }

                            )

                        ),
                        m("div.d-flex.tx-14", [
                            m('.', {
                                class: (AgendaImagen.idFiltro == 1 ? 'd-none' : 'd-flex')
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
                                            el.dom.value = (AgendaImagen.idFiltro !== 1 ? moment(moment(AgendaImagen.fechaDesde, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            AgendaImagen.fechaDesde = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            AgendaImagen.loader = true;
                                            AgendaImagen.AgendaImagen = [];
                                            AgendaImagen.fetchAgendaImagen();
                                            m.route.set("/imagen/AgendaImagen?idFiltro=" + AgendaImagen.idFiltro + "&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta);
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
                                            el.dom.value = (AgendaImagen.idFiltro !== 1 ? moment(moment(AgendaImagen.fechaHasta, 'DD-MM-YYYY')).format('YYYY-MM-DD') : '');
                                        },
                                        onchange: (el) => {
                                            AgendaImagen.fechaHasta = moment(moment(el.target.value, 'YYYY-MM-DD')).format('DD-MM-YYYY');
                                            AgendaImagen.loader = true;
                                            AgendaImagen.AgendaImagen = [];
                                            AgendaImagen.fetchAgendaImagen();
                                            m.route.set("/imagen/AgendaImagen?idFiltro=" + AgendaImagen.idFiltro + "&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta);
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
                                    m(m.route.Link, { class: 'dropdown-item', href: "/imagen/AgendaImagen/?idFiltro=1" }, [
                                        "AgendaImagen de Hoy"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item', href: "/imagen/AgendaImagen/?idFiltro=2&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta }, [
                                        "AgendaImagen entre Fechas"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/imagen/AgendaImagen/?idFiltro=3&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta }, [
                                        "AgendaImagen de Emergencia"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/imagen/AgendaImagen/?idFiltro=4&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta }, [
                                        "AgendaImagen de C. Externa"
                                    ]),
                                    m(m.route.Link, { class: 'dropdown-item d-none', href: "/imagen/AgendaImagen/?idFiltro=5&fechaDesde=" + AgendaImagen.fechaDesde + "&fechaHasta=" + AgendaImagen.fechaHasta }, [
                                        "AgendaImagen de Hospitalización"
                                    ]),

                                ])
                            ])
                        ])
                    ]),
                    m("div.col-sm-12.filemgr-content-header", {
                        class: (AgendaImagen.idFiltro == 1 ? "mg-t-35" : "mg-t-40")
                    }, [
                        m("i[data-feather='search']"),
                        m("div.search-form",
                            m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']", {

                                oninput: function(e) { AgendaImagen.searchField = e.target.value; },
                                value: AgendaImagen.searchField,
                            })
                        ),

                    ]),


                    m("table.table.table-sm.tx-11[id='table-agenda'][width='100%']"),


                ])
            ])
        ]);
    }
};

const AgendaImagen = {
    notificaciones: [],
    AgendaImagen: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {
        AgendaImagen.loader = false;
        AgendaImagen.AgendaImagen = [1, 2, 3];
        document.body.classList.add('app-calendar');
    },

    oncreate: (_data) => {
        Notificaciones.suscribirCanal('MetroPlus-Imagen-Agenda');

        let events_calendar = document.createElement('script');
        events_calendar.setAttribute('src', 'assets/dashforge/js/calendar-events.js');
        events_calendar.setAttribute('id', 'events_calendar');
        document.head.appendChild(events_calendar);

        let dashCalendar = document.createElement('script');
        dashCalendar.setAttribute('src', 'assets/dashforge/js/dashforge.calendar.js');
        dashCalendar.setAttribute('id', 'dashCalendar');
        document.head.appendChild(dashCalendar);

    },
    onremove: () => {
        document.getElementById('events_calendar').remove();
        document.getElementById('dashCalendar').remove();
    },

    loadAgendaImagen: () => {




        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-agenda").DataTable({
            data: AgendaImagen.AgendaImagen,
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
            columns: false,
            aoColumnDefs: [{
                    mRender: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                    visible: false,
                    aTargets: [0],
                    orderable: true,
                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PRE_MED;
                    },
                    visible: false,
                    aTargets: [1],
                    orderable: false,

                },
                {
                    mRender: function(data, type, full) {
                        return full.CD_PACIENTE;

                    },
                    visible: false,
                    aTargets: [2],
                    orderable: false,

                }, {
                    mRender: function(data, type, full) {
                        return full.NM_PACIENTE;

                    },
                    visible: false,
                    aTargets: [3],
                    orderable: false,

                }, {
                    mRender: function(data, type, full) {
                        return full.MED_MV;

                    },
                    visible: false,
                    aTargets: [4],
                    orderable: false,

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

            },
            drawCallback: function(settings) {

                AgendaImagen.loader = false;

                settings.aoData.map(function(_i) {

                    $(_i.anCells[5]).css("padding", "0").css("background-color", "#f7fafe");

                    m.mount(_i.anCells[5], {
                        view: function() {

                            return [
                                m("div.d-flex", {}, [
                                    m("div.pd-0.flex-grow-1",
                                        m("div.pd-2", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            m('i.fas.fa-file-alt.tx-semibold.tx-15.pd-2.mg-r-5'),
                                            m('.d-inline.tx-15.mg-r-5', _i._aData.CD_PRE_MED),
                                            m('i.fas.fa-hospital.tx-semibold.tx-12.pd-2'),
                                            m('.tx-semibold.d-inline.tx-12', " SECTOR: "),
                                            m('.d-inline.tx-12.mg-r-5', _i._aData.SECTOR + " " + _i._aData.UBICACION),
                                            m('i.fas.fa-user-md.tx-semibold.tx-12.pd-2'),
                                            m('.tx-semibold.d-inline.tx-12', " MED: "),
                                            _i._aData.MED_MV
                                        ),
                                    ),
                                    m("div.pd-2.tx-medium.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        _i._aData.EDAD + " - " + _i._aData.PESO + " - " + _i._aData.ALTURA
                                    )
                                ]),
                                m("div.d-flex.mg-b-20", { "style": { "background-color": "rgb(234, 239, 245)" } }, [
                                    m("div.pd-0.flex-grow-1",
                                        m("td.wd-1p.tx-white", { "style": { "background-color": (_i._aData.SECTOR == 'EMERGENCIA' ? "#f10075" : "#0168fa") } },
                                            (_i._aData.SECTOR == 'EMERGENCIA' ? "E" : "H")
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "FECHA:"
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "NHC:"
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.CD_PACIENTE
                                        ),
                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "N° AT.: "
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.AT_MV
                                        ),

                                        m("td.tx-10.tx-semibold", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                            "PTE: "
                                        ),
                                        m("td", { "style": { "background-color": "rgb(234, 239, 245)" } },
                                            _i._aData.NM_PACIENTE
                                        ),



                                    ),

                                    m("div.pd-0.mg-l-auto", { "style": { "background-color": "rgb(168, 190, 214)" } },
                                        m("td.tx-10", {
                                                "style": { "background-color": "rgb(168, 190, 214)", "cursor": "pointer" },
                                                onclick: () => {
                                                    m.route.set("/imagen/pedido/", {
                                                        numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                                        numeroAtencion: _i._aData.AT_MV,
                                                        numeroPedido: _i._aData.CD_PRE_MED,
                                                        track: "view",
                                                    });
                                                }
                                            },
                                            m(".tx-normal",
                                                m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                "Ver Pedido"
                                            )
                                        ),
                                    )
                                ]),


                            ]

                            /*

                            return ((_i._aData.SECTOR == 'EMERGENCIA') ? [
                                m("div.d-inline.list-group-item.d-flex.pd-sm", [
                                    m("div.avatar.tx-center",
                                        m("i.fas.fa-file-alt.tx-30", {
                                            title: "Ver Pedido",
                                            style: { "color": "#325a98", "cursor": "pointer" },
                                            onclick: () => {

                                                m.route.set("/imagen/pedido/", {
                                                    numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                                    numeroAtencion: _i._aData.AT_MV,
                                                    numeroPedido: _i._aData.CD_PRE_MED,
                                                    track: "view",
                                                });

                                            }
                                        })
                                    ),
                                    m("div.pd-sm-l-10", [
                                        m("p.tx-medium.tx-13.mg-b-2",
                                            "N° PRESCRIPCION MV: " + _i._aData.CD_PRE_MED
                                        ),
                                        m("p.tx-medium.tx-14.mg-b-2",
                                            "PTE: " + _i._aData.NM_PACIENTE
                                        ),
                                        m("p.tx-medium.mg-b-2",
                                            "Edad: " + _i._aData.EDAD + " Peso: " + _i._aData.PESO + "Kg. Altura: " + _i._aData.ALTURA + "m."
                                        ),
                                        m("small.tx-12.tx-light.mg-b-0",
                                            "MEDICO: " + _i._aData.MED_MV
                                        )
                                    ]),
                                    m("div.mg-l-auto.text-right", [
                                        m("p.tx-medium.mg-b-2",
                                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                                        ),
                                        m("small.tx-12.tx-danger.mg-b-0",
                                            _i._aData.SECTOR
                                        ),
                                        m("p.tx-12.tx-danger.mg-b-0",
                                            _i._aData.UBICACION
                                        )
                                    ])
                                ])

                            ] : [
                                m("div.d-inline.list-group-item.d-flex.pd-sm", [
                                    m("div.avatar.tx-center",
                                        m("i.fas.fa-file-alt.tx-30", {
                                            title: "Ver Pedido",
                                            style: { "color": "#325a98", "cursor": "pointer" },
                                            onclick: () => {


                                                m.route.set("/imagen/pedido/", {
                                                    numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                                    numeroAtencion: _i._aData.AT_MV,
                                                    numeroPedido: _i._aData.CD_PRE_MED,
                                                    track: "view",
                                                });
                                            }
                                        })
                                    ),
                                    m("div.pd-sm-l-10", [
                                        m("p.tx-medium.tx-13.mg-b-2",
                                            "N° PRESCRIPCION MV: " + _i._aData.CD_PRE_MED
                                        ),
                                        m("p.tx-medium.tx-14.mg-b-2",
                                            "PTE: " + _i._aData.NM_PACIENTE
                                        ),
                                        m("p.tx-medium.mg-b-2",
                                            "Edad: " + _i._aData.EDAD + " Peso: " + _i._aData.PESO + "Kg. Altura: " + _i._aData.ALTURA + "m."
                                        ),
                                        m("small.tx-12.tx-light.mg-b-0",
                                            "MEDICO: " + _i._aData.MED_MV
                                        )
                                    ]),
                                    m("div.mg-l-auto.text-right", [
                                        m("p.tx-medium.mg-b-2",
                                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                                        ),
                                        m("small.tx-12.tx-primary.mg-b-0",
                                            _i._aData.SECTOR
                                        ),
                                        m("p.tx-12.tx-primary.mg-b-0",
                                            _i._aData.UBICACION
                                        )
                                    ])
                                ])
                            ])

                            */


                        }
                    });

                })




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
    fetchAgendaImagen: () => {

        let _queryString = '';

        if (AgendaImagen.idFiltro == 1) {
            _queryString = '?idFiltro=' + AgendaImagen.idFiltro;
        } else {
            _queryString = '?idFiltro=' + AgendaImagen.idFiltro + '&fechaDesde=' + AgendaImagen.fechaDesde + '&fechaHasta=' + AgendaImagen.fechaHasta;
        }

        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/imagen/AgendaImagen" + _queryString,
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                AgendaImagen.loader = false;
                AgendaImagen.AgendaImagen = result.data;
            })
            .catch(function(e) {
                setTimeout(function() { AgendaImagen.fetchAgendaImagen(); }, 2000);
            });


    },
    reloadData: () => {
        var table = $('#table-agenda').DataTable();
        table.clear();
        table.rows.add(AgendaImagen.AgendaImagen).draw();
    },

    view: (_data) => {

        return AgendaImagen.loader ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ] : AgendaImagen.error.length !== 0 ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),

        ] : !AgendaImagen.loader && AgendaImagen.AgendaImagen.length !== 0 ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header", [
                            m("i[data-feather='search']"),
                            m("div.search-form", [
                                m("input.form-control[type='search']")
                            ]),
                            m("a.btn btn-sm btn-primary btn-icon calendar-add", [
                                m("div[data-toggle='tooltip']", [
                                    m("i.tx-white[data-feather='plus']")
                                ])
                            ])
                        ]),
                        m("div.calendar-sidebar-body[id='calendarSidebarBody']", [
                            m("div.calendar-inline", [
                                m("div[id='calendarInline']")
                            ])
                        ])
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),

        ] : !AgendaImagen.loader && AgendaImagen.AgendaImagen.length == 0 ? [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ] : [
            m("div.calendar-wrapper", [
                    m("div.calendar-sidebar", [
                        m("div.calendar-sidebar-header"),
                        m("div.calendar-sidebar-body")
                    ]),
                    m("div.calendar-content", [
                        m("div.calendar-content-body[id='calendar']")
                    ]),

                ]

            ),
        ];


    },

};


export default AgendaImagen;