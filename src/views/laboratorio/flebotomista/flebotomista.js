import HeaderPrivate from '../../layout/header-private';
import Sidebarlab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';

function stopwatchModel() {
    return {
        interval: null,
        seconds: 39,
        isPaused: false
    };
}

const actions = {
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            model.seconds = 39;
            if (Flebotomista.showBitacora.length == 0) {
                $.fn.dataTable.ext.errMode = "none";
                var table = $("#table-flebotomista").DataTable();
                table.ajax.reload();
            }

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
        model.seconds = 0;
    },
    toggle(model) {
        if (model.isPaused) {
            actions.start(model);
        }
        else {
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
                m("div.mg-b-20",
                    [
                        m("div.d-flex.align-items-center.justify-content-between.mg-b-5",
                            [
                                m("h6.tx-uppercase.tx-10.tx-spacing-1.tx-color-02.tx-semibold.mg-b-0",
                                    "Actualización automaticamente en:"
                                ),

                            ]
                        ),
                        m("div.d-flex.justify-content-between.mg-b-5",
                            [
                                m("h5.tx-normal.tx-rubik.mg-b-0",
                                    model.seconds + "s."
                                ),
                                m("h5.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                                    m("small.pd-2.tx-15",
                                        (model.isPaused ? [m("i.fas.fa-play.pd-2",
                                            {
                                                title: "Start",
                                                onclick() {
                                                    actions.toggle(model);
                                                }
                                            }
                                        )
                                        ] : [m("i.fas.fa-pause.pd-2",
                                            {
                                                title: "Pause",
                                                onclick() {
                                                    actions.toggle(model);
                                                }
                                            }
                                        )]),


                                    ),
                                    m("small.pd-2.tx-15",
                                        m("i.fas.fa-redo.pd-2",
                                            {
                                                title: "Actualizar",
                                                onclick() {
                                                    $.fn.dataTable.ext.errMode = "none";

                                                    var table = $("#table-flebotomista").DataTable();
                                                    table.ajax.reload();
                                                }
                                            }
                                        )

                                    )
                                ),


                            ]
                        ),
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
                    ]
                ),

            ];
        },
        onremove() {
            actions.stop(model);
        }
    };
};

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


            m("p.mg-0.tx-14", [
                m("i.tx-14.tx-warning.fas.fa-user.mg-r-5"),
                _data.attrs.PTE_MV,
            ]),


            m("p.mg-0", [
                m("div.tx-12.mg-r-5",
                    m("i.tx-12.tx-orange.fas.fa-file.mg-r-5"),
                    "N° Pedido: " + _data.attrs.NUM_PEDIDO_MV
                )
            ]),
            m("p.mg-0", [
                m("div.tx-12.mg-r-5",
                    m("i.tx-12.tx-primary.fas.fa-h-square.mg-r-5"),
                    "NHC: " + _data.attrs.HC_MV,
                    m("i.tx-12.tx-indigo.fas.fa-hospital.mg-l-5.mg-r-5"),
                    _data.attrs.NM_SECTOR
                )
            ]),
        ];
    },

};

const StatusPedido = {
    error: "",
    documento: [],
    data: [],
    dataMuestras: [],

    fetch: () => {
        StatusPedido.error = "";
        StatusPedido.data = [];
        StatusPedido.documento = [];
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
                    StatusPedido.documento = result.data;
                    StatusPedido.data = result.data.pedidoLaboratorio.dataTomaMuestra.examenesToma;
                    VerPedido.data = result.data.pedidoLaboratorio.dataPedido;
                    VerPedido.validarStatus();
                } else {
                    StatusPedido.error = result.message;
                }

            })
            .catch(function (e) {

            })

    },


};


const Insumos = {
    tuboLila: 0,
    tuboRojo: 0,
    tuboCeleste: 0,
    tuboNegro: 0,
    tuboVerde: 0,
    gsav: 0,
    hemocultivo: 0,
    qtb: 0,

};

const Observaciones = {
    dataObservaciones: [],
    obs: "",
    show: false,

};

