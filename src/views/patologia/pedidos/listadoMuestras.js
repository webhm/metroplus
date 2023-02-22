import m from 'mithril';
import muestraModel from '../../../models/muestraModel';
import cerrarGestionMuestra from './cerrarGestionMuestra';

var muestraModelo = muestraModel;

const listadoMuestras = {
    oninit: (datos) => { 
        if (datos.attrs.numeroPedido !== undefined) {
            muestraModelo.numeroPedido = datos.attrs.numeroPedido;
            muestraModelo.cargarListado(muestraModelo.numeroPedido);
            muestraModelo.cargarExamenes(muestraModelo.numeroPedido);
            muestraModelo.cargarExamenesAsociados(muestraModelo.numeroPedido);
        }  
        if (datos.attrs.numeroAtencion !== undefined) {
            muestraModelo.numeroAtencion = datos.attrs.numeroAtencion;
        }
        if (datos.attrs.numeroHistoriaClinica !== undefined) {
            muestraModelo.numeroHistoriaClinica = datos.attrs.numeroHistoriaClinica;
        }                     
    },
    view: (vnode) => {
        return m("div.listado-muestra", [
            m("table.table", [
                m("thead.thead-light", [
                    m("tr", [
                        m("th.tx-12", {scope: "col", style: {'width': '10%'}}, "ID"),
                        m("th.tx-12", {scope: "col", style: {'width': '30%'}}, "Descripción"),
                        m("th.tx-12", {scope: "col", style: {'width': '5%'}},  "Válida"),
                        m("th.tx-12", {scope: "col", style: {'width': '25%'}}, "Exámenes Asociados"),
                        m("th.tx-12", {scope: "col", style: {'width': '30%'}}, "")
                    ]),
                ]), [
                    m("tbody#listadomuestras", [
                        muestraModelo.listado.map(function(muestra) {
                            return [
                                m("tr#" +  muestra.id, [
                                    m("th.tx-12.muestraid", {scope: "row"}, muestra.id),
                                    m("td.tx-12.muestradescription", muestra.descripcion),
                                    m("td.tx-12.muestravalida", muestra.valida == 1 ? 'Sí' : 'NO'),
                                    m("td.tx-12.examenes", [
                                        muestraModelo.examenesAsociados.filter(function(examenMuestra){
                                            return examenMuestra.idmuestra == muestra.id;
                                        }).map(function(examenAsociado) {
                                            return [
                                                m("span.tx-12.pd-r-10", examenAsociado.descripcion),
                                                m("br"),
                                            ]
                                        })
                                    ]),
                                    m("td.tx-12", [                            
                                        m("div.mg-0.mg-t-5.text-left", [
                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                onclick: function() {
                                                    m.mount(document.querySelector("#gestion-muestras"), {
                                                        view: (vnode) => {
                                                            return m("form#editar-muestra", [
                                                                m("table.table", [
                                                                    m("tr", [
                                                                        m("th.tx-12", "ID"),
                                                                        m("td.tx-12", [
                                                                            m("input.form-control[id='inputmuestraid'][type='text']", { 
                                                                                disabled: true, 
                                                                                value: muestra.id
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
                                                                                    checked:  muestra.valida == 1 ? true : false
                                                                                }),
                                                                            ]),
                                                                        ]),
                                                                        m("td.tx-12", [
                                                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                                                onclick: function() {
                                                                                    if (vnode.dom['inputmuestradescripcion'].value.length == 0) {
                                                                                        muestraModelo.error = "El campo Descripción es Requerido";
                                                                                        alert(muestraModelo.error);
                                                                                        vnode.dom['inputmuestradescripcion'].focus();
                                                                                    } else {
                                                                                        var muestra = {
                                                                                            id: parseInt(vnode.dom['inputmuestraid'].value),
                                                                                            nopedidomv: parseInt(muestraModel.numeroPedido),
                                                                                            noatencionmv: parseInt(muestraModel.numeroAtencion),
                                                                                            nohistoriaclinicamv: parseInt(muestraModel.numeroHistoriaClinica), 
                                                                                            idestadopedido: 1,                                       
                                                                                            descripcion: vnode.dom['inputmuestradescripcion'].value,
                                                                                            valida:  vnode.dom['checkvalida'].checked ? 1 : 0
                                                                                        }
                                                                                        muestraModelo.actualizar(muestra);
                                                                                        m.mount(document.querySelector("#gestion-muestras"), null);
                                                                                        m.mount(document.querySelector("#cerrar-gestion-muestras"), null);
                                                                                    }
                                                                                }
                                                                            }, [
                                                                                m("i.fas.fa-save.mg-r-5", )
                                                                            ], "Guardar"
                                                                            ),]
                                                                        ),
                                                                    ]),
                                                                ]),
                                                            ])
                                                        },
                                                    }),
                                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                                }
                                            }, [m("i.fas.fa-save.mg-r-5", )], "Editar"),
                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                onclick: function() {
                                                    m.mount(document.querySelector("#gestion-muestras"), {
                                                        view: (vnode) => {
                                                            return m("form#asociar-muestra", [
                                                                m("table.table", [
                                                                    m("tr.thead-light", [
                                                                        m("th.tx-12.tx-semibold", "ASOCIAR EXÁMENES"),
                                                                        m("th.tx-12.tx-semibold", [
                                                                            m("span.tx-12.pd-r-10", 'MUESTRA:  ' +  muestra.id),
                                                                            m("span.tx-12.pd-l-10.pd-r-10.mg-l-5", 'DESCRIPCION:  ' +  muestra.descripcion),
                                                                            m("span.tx-12.pd-l-10.pd-r-10.mg-l-5", 'VALIDA:  ' + (muestra.valida == "1" ? 'Sí' : 'NO')),
                                                                        ]),
                                                                    ]),                                                
                                                                    m("tr", [
                                                                        m("th.tx-12", {scope: "col"}, "EXÁMENES"),
                                                                        m("td", [
                                                                            muestraModelo.examenes.map(function(examen) {
                                                                                return [
                                                                                    m("div", [
                                                                                        m("input[type='checkbox']", {
                                                                                            checked: muestraModelo.examenesAsociados.find(function(asociacion) {
                                                                                                return (parseInt(asociacion.idmuestra) == muestra.id && parseInt(asociacion.codigoexamenmv) == examen.ID); 
                                                                                            }) !== undefined,
                                                                                            style: {"float": "left", "margin-top": "2px"},
                                                                                            id: examen.ID,
                                                                                            onclick: function() {
                                                                                                if (this.checked) {
                                                                                                    var examenAsociado = {
                                                                                                        idmuestra: parseInt(muestra.id),
                                                                                                        codigoexamenmv: examen.ID,
                                                                                                        nopedidomv: parseInt(muestraModel.numeroPedido),
                                                                                                        descripcion: examen.EXAMEN,
                                                                                                        observaciones: examen.OBS_EXAMEN,
                                                                                                        status: examen.STATUS,
                                                                                                        tieneinforme:  0,
                                                                                                    }                                                                                                    
                                                                                                    muestraModelo.asociarExamen(examenAsociado);
                                                                                                } else {
                                                                                                    const idAsociacion = muestraModelo.examenesAsociados.findIndex(function(asociacion) {
                                                                                                        return parseInt(asociacion.idmuestra) == muestra.id && parseInt(asociacion.codigoexamenmv) == examen.ID
                                                                                                     });
                                                                                                    if (idAsociacion >= 0){
                                                                                                        {
                                                                                                            muestraModelo.eliminarExamenasociado(muestraModelo.examenesAsociados[idAsociacion].id);
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }}
                                                                                        ),
                                                                                        m("label.tx-semibold.tx-12", {
                                                                                            style: {"margin": "0 10px"},
                                                                                        },
                                                                                        examen.EXAMEN),
                                                                                    ]),
                                                                                ]
                                                                            }),
                                                                        ]),       
                                                                    ]),
                                                                ]),
                                                            ])
                                                        },
                                                    }),
                                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                                }
                                            }, [m("i.fas.fa-save.mg-r-5", )], "Asociar Exámenes"),
                                        ]),
                                    ]),
                                ]),
                            ]
                        }),
                    ]),
                ],
            ]),
        ])
    }
}

export default listadoMuestras;