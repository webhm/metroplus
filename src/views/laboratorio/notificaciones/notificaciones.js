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
                                " Metrovirtual "
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
                        m("i.fas.fa-bell.mg-r-5"),
                        "Notificaciones de Laboratorio:"

                    ]

                    ),

                    m("div.row.tx-14", [
                        m("div.col-12.mg-b-10.wd-100p",
                            m("div.row.mg-t-10", [
                                m("div.col-sm-12.pd-b-10.mg-b-10", [
                                    m("label.nav-label.tx-semibold",
                                        [
                                            m("i.fas.fa-history.mg-r-5"),
                                            "Notificaciones Pendientes: "
                                        ]

                                    ),
                                    m("hr"),

                                ]


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
                m("label.nav-label.mg-b-10",
                    "Notificaciones de Laboratorio"
                ),
                m("a.nav-link[href='#']", [
                    m("i.fas.fa-history.mg-r-5"),
                    "Notificaciones Pendientes"
                ]),
                m("a.nav-link[href='#']", [
                    m("i.fas.fa-paper-plane.mg-r-5"),
                    "Notificaciones Enviadas"
                ]),
                m("a.nav-link[href='#']", [
                    m("i.fas.fa-exclamation-triangle.mg-r-5"),
                    "Notificaciones con Error"
                ]),
                m("a.nav-link[href='#']", [
                    m("i.fas.fa-bell.mg-r-5"),
                    "Configuracion"
                ])

            ])
        ];
    },

};


export default NotificacionesLab;