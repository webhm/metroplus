import HeaderPrivate from '../layout/header-private';
import SidebarAdm from './sidebarAdm';
import App from '../app';

const MenuAdmisiones = {
    view: () => {
        return [
            m("div.content.content-components",
                m("div.container", [
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

                        m("div.col-sm-6",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.wd-50.ht-50.tx-gray-500[data-feather='users']")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "Pre Admisiones"
                                ),
                                m(m.route.Link, { href: "/admisiones/pre", class: "tx-medium" }, [
                                    "Ir a Pre Admisiones",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-6.d-none",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
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
                        ),

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