import informeModel from '../../../models/informeModel';

let informeModelo = informeModel;

const listadoInformes = {
    oninit: (vnode) => { 
        if (vnode.attrs.numeroPedido !== undefined) {
            informeModelo.numeroPedido = vnode.attrs.numeroPedido;
            informeModelo.cargarListado(informeModelo.numeroPedido); 
        } 
        if (vnode.attrs.numeroAtencion !== undefined) {
            informeModelo.numeroAtencion = vnode.attrs.numeroAtencion;
        }
        if (vnode.attrs.numeroHistoriaClinica !== undefined) {
            informeModelo.numeroHistoriaClinica = vnode.attrs.numeroHistoriaClinica;
        } 
        if (vnode.attrs.medico !== undefined) {
            informeModelo.medico = vnode.attrs.medico;
        }            
    },
    view: (vnode) => {
        return [
            m("div.listado-informes", [
/*                 m("div.tx-12.mg-t-20", [
                    m(".col-12.mg-b-10.wd-100p[data-label='Filtrar'][id='filterTable']",
                        m("div.row", [
                            m("div.col-sm-12.pd-b-10",
                                m("div.input-group", [
                                    m("input.form-control.mg-b-20.wd-100p[aautofocus=''][id='_dt_search_text'][placeholder='Definir Criterios de Búsqueda'][title='Buscar'][type='text']"),
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
                ]),    */
                m("table.table", [
                    m("tr", [
                        m("th.tx-12", {scope: "col"}, "GENERAR NUEVO INFORME"),
                        m("td", [
                            m("div.float-left", [
                                m(m.route.Link, {
                                    href: "/patologia/pedidos/nuevoinforme?numeroHistoriaClinica=" + informeModelo.numeroHistoriaClinica + 
                                                                                "&numeroAtencion=" + informeModelo.numeroAtencion + 
                                                                                  "&numeroPedido=" + informeModelo.numeroPedido + 
                                                                                        "&medico=" + informeModelo.medico,
                                    class: "btn btn-xs btn-primary mg-l-2 tx-semibold wd-p-35",
                                    attrs: {"numeroPedido": informeModelo.numeroPedido, 
                                            "numeroAtencion": informeModelo.numeroAtencion,
                                            "numeroHistoriaClinica": informeModelo.numeroHistoriaClinica,
                                            "medico": informeModelo.medico}
                                }, 
                                "ANATÓMICO"),
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold.wd-p-35[type='button']", {onclick: function() {}}, "MOLECULAR"),
                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold.wd-p-35[type='button']", {onclick: function() {}}, "CITOLÓGICO"),
                            ]),
                        ])
                    ]),
                ]),                                           
                m("table.table", [
                    m("thead.thead-light", [
                        m("tr", [
                            m("th.tx-12", {scope: "col"}, "ID Informe"),
                            m("th.tx-12", {scope: "col"}, "Muestras Asociadas"),
                            m("th.tx-12", {scope: "col"}, "Estado Informe"),
                            m("th.tx-12", {scope: "col"}, ""),
                        ]),
                    ]), [
                        m("tbody#listadoinformes", [
                            informeModelo.listado.map(function(informe) {
                                return [
                                    m("tr#" +  informe.id, [
                                        m("th.tx-12..wd-15p", {scope: "row"}, informe.codigoinforme),
                                        m("th.tx-12..wd-45p", {scope: "row"}, [
                                            informe.muestrasAsociadas.map(function(muestra) {
                                                return m("p", {style: {"margin-bottom": "0"}}, muestra.id + '-' + muestra.descripcion)
                                            })
                                        ]),
                                        m("th.tx-12..wd-10p", {scope: "row"}, informe.estadopedido.siglas),
                                        m("td.tx-12.wd-30p", [                            
                                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                    onclick: function() {
                                                        m.mount(document.querySelector("#gestion-informes"), {
                                                            view: (vnode) => {
                                                                return m("form#editar-informe", [
                                                                    m("table.table", [
                                                                        m("tr", [
                                                                            m("th.tx-12", "ID"),
                                                                            m("td.tx-12", [
                                                                                m("input.form-control[id='inputinformeid'][type='text']", { 
                                                                                    disabled: true, 
                                                                                    value: informe.id
                                                                                }),
                                                                            ]),
                                                                        ]),
                                                                        m("tr.muestradescripcion", [
                                                                            m("th.tx-12", "Descripción"),
                                                                            m("td.tx-12", [
                                                                                m("textarea.form-control[id='inputmuestradescripcion'][placeholder='Descripción'][title='Descripción']", {
                                                                                    style: "min-height: 100px",
                                                                                    rows: 4,
                                                                                    value: muestra.descripcion
                                                                                })
                                                                            ]),
                                                                        ]),                                                                                                  
                                                                        m("tr", [
                                                                            m("th.tx-12", [                         
                                                                                m("div", [
                                                                                    m("label[for='checkvalida']", {style: {"margin-right": "6px"}},'Válida'),
                                                                                    m("input[type='checkbox'][id='checkvalida']", {
                                                                                        checked:  muestra.valida === 1 ? true : false,
                                                                                        onclick: function() {
                                                                                            if (this.checked) {
                                                                                                m.mount(document.querySelector("#observacionesnovalida"), null) 
                                                                                               
                                                                                            } else {
                                                                                                m.mount(document.querySelector("#observacionesnovalida"), {
                                                                                                    view: (vnode) => {
                                                                                                        return m("textarea.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones Muestra No Válida'][title='Observaciones Muestra No Válida']", {
                                                                                                            style: "min-height: 100px",
                                                                                                            rows: 4,
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        },
                                                                                    }),
                                                                                ]),
                                                                            ]),
                                                                        ]),
                                                                    ]),
                                                                ])
                                                            },
                                                        }),
                                                        m.mount(document.querySelector("#cerrar-gestion-informes"), cerrarGestionInforme);
                                                    }
                                                }, [m("i.fas.fa-pen.mg-r-5", )], "Editar"),
                                            ]),
                                            m("div.mg-0.mg-t-5.text-left.float-left", [
                                                m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                    onclick: function() {
                                                        m.mount(document.querySelector("#gestion-informes"), {
                                                            view: (vnode) => {
                                                                return m("form#editar-informe", [
                                                                    m("table.table", [
                                                                        m("tr", [
                                                                            m("th.tx-12", "ID"),
                                                                            m("td.tx-12", [
                                                                                m("input.form-control[id='inputinformeid'][type='text']", { 
                                                                                    disabled: true, 
                                                                                    value: informe.id
                                                                                }),
                                                                            ]),
                                                                        ]),
                                                                        m("tr.muestradescripcion", [
                                                                            m("th.tx-12", "Descripción"),
                                                                            m("td.tx-12", [
                                                                                m("textarea.form-control[id='inputmuestradescripcion'][placeholder='Descripción'][title='Descripción']", {
                                                                                    style: "min-height: 100px",
                                                                                    rows: 4,
                                                                                    value: muestra.descripcion
                                                                                })
                                                                            ]),
                                                                        ]),                                                                                                  
                                                                        m("tr", [
                                                                            m("th.tx-12", [                         
                                                                                m("div", [
                                                                                    m("label[for='checkvalida']", {style: {"margin-right": "6px"}},'Válida'),
                                                                                    m("input[type='checkbox'][id='checkvalida']", {
                                                                                        checked:  muestra.valida === 1 ? true : false,
                                                                                        onclick: function() {
                                                                                            if (this.checked) {
                                                                                                m.mount(document.querySelector("#observacionesnovalida"), null) 
                                                                                               
                                                                                            } else {
                                                                                                m.mount(document.querySelector("#observacionesnovalida"), {
                                                                                                    view: (vnode) => {
                                                                                                        return m("textarea.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones Muestra No Válida'][title='Observaciones Muestra No Válida']", {
                                                                                                            style: "min-height: 100px",
                                                                                                            rows: 4,
                                                                                                        })
                                                                                                    }
                                                                                                })
                                                                                            }
                                                                                        },
                                                                                    }),
                                                                                ]),
                                                                            ]),
                                                                        ]),
                                                                    ]),
                                                                ])
                                                            },
                                                        }),
                                                        m.mount(document.querySelector("#cerrar-gestion-informes"), cerrarGestionInforme);
                                                    }
                                                }, [m("i.fas.fa-file-import.mg-r-5", )], "Consultar Informe"),
                                            ]),                                        
                                        ]),
                                    ]),
                                ]
                            }),
                        ]),
                    ],
                ]),
            ])            

        ]
    }
}

export default listadoInformes;