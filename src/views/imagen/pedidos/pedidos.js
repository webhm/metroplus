import HeaderPrivate from '../../layout/header-private';
import SidebarImagen from '../sidebarImagen';
import App from '../../app';
import m from 'mithril';
import Notificaciones from '../../../models/notificaciones';
import Loader from '../../loader';

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
        method: "POST",

            StatusPedido.documento = VerPedido.data;
        StatusPedido.data = VerPedido.data;
        VerPedido.data = VerPedido.data;
        VerPedido.validarStatus();

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

const FOR005 = {
    secs: [],
    nombres: "",
    parseDoc: (_data) => {

        return Object.keys(_data.data).map(function(_v, _i, _contentData) {
            FOR005.secs.push(_data.data[_v])
        })

    },
    oncreate: () => {
        FOR005.secs = [];
        return Formulario.data.map(function(_v, _i, _contentData) {
            FOR005.parseDoc(Formulario.data[_i])
        })



    },
    view: () => {


        let evolucion_medica_texto = "";
        let prescripciones_texto = "";


        if (FOR005.secs.length !== 0) {
            return FOR005.secs.map(function(_v, _i, _contentData) {

                if (FOR005.secs.length == (_i + 1)) {
                    Formulario.num = 1;
                }


                if (_v.name == 'nombres') {



                    FOR005.nombres = _v.answer;

                }


                if (_v.name == 'apellidos_paciente') {



                    FOR005.apellidos_paciente = _v.answer;

                }

                if (_v.name == 'sexo de paciente') {

                    FOR005.sexo = _v.answer;

                }

                if (_v.name == 'nhcl') {

                    FOR005.nhcl = _v.answer;

                }

                if (_v.name == 'numero_admision') {

                    FOR005.numero_admision = _v.answer;

                }

                if (_v.name == 'edad') {

                    FOR005.edad = _v.answer;

                }

                if (_v.name == 'edad_paciente') {

                    FOR005.edad_paciente = _v.answer;

                }

                if (_v.name == 'identificacion_paciente') {

                    FOR005.identificacion = _v.answer;

                }

                if (_v.name == 'fecha_admision') {

                    FOR005.fecha_admision = _v.answer;

                }

                if (_v.name == 'ubicacion_atencion') {

                    FOR005.ubicacion = _v.answer;

                }


                if (_v.name == 'fecha_alta') {

                    FOR005.fecha_alta = (_v.answer == null) ? '' : _v.answer;

                }

                if (_v.name == 'medico_tratante') {

                    FOR005.medico_tratante = _v.answer;

                }

                if (_v.name == 'prescripciones_texto') {

                    prescripciones_texto = _v.answer;

                }

                if (_v.name == 'evolucion_medica_texto') {

                    evolucion_medica_texto = _v.answer;

                }

                if (_v.name == 'Logotipo_archivo') {


                    return m("table.table.table-bordered.wd-100p", {
                        "style": {
                            "zoom": Formulario.zoom,
                        }
                    }, [
                        m("thead", [
                            m("tr",
                                m("th[colspan='12'][scope='col']", [
                                    m("i.tx-light.fas.fa-file-alt.mg-r-2."),
                                    m("div.p-0", " SNS - MSP / HCU-form.005 / 2008 "),


                                ])
                            ),
                            m("tr", [
                                m("th[colspan='10'][scope='col']",
                                    m("div.m-0.p-0",
                                        m("img", {
                                            width: "100rem",
                                            src: "data:image/png;base64," + _v.answer
                                        })
                                    )
                                ),
                                m("th[colspan='2'][scope='col']",
                                    m("div.m-0.p-0",
                                        "HIS MV"

                                    )
                                )

                            ])
                        ]),
                        m("tbody", [
                            m("tr", [
                                m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "ESTABLECIMIENTO"
                                    )
                                ),
                                m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "NOMBRE"
                                    )
                                ),
                                m("th[colspan='3'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "APELLIDO"
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "SEXO (M-F)"
                                    )
                                ),
                                m("th[colspan='1][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "NHCL."
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.tx-bold.text-center.",
                                        "ADM."
                                    )
                                )
                            ]),
                            m("tr", [
                                m("th.text-center[colspan='3'][scope='row']",
                                    m("div.m-0.p-0.text-center",
                                        "HOSPITAL METROPOLITANO"
                                    )
                                ),
                                m("td.text-center[colspan='3']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.nombres
                                    )
                                ),
                                m("td.text-center[colspan='3']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.apellidos_paciente
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.sexo
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.nhcl
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.numero_admision
                                    )
                                )
                            ]),
                            m("tr", [
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "EDAD"
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "IDENTIFICACION"
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "FECHA ADMISION"
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "FECHA ALTA"
                                    )
                                ),
                                m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "UBICACION"
                                    )
                                ),
                                m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "MEDICO TRATANTE"
                                    )
                                )
                            ]),
                            m("tr", [
                                m("td.text-center[colspan='1'][scope='row']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.edad || FOR005.edad_paciente
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.identificacion
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.fecha_admision
                                    )
                                ),
                                m("td.text-center[colspan='1']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.fecha_admision
                                    )
                                ),
                                m("td.text-center[colspan='4']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.ubicacion
                                    )
                                ),
                                m("td.text-center[colspan='4']",
                                    m("div.m-0.p-0.text-center",
                                        FOR005.medico_tratante
                                    )
                                )
                            ]),
                            m("tr", [
                                m("th[colspan='6'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "1.- EVOLUCIÓN"
                                    )
                                ),
                                m("th[colspan='5'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "2.- PRESCRIPCIONES"
                                    )
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#eef9c8" } },
                                    m("div.m-0.p-0.tx-bold.text-center.", [
                                            "FIRMAR AL PIE DE",
                                            m("br"),
                                            "CADA PRESCRIPCIÓN"
                                        ]

                                    )
                                ),

                            ]),
                            m("tr", [
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.", [
                                        "FECHA",
                                        m("br"),
                                        "día/mes/año"
                                    ])
                                ),
                                m("th[colspan='1'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "HORA"
                                    )
                                ),
                                m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.",
                                        "NOTAS DE EVOLUCIÓN"
                                    )
                                ),
                                m("th[colspan='4'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.", [
                                            "FARMACOTERAPIA E INDICACIONES",
                                            m("br"),
                                            "(PARA ENFERMERÍA Y OTRO PERSONAL)"

                                        ]

                                    )
                                ),
                                m("th[colspan='2'][scope='row']", { "style": { "padding": "0", "background-color": "#edfbf5" } },
                                    m("div.m-0.p-0.tx-bold.text-center.", [
                                            "ADMINISTR.",
                                            m("br"),
                                            "FÁRMACOS INSUMOS"

                                        ]

                                    )
                                ),

                            ]),
                            m("tr", [
                                m("td[colspan='6'][scope='row']", { "style": { "padding": "0", "width": "50%" } },
                                    m("div.m-0.p-2.tx-bold.text-justify",
                                        (evolucion_medica_texto !== null && evolucion_medica_texto.length !== 0) ? m.trust(evolucion_medica_texto.replace(/(\r\n|\r|\n)/g, "<br/>")) : ""


                                    )
                                ),
                                m("td[colspan='6'][scope='row']", { "style": { "padding": "0", "width": "50%" } },
                                    m("div.m-0.p-2.text-justify",
                                        (prescripciones_texto !== null && prescripciones_texto.length !== 0) ? m.trust(prescripciones_texto.replace(/(\r\n|\r|\n)/g, "<br/>")) : ""

                                    )
                                ),

                            ]),

                        ])
                    ])

                }


            })
        }






    }

};

