import m from 'mithril';
import informeModel from '../../../models/informeModel';

var informeModelo = informeModel;

const informeAnatomico = {
    oninit: (datos) => { 
        if (datos.attrs !== undefined && datos.attrs.numeroPedido !== undefined) {
            informeModelo.numeroPedido = datos.attrs.numeroPedido;
        } 
        if (datos.attrs !== undefined && datos.attrs.numeroAtencion !== undefined) {
            informeModelo.numeroAtencion = datos.attrs.numeroAtencion;
        }
        if (datos.attrs !== undefined && datos.attrs.numeroHistoriaClinica !== undefined) {
            informeModelo.numeroHistoriaClinica = datos.attrs.numeroHistoriaClinica;
        }           
    },
    view: (vnode) => {
        return m("form#crear-informe", [
            m("table.table", [
                m("tr", [
                    m("th.tx-14", {style: { "width": "85%" }}, [
                        m("h3.mg-t-5.mg-b-10.tx-center", [
                            m("span", { style: "margin: 0 30px 0 0"}, "ANATÓMICO"),
        
                        ]),
                    ]),
                    m("th.tx-14", {style: { "width": "15%" }}, [
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            style: { "width": "95%" },
                            onclick: () => {
                                m.mount(document.querySelector("#crear-informe"), informeAnatomico);
                            }
                        }, [
                            m("i.fas.fa-plus.mg-r-5")
                        ], "Nuevo"),
                    ]),
                ]),
            ]),  
            m("table.table", [
                m("tr", [
                    m("th.tx-14", "ID P-Anatómico: "),
                    m("td.tx-14", [
                        m("input.form-control[id='inputinformeid'][type='text']", { 
                            disabled: true,
                        }),
                    ]),
                    m("th.tx-14", "No. Pedido:"),
                    m("td.tx-14", [
                        m("input.form-control[id='inputnumeropedidomv'][type='text']", { 
                            value: informeModelo.numeroPedido,
                            disabled: true,
                        }),
                    ]),                    
                ]),
                m("tr", [
                    m("th.tx-14", "Médico Solicitante:"),
                    m("td.tx-14", [
                        m("input.form-control[id='inputmedicosolicitante'][type='text']", {}),
                    ]),
                    m("th.tx-14", "Fecha del Documento:"),
                    m("td.tx-14", [
                        m("input.form-control[id='inputfechadocumento'][type='text']", { 
                            value: moment().format('D-MM-YYYY'),
                            disabled: true,
                        }),
                    ]),                    
                ]),
            ]),    
            m("table.table", [
                m("tr", [
                    m("th.tx-14", "Información Clínica:"),
                    m("th.tx-14", "Muestras Enviadas:"),
                ]),
                m("tr", [
                    m("td.tx-14", [
                        m("textarea.form-control[id='textareainformacionclinica']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]),                    
                    m("td.tx-14", [
                        m("textarea.form-control[id='textareamuestrasenviadas']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]),
                ]),
            ]),   
            m("table.table", [
                m("tr", [
                    m("th.tx-14", "Diagnóstico:"),
                ]),
                m("tr", [        
                    m("td.tx-14", [
                        m("textarea.form-control[id='textareadiagnostico']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]),                    
                ]),
            ]), 
            m("table.table", [
                m("tr", [
                    m("th.tx-14", "Macroscópico:"),
                ]),
                m("tr", [
                    m("td.tx-14", [
                        m("textarea.form-control[id='textareamacroscopico']", {
                            style: "min-height: 100px",
                            rows: 4,
                        })
                    ]), 
                ]),
                m("tr", [                
                    m("th.tx-14", { style: "float: right"}, [
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {}, [
                            m("i.fas.mg-r-5", )], "Agregar Texto Definifo Previamente"
                        ),
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {}, [
                            m("i.fas.mg-r-5", )], "Guardar Como TexTo Estándar"
                        ),
                    ]),
                ]),              
            ]),   
            m("table.table", [
                m("tr", [
                    m("th.tx-14", {style: { "width": "80%" }}, "Ingresar Cortes:"),
                    m("th.tx-14", {style: { "width": "20%" }}, [
                        m("button#btnnuevopatologico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            style: { "width": "95%" },
                        }, [
                            m("i.fas.fa-plus.mg-r-5")
                            ], "Nuevo Corte"
                        ),
                    ]),
                ]),
            ]), 
            m("table.table", [
                m("thead.thead-light", [
                    m("tr", [
                        m("th.tx-14", "No."),
                        m("td.tx-14", "Descripción"),
                        m("td.tx-14", "Rótulo o Etiqueta"),     
                    ]),
                ]),
                m("tbody#", [
                    m("tr", [
                        m("th.tx-14"),
                        m("td.tx-14"),
                        m("th.tx-14"),
                    ]),
                ]),
            ]), 
            m("table.table", [
                m("tr", [
                    m("th.tx-14", []),                    
                    m("th.tx-14", { style: "float: right"}, [
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() {
                                var informe = {
                                        idmuestra: 1,
                                        nopedidomv: parseInt(informeModelo.numeroPedido),
                                        nohistoriaclinicamv: parseInt(informeModelo.numeroHistoriaClinica),
                                        noatencionmv: parseInt(informeModelo.numeroAtencion),
                                        secuencial: parseInt(informeModelo.numeroPedido),
                                        year: moment().year(),
                                        idtipoinforme: 1,
                                        informacionclinica: vnode.dom['textareainformacionclinica'].value,
                                        muestrasenviadas: vnode.dom['textareamuestrasenviadas'].value,
                                        diagnostico: vnode.dom['textareadiagnostico'].value,
                                        macroscopico: vnode.dom['textareamacroscopico'].value,
                                        fechadocumento: vnode.dom['inputfechadocumento'].value,
                                    }                                                                                                    
                                    informeModelo.guardar(informe);
                            }
                        }, [
                            m("i.fas.mg-r-5", )], "Guardar"
                        ),
                        m("button#btnnuevoanatomico.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                            onclick: function() {

                                m.route.set("/patologia/pedido?numeroHistoriaClinica=" + informeModelo.numeroHistoriaClinica + "&numeroAtencion=" + informeModelo.numeroAtencion + "&numeroPedido=" + informeModelo.numeroPedido);
                            }
                        }, [
                            m("i.fas.mg-r-5", )], "Finalizar"
                        ),
                    ]),
                ]),
            ]),              
        ])
    }
}

export default informeAnatomico;