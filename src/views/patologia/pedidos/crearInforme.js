import m from 'mithril';
import HeaderPrivate from '../../layout/header-private';
import SidebarPato from '../sidebarPato';
import BreadCrumb from '../../layout/breadcrumb';
import informeModel from '../../../models/informeModel';
import informeAnatomico from './informeAnatomico';

var informeModelo = informeModel;

const crearInforme = {
    oninit: (datos) => { 
        if (datos.attrs.numeroPedido !== undefined) {
            informeModelo.numeroPedido = datos.attrs.numeroPedido;
        } 
        if (datos.attrs.numeroAtencion !== undefined) {
            informeModelo.numeroAtencion = datos.attrs.numeroAtencion;
        }
        if (datos.attrs.numeroHistoriaClinica !== undefined) {
            informeModelo.numeroHistoriaClinica = datos.attrs.numeroHistoriaClinica;
        }           
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato, { oncreate: SidebarPato.setPage(26) }),
            m("div.content.content-components",
                m("div.container.mg-l-0.mg-r-0", {
                    style: { "max-width": "100%" }
                }, [
                    m(BreadCrumb, [{path: "/", label: "metroplus"}, 
                                   {path: "/patologia", label: "patologia"},
                                   {path: "", label: "nuevo informe"}]),
                    m("h1.df-title.mg-t-20.mg-b-10", "Información del Paciente"),
                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [
                        m("h5.tx-right.tx-normal.tx-rubik.tx-color-03.mg-b-0",
                            m("small.pd-2.tx-20",
                                m("i.fas.fa-times-circle.pd-2", {
                                        "style": { "cursor": "pointer" },
                                        title: "Cerrar",
                                        onclick: () => {
                                            m.route.set("/patologia/pedido?numeroHistoriaClinica=" + informeModelo.numeroHistoriaClinica + "&numeroAtencion=" + informeModelo.numeroAtencion + "&numeroPedido=" + informeModelo.numeroPedido)
                                        }
                                    }
                                )
                            )),
                        m("table.table", [
                            m("tr", [
                                m("th", m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {
                                    style: "width: 100%", 
                                    onclick: function() {
                                        m.mount(document.querySelector("#crear-informe"), informeAnatomico);
                                    }
                                }, "ANATÓMICO")),
                                m("th", m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {style: "width: 100%", onclick: function() {}}, "MOLECULAR")),
                                m("th", m("button.btn.btn-xs.btn-primary.mg-l-2.tx-semibold[type='button']", {style: "width: 100%", onclick: function() {}}, "CITÓLOGICO")),                    
                            ])
                        ]),
                        m("form#crear-informe"),
                    ]),
                ])
            )
        ]
    }
}

export default crearInforme;