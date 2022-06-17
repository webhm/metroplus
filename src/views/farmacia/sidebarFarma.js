import Encrypt from '../../models/encrypt';


const MenuSidebar = {
    view: () => {

        let _data = Encrypt.getDataUser();

        if (_data.length !== 0) {
            return [

                _data.modulesAccess.farmacia.map(function(_v, _i, _contentData) {
                    return [
                        m("a." + ((SidebarFarma.page == _v.idModulo) ? "active" : ""), { href: "#!/" + _v.href },
                            _v.label
                        ),

                    ]

                })
            ]
        }



    },

};




const SidebarFarma = {
    page: "",
    setPage: (page) => {
        SidebarFarma.page = page;
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
                            "Farmacia"
                        ),
                        m("li.nav-item.show", [
                            m("a.nav-link.with-sub", {
                                href: "#!/farmacia"
                            }, [
                                m("i[data-feather='layout']"),
                                " Farmacia"
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

export default SidebarFarma;