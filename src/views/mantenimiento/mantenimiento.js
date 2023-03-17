import HeaderPrivate from '../layout/header-private';
import SidebarMantenimiento from './sidebarMantenimiento';
import App from '../app';

const Menuantenimiento = {
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
                            "Mantenimiento"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Mantenimiento:"
                    ),

                    m("div.row.tx-14", [

                        (App.isShow('mantenimiento', 8) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/mantenimiento/higienizacion")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-sitemap tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Integración Higienización",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Integración Higienización",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),
                        (App.isShow('mantenimiento', 40) ? [
                            m("li", {
                                "class": "list-item bg-white wd-100p",
                                "style": { "cursor": "pointer" },
                                onclick: () => {
                                    m.route.set("/mantenimiento/configuracion-usrs")
                                }
                            }, [
                                m("div", { "class": "media" }, [
                                    m("div.wd-60.tx-center", { "class": "pd-10 bg-litecoin" },
                                        m("i", { "class": "fas fa-cog tx-30 tx-white" })
                                    ),
                                    m("div", { "class": "media-body mg-l-15" }, [
                                        m("p", { "class": "tx-18 mg-b-0" },
                                            "Configuración de Roles y Permisos",
                                        ),
                                        m("p", { "class": "mg-b-0 tx-11 tx-color-03 tx-medium tx-spacing-1 tx-sans" },
                                            "Ir a Configuración de Roles y Permisos",
                                        )
                                    ])
                                ]),

                            ])
                        ] : []),



                    ]),

                ])
            ),
        ];
    }

};

const Mantenimiento = {
    oninit: () => {
        HeaderPrivate.page = "";
        SidebarMantenimiento.page = "";
        App.isAuth();

    },
    loadReport: () => {
        m.request({
                method: "GET",
                url: "https://api.hospitalmetropolitano.org/v2/medicos/update-logs",

            })
            .then(function(res) {
                console.log(res);
            })
            .catch(function(e) {});
    },
    oncreate: () => {
        document.title = "Mantenimiento | " + App.title;
        setInterval(function() { Mantenimiento.loadReport() }, 9000);

    },
    view: () => {
        return [
            m(HeaderPrivate, { oncreate: HeaderPrivate.setPage("mantenimiento") }),
            m(SidebarMantenimiento),
            m(Menuantenimiento)
        ];
    },

};



export default Mantenimiento;