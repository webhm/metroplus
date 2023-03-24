import corteModel from '../../../models/corteModel';
import crearCorte from './crearCorte';

let corteModelo = corteModel;
let informeModelo = null;

const listadoCortes = {
    oninit: (vnode) => {
        corteModelo.cargarListado(0);
        if (vnode.attrs.informeModelo !== undefined) {
            informeModelo = vnode.attrs.informeModelo;
        }
    }, 
    onupdate: (vnode) => {
        informeModelo.listadoCortes = corteModelo.listado;
    }, 
    view: (vnode) => {
        return m("table.table.listado-cortes", {style: {"width": "98%", "margin-left": "1%"}}, [
            m("tr", [
                m("th.tx-12", {style: { "width": "20%" }}, "INGRESAR CORTES:"),
                m("th.tx-12", {style: { "width": "60%" }}), 
                m("th.tx-12", {style: { "width": "20%" }}, [
                    m("button#btnnuevocorte.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][form='crear-corte']", {
                        style: { "width": "95%" },
                        onclick: function() {
                            this.disabled = true;
                            m.mount(document.querySelector("#gestion-cortes"), {
                                view: (vnode) => {
                                    return m(crearCorte, {"informeModelo": informeModelo})
                                }
                            });
                        }                            
                    }, [
                        m("i.fas.fa-plus.mg-r-5")
                        ], "Nuevo Corte"
                    ),
                ]),                         
            ]), 
			m("tr", [
                m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "ID Corte"),
                m("th.tx-12.thead-light", {scope: "col", style: {'width': '60%'}}, "Descripción del Corte"),
                m("th.tx-12.thead-light", {scope: "col", style: {'width': '20%'}}, "")
            ]), 
            m("tr#gestion-cortes"),
			corteModelo.listado.map(function(corte) {
                return [
                    m("tr#" +  corte.id, [
                        m("th.tx-12.corteid", {style: {'width': '20%'}}, corte.id),
                        m("td.tx-12.cortedescription", {style: {'width': '60%'}}, corte.descripcion),
                        m("td.tx-12", {style: {'width': '20%', 'padding': '0'}}, [   
                            m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button'][corteid=" + corte.id + "]", {
                                onclick: function() {
                                    corteModelo.listado = corteModelo.listado.filter((item) => item.id !== this.getAttribute('corteid'));
                                },
                                style: {'margin': '5px 0 0 0', "width": "47%", 'padding': '5px'}
                            }, [m("i.fas.fa-trash.mg-r-5", )], "Eliminar"), 
                        ]),
                    ]),
                ]
            }),
        ])
    }
}

export default listadoCortes;