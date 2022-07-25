import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';

const iPedido = {

    view: (_data) => {
        return [
            ((_data.attrs.TIPO_PEDIDO == 'R') ? [
                m("span", {
                    class: "badge badge-primary mg-b-2 mg-r-2",
                }, [
                    m("i.fas.fa-file-alt.mg-r-5"),
                ], "Pedido Normal"),

            ] : [
                m("span", {
                    class: "badge badge-danger mg-b-2 mg-r-2",
                }, [
                    m("i.fas.fa-file-alt.mg-r-5"),
                ], "Urgente"),
            ]),
            ((_data.attrs.SN_RESULTADO) ? [
                m("span", {
                    class: "badge  badge-success mg-b-2 mg-r-2",
                }, [
                    m("i.fas.fa-file-alt.mg-r-5"),
                ], " Resultado Listo "),

            ] : [
                m("span", {
                    class: "badge badge-warning mg-b-2 mg-r-2",
                }, [
                    m("i.fas.fa-clock.mg-r-5"),
                ], " Pendiente Resultado "),
            ]),


            m("p.mg-0.tx-14", [
                m("i.tx-14.fas.fa-user.mg-r-5"),
                _data.attrs.PTE_MV,
            ]),


            m("p.mg-0", [
                m("div.tx-12.mg-r-5",
                    m("i.tx-12.fas.fa-file.mg-r-5"),
                    "N° Pedido: " + _data.attrs.NUM_PEDIDO_MV
                )
            ]),
            m("p.mg-0", [
                m("div.tx-12.mg-r-5",
                    m("i.tx-12.fas.fa-h-square.mg-r-5"),
                    "NHC: " + _data.attrs.HC_MV + " UBICACION: " + _data.attrs.SECTOR + ": " + _data.attrs.UBICACION
                )
            ]),
        ];
    },

};

const StatusPedido = {
    error: "",
    data: [],
    fetch: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        StatusPedido.error = "";
        StatusPedido.data = [];
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/status-pedido-lab",
            body: {
                numeroPedido: VerPedido.numeroPedido,
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                if (result.status) {
                    StatusPedido.data = result.data;
                    VerPedido.validarStatus();
                } else {
                    StatusPedido.error = result.message;
                }

            })
            .catch(function (e) {

            })

    },


};

