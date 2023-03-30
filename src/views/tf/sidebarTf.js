import Encrypt from '../../models/encrypt';


const MenuSidebar = {
    view: () => {

        let _data = Encrypt.getDataUser();


        if (_data.length !== 0) {
            return [

                _data.modulesAccess['terapia-fisica'].map(function (_v, _i, _contentData) {
                    return [


                        m(m.route.Link, { href: "/" + _v.href, class: ((SidebarTf.page == _v.idModulo) ? "active" : "") }, [
                            _v.label
                        ]),



                    ]

                })
            ]
        }



    },

};




const SidebarTf = {
    page: "",
    setPage: (page) => {
        SidebarTf.page = page;
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
                            "Terapia Física"
                        ),
                        m("li.nav-item.show", [
                            m(m.route.Link, { href: "/terapia-fisica", class: "nav-link with-sub" }, [
                                m("i[data-feather='layout']"),
                                " Terapia Física "
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

export default SidebarTf;