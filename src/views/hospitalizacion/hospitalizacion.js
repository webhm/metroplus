import HeaderPrivate from '../layout/header-private';
import SidebarHospital from './sidebarHospital';
import App from '../app';

const MenuHospitalizacion = {
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
                            "Hospitalización"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Hospitalización:"
                    ),

                    m("div.row.tx-14", [

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "PB"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/pb", class: "tx-medium" }, [
                                    "Ir a PB",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "H1"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/h1", class: "tx-medium" }, [
                                    "Ir a H1",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "H2"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/h2", class: "tx-medium" }, [
                                    "Ir a H2",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "C2"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/c2", class: "tx-medium" }, [
                                    "Ir a C2",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "U.C.I."
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/uci", class: "tx-medium" }, [
                                    "Ir a U.C.I.",
                                    m("i.icon.ion-md-arrow-forward.mg-l-5")
                                ]),


                            ])
                        ),

                        m("div.col-sm-4",
                            m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                m("div.mg-b-25",
                                    m("i.tx-50.tx-gray-500.fas.fa-procedures")
                                ),
                                m("h5.tx-inverse.mg-b-20",
                                    "COVID"
                                ),
                                m(m.route.Link, { href: "/hospitalizacion/covid", class: "tx-medium" }, [
                                    "Ir a COVID",
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

const Hospitalizacion = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarHospital.page = "";
        App.isAuth();

    },
    oncreate: () => {
        document.title = "Hospitalización | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("hospitalizacion") }),
            m(SidebarHospital),
            m(MenuHospitalizacion)
        ];
    },

};



export default Hospitalizacion;