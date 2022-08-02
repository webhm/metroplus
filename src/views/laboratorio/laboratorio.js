import HeaderPrivate from '../layout/header-private';
import Sidebarlab from './sidebarLab';
import App from '../app';

const MenuLaboratorio = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                "Metrovirtual"
                            ])
                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Laboratorio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Laboratorio:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('laboratorio', 1) ? [
                            m("div.col-md-6.mg-b-20",
                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-20", [
                                    m("div.mg-b-25",
                                        m("i.tx-50.tx-gray-500.fas.fa-inbox", )
                                    ),
                                    m("h5.tx-inverse.mg-b-20",
                                        "Caja Recepción Turnos"
                                    ),
                                    m(m.route.Link, { href: "/laboratorio/pedidos", class: "tx-medium" }, [
                                        "Ir a Caja Recepción Turnos",
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ]),
                                ])
                            )
                        ] : []),
                        (App.isShow('laboratorio', 16) ? [m("div.col-md-6.mg-b-20",

                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='book-open']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Flebotomista"
                                ),
                                m(m.route.Link, { href: "/laboratorio/flebotomista", class: "tx-medium" }, [
                                    "Ir a Flebotomista",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        )] : []),
                        (App.isShow('laboratorio', 6) ? [m("div.col-md-6.mg-b-20",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-20", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='file-text']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Formularios Epidemiológicos"
                                ),
                                m(m.route.Link, { href: "/laboratorio/formularios", class: "tx-medium" }, [
                                    "Ir a Formularios Epidemiológicos",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        )] : []),
                        (App.isShow('laboratorio', 15) ? [m("div.col-md-6.mg-b-20",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='bell']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Notificaciones de Laboratorio"
                                ),
                                m(m.route.Link, { href: "/laboratorio/notificaciones", class: "tx-medium" }, [
                                    "Ir a Notificaciones de Laboratorio",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        )] : []),







                    ]),

                ])
            ),
        ];
    },

};

const Laboratorio = {
    oninit: () => {
        HeaderPrivate.page = "";
        Sidebarlab.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Laboratorio | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(Sidebarlab),
            m(MenuLaboratorio)
        ];
    },

};




export default Laboratorio;