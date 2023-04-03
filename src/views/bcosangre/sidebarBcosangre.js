import Encrypt from '../../models/encrypt';


const MenuSidebar = {
    view: () => {

        let _data = Encrypt.getDataUser();


        if (_data.length !== 0) {
            return [

                _data.modulesAccess['bco-sangre'].map(function(_v, _i, _contentData) {
                    return [


                        m(m.route.Link, { href: "/" + _v.href, class: ((SidebarBcoSangre.page == _v.idModulo) ? "active" : "") }, [
                            _v.label
                        ]),



                    ]

                })
            ]
        }



    },

};




const SidebarBcoSangre = {
    page: "",
    setPage: (page) => {
        SidebarBcoSangre.page = page;
    },
    view: () => {
        return [
            m(".sidebar.sidebar-fixed.sidebar-components[id='sidebarMenu']", [
                m("div.sidebar-header", [
                    m("a[href=''][id='mainMenuOpen']",
                        m("i[data-feather='menu']")
                    ),
                    m("h5",
                        "Menu"
                    ),
                    m("a[href=''][id='sidebarMenuClose']",
                        m("i[data-feather='x']")
                    )
                ]),
                m("div.sidebar-body",
                    m("ul.sidebar-nav", [
                        m("li.nav-label.mg-b-15",
                            "Banco de Sangre "
                        ),
                        m("li.nav-item.show", [
                            m(m.route.Link, { href: "/bco-sangre", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Banco de Sangre "
                            ]),

                            m("nav.nav", [

                                m(MenuSidebar)

                            ])
                        ]),

                    ])
                )
            ])
        ];
    },

};

export default SidebarBcoSangre;