const Formulario = {
    zoom: 0,
    adm: 1,
    nhc: 1,
    num: 0,
    data: [],
    error: "",
    fetch: () => {
        Formulario.data = [];
        Formulario.error = "";
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/t/v1/formulario?nhcl=" + Formulario.nhc + "&adm=" + Formulario.adm,

                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {
                if (result.length !== 0) {
                    Formulario.data = result;
                } else {
                    Formulario.error = "El documento solicitado no esta disponible.";
                }

            })
            .catch(function(e) {
                setTimeout(function() { Formulario.fetch(); }, 5000);

            })
    },
    oncreate: () => {
        Formulario.fetch();
    },
    view: () => {


        return Formulario.error ? [
            m(".alert.alert-danger[role='alert']",
                Formulario.error
            ),
        ] : Formulario.data.length !== 0 ? [
            (Formulario.num == 0 ? [m("div.d-inline.tx-secondary.tx-12", "Procesando " + Formulario.data.length + " formularios encontrados.")] : []),
            m(FOR005)

        ] : [
            m("div.pd-10.wd-100p",
                m("div.d-inline.tx-secondary.tx-12", "Buscando información... "),
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ]

    },
}

const Evoluciones = {
    data: [],
    detalle: [],
    error: "",
    showFor: "",
    fetch: () => {
        Evoluciones.data = [];
        Evoluciones.error = "";
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/ev-paciente-emergencia",
                body: {
                    numeroHistoriaClinica: VerPedido.data.CD_PACIENTE + '01'
                },
                headers: {
                    "Authorization": localStorage.accessToken,
                },
            })
            .then(function(result) {



                if (result.status) {
                    Evoluciones.data = result.data;
                    Formulario.adm = Evoluciones.data[0].ADM;
                    Formulario.nhc = Evoluciones.data[0].NHCL;
                    Formulario.fetch();
                } else {
                    Evoluciones.error = result.message;
                }

            })
            .catch(function(e) {
                setTimeout(function() { Evoluciones.fetch(); }, 5000);

            })
    },

    view: () => {


        return Evoluciones.error ? [
            m(".alert.alert-danger[role='alert']",
                Evoluciones.error
            )
        ] : Evoluciones.data.length !== 0 ? [
            m(Formulario)
        ] : [
            m("div.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ]


    },
}


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
                                        m.route.set('/imagen/pedidos');

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



                    m("table.table.table-bordered.table-sm.tx-12", [
                        m("thead",

                            m("tr.bg-litecoin.op-9.tx-white", [
                                m("th[scope='col'][colspan='6']",
                                    "DATOS DEL PEDIDO:"
                                ),

                            ])
                        ),
                        m("tbody", [
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "N° de Pedido:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    StatusPedido.data.CD_PRE_MED
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Fecha:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    StatusPedido.data.CD_PRE_MED
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Origen:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    "EMERGENCIA"
                                ),

                            ]),

                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Médico Solicitante:"
                                ),
                                m("td[colspan='2']", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    StatusPedido.data.NM_PACIENTE
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Especialidad:"
                                ),
                                m("td[colspan='2']", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    "MEDICIN AINTERNA"
                                ),



                            ]),
                        ]),
                        m("thead",

                            m("tr.bg-litecoin.op-9.tx-white", [
                                m("th[scope='col'][colspan='6']",
                                    "DATOS DEL PACIENTE:"
                                ),

                            ])
                        ),
                        m("tbody", [
                            m("tr", [
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "Apellidos y Nombres:"
                                ),
                                m("td[colspan='3']", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    StatusPedido.data.NM_PACIENTE
                                ),
                                m("th", {
                                        style: { "background-color": "#a8bed6" }
                                    },
                                    "NHC:"
                                ),
                                m("td", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    StatusPedido.data.CD_PACIENTE
                                ),

                            ]),
                            m("tr", [

                                m("td[colspan='6']", {
                                        style: { "background-color": "#eaeff5" }

                                    },
                                    m("ul.nav.nav-line[id='myTab'][role='tablist']", [
                                        m("li.nav-item",
                                            m("a.nav-link.active[id='home-tab'][data-toggle='tab'][href='#home'][role='tab'][aria-controls='home'][aria-selected='true']", {
                                                    style: { "color": "#476ba3" }
                                                },
                                                m("i.fas.fa-file-alt.pd-1"),

                                                " HOJA 005"
                                            )
                                        ),

                                    ]),
                                ),


                            ]),
                            m("tr", [

                                m("td[colspan='6']", {

                                    },
                                    m(".tab-content.bd.bd-gray-300.bd-t-0[id='myTab']", [
                                        m(".tab-pane.fade.show.active[id='home'][role='tabpanel'][aria-labelledby='home-tab']", [
                                            m(Evoluciones),
                                        ]),

                                    ])
                                ),


                            ]),
                            m("tr", [

                            ]),

                        ])
                    ])

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
        columns: false,
        aoColumnDefs: [{
                mRender: function(data, type, full) {
                    return "";
                },
                visible: false,
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
                visible: false,
                aTargets: [2],
                orderable: false,

            }, {
                mRender: function(data, type, full) {
                    return "";

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

                $(_i.anCells[3]).css("padding", "0");

                m.mount(_i.anCells[3], {
                    view: function() {
                        return ((_i._aData.TP_ATENDIMENTO == 'I') ? [
                            m("div.d-inline.list-group-item.d-flex.pd-sm", {
                                title: "ss",
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
                                m("div.avatar.tx-center",
                                    m("i.fas.fa-file-alt.tx-30", {
                                        style: { "color": "#325a98" }
                                    })
                                ),
                                m("div.pd-sm-l-10", [
                                    m("p.tx-medium.mg-b-2",
                                        _i._aData.NM_PACIENTE
                                    ),
                                    m("small.tx-12.tx-color-03.mg-b-0",
                                        "Mar 21, 2019, 1:00pm"
                                    )
                                ]),
                                m("div.mg-l-auto.text-right", [
                                    m("p.tx-medium.mg-b-2",
                                        _i._aData.HR_PRE_MED
                                    ),
                                    m("small.tx-12.tx-primary.mg-b-0",
                                        "Hospitalización"
                                    )
                                ])
                            ])

                        ] : [
                            m("div.d-inline.list-group-item.d-flex.pd-sm", {
                                title: "ss",
                                style: { "cursor": "pointer" },
                                onclick: () => {
                                    Pedidos.showBitacora = "d-none";
                                    VerPedido.numeroPedido = _i._aData.CD_PRE_MED;
                                    VerPedido.data = _i._aData;
                                    StatusPedido.fetch();
                                    Evoluciones.fetch();

                                    m.route.set("/imagen/pedidos/", {
                                        numeroHistoriaClinica: _i._aData.CD_PACIENTE,
                                        numeroAtencion: _i._aData.CD_ATENDIMENTO,
                                        numeroPedido: _i._aData.CD_PRE_MED,
                                        track: "view",
                                    });
                                }
                            }, [
                                m("div.avatar.tx-center",
                                    m("i.fas.fa-file-alt.tx-30", {
                                        style: { "color": "#325a98" }
                                    })
                                ),
                                m("div.pd-sm-l-10", [
                                    m("p.tx-medium.mg-b-2",
                                        _i._aData.NM_PACIENTE
                                    ),
                                    m("small.tx-12.tx-color-03.mg-b-0",
                                        "Mar 21, 2019, 1:00pm"
                                    )
                                ]),
                                m("div.mg-l-auto.text-right", [
                                    m("p.tx-medium.mg-b-2",
                                        _i._aData.HR_PRE_MED
                                    ),
                                    m("small.tx-12.tx-danger.mg-b-0",
                                        "Emergencia"
                                    )
                                ])
                            ])
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