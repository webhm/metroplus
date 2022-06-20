import HeaderPrivate from '../layout/header-private';
import App from '../app';
import SidebarRight from '../layout/sidebarRight';
import m from 'mithril';
import Encrypt from '../../models/encrypt';


const MenuInicio = {
    view: () => {

        let _data = Encrypt.getDataUser();


        if (_data !== null && _data.length !== 0) {
            return [
                m("li.nav-item.active",

                    m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                        m("i[data-feather='layout']"),
                        " Inicio "
                    ])


                ),
                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {


                        return [
                            m("li.nav-item",
                                m(m.route.Link, { href: "/" + _v, class: "nav-link" }, [
                                    m("i[data-feather='layout']"),
                                    _v.charAt(0).toUpperCase() + _v.slice(1)
                                ])

                            ),
                        ]
                    }

                })
            ]
        }


    },

};


const ModulesAccess = {
    isContent: false,
    view: () => {

        MenuInicio.isContent = false;

        let _data = Encrypt.getDataUser();



        if (_data !== null && _data.length !== 0) {
            return [

                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {

                        MenuInicio.isContent = true;

                        return [
                            m("div.col-sm-6.mg-b-20",
                                m("div.bg-white.bd.pd-20.pd-lg-30.d-flex.flex-column.justify-content-end", [

                                    m("h5.tx-inverse.mg-b-20",
                                        _v.charAt(0).toUpperCase() + _v.slice(1)
                                    ),
                                    m(m.route.Link, { href: "/" + _v, class: "tx-medium tx-primary" }, [
                                        "Ir a " + _v.charAt(0).toUpperCase() + _v.slice(1),
                                        m("i.icon.ion-md-arrow-forward.mg-l-5")
                                    ])




                                ])
                            ),

                        ]
                    }

                    if (Object.keys(_data.modulesAccess).length == (_i + 1)) {
                        if (!MenuInicio.isContent) {
                            return [
                                m("p.df-lead.pd-15",
                                    "Todavía no tienes acceso a ningún Módulo disponible. Comunícate a CONCAS Ext: 2020 y solicita activación. Att: Metrovirtual Plus."
                                )
                            ]
                        }

                    }




                })
            ]
        }



    },

};



const Inicio = {
    oninit: () => {
        HeaderPrivate.page = "";
        App.isAuth();
    },
    oncreate: () => {
        document.title = "Inicio | " + App.title;
    },
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [

                m("div.navbar-brand",
                    m(m.route.Link, { href: "/", class: "df-logo" }, [
                        "Metro",
                        m("span",
                            "Virtual"
                        ),
                        "+"
                    ]),


                ),
                m(".navbar-menu-wrapper[id='navbarMenu']", [
                    m("div.navbar-menu-header", [
                        m(m.route.Link, { href: "/", class: "df-logo" }, [
                            "Metro",
                            m("span",
                                "Virtual"
                            ),
                            "+"
                        ]),
                        m("a[id='mainMenuClose'][href='']",
                            m("i[data-feather='x']")
                        )
                    ]),
                    m("ul.nav.navbar-menu", [
                        m("li.nav-label.pd-l-20.pd-lg-l-25.d-lg-none",
                            "Menu"
                        ),
                        m(MenuInicio),

                    ])
                ]),
                m(SidebarRight)
            ]),
            m("div.content.content-components",
                m("div.container", [
                    m("ol.breadcrumb.df-breadcrumbs", [
                        m("li.breadcrumb-item",
                            m(m.route.Link, { href: "/", }, [
                                "Metrovirtual"

                            ]),

                        ),
                        m("li.breadcrumb-item.active[aria-current='page']",
                            "Inicio"
                        )
                    ]),
                    m("h1.df-title.mg-t-20.mg-b-10",
                        "Inicio:"
                    ),

                    m("div.row.tx-14", [

                        m(ModulesAccess),


                    ]),

                ])
            ),
        ];
    },

};





export default Inicio;