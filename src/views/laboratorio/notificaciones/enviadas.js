import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';



const DetalleNotificacion = {
    data: [],
    fetch: () => {

        DetalleNotificacion.data = []
        for (var i = 0; i < NotificacionesEnviadasLab.dataNotificaciones.length; i++) {
            if (NotificacionesEnviadasLab.dataNotificaciones[i].id == NotificacionesEnviadasLab.idFiltro) {
                DetalleNotificacion.data = NotificacionesEnviadasLab.dataNotificaciones[i];
            }
        }

    },
    view: () => {

        if (NotificacionesEnviadasLab.showBitacora.length !== 0 && DetalleNotificacion.data.length !== 0) {

            console.log(1, DetalleNotificacion.data)

            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                        m("small.pd-2.tx-20",
                            m("i.fas.fa-times-circle.pd-2", {
                                    "style": { "cursor": "pointer" },
                                    title: "Cerrar",
                                    onclick: () => {

                                        NotificacionesEnviadasLab.showBitacora = "";
                                        DetalleNotificacion.data = [];
                                        m.route.set("/laboratorio/notificaciones/enviadas", {});


                                    }
                                }

                            )


                        ),

                    ),

                    m("div.mg-b-30",
                        m("i.tx-40.fas.fa-filter.")
                    ),
                    m("p.mg-5.tx-right", [
                        m("button.btn.btn-xs.btn-secondary.mg-l-2[type='button']", {
                                onclick: () => {

                                }
                            },
                            m("i.fas.fa-edit.mg-r-5"),
                            " Editar "

                        ),

                        m("button.btn.btn-xs.btn-danger.mg-l-2[type='button']", {
                                onclick: () => {

                                }
                            },
                            m("i.fas.fa-times-circle.mg-r-5"),
                            " Eliminar "

                        )
                    ]),
                    m("h5.tx-inverse.mg-b-10",
                        "Filtro: " + DetalleNotificacion.data.nombre
                    ),

                    (DetalleNotificacion.data.ene == 0 ? [
                        m("h5.tx-inverse.mg-b-10.tx-danger",
                            "Regla para: NO ENVIAR"
                        ),
                    ] : [
                        m("h5.tx-inverse.mg-b-10.tx-primary",
                            "Regla para: ENVIAR"
                        )
                    ]),

                    (DetalleNotificacion.data.x_servicio !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Servicio: " + DetalleNotificacion.data.x_servicio
                        )
                    ] : []),
                    (DetalleNotificacion.data.x_origen !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Origen: " + DetalleNotificacion.data.x_origen
                        )
                    ] : []),
                    (DetalleNotificacion.data.x_motivo !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Motivo: " + DetalleNotificacion.data.x_motivo
                        )
                    ] : []),
                    (DetalleNotificacion.data.x_especialidad !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Especialidad: " + DetalleNotificacion.data.x_especialidad
                        )
                    ] : []),
                    (DetalleNotificacion.data.x_medico !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Médico: " + DetalleNotificacion.data.x_medico
                        )
                    ] : []),
                    (DetalleNotificacion.data.x_idprueba !== null ? [
                        m("h5.tx-inverse.mg-b-10",
                            "Por Id Prueba: " + DetalleNotificacion.data.x_idprueba
                        )
                    ] : []),
                ])
            ]
        } else {

            if (NotificacionesEnviadasLab.showBitacora.length !== 0) {
                return [
                    m("div.pd-t-10", [
                        m("div.placeholder-paragraph.wd-100p", [
                            m("div.line"),
                            m("div.line")
                        ])
                    ])

                ]
            }

        }

    }

};


const NotificacionesEnviadasLab = {
    dataNotificaciones: [],
    showBitacora: "",
    sc: "",
    fechaExamen: "",
    fetch: () => {
        m.request({
                method: "GET",
                url: "http://lisa.hospitalmetropolitano.org/apps/soa/laranotifs/public/api/v1/listar/ordenes?tipo=enviadas&errores=0&limit=100000&withdata=1&page=1",
            })
            .then(function(result) {
                NotificacionesEnviadasLab.dataNotificaciones = result.data;
                loadNotificacionesEnviadasLab();

            })
            .catch(function(e) {})
    },

    oninit: (_data) => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        App.isAuth('laboratorio', 15);
        NotificacionesEnviadasLab.fetch();
    },
    oncreate: (_data) => {
        document.title = "Reglas Filtros | " + App.title;
    },
    view: (_data) => {

        if (_data.attrs !== undefined && _data.attrs.sc !== undefined) {
            NotificacionesEnviadasLab.sc = _data.attrs.sc;
            NotificacionesEnviadasLab.fechaExamen = _data.attrs.fechaExamen;
            NotificacionesEnviadasLab.showBitacora = "d-none";
            DetalleNotificacion.fetch();
        } else {
            NotificacionesEnviadasLab.sc = _data.attrs.sc;
            NotificacionesEnviadasLab.fechaExamen = _data.attrs.fechaExamen;
            NotificacionesEnviadasLab.showBitacora = "";
        }

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components", {
                    style: { "margin-right": "0px" }
                },
                m("div.container", {
                    style: { "max-width": "none" }
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
                        "Notificaciones Enviadas:"
                    ),


                    m("div.row.animated.fadeInUp", {
                        class: NotificacionesEnviadasLab.showBitacora
                    }, [

                        m("div.col-12", [

                            m("div.col-12.mg-b-5.wd-100p[data-label='Filtrar'][id='filterTable']",

                                m("div.row", [

                                    m("div.wd-100p.pd-b-10",
                                        m("div.input-group", [
                                            m(".df-example.demo-forms.wd-100p[data-label='Buscar:']", [
                                                m("input.form-control[type='text'][id='searchField'][data-role='tagsinput']", {
                                                    oncreate: () => {


                                                        new Bloodhound({
                                                            datumTokenizer: Bloodhound.tokenizers.obj.whitespace('text'),
                                                            queryTokenizer: Bloodhound.tokenizers.whitespace,
                                                        });


                                                    },


                                                }),
                                            ])
                                        ])
                                    ),


                                ])
                            ),
                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [

                                m("table.table.table-sm.tx-12[id='table-notificaciones'][width='100%']"),
                            ])
                        ])
                    ]),
                    m(DetalleNotificacion)
                ])
            ),


        ];
    },

};



