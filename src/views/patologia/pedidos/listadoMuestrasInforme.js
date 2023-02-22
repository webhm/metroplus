import m from 'mithril';
import informeModel from '../../../models/informeModel';

var informeModelo = informeModel;

const listadoMuestrasInforme = {
    oninit: (datos) => { 
        if (datos.attrs.numeroPedido !== undefined) {
            informeModelo.cargarListado(datos.attrs.numeroPedido) ; 
            informeModelo.numeroPedido = datos.attrs.numeroPedido;
        } 
        if (datos.attrs.numeroAtencion !== undefined) {
            informeModelo.numeroAtencion = datos.attrs.numeroAtencion;
        }
        if (datos.attrs.numeroHistoriaClinica !== undefined) {
            informeModelo.numeroHistoriaClinica = datos.attrs.numeroHistoriaClinica;
        }           
    },
    view: (vnode) => {
        return m("div.listado-muestra-informe", [
            m("div#", [
                m("h5.mg-t-20.mg-b-10.tx-12", [
                    m("span", { style: "margin: 0 30px 0 0"}, "No Pedido:  " + informeModelo.numeroPedido),
                    m("span", { style: "margin: 0 30px 0 0"}, "Fecha:   25/01/2023"),
                    m("span", { style: "margin: 0 30px 0 0"}, "Estado:  Pendiente"),
                ])
            ]),
            m("div.row.tx-12", [
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
            ]),
            m("table.table", [
                m("thead.thead-light", [
                    m("tr", [
                        m("th.tx-12", {scope: "col"}, "ID Muestra"),
                        m("th.tx-12", {scope: "col"}, "ID Informe"),
                        m("th.tx-12", {scope: "col"}, ""),
                        m("th.tx-12", {scope: "col"}, ""),
                        m("th.tx-12", {scope: "col"}, "")
                    ]),
                ]), [
                    m("tbody#listadomuestrasinformes", [
                        informeModelo.listado.map(function(muestra) {
                            return [
                                m("tr#" +  muestra.id, [
                                    m("th.tx-12.muestraid", {scope: "row"}, muestra.id),
                                    m("td.tx-12.muestrainforme"),
                                    m("td.tx-12.linkcrearinforme", m(m.route.Link, { 
                                        href: "/patologia/pedidos/nuevoinforme?numeroHistoriaClinica=" + informeModelo.numeroHistoriaClinica + "&numeroAtencion=" + informeModelo.numeroAtencion + "&numeroPedido=" + informeModelo.numeroPedido}, "Nuevo Informe")),
                                    m("td.tx-12.linkeditarinforme", m(m.route.Link, { href: "/patologia/prediagnosticos/nuevo"}, "Editar Informe"),),
                                    m("td.tx-12.linkeconsultarinforme", m(m.route.Link, { href: "/patologia/prediagnosticos/nuevo"}, "Consultar Informe")),
                                ]),
                            ]
                        }),
                    ]),
                ],
            ]),
        ])
    }
}

export default listadoMuestrasInforme;