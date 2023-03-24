import muestraModel from '../../../models/muestraModel';
import asociarExamenes from './asociarExamenes';
import cerrarGestionMuestra from './cerrarGestionMuestra';
import editarMuestra from './editarMuestra';

let muestraModelo = muestraModel;

const listadoMuestras = {
    oninit: (vnode) => { 
        if (vnode.attrs.numeroPedido !== undefined) {
            muestraModelo.numeroPedido = vnode.attrs.numeroPedido;            
            muestraModelo.cargarListado(muestraModelo.numeroPedido);
            muestraModelo.cargarExamenes(muestraModelo.numeroPedido);
        }  
        if (vnode.attrs.numeroAtencion !== undefined) {
            muestraModelo.numeroAtencion = vnode.attrs.numeroAtencion;
        }
        if (vnode.attrs.numeroHistoriaClinica !== undefined) {
            muestraModelo.numeroHistoriaClinica = vnode.attrs.numeroHistoriaClinica;
        } 
        if (vnode.attrs.medico !== undefined) {
            muestraModelo.medico = vnode.attrs.medico;
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
                                    m("td.tx-12.muestravalida", muestra.valida === "1" ? 'Sí' : 'NO'),
                                    m("td.tx-12.examenes", [
                                        muestra.examenesAsociados.map(function(examenAsociado) {
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
                                                        view: () => {
                                                           return m(editarMuestra, {muestra: muestra})
                                                        }
                                                    }),
                                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                                }
                                            }, [m("i.fas.fa-pen.mg-r-5", )], "Editar"),
                                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                                disabled: muestra.valida === "1" ? false : true,
                                                onclick: function() {
                                                    m.mount(document.querySelector("#gestion-muestras"), {
                                                        view: () => {
                                                            return m(asociarExamenes, {muestra: muestra})
                                                        }
                                                    }),
                                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), cerrarGestionMuestra);
                                                }
                                            }, [m("i.fas.fa-link.mg-r-5", )], "Asociar Exámenes"),
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