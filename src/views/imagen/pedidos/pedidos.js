import HeaderPrivate from '../../layout/header-private';
import SidebarImagen from '../sidebarImagen';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';

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
    increment(model) {
        model.seconds--;
        if (model.seconds == 0) {
            model.seconds = 100;
            if (Pedidos.showBitacora.length == 0) {
                $.fn.dataTable.ext.errMode = "none";
                var table = $("#table-pedidos").DataTable();
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
                            m("small.pd-2.tx-15",
                                m("i.fas.fa-redo.pd-2", {
                                    title: "Actualizar",
                                    onclick() {
                                        $.fn.dataTable.ext.errMode = "none";

                                        var table = $("#table-pedidos").DataTable();
                                        table.ajax.reload();
                                    },
                                    style: { "cursor": "pointer" }

                                })

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
                    _data.attrs.SECTOR + " " + _data.attrs.UBICACION
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
            .then(function(result) {
                if (result.status) {
                    StatusPedido.documento = result.data;
                    StatusPedido.data = result.data.pedidoLaboratorio.dataRecepcion.examenesRecep;
                    VerPedido.data = result.data.pedidoLaboratorio.dataPedido;
                    VerPedido.validarStatus();
                } else {
                    StatusPedido.error = result.message;
                }

            })
            .catch(function(e) {

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
        return StatusPedido.data.map(function(_val, _i, _contentData) {
            if (status) {
                StatusPedido.data[_i]['STATUS_RECEP'] = "1";
                StatusPedido.data[_i]['FECHA_RECEP'] = _fechaToma;
                StatusPedido.data[_i]['customCheked'] = true;
            } else {
                StatusPedido.data[_i]['STATUS_RECEP'] = "";
                StatusPedido.data[_i]['FECHA_RECEP'] = "";
                StatusPedido.data[_i]['customCheked'] = false;
            }
        })
    },
    validarUpdateMuestras: () => {



        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_RECEP'].length !== 0) {
                _t++;
            }

        }

        // Set State
        if (_t == 0) {
            alert("El regisro de Registro de (Muestra) e Insumos en necesario.");
            throw "El regisro de Registro de (Muestra) e Insumos en necesario.";
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
            alert("El regisro de Registro de Muestra e (Insumos) en necesario.");
            throw "El regisro de Registro de Muestra e (Insumos) en necesario.";
        }


    },
    udpateStatusTomaMuestra: () => {
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
            .then(function(result) {
                StatusPedido.documento = result.data;
                StatusPedido.data = result.data.pedidoLaboratorio.dataRecepcion.examenesRecep;
                VerPedido.data = result.data.pedidoLaboratorio.dataPedido;
                VerPedido.validarStatus();
            })
            .catch(function(e) {})
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

                                        Pedidos.showBitacora = "";
                                        m.route.set('/laboratorio/pedidos');

                                        try {

                                            $.fn.dataTable.ext.errMode = "none";
                                            var table = $("#table-pedidos").DataTable();
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
                                "Recepción de Muestras"
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
                                            StatusPedido.data.map(function(_val, _i, _contentData) {
                                                return [
                                                    m("tr", [
                                                        m("td.tx-color-03.tx-normal",
                                                            _val.FECHA_MUESTRA + " " + _val.HORA_MUESTRA
                                                        ),
                                                        m("td.tx-color-03.tx-normal",
                                                            (StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.examenesToma[_i].STATUS_TOMA.length !== 0) ? StatusPedido.documento.pedidoLaboratorio.dataTomaMuestra.examenesToma[_i].FECHA_TOMA : "Pendiente"
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
                                    "Registro de Recepción de Muestras"
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
                                                "FECHA DE RECEPCIÓN DE MUESTRA"
                                            ),

                                        ])
                                    ),
                                    m("tbody", [
                                        m("tr", [
                                            m("td.tx-normal",
                                                m("div.custom-control.custom-checkbox", [
                                                    m("input.custom-control-input[type='checkbox'][id='selectTomaTodos']", {
                                                        checked: DetallePedido.checkedAll,
                                                        onclick: function(e) {
                                                            DetallePedido.seleccionarTodos(this.checked);
                                                        }
                                                    }),
                                                    m("label.custom-control-label[for='selectTomaTodos']",
                                                        'Seleccionar Todos'
                                                    )
                                                ])
                                            ),
                                            m("td.tx-medium.text-right", ),
                                        ]),

                                        StatusPedido.data.map(function(_val, _i, _contentData) {

                                            return [
                                                m("tr", [

                                                    m("td.tx-18.tx-medium.text-left",
                                                        _val.NM_EXA_LAB
                                                    ),

                                                    m("td.tx-16.tx-normal",
                                                        m("div.custom-control.custom-checkbox.tx-16", [
                                                            m("input.custom-control-input.tx-16[type='checkbox'][id='" + _val.CD_EXA_LAB + "']", {
                                                                checked: StatusPedido.data[_i]['customCheked'],
                                                                onupdate: function(e) {
                                                                    this.checked = StatusPedido.data[_i]['customCheked'];
                                                                },
                                                                onclick: function(e) {

                                                                    e.preventDefault();
                                                                    var p = this.checked;
                                                                    StatusPedido.data[_i]['customCheked'] = !StatusPedido.data[_i]['customCheked'];
                                                                    if (p) {
                                                                        this.checked = true;
                                                                        StatusPedido.data[_i]['STATUS_RECEP'] = "1";
                                                                        StatusPedido.data[_i]['FECHA_RECEP'] = moment().format('DD-MM-YYYY HH:mm');
                                                                    } else {
                                                                        this.checked = false;;
                                                                        DetallePedido.checkedAll = false;
                                                                        StatusPedido.data[_i]['STATUS_RECEP'] = "";
                                                                        StatusPedido.data[_i]['FECHA_RECEP'] = "";
                                                                    }

                                                                },



                                                            }),
                                                            m("label.custom-control-label.tx-16[for='" + _val.CD_EXA_LAB + "']",
                                                                (StatusPedido.data[_i]['STATUS_RECEP'].length !== 0) ? StatusPedido.data[_i]['FECHA_RECEP'] : StatusPedido.data[_i]['STATUS_RECEP'],

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
                                    "Confirmación de Insumos"
                                ),
                            ]),
                            m("div.table-responsive.mg-b-10.mg-t-10",
                                m("table.table.table-dashboard.table-hover.mg-b-0", {
                                    "style": { "pointer-events": "none" }
                                }, [
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

                                        m("tr", {
                                            class: (Insumos.tuboLila === 0 ? "d-none" : "")
                                        }, [
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

                                        m("tr", {
                                            class: (Insumos.tuboRojo === 0 ? "d-none" : "")
                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboRojo !== undefined && Insumos.tuboRojo !== 0) {
                                                                if (Insumos.tuboRojo == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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
                                                                if (Insumos.tuboRojo < 0) {
                                                                    Insumos.tuboRojo = 0;
                                                                }

                                                            },

                                                        },
                                                        m("i.fas.fa-minus-circle.tx-22.tx-danger")
                                                    ),

                                                ])
                                            ]),




                                        ]),

                                        m("tr", {
                                            class: (Insumos.tuboCeleste === 0 ? "d-none" : "")

                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboCeleste !== undefined && Insumos.tuboCeleste !== 0) {
                                                                if (Insumos.tuboCeleste == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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

                                        m("tr", {
                                            class: (Insumos.tuboNegro === 0 ? "d-none" : "")
                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboNegro !== undefined && Insumos.tuboNegro !== 0) {
                                                                if (Insumos.tuboNegro == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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

                                        m("tr", {
                                            class: (Insumos.tuboVerde === 0 ? "d-none" : "")

                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.tuboVerde !== undefined && Insumos.tuboVerde !== 0) {
                                                                if (Insumos.tuboVerde == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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
                                                            },


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

                                        m("tr", {
                                            class: (Insumos.gsav === 0 ? "d-none" : "")
                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.gsav !== undefined && Insumos.gsav !== 0) {
                                                                if (Insumos.gsav == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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

                                        m("tr", {
                                            class: (Insumos.hemocultivo === 0 ? "d-none" : "")
                                        }, [
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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.hemocultivo !== undefined && Insumos.hemocultivo !== 0) {
                                                                if (Insumos.hemocultivo == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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

                                        m("tr", {
                                            class: (Insumos.qtb === 0 ? "d-none" : "")
                                        }, [

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
                                                        },
                                                        onupdate: (el) => {
                                                            if (Insumos.qtb !== undefined && Insumos.qtb !== 0) {
                                                                if (Insumos.qtb == 1) {
                                                                    el.dom.checked = true;

                                                                }
                                                            } else {
                                                                el.dom.checked = false;
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
                                            StatusPedido.documento.pedidoLaboratorio.dataRecepcion.usuarioRecep = "flebot1";
                                            StatusPedido.documento.pedidoLaboratorio.dataRecepcion.fechaRecep = _fechaToma;
                                            DetallePedido.disabledToma = true;
                                            DetallePedido.udpateStatusTomaMuestra();


                                        }
                                    },
                                    "Confirmar"
                                )
                            ])] : [m("p.mg-5.", [
                                m("span.badge.badge-light.tx-right.wd-100p.tx-14",
                                    "Recepción de Muestra: " + StatusPedido.documento.pedidoLaboratorio.dataRecepcion.fechaRecep,

                                ),
                            ])]),
                        ]),
                        m(".tab-pane.fade[id='obs'][role='tabpanel'][aria-labelledby='obs-tab']", {}, [
                            m("p.mg-5.tx-right", {}, [
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
                                    oninput: function(e) { Observaciones.obs = e.target.value; },
                                    value: Observaciones.obs,
                                }),
                                m("div.mg-0.mg-t-5.mg-b-5.text-right", [

                                    m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                        onclick: function() {
                                            Observaciones.dataObservaciones.push({
                                                title: "Nueva Observación",
                                                timestamp: moment().unix(),
                                                message: Observaciones.obs
                                            });
                                            StatusPedido.documento.pedidoLaboratorio.dataObservaciones = Observaciones.dataObservaciones;
                                            Observaciones.obs = "";
                                            reloadObservaciones();
                                            DetallePedido.udpateStatusTomaMuestra();


                                        },
                                    }, [
                                        m("i.fas.fa-save.mg-r-5", )
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
            if (StatusPedido.data[i]['STATUS_RECEP'].length !== 0) {
                StatusPedido.data[i]['customCheked'] = true;
            }
        }

        var _r = 0;
        var _t = 0;

        for (var i = 0; i < StatusPedido.data.length; i++) {

            if (StatusPedido.data[i]['STATUS_RESULTADO'].length !== 0) {
                _r++;
            }

            if (StatusPedido.data[i]['STATUS_RECEP'].length !== 0) {
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
                class: (Pedidos.showBitacora.length !== 0 ? "" : "d-none")
            }, [
                m(DetallePedido)
            ])

        ]

    },

};

const Pedidos = {
    notificaciones: [],
    Pedidos: [],
    showBitacora: "",
    typeFilter: "",
    oninit: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            Pedidos.showBitacora = "";
        } else {
            Pedidos.showBitacora = "d-none";
            VerPedido.numeroPedido = _data.attrs.numeroPedido;
        }
        HeaderPrivate.page = "";
        SidebarImagen.page = "";
        App.isAuth('laboratorio', 16);
    },

    oncreate: (_data) => {
        document.title = "Recepción de Pedidos | " + App.title;
        Notificaciones.suscribirCanal('MetroPlus-Pedidos');

        if (isObjEmpty(_data.attrs)) {
            loadPedidos();
        } else {
            StatusPedido.fetch();
        }
    },
    onupdate: (_data) => {
        if (isObjEmpty(_data.attrs)) {
            Pedidos.showBitacora = "";
        } else {
            Pedidos.showBitacora = "d-none";
        }
    },
    view: (_data) => {


        if (isObjEmpty(_data.attrs)) {
            Pedidos.showBitacora = "";
        } else {
            Pedidos.showBitacora = "d-none";
        }

        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("imagen") }),
            m(SidebarImagen, { oncreate: SidebarImagen.setPage(24) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/imagen" }, [
                                " Imagen "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Recepción de Pedidos"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        (_data.attrs.numeroPedido == undefined) ? "Recepción de Pedidos:" : "Detalle de Pedido N°: " + VerPedido.numeroPedido
                    ),





                    m("div.row.animated.fadeInUp", {
                        class: Pedidos.showBitacora
                    }, [
                        m("div.col-12.mg-b-5.wd-100p[data-label='Filtros'][id='filterTable']",

                            m("div.row", [


                                m("div.col-sm-12.pd-b-10", {

                                        oncreate: (el) => {
                                            el.dom.hidden = actions.showFilter;
                                        },
                                        onupdate: (el) => {
                                            el.dom.hidden = actions.showFilter;
                                        },
                                    },
                                    m("div.input-group", [
                                        m(".df-example.demo-forms.wd-100p[data-label='Filtrar:']", [
                                            m("input.form-control[type='text'][id='tipoPiso'][data-role='tagsinput']", {
                                                oncreate: (el) => {

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

                                m("div.d-flex.align-items-center.justify-content-between.mg-b-10", [
                                    m("h5.mg-b-0",
                                        "Pedidos de Imagen:",

                                    ),
                                    m("div.d-flex.tx-14", [
                                        m("div.link-03.lh-0", {
                                                style: { "cursor": "pointer" },
                                                title: "Buscar"
                                            },
                                            m("i.fas.fa-search.pd-5")
                                        ),

                                        m("div.dropdown.dropleft", [

                                            m("div.link-03.lh-0.mg-l-10[id='dropdownMenuButton'][data-toggle='dropdown'][aria-haspopup='true'][aria-expanded='false']", {
                                                    style: { "cursor": "pointer" },
                                                    title: "Filtrar"
                                                },
                                                m("i.fas.fa-filter.pd-5")
                                            ),
                                            m(".dropdown-menu.tx-13[aria-labelledby='dropdownMenuButton']", [
                                                m("h6.dropdown-header.tx-uppercase.tx-12.tx-bold.tx-inverse",
                                                    "Sectores:"
                                                ),
                                                m("a.dropdown-item[href='#']",
                                                    "Emergencia"
                                                ),
                                                m("a.dropdown-item[href='#']",
                                                    "Hospitalización"
                                                ),
                                                m("a.dropdown-item[href='#']",
                                                    "Lab. a Domicilio"
                                                )
                                            ])
                                        ])
                                    ])
                                ]),
                                m('hr'),
                                m("div.col-sm-12.mg-t-30.filemgr-content-header.d-none", [
                                    m("i[data-feather='search']"),
                                    m("div.search-form",
                                        m("input.form-control[type='search'][placeholder='Buscar'][id='searchField']")
                                    ),

                                ]),


                                m("table.table.table-sm.tx-11[id='table-pedidos'][width='100%']"),


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
                m("div.mg-t-10.bg-white",
                    m("div.pd-20",
                        m(Stopwatch)
                    )
                )
            ])
        ];
    },

};


function loadPedidos() {

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
    var table = $("#table-pedidos").DataTable({
        "ajax": {
            url: "https://api.hospitalmetropolitano.org/t/v1/imagen/pedidos",
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
            title: "PEDIDO:"
        }, {
            title: "FECHA:"
        }, {
            title: "NHC:"
        }, {
            title: "PACIENTE:"
        }, ],
        aoColumnDefs: [{
                mRender: function(data, type, full) {
                    return "";
                },
                visible: true,
                aTargets: [0],
                orderable: false,
            },
            {
                mRender: function(data, type, full) {
                    return full.HR_PRE_MED;
                },
                visible: false,
                aTargets: [1],
                orderable: false,

            },
            {
                mRender: function(data, type, full) {
                    return full.CD_PACIENTE;

                },
                visible: true,
                aTargets: [2],
                orderable: false,

            }, {
                mRender: function(data, type, full) {
                    return '<div class="d-inline tx-semibold "> FECHA: ' + full.HR_PRE_MED + '</div><br/><div class="d-inline tx-semibold tx-14 ">PTE: ' + full.NM_PACIENTE + '</div><br/><i class="fas fa-info-circle mg-r-2" title="Indicaciones"></i>' + full.DS_ITPRE_MED;

                },
                visible: true,
                aTargets: [3],
                orderable: false,

            },


        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            console.log('nRow', nRow)


        },
        drawCallback: function(settings) {

            $(".table-content").show();
            $(".table-loader").hide();

            settings.aoData.map(function(_i) {


                m.mount(_i.anCells[0], {
                    view: function() {
                        return ((_i._aData.TP_ATENDIMENTO == 'I') ? [
                            m("span", {
                                title: "Ver Pedido",
                                class: "badge tx-12",
                                style: { "cursor": "pointer", "color": "#325a98" },
                                onclick: () => {

                                    Pedidos.showBitacora = "d-none";
                                    VerPedido.numeroPedido = _i._aData.CD_PRE_MED;
                                    VerPedido.data = _i._aData;
                                    StatusPedido.fetch();

                                    m.route.set("/imagen/pedidos/", {
                                        numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                        numeroAtencion: _i._aData.CD_ATENDIMENTO,
                                        numeroPedido: _i._aData.CD_PRE_MED,
                                        track: "view",
                                    });

                                }
                            }, [
                                m("i.fas.fa-file-alt.mg-r-5"),
                            ], "Hospitalización"),

                        ] : [
                            m("span", {
                                title: "Ver Pedido",
                                class: "badge tx-danger tx-12",
                                style: { "cursor": "pointer" },
                                onclick: () => {

                                    Pedidos.showBitacora = "d-none";
                                    VerPedido.numeroPedido = _i._aData.CD_PRE_MED;
                                    VerPedido.data = _i._aData;
                                    StatusPedido.fetch();

                                    m.route.set("/imagen/pedidos/", {
                                        numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                        numeroAtencion: _i._aData.CD_ATENDIMENTO,
                                        numeroPedido: _i._aData.CD_PRE_MED,
                                        track: "view",
                                    });

                                }
                            }, [
                                m("i.fas.fa-file-alt.mg-r-5"),
                            ], "Emergencia"),
                        ])
                    }
                });
                /*

                m.mount(_i.anCells[5], {
                    view: function() {
                        return [
                             onclick: () => {

                                    Pedidos.showBitacora = "d-none";
                                    VerPedido.numeroPedido = _i._aData.NUM_PEDIDO_MV;
                                    VerPedido.data = _i._aData;
                                    StatusPedido.fetch();

                                    m.route.set("/imagen/pedidos/", {
                                        numeroHistoriaClinica: _i._aData.HC_MV,
                                        numeroAtencion: _i._aData.AT_MV,
                                        numeroPedido: _i._aData.NUM_PEDIDO_MV,
                                        track: "view",
                                    });

                                }

                            m(m.route.Link, {
                                id: "pedido_" + _i._aData.NUM_PEDIDO_MV,
                                class: "btn btn-xs btn-block btn-primary mg-b-2",
                                href: "/laboratorio/pedidos/",
                                params: {
                                    numeroHistoriaClinica: _i._aData.HC_MV,
                                    numeroAtencion: _i._aData.AT_MV,
                                    numeroPedido: _i._aData.NUM_PEDIDO_MV,
                                    track: "view",
                                },
                                onclick: () => {
                                    Pedidos.showBitacora = "d-none";
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
                */
            })




        },
    }).on('xhr.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').hide();
        $('.table-content').show();
        //   initDataPicker();
    }).on('page.dt', function(e, settings, json, xhr) {
        // Do some staff here...
        $('.table-loader').show();
        $('.table-content').hide();

    });

    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity
    });

    $('#tipoPiso').change(function(e) {
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('tipoFiltro-' + $('#tipoPiso').val()).draw();
    });

    $('#button-buscar-t').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search($('#_dt_search_text').val()).draw();
    });
    $('#filtrar').click(function(e) {
        e.preventDefault();
        $('.table-loader').show();
        $('.table-content').hide();
        table.search('fechas-' + $('#desde').val() + '-' + $('#hasta').val()).draw();
    });

    $('#resetTable').click(function(e) {
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
                mRender: function(data, type, row, meta) {
                    return "";
                },
                visible: true,
                width: "100%",
                aTargets: [0],
                orderable: false,
            },

        ],
        fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull) {},
        drawCallback: function(settings) {
            settings.aoData.map(function(_v, _i) {
                m.mount(_v.anCells[0], {
                    view: function() {
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



export default Pedidos;