import SidebarPato from '../sidebarPato';
import m from 'mithril';

const PatologiaSeguimientos = {
    notificaciones: [],
    pedidos: [],
    showBitacora: "",
    showPedido: "",
    fechaDesde: "",
    fechaHasta: "",
    searchField: "",
    idFiltro: 0,
    loader: false,
    error: "",
    oninit: (_data) => {

        SidebarPato.page = "";

    },
    oncreate: (_data) => {
        
    },

    view: (_data) => {

        return PatologiaSeguimientos.loader ? [
            m(SidebarPato, { oncreate: SidebarPato.setPage(29) }),
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
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Configuración"
                        ),

                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración:"
                    ),
                    m("div.row.animated.fadeInUp", [

                        m("div.col-12", [

                            m("div.table-loader.wd-100p", [
                                    m("div.placeholder-paragraph", [
                                        m("div.line"),
                                        m("div.line")
                                    ])
                                ]
                            ),
                        ])
                    ]),
                ])
            ),
        ] : [
            m(SidebarPato, { oncreate: SidebarPato.setPage(29) }),
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
                            m(m.route.Link, { href: "/patologia" }, [
                                " Patología "
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Configuración"
                        ),
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Configuración:"
                    ),
                    m("div.row.animated.fadeInUp", [
                        m("div.col-12", [
                            m(".alert.alert-info[role='info']",
                                "Página en Construcción."
                            )
                        ])
                    ]),
                ])
            ),
        ];
    },
};


export default PatologiaSeguimientos;