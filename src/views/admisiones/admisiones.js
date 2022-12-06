import HeaderPrivate from '../layout/header-private';
import SidebarAdm from './sidebarAdm';
import App from '../app';

const MenuAdmisiones = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", {
                    style: { "max-width": "100%" }
                }, [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metroplus"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Admisiones"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Admisiones:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('admisiones', 7) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/admisiones/pre")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-hospital tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Pre Admisiones",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Pre Admisiones",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                        (App.isShow('admisiones', 27) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/admisiones/etiquetas")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-user-tag tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Impresión de Etiquetas",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Impresión de Etiquetas",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),

                    ]),

                ])
            ),
        ];
    },

};

const Admisiones = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarAdm.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Admisiones | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("admisiones") }),
            m(SidebarAdm),
            m(MenuAdmisiones)
        ];
    },

};



export default Admisiones;