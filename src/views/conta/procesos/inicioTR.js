import HeadPublic from '../../layout/header-public';
import m from 'mithril';
import App from '../../app';

const FOR005 = {
    secs: [],
    nombres: "",
    show: false,
    view: () => {

        let evolucion_medica_texto = "";
        let prescripciones_texto = "";
        let urlFor = "";
        let page = 0;

        if (Formulario.num == 0) {
            setTimeout(function() {
                Formulario.num = Formulario.data.length;
                Formulario.parseFetch();
                m.redraw.sync();
            }, 2000);
        }

        return FOR005.secs.length == 0 ? [
            m("div.pd-10.wd-100p",
                m("div.d-inline.tx-secondary.tx-12", {
                    oncreate: (el) => {
                        el.dom.innerHTML = "Procesando " + Formulario.data.length + " formulario(s) encontrado(s)...";
                    },

                }),
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ] : [

            FOR005.secs.map(function(_v, _i, _contentData) {

                if (_v.name == 'prescripciones_texto') {

                    prescripciones_texto = _v.answer;

                }

                if (_v.name == 'evolucion_medica_texto') {

                    evolucion_medica_texto = _v.answer;

                }

                if (_v.name == 'cd_documento_clinico') {

                    urlFor = "http://172.16.253.18/mvpep/api/clinical-documents/" + _v.answer + ".pdf?company=1&department=75";

                }


                if (_v.name == 'Logotipo_archivo') {


                    return [
                        m("div.d-inline.tx-secondary.tx-12", {
                            oncreate: (el) => {
                                el.dom.innerHTML = Formulario.data.length + " formulario(s) encontrado(s).";
                            },

                        }),
                        m("table.table.table-bordered.wd-100p", {
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
                                    m("th.tx-right[colspan='2'][scope='col']",
                                        m("a.tx-right.tx-semibold", {
                                                href: urlFor,
                                                target: "_blank"
                                            },
                                            m('i.fas.fa-print.mg-r-2'),
                                            " Imprirmir  "

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
                    ]

                }


            })

        ]



    }

};

const Formulario = {
    zoom: 0,
    adm: 1,
    nhc: 1,
    num: 0,
    data: [],
    error: "",
    parseDoc: (_data) => {

        Object.keys(_data.data).map(function(_v, _i, _contentData) {
            FOR005.secs.push(_data.data[_v])
        })

        return FOR005.secs.map(function(_v, _i, _contentData) {




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





        })

    },
    parseFetch: () => {
        FOR005.secs = [];

        return Formulario.data.map(function(_v, _i, _contentData) {
            Formulario.parseDoc(Formulario.data[_i])

        })



    },
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
                    Formulario.num = 0;

                } else {
                    Formulario.error = "El documento solicitado no esta disponible.";
                }

            })
            .catch(function(e) {
                setTimeout(function() { Formulario.fetch(); }, 5000);

            })
    },

    view: () => {


        return Formulario.error ? [
            m(".alert.alert-danger[role='alert']",
                Formulario.error
            )
        ] : (Formulario.data.length !== 0) ? [


            m(FOR005)



        ] : [
            m("div.d-inline.tx-secondary.tx-12", {
                oncreate: (el) => {
                    el.dom.innerHTML = "Buscando información...";
                },


            }),
            m("div.pd-10.wd-100p",
                m("div.placeholder-paragraph", [
                    m("div.line"),
                    m("div.line")
                ])
            ),
        ]


    },
}





const DestinoFinal = {
    view: (_data) => {
        if (_data.attrs.destino_final == 'ALMACENAR') {
            return m("input", {
                "class": "form-control tx-semibold tx-15",
                "type": "text",
                "placeholder": "Destino Final",
                oninput: (e) => {
                    InicioTR.data.destino_final = e.target.value;

                }
            })
        } else {
            return m('select.tx-semibold', {
                onchange: (e) => {
                    InicioTR.data.destino_final = e.target.value;
                },
                class: "custom-select"
            }, m('option', 'Seleccione...'), ['FINANZAS', 'SISTEMAS', 'MANTENIMIENTO', 'INGENIERIA CLINICA'].map(x =>
                m('option', x)
            ))
        }
    }

};



const InicioTR = {
    id: null,
    data: [],
    activos: [],
    examenes: [],
    error: '',
    numeroInicioTR: '',
    numeroAtencion: '',
    numeroHistoriaClinica: '',
    autorizado: false,
    oninit: () => {
        document.title = "Nueva Tarjeta Roja - Inicio | " + App.title;

        InicioTR.fetch();
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
    },
    fetch: () => {
        InicioTR.activos = [];
        InicioTR.loader = true;
        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    InicioTR.loader = false;
                    InicioTR.activos = result.data;
                } else {
                    InicioTR.error = result.message;
                }

            })
            .catch(function(e) {
                InicioTR.fetch();
            })

    },
    sendDataTR: () => {

        InicioTR.loader = true;

        console.log('dd => ', InicioTR.data);

        m.request({
                method: "POST",
                url: "https://api.hospitalmetropolitano.org/t/v1/procesos/tr/nueva",
                body: {
                    fecha: moment().format('DD-MM-YYYY'),
                    accion_sugerida: InicioTR.data.accion_sugerida,
                    categoria: InicioTR.data.categoria,
                    marca: InicioTR.data.marca,
                    modelo: InicioTR.data.modelo,
                    motivo_baja: InicioTR.data.motivo_baja,
                    nombre: InicioTR.data.nombre,
                    serie: InicioTR.data.serie,
                    sub_categoria: InicioTR.data.sub_categoria,
                    usuario: InicioTR.data.usuario,
                    destino_final: InicioTR.data.destino_final,
                },
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            })
            .then(function(result) {
                if (result.status) {
                    alert('Proceso realizado con éxito');
                    alert('Tarjeta Roja N°: ' + result.idTR);
                    InicioTR.id = result.idTR;
                    m.route.set('/contabilidad/proceso/tarjeta-roja/status/?tr=' + InicioTR.id + '&track=view');
                } else {
                    InicioTR.error = result.message;
                }
            })
            .catch(function(e) {
                InicioTR.fetch();
            })

    },


    view: (_data) => {

        return [
            m(HeadPublic),
            m("div.content.content-components", {},
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs", [
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
                        "Nueva Tarjeta Roja:"
                    ),
                    m("p.mg-t-20.mg-b-10",
                        "Inicio:"
                    ),
                    m("div", [
                        m("div.row.tx-14", [
                            m("div.col-sm-4",
                                m("div.bg-white.bd.pd-20.pd-lg-30.ht-sm-300.d-flex.flex-column.justify-content-end", [
                                    m("div.mg-b-25",
                                        m('i.fas.fa-search.tx-100.tx-success')
                                    ),
                                    m("h5.tx-inverse.mg-b-20",
                                        "Consultar Status"
                                    ),
                                    m("p.mg-b-20",
                                        "Nueva Tarjeta Roja Beta v1.0"
                                    ),
                                    m("a.tx-medium", {
                                        href: "/contabilidad/proceso/tarjeta-roja/consultar"
                                    }, [
                                        "Ir a Consultar Status",
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ])
                                ])
                            ),

                            m("div.col-sm-4",
                                m("div.bg-white.bd.pd-20.pd-lg-30.ht-sm-300.d-flex.flex-column.justify-content-end", [
                                    m("div.mg-b-25",
                                        m('i.fas.fa-file.tx-100.tx-primary')

                                    ),
                                    m("h5.tx-inverse.mg-b-20",
                                        "Nueva Tarjeta"
                                    ),
                                    m("p.mg-b-20",
                                        "Nueva Tarjeta Roja Beta v1.0"
                                    ),
                                    m("a.tx-medium", {
                                        href: "/contabilidad/proceso/tarjeta-roja/nueva"

                                    }, [
                                        "Ir a Nueva Tarjeta",
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ])
                                ])
                            ),
                            m("div.col-sm-4",
                                m("div.bg-white.bd.pd-20.pd-lg-30.ht-sm-300.d-flex.flex-column.justify-content-end", [
                                    m("div.mg-b-25",
                                        m('i.fas.fa-check.tx-100.tx-primary')

                                    ),
                                    m("h5.tx-inverse.mg-b-20",
                                        "Autorizaciones"
                                    ),
                                    m("p.mg-b-20",
                                        "Nueva Tarjeta Roja Beta v1.0"
                                    ),
                                    m("a.tx-medium", {
                                        href: "/contabilidad/proceso/tarjeta-roja/autorizaciones"

                                    }, [
                                        "Ir Autorizaciones",
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ])
                                ])
                            )

                        ])

                    ]),
                    m("h6.tx-light.mg-t-20.mg-b-10",
                        "MetroPlus Beta v1.0"
                    ),


                ])
            ),


        ];



    }

};


export default InicioTR;