const DetallePedido = {
    view: () => {
        if (StatusPedido.error) {
            return [
                m("p.mg-0",
                    StatusPedido.error
                )
            ]
        } else if (StatusPedido.data.length !== 0) {
            return [
                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                    m("div.mg-b-20",
                        m("i.tx-60.fas.fa-file." + VerPedido.classPedido)
                    ),
                    ((VerPedido.data.TIPO_PEDIDO == 'R') ? [
                        m("span.pd-6.wd-100p.wd-md-20p", {
                            class: "badge badge-primary mg-b-2 mg-r-2",
                        }, [
                            m("i.fas.fa-file-alt.mg-r-5"),
                        ], "Pedido Normal"),

                    ] : [
                        m("span.pd-6.wd-100p.wd-md-20p", {
                            class: "badge badge-danger mg-b-2 mg-r-2 ",
                        }, [
                            m("i.fas.fa-file-alt.mg-r-5"),
                        ], "Pedido Urgente"),
                    ]),
                    m("h5.tx-inverse.mg-t-30.mg-b-5",
                        "Detalle de Pedido N°: " + VerPedido.numeroPedido + " - Status: " + VerPedido.descSstatusPedido
                    ),
                    m("p.mg-5.tx-20", [
                        m("i.fas.fa-user.mg-r-8.text-secondary"),
                        VerPedido.data.PTE_MV

                    ]),
                    m("p.mg-5.tx-15", [
                        "Fecha Pedido: ",
                        VerPedido.data.FECHA_PEDIDO,
                        " Hora: ",
                        VerPedido.data.HORA_PEDIDO,
                    ]),
                    m("p.mg-5.tx-15", [
                        "Médico: ",
                        VerPedido.data.MED_MV,

                        " - ",
                        VerPedido.data.SECTOR,
                        ": ",
                        VerPedido.data.UBICACION,
                    ]),
                    m("p.mg-5", [
                        "Historía Clínica: ",

                    ]),
                    m("p.mg-5", [
                        m("span.badge.badge-primary.mg-r-5.tx-14",
                            "GEMA: " + VerPedido.data.HC_MV + "01",
                        ),
                        m("span.badge.badge-success.mg-r-5.tx-14",
                            "MV: " + VerPedido.data.HC_MV
                        ),
                    ]),
                    m("ul.nav.nav-tabs.mg-t-15[id='myTab'][role='tablist']", [
                        m("li.nav-item",
                            m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']",
                                "Detalle Pedido"
                            )
                        ),
                        m("li.nav-item",
                            m("a.nav-link[id='profile-tab'][data-toggle='tab'][href='#profile'][role='tab'][aria-controls='profile'][aria-selected='false']",
                                "Toma de Muestras"
                            )
                        ),
                        m("li.nav-item",
                            m("a.nav-link[id='contact-tab'][data-toggle='tab'][href='#contact'][role='tab'][aria-controls='contact'][aria-selected='false']",
                                "Comentarios"
                            )
                        )
                    ]),
                    m(".tab-content.bd.bd-gray-300.bd-t-0.pd-20.mg-t-10[id='myTabContent']", [
                        m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                            (StatusPedido.error ? [
                                m("p.mg-0",
                                    StatusPedido.error
                                )
                            ] : StatusPedido.data !== undefined && StatusPedido.data.length !== 0 ? [
                                m("h6",
                                    "Detalle Pedido:"
                                ),
                                m("div.table-responsive",
                                    m("table.table.table-dashboard.mg-b-0",
                                        [
                                            m("thead",
                                                m("tr",
                                                    [
                                                        m("th",
                                                            "FECHA DE TOMA DE MUESTRA"
                                                        ),
                                                        m("th.text-right",
                                                            "EXAMEN"
                                                        ),
                                                        m("th.text-right",
                                                            "FECHA TOMA"
                                                        ),
                                                        m("th.text-right",
                                                            "FECHA RECEPCIÓN"
                                                        ),

                                                    ]
                                                )
                                            ),
                                            m("tbody",
                                                [
                                                    StatusPedido.data.map(function (_val, _i, _contentData) {
                                                        return [

                                                            m("tr",
                                                                [
                                                                    m("td.tx-color-03.tx-normal",
                                                                        _val.DT_COLETA + " " + _val.HORA_MUESTRA
                                                                    ),
                                                                    m("td.tx-medium.text-right",
                                                                        _val.NM_EXA_LAB
                                                                    ),
                                                                    m("td.text-right.tx-teal",
                                                                        "+ $32,580.00"
                                                                    ),
                                                                    m("td.text-right.tx-pink",
                                                                        "- $3,023.10"
                                                                    ),

                                                                ]
                                                            ),
                                                        ]
                                                    })


                                                ]
                                            )
                                        ]
                                    )
                                )


                            ] : m("div.placeholder-paragraph.wd-100p", [
                                m("div.line"),
                                m("div.line")
                            ]))
                        ]),
                        m(".tab-pane.fade[id='profile'][role='tabpanel'][aria-labelledby='profile-tab']", [
                            m("h6",
                                "Registro de Toma de Muestras::"
                            ),
                            m("div.table-responsive",
                                m("table.table.table-dashboard.mg-b-0",
                                    [
                                        m("thead",
                                            m("tr",
                                                [
                                                    m("th",
                                                        "FECHA DE TOMA DE MUESTRA"
                                                    ),
                                                    m("th.text-right",
                                                        "EXAMEN"
                                                    ),


                                                ]
                                            )
                                        ),
                                        m("tbody",
                                            [
                                                StatusPedido.data.map(function (_val, _i, _contentData) {

                                                    StatusPedido.data[_i]['TIMESTAMP_TOMA'] = "";

                                                    return [

                                                        m("tr",
                                                            [
                                                                m("td.tx-color-03.tx-normal",
                                                                    m("div.custom-control.custom-checkbox", [
                                                                        m("input.custom-control-input[type='checkbox'][id='" + _val.NM_EXA_LAB + "']", {
                                                                            onclick: function (e) {
                                                                                StatusPedido.data[_i]['TIMESTAMP_TOMA'] = "88";

                                                                                console.log(StatusPedido.data[_i]);



                                                                            },
                                                                            onupdate: (e) => {
                                                                                (StatusPedido.data[_i]['TIMESTAMP_TOMA'].length !== 0) ? StatusPedido.data[_i]['TIMESTAMP_TOMA'] : "";
                                                                            },


                                                                        }),
                                                                        m("label.custom-control-label[for='" + _val.NM_EXA_LAB + "']",
                                                                            StatusPedido.data[_i]['TIMESTAMP_TOMA']
                                                                        )
                                                                    ])
                                                                ),
                                                                m("td.tx-medium.text-right",
                                                                    _val.NM_EXA_LAB
                                                                ),



                                                            ]
                                                        ),
                                                    ]
                                                })


                                            ]
                                        )
                                    ]
                                )
                            )
                        ]),
                        m(".tab-pane.fade[id='contact'][role='tabpanel'][aria-labelledby='contact-tab']", [
                            m("h6",
                                "Contact"
                            ),
                            m("p.mg-b-0",
                                "Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex."
                            )
                        ])
                    ]),

                ])
            ]
        } else {
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

};

