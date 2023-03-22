import m from 'mithril';
import HeaderPrivate from '../../layout/header-private';
import SidebarTRoja from './sidebarTRoja';


const Uploads = {
    files: [],
    detalle: [],
    error: "",
    showFor: "",
    uploadService: (e) => {
        let postData = new FormData($('#uploadForm')[0]);

        fetch('https://api.hospitalmetropolitano.org/t/v1/procesos/tr/uploads?idTR=' + AuthTR.id, {
            method: "POST",
            body: postData,
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            console.log('data = ', data);
            alert('Proceso realizado con éxito.')

        }).catch(function(err) {
            console.error(err);
        });

    },

    loadFile: (event) => {

        Array.from(event.target.files).forEach((file) => {
            Uploads.files.push(file);
        })

    },

    view: () => {


        return [
            m("div.mg-t-10.d-flex", {}, [
                Uploads.files.length == 0 ? [
                    m('p', 'No existe archivos.')
                ] : Uploads.files.length > 0 ? [
                    Uploads.files.map(function(_v, _i, _contentData) {

                        return [

                            m("div.col-6.col-sm-4.col-md-3.col-xl-3.mg-b-5.mg-t-5",
                                m("div.card.card-file", [
                                    m("div.dropdown-file", [
                                        m("a.dropdown-link[href=''][data-toggle='dropdown']",
                                            m("svg.feather.feather-more-vertical[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']", [
                                                m("circle[cx='12'][cy='12'][r='1']"),
                                                m("circle[cx='12'][cy='5'][r='1']"),
                                                m("circle[cx='12'][cy='19'][r='1']")
                                            ])
                                        ),
                                        m("div.dropdown-menu.dropdown-menu-right", [


                                            m("a.dropdown-item.download[href='" + _v.url + "'][target='_blank']", [
                                                m("svg.feather.feather-download[xmlns='http://www.w3.org/2000/svg'][width='24'][height='24'][viewBox='0 0 24 24'][fill='none'][stroke='currentColor'][stroke-width='2'][stroke-linecap='round'][stroke-linejoin='round']", [
                                                    m("path[d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4']"),
                                                    m("polyline[points='7 10 12 15 17 10']"),
                                                    m("line[x1='12'][y1='15'][x2='12'][y2='3']")
                                                ]),
                                                "Descargar"
                                            ]),

                                        ])
                                    ]),
                                    m("div.card-file-thumb.tx-danger",
                                        m("i.far.fa-file-pdf")
                                    ),
                                    m("div.card-body", [
                                        m(".d-inline.tx-5",
                                            _v.name
                                        ),

                                    ])

                                ])
                            ),



                        ]

                    })


                ] : []
            ]),

            m('form.mg-t-50', {
                enctype: "multipart/form-data",
                id: 'uploadForm',
                onsubmit: (e) => {
                    e.preventDefault();
                    Uploads.uploadService();
                }
            }, [
                m('div.custom-file.mg-b-5', [
                    m("label.custom-file-label[for='uploadFiles']",
                        " Subir Archivos "
                    ),
                    m("input.custom-file-input[autofocus][id='uploadFiles'][name='uploadFiles'][type='file'][multiple='true']", {
                        onchange: (e) => {
                            Uploads.loadFile(e);
                        }
                    }),

                ]),
                m("button.btn.btn-primary.btn-block[type='submit']",
                    "Subir Archivo"
                )


            ]),


        ];



    },
};

const Observaciones = {
    observaciones: "",
    data: [],
    obs: "",
    show: false,
    loadObservaciones: () => {


        $.fn.dataTable.ext.errMode = "none";
        var table = $("#table-observaciones").DataTable({
            data: Observaciones.data,
            dom: 'tp',
            language: {
                searchPlaceholder: "Buscar...",
                sSearch: "",
                lengthMenu: "Mostrar _MENU_ registros por página",
                sProcessing: "Procesando...",
                sZeroRecords: "Sin Notificaciones",
                sEmptyTable: "Sin Notificaciones",
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
                    width: "1%",

                    orderable: true,
                }, {
                    mRender: function(data, type, row, meta) {
                        return "";
                    },
                    visible: true,
                    width: "99%",
                    aTargets: [1],
                    orderable: false,
                },

            ],
            fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
            drawCallback: function(settings) {
                settings.aoData.map(function(_v, _i) {
                    m.mount(_v.anCells[1], {
                        view: function() {
                            return m("div.demo-static-toast.wd-100p",
                                m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                    "style": { "max-width": "none" }
                                }, [
                                    m("div.toast-header.bg-primary", [
                                        m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                            'Observación'
                                        ),
                                        m("small.tx-white",
                                            moment.unix(_v._aData.timestamp).format("DD-MM-YYYY HH:mm")
                                        ),
                                    ]),
                                    m("div.toast-body.small",
                                        _v._aData.log
                                    )
                                ])
                            )
                        }
                    });


                })
            },
        });


        return table;
    },
    reloadObservaciones: () => {
        var table = $('#table-observaciones').DataTable();
        table.clear();
        table.rows.add(Observaciones.data).draw();
    },
    fetch: () => {
        Observaciones.data = AuthTR.data.comments;
        Observaciones.loadObservaciones();
    },

};

