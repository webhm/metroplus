import HeaderPrivate from '../../layout/header-private';
import SidebarLab from '../sidebarLab';
import App from '../../app';
import m from 'mithril';

const NotificacionesLab = {
    pacientes: [],
    showPacientes: "d-none",
    showBusquedas: "d-none",
    tipoBusqueda: "",
    searchField: "",
    showProcess: "d-none",
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarLab.page = "";
        NotificacionesLab.searchField = "";
        NotificacionesLab.showBusquedas = "";
        NotificacionesLab.pacientes = [];
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Notificaciones de Laboratorio | " + App.title;
    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("laboratorio") }),
            m(SidebarLab, { oncreate: SidebarLab.setPage(15) }),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs.mg-b-10", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/" }, [
                                " MetroPlus "
                            ])
                        ),
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/laboratorio" }, [
                                " LABORATORIO "
                            ])

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Notificaciones de Laboratorio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10", [
                            "Notificaciones de Laboratorio:"

                        ]

                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [

                                m("div.col-sm-6.mg-b-10",
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                        m("div.mg-b-25",
                                            m("i.fas.fa-filter.tx-50.tx-gray-500")
                                        ),
                                        m("h5.tx-inverse.mg-b-20",
                                            "Filtros"
                                        ),
                                        m(m.route.Link, { href: "/laboratorio/notificaciones/filtros", class: "tx-medium" }, [
                                            "Ir a Filtros",
                                        ]),


                                    ])
                                ),
                                m("div.col-sm-6.mg-b-10",
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                        m("div.mg-b-25",
                                            m("i.fas.fa-mail-bulk.tx-50.tx-gray-500")
                                        ),
                                        m("h5.tx-inverse.mg-b-20",
                                            "Notificaciones Enviadas"
                                        ),
                                        m(m.route.Link, { href: "/laboratorio/notificaciones/enviadas", class: "tx-medium" }, [
                                            "Ir a Notificaciones Enviadas",
                                        ]),


                                    ])
                                ),
                                m("div.col-sm-6.mg-b-10",
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                        m("div.mg-b-25",
                                            m("i.fas.fa-exclamation-triangle.tx-50.tx-gray-500")
                                        ),
                                        m("h5.tx-inverse.mg-b-20",
                                            "Notificaciones con Error"
                                        ),
                                        m(m.route.Link, { href: "/laboratorio/notificaciones/error", class: "tx-medium" }, [
                                            "Ir a Notificaciones con Error",
                                        ]),


                                    ])
                                ),
                                m("div.col-sm-6.mg-b-10",
                                    m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end.mg-b-5", [
                                        m("div.mg-b-25",
                                            m("i.fas.fa-hourglass.tx-50.tx-gray-500")
                                        ),
                                        m("h5.tx-inverse.mg-b-20",
                                            "Notificaciones Pendientes"
                                        ),
                                        m(m.route.Link, { href: "/laboratorio/notificaciones/pendientes", class: "tx-medium" }, [
                                            "Ir a Notificaciones Pendientes",
                                        ]),


                                    ])
                                ),
                            ])
                        ),
                        m("div.table-loader.col-12.wd-100p", {
                                class: NotificacionesLab.showProcess,
                            },
                            m("div.placeholder-paragraph", [
                                m("div.line"),
                                m("div.line")
                            ])
                        ),
                        m("div.col-12", {
                            class: "d-none",
                        }, [
                            m("label.nav-label.tx-semibold",
                                "Búsquedas Recientes:"
                            ),
                            m("div.table-content.col-12.pd-r-0.pd-l-0.pd-b-20.",
                                m("table.table.table-sm[id='table-ultimas-busquedas'][width='100%']"),
                            )
                        ]),

                    ]),
                ])
            ),
            m("div.section-nav", [


            ])
        ];
    },

};


export default NotificacionesLab;