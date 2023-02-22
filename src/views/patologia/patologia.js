import HeaderPrivate from '../layout/header-private';
import SidebarPato from './sidebarPato';
import App from '../app';

const MenuPatologia = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "MetroPlus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Patología"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Patología:"
                    ),

                    m("div.row.tx-14", [
                        (App.isShow('patologia', 26) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/patologia/pedidos")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-inbox tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Recepción de Pedidos",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Pedidos",
                                    )
                                ])
                            ]),

                        ])] : []),
                        (App.isShow('patologia', 26) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/patologia/seguimiento")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-stream tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Seguimiento de Pedidos",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir al Seguimiento de Pedidos",
                                    )
                                ])
                            ]),

                        ])] : []),
                        (App.isShow('patologia', 26) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/patologia/prediagnosticos")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-stethoscope tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Generar Pre-Diagnósticos",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Generación de pre-diagnosticos",
                                    )
                                ])
                            ]),

                        ])] : []),
                        (App.isShow('patologia', 26) ? [m("li", {
                            "class": "list-item bg-white wd-100p",
                            "style": { "cursor": "pointer" },
                            onclick: () => {
                                m.route.set("/patologia/configuracion")
                            }
                        }, [
                            m("div", { "class": "media" }, [
                                m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                    m("i", { "class": "fas fa-cog tx-30 tx-white" })
                                ),
                                m("div", { "class": "media-body mg-l-15" }, [
                                    m("p", { "class": "tx-18 mg-b-0" },
                                        "Configuración",
                                    ),
                                    m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                        "Ir a Configuración",
                                    )
                                ])
                            ]),

                        ])] : []),
                    ]),

                ])
            ),
        ];
    },

};

const Patologia = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarPato.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Patologia | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("patologia") }),
            m(SidebarPato),
            m(MenuPatologia)
        ];
    },

};




export default Patologia;