const DetallePedido = {
    checkedAll: false,
    disabledToma: false,
    disabledInsumos: false,
    seleccionarTodos: (status) => {
        DetallePedido.checkedAll = status;
        var _fechaToma = moment().format('DD-MM-YYYY HH:mm');
        return StatusPedido.data.map(function (_val, _i, _contentData) {
            if (status) {
                StatusPedido.data[_i]['STATUS_TOMA'] = "1";
                StatusPedido.data[_i]['FECHA_TOMA'] = _fechaToma;
                StatusPedido.data[_i]['customCheked'] = true;
            } else {
                StatusPedido.data[_i]['STATUS_TOMA'] = "";
                StatusPedido.data[_i]['FECHA_TOMA'] = "";
                StatusPedido.data[_i]['customCheked'] = false;
            }
        })
    },
    validarUpdateMuestras: () => {



        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                _t++;
            }

        }

        // Set State

        if (_t == 0) {
            alert("El regisro de Toma de (Muestra) e Insumos en necesario.");
            throw "El regisro de Toma de (Muestra) e Insumos en necesario.";
        }

        var _r = 0;

        if (Insumos.tuboLila !== 0) {
            _r++;
        }
        if (Insumos.tuboRojo !== 0) {
            _r++;
        }
        if (Insumos.tuboCeleste !== 0) {
            _r++;
        }
        if (Insumos.tuboNegro !== 0) {
            _r++;
        }
        if (Insumos.tuboVerde !== 0) {
            _r++;
        }
        if (Insumos.gsav !== 0) {
            _r++;
        }
        if (Insumos.hemocultivo !== 0) {
            _r++;
        }
        if (Insumos.qtb !== 0) {
            _r++;
        }

        if (_r === 0) {
            console.log(_r)
            alert("El regisro de Toma de Muestra e (Insumos) en necesario.");
            throw "El regisro de Toma de Muestra e (Insumos) en necesario.";
        }






    },
    udpateStatusTomaMuestra: () => {
        StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.insumosToma = Insumos;
        m.request({
            method: "POST",
            url: "https://api.hospitalmetropolitano.org/t/v1/up-status-pedido-lab",
            body: {
                documento: JSON.stringify(StatusPedido.documento),
            },
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
        })
            .then(function (result) {
                StatusPedido.documento = result.data;
                StatusPedido.data = result.data.pedidoLaboratorio.dataTomaMuestra.examenesToma;
                VerPedido.data = result.data.pedidoLaboratorio.dataPedido;
                VerPedido.validarStatus();
            })
            .catch(function (e) { })
    },

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
                    m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                        m("small.pd-2.tx-20",
                            m("i.fas.fa-times-circle.pd-2", {
                                "style": { "cursor": "pointer" },
                                title: "Cerrar",
                                onclick: () => {

                                    Flebotomista.showBitacora = "";
                                    m.route.set('/laboratorio/flebotomista');

                                    try {

                                        $.fn.dataTable.ext.errMode = "none";
                                        var table = $("#table-flebotomista").DataTable();
                                        table.ajax.reload();

                                    } catch (e) {
                                        window.location.reload();

                                    }

                                }
                            }

                            )


                        ),

                    ),

                    m("div.mg-b-30",
                        m("i.tx-60.fas.fa-file." + VerPedido.classPedido)
                    ),

                    m("h5.tx-inverse.mg-b-10",
                        "Detalle de Pedido N°: " + VerPedido.numeroPedido + " - Status: " + VerPedido.descStatusPedido
                    ),
                    ((VerPedido.data.tipoPedido == 'R') ? [
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
                    m("p.mg-5.tx-20.mg-t-10", [
                        m("i.fas.fa-user.mg-r-8.text-secondary"),
                        VerPedido.data.nombrePaciente

                    ]),
                    m("p.mg-5.tx-15", [
                        "Edad: ",
                        VerPedido.data.edadPaciente

                    ]),
                    m("p.mg-5.tx-15", [
                        "Dg: ",
                        VerPedido.data.dgPedido

                    ]),
                    m("p.mg-5.tx-15", [
                        "Fecha Pedido: ",
                        VerPedido.data.fechaPedido + " " + VerPedido.data.horaPedido

                    ]),
                    m("p.mg-5.tx-15", [
                        "Médico: ",
                        VerPedido.data.nombreMedico,

                    ]),
                    m("p.mg-5.tx-15", [
                        "Ubicaciòn: ",
                        VerPedido.data.ubicacionPaciente,
                    ]),
                    m("p.mg-5", [
                        "Historía Clínica: ",

                    ]),
                    m("p.mg-5", [
                        m("span.badge.badge-primary.mg-r-5.tx-14",
                            "GEMA: " + VerPedido.data.numeroHistoriaClinica + "01",
                        ),
                        m("span.badge.badge-success.mg-r-5.tx-14",
                            "MV: " + VerPedido.data.numeroHistoriaClinica
                        ),
                    ]),
                    (DetallePedido.disabledToma ? [m("p.mg-5.tx-right", [
                        m("button.btn.btn-xs.btn-outline-secondary[type='button']", {
                            onclick: () => {
                                DetallePedido.disabledToma = false;
                                DetallePedido.disabledInsumos = false;
                                VerPedido.classPedido = "tx-warning"
                                VerPedido.descStatusPedido = "Muestras Pendientes";
                                VerPedido.statusPedido = "Muestras Pendientes";
                            }
                        },
                            m("i.fas.fa-edit.mg-r-5"),
                            " EDITAR"

                        )
                    ])] : []),
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
                            m("a.nav-link[id='obs-tab'][data-toggle='tab'][href='#obs'][role='tab'][aria-controls='obs'][aria-selected='false']",
                                "Observaciones"
                            )
                        ),

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
                                    m("table.table.table-dashboard.mg-b-0", [
                                        m("thead",
                                            m("tr", [
                                                m("th",
                                                    "FECHA PROGRAMADA"
                                                ),
                                                m("th",
                                                    "FECHA TOMA MUESTRA"
                                                ),
                                                m("th",
                                                    "FECHA RECEP. LAB."
                                                ),
                                                m("th.text-right",
                                                    "EXAMEN"
                                                ),
                                            ])
                                        ),
                                        m("tbody", [
                                            StatusPedido.data.map(function (_val, _i, _contentData) {
                                                return [
                                                    m("tr", [
                                                        m("td.tx-color-03.tx-normal",
                                                            _val.FECHA_MUESTRA + " " + _val.HORA_MUESTRA
                                                        ),
                                                        m("td.tx-color-03.tx-normal",
                                                            (_val.STATUS_TOMA.length !== 0) ? _val.FECHA_TOMA : "Pendiente"
                                                        ),
                                                        m("td.tx-color-03.tx-normal",
                                                            (_val.STATUS_RECEP.length !== 0) ? _val.FECHA_RECEP : "Pendiente"
                                                        ),
                                                        m("td.tx-medium.text-right",
                                                            _val.NM_EXA_LAB
                                                        ),



                                                    ]),
                                                ]
                                            })
                                        ])
                                    ])
                                )
                            ] : m("div.placeholder-paragraph.wd-100p", [
                                m("div.line"),
                                m("div.line")
                            ]))
                        ]),
                        m(".tab-pane.fade[id='profile'][role='tabpanel'][aria-labelledby='profile-tab']", {
                            "style": { "pointer-events": (DetallePedido.disabledToma ? "none" : "auto") }
                        }, [

                            m("p.mg-5", [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Registro de Toma de Muestras"
                                ),
                            ]),
                            m("div.table-responsive.mg-b-10.mg-t-10",
                                m("table.table.table-dashboard.table-hover.mg-b-0", [
                                    m("thead",
                                        m("tr", [
                                            m("th.text-left",
                                                "EXAMEN"
                                            ),
                                            m("th",
                                                "FECHA DE TOMA DE MUESTRA"
                                            ),

                                        ])
                                    ),
                                    m("tbody", [
                                        m("tr", [
                                            m("td.tx-normal",
                                                m("div.custom-control.custom-checkbox", [
                                                    m("input.custom-control-input[type='checkbox'][id='selectTomaTodos']", {
                                                        checked: DetallePedido.checkedAll,
                                                        onclick: function (e) {
                                                            DetallePedido.seleccionarTodos(this.checked);
                                                        }
                                                    }),
                                                    m("label.custom-control-label[for='selectTomaTodos']",
                                                        'Seleccionar Todos'
                                                    )
                                                ])
                                            ),
                                            m("td.tx-medium.text-right",),
                                        ]),

                                        StatusPedido.data.map(function (_val, _i, _contentData) {

                                            return [
                                                m("tr", [

                                                    m("td.tx-18.tx-medium.text-left",
                                                        _val.NM_EXA_LAB
                                                    ),

                                                    m("td.tx-16.tx-normal",
                                                        m("div.custom-control.custom-checkbox.tx-16", [
                                                            m("input.custom-control-input.tx-16[type='checkbox'][id='" + _val.CD_EXA_LAB + "']", {
                                                                checked: StatusPedido.data[_i]['customCheked'],
                                                                onupdate: function (e) {
                                                                    this.checked = StatusPedido.data[_i]['customCheked'];
                                                                },
                                                                onclick: function (e) {

                                                                    e.preventDefault();
                                                                    var p = this.checked;
                                                                    StatusPedido.data[_i]['customCheked'] = !StatusPedido.data[_i]['customCheked'];
                                                                    if (p) {
                                                                        this.checked = true;
                                                                        StatusPedido.data[_i]['STATUS_TOMA'] = "1";
                                                                        StatusPedido.data[_i]['FECHA_TOMA'] = moment().format('DD-MM-YYYY HH:mm');
                                                                    } else {
                                                                        this.checked = false;;
                                                                        DetallePedido.checkedAll = false;
                                                                        StatusPedido.data[_i]['STATUS_TOMA'] = "";
                                                                        StatusPedido.data[_i]['FECHA_TOMA'] = "";
                                                                    }

                                                                },



                                                            }),
                                                            m("label.custom-control-label.tx-16[for='" + _val.CD_EXA_LAB + "']",
                                                                (StatusPedido.data[_i]['STATUS_TOMA'].length !== 0) ? StatusPedido.data[_i]['FECHA_TOMA'] : StatusPedido.data[_i]['STATUS_TOMA'],

                                                            )
                                                        ])
                                                    ),



                                                ]),
                                            ]





                                        })


                                    ])
                                ])
                            ),

                            m("p.mg-5", [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Registro de Insumos"
                                ),
                            ]),
                            m("div.table-responsive.mg-b-10.mg-t-10",
                                m("table.table.table-dashboard.table-hover.mg-b-0", [
                                    m("thead",
                                        m("tr", [
                                            m("th.text-left",
                                                "INSUMOS"
                                            ),
                                            m("th.text-left",
                                                "CANTIDAD"
                                            ),
                                        ])
                                    ),
                                    m("tbody", [

                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboLila']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.tuboLila = 1;
                                                            } else {
                                                                Insumos.tuboLila = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                if (Insumos.tuboLila == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold.custom-control-label[for='tuboLila']",
                                                        "Tubo Lila"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                    el.dom.innerText = Insumos.tuboLila;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.tuboLila !== undefined && Insumos.tuboLila !== 0) {
                                                                    el.dom.innerText = Insumos.tuboLila;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {


                                                            Insumos.tuboLila++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboLila--;
                                                            if (Insumos.tuboLila < 0) {
                                                                Insumos.tuboLila = 0;
                                                            }

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),

                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboRojo']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.tuboRojo = 1;
                                                            } else {
                                                                Insumos.tuboRojo = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='tuboRojo']",
                                                        "Tubo Rojo"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                    el.dom.innerText = Insumos.tuboRojo;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                    el.dom.innerText = Insumos.tuboRojo;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboRojo++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboRojo--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboCeleste']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.tuboCeleste = 1;
                                                            } else {
                                                                Insumos.tuboCeleste = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='tuboCeleste']",
                                                        "Tubo Celeste"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                    el.dom.innerText = Insumos.tuboCeleste;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                    el.dom.innerText = Insumos.tuboCeleste;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboCeleste++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboCeleste--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboNegro']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.tuboNegro = 1;
                                                            } else {
                                                                Insumos.tuboNegro = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='tuboNegro']",
                                                        "Tubo Negro"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                    el.dom.innerText = Insumos.tuboNegro;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                    el.dom.innerText = Insumos.tuboNegro;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboNegro++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboNegro--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='tuboVerde']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.tuboVerde = 1;
                                                            } else {
                                                                Insumos.tuboVerde = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='tuboVerde']",
                                                        "Tubo Verde"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                    el.dom.innerText = Insumos.tuboVerde;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                    el.dom.innerText = Insumos.tuboVerde;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboVerde++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.tuboVerde--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='gsav']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.gsav = 1;
                                                            } else {
                                                                Insumos.gsav = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='gsav']",
                                                        "GSA V"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                    el.dom.innerText = Insumos.gsav;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                    el.dom.innerText = Insumos.gsav;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.gsav++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.gsav--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),





                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='hemocultivo']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.hemocultivo = 1;
                                                            } else {
                                                                Insumos.hemocultivo = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='hemocultivo']",
                                                        "Hemocultivo"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                    el.dom.innerText = Insumos.hemocultivo;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                    el.dom.innerText = Insumos.hemocultivo;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }
                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.hemocultivo++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.hemocultivo--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                        m("tr", [

                                            m("td.tx-16.tx-normal",
                                                m("div.custom-control.custom-checkbox.tx-16", [
                                                    m("input.tx-20.custom-control-input[type='checkbox'][id='qtb']", {
                                                        onclick: (el) => {
                                                            if (el.target.checked) {
                                                                Insumos.qtb = 1;
                                                            } else {
                                                                Insumos.qtb = 0;
                                                            }

                                                        },
                                                        oncreate: (el) => {
                                                            if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                el.dom.checked = true;
                                                            }
                                                        }
                                                    }),
                                                    m("label.tx-20.tx-semibold..custom-control-label[for='qtb']",
                                                        "QTB"
                                                    )
                                                ])
                                            ),

                                            m("td.tx-16.tx-medium.text-left", [
                                                m(".btn-group.btn-group-sm.tx-16[role='group']", {

                                                }, [
                                                    m("button.btn[type='button']",
                                                        m("div.tx-20.tx-semibold.bg-gray-300.pd-l-5.pd-r-5", {
                                                            oncreate: (el) => {
                                                                if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                    el.dom.innerText = Insumos.qtb;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            },
                                                            onupdate: (el) => {
                                                                if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                    el.dom.innerText = Insumos.qtb;
                                                                } else {
                                                                    el.dom.innerText = 0;

                                                                }
                                                            }

                                                        })
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.qtb++;
                                                        },

                                                    },
                                                        m("i.fas.fa-plus-circle.tx-22.tx-success")
                                                    ),
                                                    m("button.btn.btn[type='button']", {
                                                        onclick: () => {
                                                            Insumos.qtb--;

                                                        },

                                                    },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),
                                    ])
                                ])
                            ),
                            ((!DetallePedido.disabledToma) ? [m("div.pd-5", [
                                m("button.btn.btn-xs.btn-primary.btn-block.tx-semibold[type='button']", {
                                    disabled: DetallePedido.disabledToma,
                                    onclick: () => {


                                        DetallePedido.validarUpdateMuestras();
                                        var _fechaToma = moment().format('DD-MM-YYYY HH:mm');
                                        StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.usuarioToma = "flebot1";
                                        StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.fechaToma = _fechaToma;
                                        DetallePedido.disabledToma = true;
                                        DetallePedido.udpateStatusTomaMuestra();
                                    }
                                },
                                    "Guardar"
                                )
                            ])] : [m("p.mg-5.", [
                                m("span.badge.badge-light.tx-right.wd-100p.tx-14",
                                    "Toma de Muestra: FLEBOT1 " + StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.fechaToma,

                                ),
                            ])]),
                        ]),
                        m(".tab-pane.fade[id='obs'][role='tabpanel'][aria-labelledby='obs-tab']", {
                        }, [
                            m("p.mg-5.tx-right", {
                            }, [
                                m("button.btn.btn-xs.btn-secondary[type='button']", {
                                    onclick: () => {
                                        Observaciones.show = !Observaciones.show;
                                    }
                                },
                                    m("i.fas.fa-edit.mg-r-5"),
                                    " Nueva Observacion"

                                )
                            ]),
                            m("p.mg-5", [
                                m("span.badge.badge-light.wd-100p.tx-14",
                                    "Observaciones"
                                ),
                            ]),

                            m("div", {
                                class: (Observaciones.show ? "" : "d-none"),

                            }, [
                                m("textarea.form-control.mg-t-5[rows='5'][placeholder='Nueva Observación']", {
                                    oninput: function (e) { Observaciones.obs = e.target.value; },
                                    value: Observaciones.obs,
                                }),
                                m("div.mg-0.mg-t-5.mg-b-5.text-right", [

                                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                        onclick: function () {
                                            Observaciones.dataObservaciones.push({
                                                title: "Nueva Observación",
                                                timestamp: moment().unix(),
                                                message: Observaciones.obs
                                            });
                                            StatusPedido.documento.pedidoLaboratorio.dataObservaciones = Observaciones.dataObservaciones;
                                            Observaciones.obs = "";
                                            reloadObservaciones();

                                        },
                                    }, [
                                        m("i.fas.fa-save.mg-r-5",)
                                    ], "Guardar"),


                                ]),


                            ]),
                            m("table.table.table-sm[id='table-observaciones'][width='100%']", {
                                oncreate: () => {
                                    loadObservaciones();
                                }
                            })

                        ]),

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
    descStatusPedido: "",
    validarStatus: () => {



        for (var i = 0; i < StatusPedido.data.length; i++) {
            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                StatusPedido.data[i]['customCheked'] = true;
            }
        }

        var _r = 0;
        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_RESULTADO'].length !== 0) {
                _r++;
            }

            if (StatusPedido.data[i]['STATUS_TOMA'].length !== 0) {
                _t++;
            }

        }




        // Set State

        if (StatusPedido.data.length !== _t && StatusPedido.data.length !== _r) {
            VerPedido.classPedido = "tx-warning"
            VerPedido.descStatusPedido = "Muestras Pendientes";
            VerPedido.statusPedido = "Muestras Pendientes";

        }

        if (StatusPedido.data.length == _t && StatusPedido.data.length !== _r) {
            DetallePedido.disabledToma = true;
            DetallePedido.disabledInsumos = true;

            DetallePedido.checkedAll = true;
            VerPedido.classPedido = "tx-orange"
            VerPedido.descStatusPedido = "Pendiente Resultado";
        }

        if (StatusPedido.data.length == _t && StatusPedido.data.length == _r) {
            DetallePedido.checkedAll = true;
            VerPedido.classPedido = "tx-success"
            VerPedido.descStatusPedido = "Finalizado - Gestionado";
        }

        var _insumos = StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.insumosToma;
        if (Object.keys(_insumos).length !== 0) {
            Insumos.tuboLila = _insumos.tuboLila;
            Insumos.tuboRojo = _insumos.tuboRojo;
            Insumos.tuboCeleste = _insumos.tuboCeleste;
            Insumos.tuboNegro = _insumos.tuboNegro;
            Insumos.tuboVerde = _insumos.tuboVerde;
            Insumos.gsav = _insumos.gsav;
            Insumos.hemocultivo = _insumos.hemocultivo;
            Insumos.qtb = _insumos.qtb;
        }

        reloadNotificacion();





    },
    view: () => {

        return [

            m("div.animated.fadeInUp", {
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
    typeFilter: "",
    oninit: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            Flebotomista.showBitacora = "";
        } else {
            Flebotomista.showBitacora = "d-none";
            VerPedido.numeroPedido = _data.attrs.numeroPedido;
        }
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        App.isAuth('laboratorio', 16);
    },

    oncreate: (_data) => {
        document.title = "Flebotomista | " + App.title;
        Notificaciones.suscribirCanal('MetroPlus-Flebotomista');

        if (isObjEmpty(_data.attrs)) {
            loadFlebotomista();
        } else {
            StatusPedido.fetch();
        }
    },
    onupdate: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            Flebotomista.showBitacora = "";
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
                            "Flebotomista"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        (_data.attrs.numeroPedido == undefined) ? "Flebotomista:" : "Detalle de Pedido N°: " + VerPedido.numeroPedido
                    ),

                    m("p.mg-b-20.tx-14", {
                        class: (_data.attrs.numeroPedido == undefined) ? "" : "d-none"

                    }, [
                        m("i.fas.fa-info-circle.mg-r-5.text-secondary"),
                        "Seleccione la ubicación para la gestión de pedidos de Laboratorio.",

                    ]

                    ),



                    m("div.row.animated.fadeInUp", {
                        class: Flebotomista.showBitacora
                    }, [
                        m("div.col-12.mg-b-5.wd-100p[data-label='Filtrar'][id='filterTable']",

                            m("div.row", [
                                m("div.col-sm-12.pd-b-10", [
                                    m(Stopwatch)
                                ]),


                                m("div.col-sm-12.pd-b-10",
                                    m("div.input-group", [
                                        m(".df-example.demo-forms.wd-100p[data-label='Ubicaciones, Sectores, Pisos:']", [
                                            m("input.form-control[type='text'][id='tipoPiso'][data-role='tagsinput']", {
                                                value: "HOSPITALIZACION PB,HOSPITALIZACION H1,HOSPITALIZACION H2,HOSPITALIZACION C2",
                                                oncreate: (el) => {

                                                    console.log(el)

                                                    var citynames = new Bloodhound({
                                                        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
                                                        queryTokenizer: Bloodhound.tokenizers.whitespace,
                                                        local: [
                                                            { id: 1, name: 'EMERGENCIA' },
                                                            { id: 2, name: 'HOSPITALIZACION C2' },
                                                            { id: 3, name: 'SERVICIOS AMBULATORIOS' },
                                                            { id: 4, name: 'HOSPITALIZACION H2' },
                                                            { id: 5, name: 'HOSPITALIZACION PB' },
                                                            { id: 6, name: 'HOSPITALIZACION H1' }
                                                        ]
                                                    });

                                                    citynames.initialize();

                                                    $('#tipoPiso').tagsinput({
                                                        typeaheadjs: {
                                                            name: 'citynames',
                                                            displayKey: 'name',
                                                            valueKey: 'name',
                                                            source: citynames.ttAdapter()
                                                        }
                                                    });

                                                },

                                            }),
                                        ])
                                    ])
                                ),


                            ])
                        ),
                        m("div.col-12", [

                            m("div.table-loader.wd-100p",
                                m("div.placeholder-paragraph", [
                                    m("div.line"),
                                    m("div.line")
                                ])
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.", [
                                m("div.mg-b-10.d-flex.align-items-center.justify-content-between", [
                                    m("h5.mg-b-0",
                                        "Pedidos de Laboratorio: "
                                    ),
                                    m("div.tx-15.d-none", [
                                        m("a.link-03.lh-0[href='']",
                                            m("i.icon.ion-md-refresh"),
                                            " Actualizar"
                                        ),

                                    ])
                                ]),
                                m("table.table.table-sm[id='table-flebotomista'][width='100%']"),


                            ])
                        ])
                    ]),
                    m(VerPedido)
                ])
            ),
            m("div.section-nav", [
                m("label.nav-label",
                    ""
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
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) { },
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
                                id: "pedido_" + _i._aData.NUM_PEDIDO_MV,
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

    $('#tipoPiso').change(function (e) {
        $('.table-loader').show();
        $('.table-content').hide();

        table.search('tipoFiltro-' + $('#tipoPiso').val()).draw();


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


function loadObservaciones() {

    console.log('StatusPedido', StatusPedido)


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
    var table = $("#table-observaciones").DataTable({
        data: (StatusPedido.documento.pedidoLaboratorio.dataObservaciones !== undefined ? StatusPedido.documento.pedidoLaboratorio.dataObservaciones : []),
        dom: 'tp',
        language: {
            searchPlaceholder: "Buscar...",
            sSearch: "",
            lengthMenu: "Mostrar _MENU_ registros por página",
            sProcessing: "Procesando...",
            sZeroRecords: "Sin Observaciones",
            sEmptyTable: "Sin Observaciones",
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
        destroy: true,

        columns: false,
        aoColumnDefs: [{
            mRender: function (data, type, row, meta) {
                return "";
            },
            visible: true,
            width: "100%",
            aTargets: [0],
            orderable: false,
        },

        ],
        fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) { },
        drawCallback: function (settings) {
            settings.aoData.map(function (_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function () {
                        return m("div.demo-static-toast",
                            m(".toast[role='alert'][aria-live='assertive'][aria-atomic='true']", {
                                "style": { "max-width": "none" }
                            }, [
                                m("div.toast-header.bg-primary", [
                                    m("small.tx-white.tx-5.mg-b-0.mg-r-auto",
                                        _v._aData.title
                                    ),
                                    m("small.tx-white",
                                        moment.unix(_v._aData.timestamp).format("HH:mm")
                                    ),
                                ]),
                                m("div.toast-body.small",
                                    _v._aData.message
                                )
                            ])
                        )

                    }
                });


            })
        },
    });


    return table;

};

function reloadObservaciones() {
    var table = $('#table-observaciones').DataTable();
    table.clear();
    table.rows.add((StatusPedido.documento.pedidoLaboratorio.dataObservaciones !== undefined ? StatusPedido.documento.pedidoLaboratorio.dataObservaciones : [])).draw();
}




export default Flebotomista;