const VerPedido = {
    numeroPedido: "",
    numeroHistoriaClinica: "",
    track: "",
    data: [],
    classPedido: "",
    descSstatusPedido: "",
    validarStatus: () => {
        if (!VerPedido.data.SN_RESULTADO) {
            VerPedido.classPedido = "tx-warning";
            VerPedido.descSstatusPedido = "Muestras Pendientes";
        }
    },

    view: () => {


        return [

            m("div.animated.fadeInUp",
                {
                    class: (Flebotomista.showBitacora.length !== 0 ? "" : "d-none")
                }, [
                m(DetallePedido)
            ])

        ]

    },

};



const Flebotomista = {
    notificaciones: [],
    flebotomista: [],
    showBitacora: "",
    oninit: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            Flebotomista.showBitacora = "";

        } else {
            Flebotomista.showBitacora = "d-none";
            VerPedido.numeroPedido = _data.attrs.numeroPedido;
            StatusPedido.fetch;

        }
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        App.isAuth();
    },

    oncreate: (_data) => {
        document.title = "Bitácora Flebotomista | " + App.title;
        loadFlebotomista();

    },
    onupdate: (_data) => {
        console.log("_data", _data)
        if (isObjEmpty(_data.attrs)) {

            Flebotomista.showBitacora = "";
            window.scrollTo({ top: 0, behavior: 'smooth' });



        } else {
            Flebotomista.showBitacora = "d-none";

        }
    },
    view: (_data) => {


        if (isObjEmpty(_data.attrs)) {

            Flebotomista.showBitacora = "";


        } else {
            Flebotomista.showBitacora = "d-none";

        }

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab, { oncreate: Sidebarlab.setPage(16) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " Metrovirtual "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " Laboratorio "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Bitácora Flebotomista"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        (_data.attrs.numeroPedido == undefined) ? "Bitácora Flebotomista:" : "Detalle de Pedido N°: " + VerPedido.numeroPedido
                    ),

                    m("div.row.animated.fadeInUp", {
                        class: Flebotomista.showBitacora
                    }, [
                        m("div.col-12.mg-b-10.wd-100p[data-label='Filtrar'][id='filterTable']",
                            m("div.row", [
                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m("input.form-control.mg-b-20.wd-100p[aautofocus=''][id='_dt_search_text'][placeholder='Buscar por NHC o Nombres y Apellidos completos del Paciente'][title='Buscar'][type='text']"),
                                        m("div.input-group-append",
                                            m("button.btn.btn-outline-light[id='button-buscar-t'][type='button']", [
                                                m("i.icon.ion-md-search"),
                                                " Buscar "
                                            ]),
                                            m("button.btn.btn-outline-light[id='resetTable'][type='button']", [
                                                m("i.icon.ion-md-close-circle"),
                                                " Borrar "
                                            ])
                                        )
                                    ])
                                ),
                                m("div.col-sm-12.pd-b-10.d-none",
                                    m("div.input-group", [
                                        m("input.form-control[id='desde'][placeholder='Desde'][title='Desde'][type='text']"),
                                        m("input.form-control[id='hasta'][placeholder='Hasta'][title='Hasta'][type='text']"),
                                        m("div.input-group-append", [
                                            m("button.btn.btn-outline-light[id='filtrar'][title='Buscar'][type='button']", [
                                                m("i.icon.ion-md-funnel"),
                                                " Filtrar "
                                            ]),

                                        ])
                                    ])
                                )
                            ])
                        ),
                        m("div.col-12", [



                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-flebotomista'][width='100%']"),
                            )
                        ])
                    ]),
                    m(VerPedido)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    "Bitácora Flebotomista"
                ),
                m("div.mg-t-10.bg-white.d-none",
                    m("div.col-12.mg-t-30.mg-lg-t-0",
                        m("div.row", [
                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-sm-t-0.mg-lg-t-30", [
                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "Pendientes"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "65% goal reached"
                                    )
                                ]),
                                m("div.d-flex.align-items-end.justify-content-between.mg-b-5", [
                                    m("h5.tx-normal.tx-rubik.lh-2.mg-b-0",
                                        "13,596"
                                    ),
                                    m("h6.tx-normal.tx-rubik.tx-color-03.lh-2.mg-b-0",
                                        "20,000"
                                    )
                                ]),
                                m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-teal.wd-65p[role='progressbar'][aria-valuenow='65'][aria-valuemin='0'][aria-valuemax='100']")
                                )
                            ]),
                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-sm-t-0.mg-lg-t-30", [
                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "Recibidas"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "45% goal reached"
                                    )
                                ]),
                                m("div.d-flex.justify-content-between.mg-b-5", [
                                    m("h5.tx-normal.tx-rubik.mg-b-0",
                                        "83,123"
                                    ),
                                    m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                        m("small",
                                            "250,000"
                                        )
                                    )
                                ]),
                                m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-orange.wd-45p[role='progressbar'][aria-valuenow='45'][aria-valuemin='0'][aria-valuemax='100']")
                                )
                            ]),
                            m("div.col-sm-6.col-lg-12.mg-t-30.mg-b-30", [
                                m("div.d-flex.align-items-center.justify-content-between.mg-b-5", [
                                    m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                        "Procesadas"
                                    ),
                                    m("span.tx-10.tx-color-04",
                                        "20% goal reached"
                                    )
                                ]),
                                m("div.d-flex.justify-content-between.mg-b-5", [
                                    m("h5.tx-normal.tx-rubik.mg-b-0",
                                        "16,869"
                                    ),
                                    m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                        m("small",
                                            "85,000"
                                        )
                                    )
                                ]),
                                m("div.progress.ht-4.mg-b-0.op-5",
                                    m(".progress-bar.bg-pink.wd-20p[role='progressbar'][aria-valuenow='20'][aria-valuemin='0'][aria-valuemax='100']")
                                )
                            ]),

                        ])
                    )
                )
            ])
        ];
    },

};