function reloadDataTables(_table_, _data_) {
    var table = $(_table_).DataTable();
    table.clear();
    table.rows.add(_data_).draw();
}

function loadNotificacionesEnviadasLab() {

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
    var table = $("#table-notificaciones").DataTable({
        data: NotificacionesEnviadasLab.dataNotificaciones,
        dom: 'ltp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Resultados",
            sEmptyTable: "Sin Resultados",
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
        destroy: true,
        responsive: true,
        columns: [{
            title: "N°:"
        }, {
            title: "SC:"
        }, {
            title: "FECHA:"
        }, {
            title: "NHC:"
        }, {
            title: "PACIENTE:"
        }, {
            title: "FILTROS REGLAS:"
        }, {
            title: "EMAILS ENVÍO:"
        }, {
            title: "OPCIONES:"
        }, ],

        aoColumnDefs: [{
                mRender: function(data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                },
                visible: true,
                aTargets: [0],
            },
            {
                mRender: function(data, type, full) {
                    return full.sc;
                },
                visible: true,
                aTargets: [1],

            },
            {
                mRender: function(data, type, full) {

                    return full.fechaExamen + " " + full.horaExamen;


                },
                visible: true,
                aTargets: [2],

            },
            {
                mRender: function(data, type, full) {
                    return full.numeroHistoriaClinica;
                },
                visible: true,
                aTargets: [3],


            },
            {
                mRender: function(data, type, full) {
                    return full.apellidosPaciente + " " + full.nombresPaciente;
                },
                visible: true,
                aTargets: [4],

            },
            {
                mRender: function(data, type, full) {

                    var _reglas_envio = [];
                    var _reglas_no_envio = [];

                    for (var i = 0; i < full.reglasFiltros.length; i++) {

                        if (full.reglasFiltros[i].tipoRegla == "E") {
                            _reglas_envio.push(full.reglasFiltros[i].nombreRegla);
                        }

                        if (full.reglasFiltros[i].tipoRegla == "NE") {
                            _reglas_no_envio.push(full.reglasFiltros[i].nombreRegla);
                        }

                    }

                    return 'Envío: <div class="tx-primary d-inline">' + _reglas_envio.length + '</div><br/>No Envío: <div class="tx-danger d-inline">' + _reglas_no_envio.length + '</div>';


                },
                visible: true,
                aTargets: [5],


            },
            {
                mRender: function(data, type, full) {


                    var _emails_success = [];
                    var _emails_error = [];

                    for (var t = 0; t < full.logsEnvio.length; t++) {

                        if (full.logsEnvio[t].log.ErrorCode == 0) {
                            _emails_success.push(full.logsEnvio[t].log.To);
                        }

                        if (full.logsEnvio[t].log.ErrorCode !== 0) {
                            _emails_error.push(full.logsEnvio[t].log.To);
                        }

                    }

                    return 'Envíados: <div class="tx-primary d-inline">' + _emails_success.length + '</div><br/>Con Error: <div class="tx-danger d-inline">' + _emails_error.length + '</div>';

                },
                visible: true,
                aTargets: [6],

            },
            {
                mRender: function(data, type, full) {

                    return '';

                },
                visible: true,
                aTargets: [7],

            },


        ],
        order: [
            [0, "Desc"]
        ],


        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {


        },
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();



            settings.aoData.map(function(_i) {



                m.mount(_i.anCells[7], {
                    view: function() {
                        return [

                            m(m.route.Link, {
                                id: "sc_" + _i._aData.sc,
                                class: "btn btn-xs btn-block btn-primary mg-b-2",
                                href: "/laboratorio/notificaciones/enviadas/",
                                params: {
                                    sc: _i._aData.sc,
                                    fechaExamen: _i._aData.fechaExamen,
                                    track: "view",
                                },



                            }, [
                                m("i.fas.fa-envelope.mg-r-5"),
                            ], "Ver Detalle"),



                        ]
                    }
                });
            })

            /*

            settings.aoData.map(function(_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function() {

                        return m(iFiltro, _v._aData)


                    }
                });


            })

            */
        },
    });


    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });


    $('#searchField').change(function(e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#searchField').val()).draw();
    });


    return table;

};





function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}


export default NotificacionesEnviadasLab;