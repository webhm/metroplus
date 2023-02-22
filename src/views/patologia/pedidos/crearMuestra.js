import m from 'mithril';
import muestraModel from '../../../models/muestraModel';

var muestraModelo = muestraModel;

const crearMuestra = {
    oninit: () => { 
        muestraModelo.generarSecuencial() ;
    },
    view: (vnode) => {
        return m("form#crear-muestra", [
            m("table.table", [
                m("tr", [
                    m("th.tx-12", "ID MUESTRA"),
                    m("td.tx-12", [
                        m("input.form-control[id='inputmuestraid'][type='text']", { 
                            disabled: true, 
                            value: muestraModelo.secuencialMuestra,
                        }),
                    ]),
                ]),
                m("tr.muestradescripcion", [
                    m("th.tx-12", "Descripción"),
                    m("td.tx-12", [
                        m("textarea.form-control[id='inputmuestradescripcion'][placeholder='Descripción'][title='Descripción']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]),
                ]),                               
                m("tr", [
                    m("th.tx-12", [                         
                        m("div", [
                            m("label[for='checkvalida']", {style: {"margin-right": "6px"}},'Válida'),
                            m("input[type='checkbox'][id='checkvalida']", {
                                checked: true,
                                onclick: function(event) {
                                    if (this.checked) {
                                        m.mount(document.querySelector("#observacionesnovalida"), {
                                            view: (vnode) => {
                                                return m("form#asociar-muestra", [
                                                    m("input.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones Muestra No Válida'][title='Observaciones Muestra No Válida'][type='text']")
                                                ])
                                            }
                                        })
                                    } else {
                                        m.mount(document.querySelector("#observacionesnovalida"), {
                                            view: (vnode) => {
                                                return m("form#asociar-muestra", [
                                                    m("input.form-control[id='inputobservacionesnovalida'][placeholder='Observaciones Muestra No Válida'][title='Observaciones Muestra No Válida'][type='text']")
                                                ])
                                            }
                                        })  
                                    }
                                },
                            }),
                        ]),
                    ]),
                    m("td.tx-12", [
                        m('div#observacionesnovalida'),
                        m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() { 
                                if (vnode.dom['inputmuestradescripcion'].value.length == 0) {
                                    muestraModelo.error = "El campo Descripción es Requerido";
                                    alert(muestraModelo.error);
                                    vnode.dom['inputmuestradescripcion'].focus();
                                } else {
                                    var muestra = {
                                        nopedidomv: parseInt(muestraModel.numeroPedido),
                                        noatencionmv: parseInt(muestraModel.numeroAtencion),
                                        nohistoriaclinicamv: parseInt(muestraModel.numeroHistoriaClinica), 
                                        idestadopedido: 1,                                       
                                        descripcion: vnode.dom['inputmuestradescripcion'].value,
                                        valida:  vnode.dom['checkvalida'].checked ? 1 : 0
                                    }
                                    muestraModelo.guardar(muestra);
                                    m.mount(document.querySelector("#gestion-muestras"), null);
                                    m.mount(document.querySelector("#cerrar-gestion-muestras"), null);
                                }},
                                style: {'margin': '6px 0'}
                        }, [
                            m("i.fas.fa-save.mg-r-5", )
                        ], "Guardar"
                        ),]
                    ),
                ]),
            ]),
        ])
    }
}

export default crearMuestra;