function loadFlebotomista() {

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
    var table = $("#table-flebotomista").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/pedidos-flebotomista-laboratorio",
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
            title: "FECHA Y HORA:"
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
            width: "20%",

            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [4],
            width: "60%",
            orderable: false,

        },
        {
            mRender: function (data, type, full) {
                return "";
            },
            visible: true,
            aTargets: [5],

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
                            _i._aData.FECHA_PEDIDO + " " + _i._aData.HORA_PEDIDO
                        ])
                    }
                });
                m.mount(_i.anCells[4], { view: function () { return m(iPedido, _i._aData) } });
                m.mount(_i.anCells[5], {
                    view: function () {
                        return [
                            m(m.route.Link, {
                                class: "btn btn-xs btn-block btn-primary mg-b-2",
                                href: "/laboratorio/flebotomista/",
                                params: {
                                    numeroHistoriaClinica: _i._aData.HC_MV,
                                    numeroAtencion: _i._aData.AT_MV,
                                    numeroPedido: _i._aData.NUM_PEDIDO_MV,
                                    track: "view",
                                },
                                onclick: () => {
                                    Flebotomista.showBitacora = "d-none";
                                    VerPedido.numeroPedido = _i._aData.NUM_PEDIDO_MV;
                                    VerPedido.data = _i._aData;
                                    StatusPedido.fetch();
                                }


                            }, [
                                m("i.fas.fa-file-alt.mg-r-5"),
                            ], "Ver Pedido"),



                        ]
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



}


function isObjEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) return false;
    }

    return true;
}



export default Flebotomista;