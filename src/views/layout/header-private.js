import SidebarRight from './sidebarRight';
import Encrypt from '../../models/encrypt';



const MenuHeader = {
    view: () => {

        let _data = Encrypt.getDataUser();

        if (_data.length !== 0) {
            return [
                m("li.nav-item",
                    m(m.route.Link, { href: "/inicio", class: "nav-link" }, [
                        m("i[data-feather='layout']"),
                        " Inicio "
                    ])
                ),
                Object.keys(_data.modulesAccess).map(function (_v, _i, _contentData) {

                    if (_data.modulesAccess[_v].length !== 0) {
                        return [
                            m("li.nav-item." + ((HeaderPrivate.page === _v) ? "active" : ""),

                                m(m.route.Link, { href: "/" + _v, class: "nav-link" }, [
                                    m("i[data-feather='layout']"),
                                    _v.charAt(0).toUpperCase() + _v.slice(1)
                                ]),


                            ),
                        ]
                    }



                })
            ]
        }



    },

};




const HeaderPrivate = {
    page: "",

    setPage: (page) => {
        HeaderPrivate.page = page;
    },
    view: () => {
        return [
            m("header.navbar.navbar-header.navbar-header-fixed", [
                m("a.burger-menu[href=''][id='sidebarMenuOpen']",
                    m("i[data-feather='arrow-left']")
                ),
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
                        m(MenuHeader)
                    ])
                ]),
                m(SidebarRight)
            ]),

        ];
    },
};




export default HeaderPrivate;