const DestinoFinal = {
    view: (_data) => {
        if (_data.attrs.destino_final == 'ALMACENAR') {
            return m("input", { "class": "form-control tx-semibold tx-15", "type": "text", "placeholder": "Destino Final" })
        } else {
            return m('select.tx-semibold', {

                class: "custom-select"
            }, m('option', 'Seleccione...'), ['FINANZAS', 'SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};



const AuthTR = {
    id: '',
    status: 0,
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroAuthTR: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    oninit: (_data) => {


        AuthTR.id = _data.attrs.tr;

        AuthTR.fetch();


    },
    fetch: () => {
        AuthTR.activos = [];
        AuthTR.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/id",
                body: {
                    idTR: AuthTR.id,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    AuthTR.loader = false;
                    AuthTR.data = result.data;
                    if (AuthTR.data.files !== false) {
                        Uploads.files = AuthTR.data.files;
                    }
                    setTimeout(function() { Observaciones.fetch(); }, 100);
                } else {
                    AuthTR.error = result.message;
                }

            })
            .catch(function(e) {
                AuthTR.fetch();
            })

    },
    updateStatus: () => {
        AuthTR.activos = [];
        AuthTR.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/id-up",
                body: {
                    idTR: AuthTR.id,
                    status: AuthTR.status,
                    obs: Observaciones.observaciones
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    alert('Proceso realizado con éxito.');
                    window.location.reload();
                } else {
                    AuthTR.error = result.message;
                }

            })
            .catch(function(e) {
                AuthTR.fetch();
            })

    },
    view: (_data) => {

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("contabilidad") }),
            m(SidebarTRoja, { oncreate: SidebarTRoja.setPage(32) }),
            m("div.content.content-components", {
                    style: { "margin-right": "0px" }

                },
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
                            "Nueva Tarjeta Roja"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Nueva Tarjeta Roja: "
                    ),


                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [



                            (AuthTR.data.length !== 0 ? [
                                m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", {


                                }, [
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                                        m("span.pd-6.wd-100p.wd-md-20p.tx-15", {
                                            class: (AuthTR.data.status < 0 ? "badge badge-danger mg-b-2 mg-r-2" : "badge badge-success mg-b-2 mg-r-2"),
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], [
                                            (AuthTR.data.status == 1 ? 'Ingresada' : ''),
                                            (AuthTR.data.status == 2 ? 'Autorizado' : ''),
                                            (AuthTR.data.status == -2 ? 'Rechazada' : ''),
                                            (AuthTR.data.status == 3 ? 'En Revisón Técnica' : ''),
                                            (AuthTR.data.status == -3 ? 'Rechazada' : ''),
                                            (AuthTR.data.status == 4 ? 'En Revisón Contable' : ''),
                                            (AuthTR.data.status == -4 ? 'Rechazada' : ''),
                                            (AuthTR.data.status == 5 ? 'Aprobada' : ''),
                                            (AuthTR.data.status == -5 ? 'Rechazada' : ''),
                                            (AuthTR.data.status >= 5 ? 'Aprobada' : '')


                                        ]),


                                        m("span.pd-6.wd-100p.wd-md-20p", {
                                            class: "badge badge-danger mg-b-2 mg-r-2",
                                        }, [
                                            m("i.fas.fa-file-alt.mg-r-5"),
                                        ], "FOR TARJETA ROJA"),


                                        m('div.table-responsive', [
                                            m("table.table.table-bordered.table-sm.tx-12", [
                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS SOLICITUD:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6", "width": "25%" }
                                                            },
                                                            "Fecha de Solicitud:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },

                                                            m("input", { value: moment().format("dddd, DD-MM-Y"), "class": "form-control tx-semibold tx-15 tx-danger", "type": "text" })


                                                        ),

                                                    ]),


                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Categoría:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.categoria
                                                            })
                                                        )


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Sub. Categoría:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.sub_categoria
                                                            })
                                                        )


                                                    ]),


                                                ]),
                                                m("thead",

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "DATOS DEL EQUIPO:"
                                                        ),

                                                    ])
                                                ),
                                                m("tbody", [
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Nombre:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.nombre
                                                            }))
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Marca:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.marca
                                                            })
                                                        ),
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Modelo:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.modelo
                                                            })
                                                        )


                                                    ]),

                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='1']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Serie:"
                                                        ),
                                                        m("td[colspan='9']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.serie
                                                            })
                                                        ),



                                                    ]),

                                                    m("tr.bg-litecoin.op-9.tx-white", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "MOTIVO DE BAJA:"
                                                        )
                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Motivo de Baja:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        }, [
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.motivo_baja
                                                            })
                                                        ]),


                                                    ]),

                                                    m("tr.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ACCIÓN SUGERIDA:"
                                                        ),

                                                    ]),
                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Acción Sugerida:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                            style: { "background-color": "#eaeff5" }

                                                        }, [
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.accion_sugerida
                                                            })
                                                        ]),


                                                    ]),
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "OBSERVACIÓN:"
                                                        ),

                                                    ]),


                                                    m("tr", [
                                                        m("th.tx-semibold.tx-14[colspan='3']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Destino Final:"
                                                        ),
                                                        m("td[colspan='7']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },

                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.destino_final
                                                            })

                                                        ),


                                                    ]),
                                                    m("tr", [

                                                        m("th.tx-semibold.tx-14[colspan='4']", {
                                                                style: { "background-color": "#a8bed6" }
                                                            },
                                                            "Responsable:"
                                                        ),
                                                        m("td[colspan='6']", {
                                                                style: { "background-color": "#eaeff5" }
                                                            },
                                                            m("input", {
                                                                "class": "form-control tx-semibold tx-14",
                                                                "type": "text",
                                                                "disabled": "disabled",
                                                                value: AuthTR.data.usuario
                                                            })






                                                        ),

                                                    ]),
                                                    // INCLUIR AREA DE DEST Y DESTINO FINAL.
                                                    m("tr.d-print-none.bg-litecoin.op-9.tx-white.", [
                                                        m("th[scope='col'][colspan='10']",
                                                            "ADJUNTOS:"
                                                        ),

                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='10']", {
                                                                style: { "background-color": "#eaeff5" }

                                                            },
                                                            m("ul.nav.nav-tabs[id='myTab'][role='tablist']", [
                                                                m("li.nav-item",
                                                                    m("a.nav-link[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-file-alt.pd-1.mg-r-2"),

                                                                        " Adjuntos ",
                                                                        (Uploads.files.length !== 0 ? [
                                                                            m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', Uploads.files.length)
                                                                        ] : [])
                                                                    )
                                                                ),
                                                                m("li.nav-item", {},
                                                                    m("a.nav-link[id='home-auth1'][data-toggle='tab'][href='#auth0'][role='tab'][aria-controls='auth0']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Observaciones ",
                                                                        (AuthTR.data.comments.length !== 0 ? [
                                                                            m('span.mg-l-5.tx-14.tx-semibold.badge.badge-danger', AuthTR.data.comments.length)
                                                                        ] : [])
                                                                    )
                                                                ),
                                                                m("li.nav-item", {
                                                                        class: (AuthTR.data.status == 1 ? '' : 'd-none')
                                                                    },
                                                                    m("a.nav-link[id='home-auth1'][data-toggle='tab'][href='#auth1'][role='tab'][aria-controls='auth1']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Autorización "
                                                                    )
                                                                ),

                                                                m("li.nav-item", {
                                                                        class: (AuthTR.data.status == 2 ? '' : 'd-none')
                                                                    },
                                                                    m("a.nav-link[id='home-auth2'][data-toggle='tab'][href='#auth2'][role='tab'][aria-controls='auth2']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Revisión Técnica "
                                                                    )
                                                                ),

                                                                m("li.nav-item", {
                                                                        class: (AuthTR.data.status == 3 ? '' : 'd-none')

                                                                    },
                                                                    m("a.nav-link[id='home-auth3'][data-toggle='tab'][href='#auth3'][role='tab'][aria-controls='auth3']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Revisión Contable "
                                                                    )
                                                                ),

                                                                m("li.nav-item", {
                                                                        class: (AuthTR.data.status == 4 ? '' : 'd-none')

                                                                    },
                                                                    m("a.nav-link[id='home-auth4'][data-toggle='tab'][href='#auth4'][role='tab'][aria-controls='auth4']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " Aprobación Gerencia Contable "
                                                                    )
                                                                ),

                                                                m("li.nav-item", {
                                                                        class: (AuthTR.data.status >= 5 ? '' : 'd-none')

                                                                    },
                                                                    m("a.nav-link[id='home-auth5'][data-toggle='tab'][href='#auth5'][role='tab'][aria-controls='auth5']", {
                                                                            style: { "color": "#476ba3" }
                                                                        },
                                                                        m("i.fas.fa-edit.pd-1.mg-r-2"),

                                                                        " USSA "
                                                                    )
                                                                ),


                                                            ]),
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                        m("td[colspan='9']", {

                                                            },
                                                            m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                                                m(".tab-pane.fade[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                                                    m(Uploads),
                                                                ]),
                                                                m(".tab-pane.fade[id='auth0'][role='tabpanel'][aria-labelledby='home-auth0']", [

                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Historial de Observaciones",
                                                                        ),
                                                                        m("table.table.table-sm[id='table-observaciones'][width='100%']")
                                                                    ]),

                                                                ]),
                                                                m(".tab-pane.fade[id='auth1'][role='tabpanel'][aria-labelledby='home-auth1']", [

                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Autorización",
                                                                        ),
                                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                            oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                            value: Observaciones.observaciones,
                                                                        }),

                                                                        m("div.mg-0.mg-t-5.text-right", [

                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = 2;
                                                                                    AuthTR.updateStatus();

                                                                                },
                                                                            }, [
                                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                                            ], "Autorizado"),

                                                                            m("button.btn.btn-xs.btn-danger.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = -2;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [], "Rechazar"),


                                                                        ]),
                                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                    ]),

                                                                ]),
                                                                m(".tab-pane.fade[id='auth2'][role='tabpanel'][aria-labelledby='home-auth2']", [
                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Autorización",
                                                                        ),
                                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                            oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                            value: Observaciones.observaciones,
                                                                        }),

                                                                        m("div.mg-0.mg-t-5.text-right", [

                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = 3;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [
                                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                                            ], "Autorizado"),

                                                                            m("button.btn.btn-xs.btn-danger.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = -3;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [], "Rechazar"),


                                                                        ]),
                                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                    ]),
                                                                ]),
                                                                m(".tab-pane.fade[id='auth3'][role='tabpanel'][aria-labelledby='home-auth3']", [
                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Revisión Contabilidad",
                                                                        ),
                                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                            oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                            value: Observaciones.observaciones,
                                                                        }),
                                                                        m("div.mg-0.mg-t-5.text-right", [

                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = 4;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [
                                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                                            ], "Aprobado"),

                                                                            m("button.btn.btn-xs.btn-danger.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = -4;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [], "Rechazado"),


                                                                        ]),
                                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                    ]),

                                                                ]),
                                                                m(".tab-pane.fade[id='auth4'][role='tabpanel'][aria-labelledby='home-auth4']", [
                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "Aprobación Gerencia Contable",
                                                                        ),
                                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                            oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                            value: Observaciones.observaciones,
                                                                        }),
                                                                        m("div.mg-0.mg-t-5.text-right", [

                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = 5;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [
                                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                                            ], "Aprobado"),

                                                                            m("button.btn.btn-xs.btn-danger.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = -5;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [], "Rechazado"),


                                                                        ]),
                                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                    ]),

                                                                ]),
                                                                m(".tab-pane.fade[id='auth5'][role='tabpanel'][aria-labelledby='home-auth5']", [
                                                                    m("p.mg-5", [
                                                                        m("span.badge.badge-light.wd-100p.tx-14",
                                                                            "USSA",
                                                                        ),
                                                                        m("textarea.form-control.mg-t-5[rows='5'][placeholder='Observaciones']", {
                                                                            oninput: function(e) { Observaciones.observaciones = e.target.value; },
                                                                            value: Observaciones.observaciones,
                                                                        }),
                                                                        m("div.mg-0.mg-t-5.text-right", [

                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    AuthTR.status = 6;
                                                                                    AuthTR.updateStatus();
                                                                                },
                                                                            }, [
                                                                                m("i.fas.fa-paper-plane.mg-r-5", )
                                                                            ], "Guardar"),



                                                                        ]),
                                                                        m("hr.wd-100p.mg-t-5.mg-b-5"),

                                                                    ]),

                                                                ]),



                                                            ])
                                                        ),


                                                    ]),
                                                    m("tr.d-print-none", [

                                                    ]),

                                                ])
                                            ])
                                        ]),


                                    ])

                                ])

                            ] : [
                                m("div.pd-t-10", [
                                    m("div.placeholder-paragraph.wd-100p", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ])
                            ])


                        ])
                    ]),



                ])
            ),

        ];



    }

};


export default AuthTR;